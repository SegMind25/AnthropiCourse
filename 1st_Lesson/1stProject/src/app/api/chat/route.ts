import type { FileNode } from "@/lib/file-system";
import { VirtualFileSystem } from "@/lib/file-system";
import { streamText, appendResponseMessages } from "ai";
import { buildStrReplaceTool } from "@/lib/tools/str-replace";
import { buildFileManagerTool } from "@/lib/tools/file-manager";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getLanguageModel, MockLanguageModel } from "@/lib/provider";
import { generationPrompt } from "@/lib/prompts/generation";

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

function isQuotaError(error: any): boolean {
  return (
    error?.statusCode === 429 ||
    error?.message?.includes("quota") ||
    error?.message?.includes("RESOURCE_EXHAUSTED")
  );
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  const {
    messages,
    files,
    projectId,
  }: { messages: any[]; files: Record<string, FileNode>; projectId?: string } =
    await req.json();

  messages.unshift({
    role: "system",
    content: generationPrompt,
  });

  // Reconstruct the VirtualFileSystem from serialized data
  const fileSystem = new VirtualFileSystem();
  fileSystem.deserializeFromNodes(files);

  let model = getLanguageModel();
  let isMockProvider = !process.env.OPENROUTER_API_KEY;
  let lastError: any = null;

  // Retry logic for quota errors
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = streamText({
        model,
        messages,
        maxTokens: 10_000,
        maxSteps: isMockProvider ? 4 : 40,
        onError: (err: any) => {
          console.error("Stream error:", err);
          lastError = err;
        },
        tools: {
          str_replace_editor: buildStrReplaceTool(fileSystem),
          file_manager: buildFileManagerTool(fileSystem),
        },
        onFinish: async ({ response }) => {
          // Save to project if projectId is provided and user is authenticated
          if (projectId) {
            try {
              // Check if user is authenticated
              const session = await getSession();
              if (!session) {
                console.error("User not authenticated, cannot save project");
                return;
              }

              // Get the messages from the response
              const responseMessages = response.messages || [];
              // Combine original messages with response messages
              const allMessages = appendResponseMessages({
                messages: [...messages.filter((m) => m.role !== "system")],
                responseMessages,
              });

              await prisma.project.update({
                where: {
                  id: projectId,
                  userId: session.userId,
                },
                data: {
                  messages: JSON.stringify(allMessages),
                  data: JSON.stringify(fileSystem.serialize()),
                },
              });
            } catch (error) {
              console.error("Failed to save project data:", error);
            }
          }
        },
      });

      return result.toDataStreamResponse();
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error?.message);

      if (isQuotaError(error) && attempt < MAX_RETRIES) {
        // Extract retry delay from error response if available
        let retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
        const retryAfter = error?.responseHeaders?.["retry-after"];
        if (retryAfter) {
          retryDelay = parseInt(retryAfter, 10) * 1000;
        }

        console.log(`Quota exceeded, retrying in ${retryDelay}ms...`);
        await sleep(retryDelay);

        // Fallback to mock provider after first failed attempt
        if (attempt === 0 && !isMockProvider) {
          console.log("Falling back to mock provider due to quota error");
          model = new MockLanguageModel("mock-gemini-2.0-flash");
          isMockProvider = true;
        }
        continue;
      }

      // Non-retryable error or max retries exceeded
      break;
    }
  }

  // All retries failed, return error response
  const errorMessage = isQuotaError(lastError)
    ? "API quota exceeded. Please try again later or add your own OPENROUTER_API_KEY to the environment variables."
    : lastError?.message || "Failed to process your request";

  return new Response(
    JSON.stringify({
      error: errorMessage,
      isMockProvider: true,
    }),
    {
      status: 503,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export const maxDuration = 120;

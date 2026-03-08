import { LanguageModelV1, LanguageModelV1StreamPart, LanguageModelV1Message } from "@ai-sdk/provider";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "stepfun/step-3.5-flash:free";

export class OpenRouterLanguageModel implements LanguageModelV1 {
  readonly specificationVersion = "v1" as const;
  readonly provider = "openrouter";
  readonly modelId: string;
  readonly defaultObjectGenerationMode = "tool" as const;
  private apiKey: string;

  constructor(modelId: string = DEFAULT_MODEL) {
    this.modelId = modelId;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.warn("OPENROUTER_API_KEY environment variable is not set, using empty key");
      this.apiKey = "";
    } else {
      this.apiKey = apiKey;
    }
  }

  private async *generateStream(
    messages: LanguageModelV1Message[],
    userPrompt: string
  ): AsyncGenerator<LanguageModelV1StreamPart> {
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
          "HTTP-Referer": "https://github.com/your-app",
          "X-Title": "UIGen",
        },
        body: JSON.stringify({
          model: this.modelId,
          messages: messages.map((m) => ({
            role: m.role,
            content: Array.isArray(m.content)
              ? m.content
                  .filter((c) => c.type === "text")
                  .map((c) => (c as any).text)
                  .join("")
              : m.content,
          })),
          stream: true,
          max_tokens: 8192,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = response.statusText;
        try {
          const error = JSON.parse(errorText);
          errorMessage = error.error?.message || response.statusText;
        } catch {
          errorMessage = errorText || response.statusText;
        }
        throw new Error(`OpenRouter API Error: ${errorMessage}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.startsWith("data:")) continue;

          const data = trimmedLine.slice(5).trim();
          if (data === "[DONE]") {
            yield {
              type: "finish",
              finishReason: "stop",
              usage: { promptTokens: 0, completionTokens: 0 },
            };
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;

            if (delta?.content) {
              yield {
                type: "text-delta",
                textDelta: delta.content,
              };
            }

            if (delta?.tool_calls) {
              for (const toolCall of delta.tool_calls) {
                yield {
                  type: "tool-call",
                  toolCallType: "function",
                  toolCallId: toolCall.id || `call_${Date.now()}`,
                  toolName: toolCall.function?.name || "unknown",
                  args: toolCall.function?.arguments || "{}",
                };
              }
            }

            if (parsed.choices?.[0]?.finish_reason) {
              yield {
                type: "finish",
                finishReason: "stop" as any,
                usage: {
                  promptTokens: parsed.usage?.prompt_tokens || 0,
                  completionTokens: parsed.usage?.completion_tokens || 0,
                },
              };
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    } catch (error) {
      console.error("OpenRouter streaming error:", error);
      throw error;
    }
  }

  async doGenerate(
    options: Parameters<LanguageModelV1["doGenerate"]>[0]
  ): Promise<Awaited<ReturnType<LanguageModelV1["doGenerate"]>>> {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        "HTTP-Referer": "https://github.com/your-app",
        "X-Title": "UIGen",
      },
      body: JSON.stringify({
        model: this.modelId,
        messages: options.prompt.map((m) => ({
          role: m.role,
          content: Array.isArray(m.content)
            ? m.content
                .filter((c) => c.type === "text")
                .map((c) => (c as any).text)
                .join("")
            : m.content,
        })),
        max_tokens: options.maxTokens || 8192,
        temperature: options.temperature || 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = response.statusText;
      try {
        const error = JSON.parse(errorText);
        errorMessage = error.error?.message || response.statusText;
      } catch {
        errorMessage = errorText || response.statusText;
      }
      throw new Error(`OpenRouter API Error: ${errorMessage}`);
    }

    const data = await response.json();

    return {
      text: data.choices?.[0]?.message?.content || "",
      toolCalls: [],
      finishReason: "stop" as any,
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
      },
      warnings: [],
      rawCall: {
        rawPrompt: options.prompt,
        rawSettings: {
          maxTokens: options.maxTokens,
          temperature: options.temperature,
        },
      },
    };
  }

  async doStream(
    options: Parameters<LanguageModelV1["doStream"]>[0]
  ): Promise<Awaited<ReturnType<LanguageModelV1["doStream"]>>> {
    const self = this;

    const stream = new ReadableStream<LanguageModelV1StreamPart>({
      async start(controller) {
        try {
          const generator = self.generateStream(options.prompt, "");
          for await (const chunk of generator) {
            controller.enqueue(chunk);
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return {
      stream,
      warnings: [],
      rawCall: {
        rawPrompt: options.prompt,
        rawSettings: {},
      },
      rawResponse: { headers: {} },
    };
  }
}

export function getOpenRouterLanguageModel(modelId?: string) {
  return new OpenRouterLanguageModel(modelId);
}

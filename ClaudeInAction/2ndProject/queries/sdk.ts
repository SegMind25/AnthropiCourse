import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = "";

async function main() {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(response.text());
}

main();

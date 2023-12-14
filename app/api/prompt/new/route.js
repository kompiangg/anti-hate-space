import Prompt from "@models/prompt";
import { initDBConnection } from "@utils/database";

export async function POST(req) {
  const { userID, tag, prompt } = await req.json();

  try {
    await initDBConnection();

    const newPrompt = new Prompt({
      prompt,
      tag,
      creator: userID,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify("error cuy"), { status: 500 });
  }
}

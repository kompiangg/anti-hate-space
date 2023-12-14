import Prompt from "@models/prompt";
import { initDBConnection } from "@utils/database";

export async function GET(req) {
  try {
    await initDBConnection();

    const prompts = await Prompt.find().populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("error sob"), { status: 500 });
  }
}

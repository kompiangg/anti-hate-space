import { initDBConnection } from "@utils/database";
import Prompt from "@models/prompt";

export async function GET(req, { params }) {
  try {
    await initDBConnection();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error sob"), { status: 500 });
  }
}

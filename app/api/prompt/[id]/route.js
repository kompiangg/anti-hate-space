import { initDBConnection } from "@utils/database";
import Prompt from "@models/prompt";

export async function GET(req, { params }) {
  try {
    await initDBConnection();

    const prompts = await Prompt.findOne({
      _id: params.id,
    });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error sob"), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await initDBConnection();

    const prompts = await Prompt.findByIdAndRemove(params.id);

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error sob"), { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { prompt, tag } = await req.json();

    await initDBConnection();

    const existingPrompt = await Prompt.findById({
      _id: params.id,
    });
    if (!existingPrompt) {
      return new Response(JSON.stringify("document-nya gaada sob"), {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify("updated"), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error sob"), { status: 500 });
  }
}

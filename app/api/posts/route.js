import {
  createErrorResponse,
  createSuccessResponse,
} from "@utils/http/createResponse";
import Post from "@models/post";
import axios from "axios";

export async function GET(req) {
  try {
    const posts = await Post.getAll();

    return createSuccessResponse(posts, 200);
  } catch (error) {
    return createErrorResponse(error, 500);
  }
}

export async function POST(req) {
  const { user_id: userID, content } = await req.json();

  try {
    const data = await axios.post(
      process.env.HATE_SPEECH_CLASSIFICATION_API + "/predict",
      {
        predict_text: content,
      },
    );

    if (data.data.is_hate_speech) {
      return createErrorResponse(new Error("contained hate speech"), 400);
    }

    const post = new Post(content, {
      user_id: userID,
    });
    await post.save();

    return createSuccessResponse("created", 201);
  } catch (error) {
    if (error.message === "bad request") {
      return createErrorResponse(error, 400);
    }

    return createErrorResponse(error, 500);
  }
}

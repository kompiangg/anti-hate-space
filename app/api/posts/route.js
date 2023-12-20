import {
  createErrorResponse,
  createSuccessResponse,
} from "@utils/http/createResponse";
import Post from "@models/post";

export async function GET(req) {
  if (!req.query) {
    req.query = {};
  }
  let { limit, offset } = req.query;

  if (!limit) {
    limit = 10;
  }

  if (!offset) {
    offset = 0;
  }

  try {
    const posts = await Post.getAll(limit, offset);

    return createSuccessResponse(posts, 200);
  } catch (error) {
    return createErrorResponse(error, 500);
  }
}

export async function POST(req) {
  const { user_id: userID, content } = await req.json();

  try {
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

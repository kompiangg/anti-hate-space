import Post from "@models/post";
import { createSuccessResponse } from "@utils/http/createResponse";

export async function GET(req, { params }) {
  try {
    const post = await Post.findByUserID(params.id);

    return createSuccessResponse(post, 200);
  } catch (error) {
    return createErrorResponse(error, 500);
  }
}

import Post from "@models/post";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@utils/http/createResponse";

export async function GET(req, { params }) {
  try {
    const post = await Post.findByID(params.id);

    return createSuccessResponse(post, 200);
  } catch (error) {
    return createErrorResponse(error, 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    await Post.deleteByID(params.id);

    return createSuccessResponse("deleted", 200);
  } catch (error) {
    return createErrorResponse(error, 500);
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user_id: userID, content } = await req.json();

    const post = new Post(content, {
      user_id: userID,
      id: params.id,
    });
    await post.save();

    return createSuccessResponse("updated", 200);
  } catch (error) {
    console.log(error);
    return createErrorResponse(error, 500);
  }
}

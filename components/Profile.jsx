import { PostCardList } from "@components/Feed";

export default function Profile({
  name,
  desc,
  posts,
  handleEdit,
  handleDelete,
}) {
  return (
    <section className="w-full">
      <h1 className="head_text blue_gradient text-left">{name} Profile</h1>
      <p className="desc text-left">{desc}</p>

      <PostCardList
        posts={posts}
        handleUpdate={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
}

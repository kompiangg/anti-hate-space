import { PromptCardList } from "@components/Feed";

export default function Profile({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) {
  return (
    <section className="w-full">
      <h1 className="head_text blue_gradient text-left">{name} Profile</h1>
      <p className="desc text-left">{desc}</p>

      <PromptCardList
        data={data}
        handleUpdate={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
}

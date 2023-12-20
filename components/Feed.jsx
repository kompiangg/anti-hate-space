"use client";

import { useEffect, useState } from "react";
import PostCard from "@components/PostCard";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function PostCardList({ posts, handleUpdate, handleDelete }) {
  return (
    <div className="mt-10 space-y-6">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        );
      })}
    </div>
  );
}

export default function Feed() {
  const [posts, setPost] = useState([]);
  const [content, setContent] = useState({
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const body = {
      content: content.content,
      user_id: session?.user.id,
    };

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setPost([data.data, ...posts]);
    setContent({ content: "" });
    setSubmitting(false);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts", { cache: "no-store" });
      const data = await res.json();
      setPost(data.data);
    })();
  }, []);

  return (
    <section className="feed">
      <div className="flex-start w-full rounded-lg bg-white p-6">
        <Image
          src={session?.user.image}
          alt="Profile Picture"
          className="rounded-full "
          width={40}
          height={40}
        />
        <form className="flex- relative w-full" onSubmit={(e) => onSubmit(e)}>
          <textarea
            placeholder="Tuliskan apa yang anda pikirkan..."
            value={content.content}
            onChange={(e) =>
              setContent({ ...content, content: e.target.value })
            }
            required
            className="search_input"
          />

          <div className="button_wrapper flex-end mt-6 flex">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-violet-500 px-4 py-2 font-bold text-white hover:bg-violet-700"
            >
              Unggah
            </button>
          </div>
        </form>
      </div>
      <PostCardList posts={posts} />
    </section>
  );
}

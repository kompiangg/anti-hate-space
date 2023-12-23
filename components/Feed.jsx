"use client";

import { useState } from "react";
import PostCard from "@components/PostCard";
import SignIn from "@components/SignInFirst";
import { useSession } from "next-auth/react";
import Form from "./Form";
import { useQuery } from "@tanstack/react-query";

export function PostCardList({ posts, handleUpdate, handleDelete }) {
  return (
    <div className="mt-10 w-full space-y-6">
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
  const { data: session } = useSession();

  const { isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(`/api/posts`, {
        cache: "no-store",
      });
      const data = await res.json();
      setPost(data.data);
      return data.data;
    },
    config: {
      enabled: !!session,
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full flex justify-center">
      {session ? (
        <section className="feed">
          <Form />
          <PostCardList posts={posts} />
        </section>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

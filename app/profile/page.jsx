"use client";

import Profile from "@components/Profile";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (postID) => {
      const isConfirm = confirm("yakin mau hapus ni sob?");
      if (!isConfirm) {
        return;
      }

      return fetch(`/api/posts/${postID}`, {
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(`posts:${session?.user?.id}`);
    },

    onMutate: async (postID) => {},
  });

  const onClick = (postID) => {
    mutation.mutate(postID);
  };

  const { isPending, error } = useQuery({
    queryKey: [`posts:${session?.user?.id}`],
    queryFn: async () => {
      const res = await fetch(`/api/users/${session.user.id}/post`, {
        cache: "no-store",
      });
      const data = await res.json();
      setPosts(data.data);
      return data.data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        posts={posts}
        // handleEdit={onSubmit}
        handleDelete={onClick}
      />
    </div>
  );
}

"use client";

import Profile from "@components/Profile";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  // const handleEdit = async (promptID) => {
  //   router.push(`/update-prompt?id=${promptID}`);
  // };

  // const handleDelete = async (promptID) => {
  //   const isConf = confirm("yakin mau hapus ni sob?");
  //   if (!isConf) {
  //     return;
  //   }

  //   const res = await fetch(`/api/prompt/${promptID}`, {
  //     method: "DELETE",
  //   });

  //   alert("Udah kehapus sob");

  //   const filteredPrompt = posts.filter((p) => p._id !== promptID);
  //   setPosts(filteredPrompt);
  // };

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

  console.log(posts);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      posts={posts}
      // handleEdit={handleEdit}
      // handleDelete={handleDelete}
    />
  );
}

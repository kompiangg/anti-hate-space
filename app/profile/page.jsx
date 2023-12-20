"use client";

import Profile from "@components/Profile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`, {
        cache: "no-store",
      });
      const data = await res.json();

      setPrompts(data);
    })();
  }, []);

  const handleEdit = async (promptID) => {
    router.push(`/update-prompt?id=${promptID}`);
  };

  const handleDelete = async (promptID) => {
    const isConf = confirm("yakin mau hapus ni sob?");
    if (!isConf) {
      return;
    }

    const res = await fetch(`/api/prompt/${promptID}`, {
      method: "DELETE",
    });

    alert("Udah kehapus sob");

    const filteredPrompt = prompts.filter((p) => p._id !== promptID);
    setPrompts(filteredPrompt);
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePromptPage({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParam = useSearchParams();
  const promptID = searchParam.get("id");

  const [editing, setEditing] = useState(false);
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/prompt/${promptID}`);
      const data = await res.json();

      setPrompt({ ...prompt, prompt: data.prompt, tag: data.tag });
    })();
  }, []);

  const editPrompt = async (e) => {
    e.preventDefault();
    setEditing(true);

    try {
      const res = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: prompt.prompt,
          tag: prompt.tag,
        }),
      });

      if (res.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditing(false);
    }
  };

  return (
    <>
      <Form
        type="Edit"
        post={prompt}
        setPost={setPrompt}
        submitting={editing}
        handleSubmit={editPrompt}
      />
    </>
  );
}

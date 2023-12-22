"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import HateSpeech from "./HateSpeech";

export default function Form() {
  const { data: session } = useSession();
  const [content, setContent] = useState({
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [isHateSpeech, setIsHateSpeech] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData) => {
      setSubmitting(true);
      return fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(formData),
      });
    },

    onSuccess: (data) => {
      if (data.status == 400) {
        setIsHateSpeech(true);
        setTimeout(() => {
          setIsHateSpeech(false);
        }, 3500);
      }

      setSubmitting(false);
      queryClient.invalidateQueries("posts");
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({
      content: content.content,
      user_id: session?.user.id,
    });
  };

  return (
    <div className="w-full">
      {isHateSpeech ? <HateSpeech /> : null}

      <div className="flex-start w-full rounded-lg bg-white p-6">
        <Image
          src={session?.user.image}
          alt="Profile Picture"
          className="rounded-full "
          width={40}
          height={40}
        />
        <form className="flex-relative w-full" onSubmit={onSubmit}>
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
    </div>
  );
}

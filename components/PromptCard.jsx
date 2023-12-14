"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function PromptCard({
  prompt,
  handleTagClick,
  handleUpdate: handleEdit,
  handleDelete,
}) {
  const { data: session } = useSession();
  const pathName = usePathname();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-1 cursor-pointer items-center justify-start gap-3">
          <Image
            src={prompt.creator.image}
            width={40}
            height={40}
            alt="user_image"
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Image
              alt="copy"
              src={
                copied === prompt.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="blue_gradient cursor-pointer font-inter text-sm"
        onClick={handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>

      {session?.user.id === prompt.creator._id && pathName === "/profile" && (
        <div className="flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="green_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleEdit(prompt._id)}
          >
            Edit
          </p>
          <p
            className="orange_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleDelete(prompt._id)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

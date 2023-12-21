"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function PostCard({
  post,
  handleUpdate: handleEdit,
  handleDelete,
}) {
  const { data: session } = useSession();
  const pathName = usePathname();

  return (
    <div className="prompt_card">
      <div className="justify-between gap-5">
        <div className="flex flex-1 cursor-pointer items-center justify-start gap-3">
          <Image
            src={post.user.image}
            width={40}
            height={40}
            alt="user_image"
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.user.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              @{post.user.username}
            </p>
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {post.content}
        </p>
      </div>

      {session?.user.id === post.user.id && pathName === "/profile" && (
        <div className="flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="green_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleEdit(post._id)}
          >
            Edit
          </p>
          <p
            className="orange_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

export function PromptCardList({
  data,
  handleTagClick,
  handleUpdate,
  handleDelete,
}) {
  return (
    <div className="prompt_layout mt-10">
      {data.map((prompt) => {
        return (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}

export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  const handleSearchChange = () => {};

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/prompt", { cache: "no-store" });
      const data = await res.json();

      setPrompts(data);
    })();
  }, []);

  return (
    <section className="feed">
      <form className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
}

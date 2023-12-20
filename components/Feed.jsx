"use client";

import { useEffect, useState } from "react";
import TweetCard from "./TweetCard";

export function TweetCardList({
    data,
    handleTagClick,
    handleUpdate,
    handleDelete,
}) {
    return (
        <div className="space-y-6 mt-10">
            {data.map((tweet) => {
                return (
                    <TweetCard />
                );
            })}
        </div>
    );
}

export default function Feed() {
    const [tweets, setTweets] = useState([]);

    const handleSearchChange = () => { };

    useEffect(() => {
        (async () => {
            // const res = await fetch("/api/prompt", { cache: "no-store" });
            // const data = await res.json();
            const data = [{
                _id: 1,
                creator: {}
            }, {
                _id: 1,
                creator: {}
            }, {
                _id: 1,
                creator: {}
            }
            ]
            setTweets(data);
        })();
    }, []);

    return (
        <section className="feed">
            <div className="tweet_input bg-white p-6 rounded-lg shadow-md w-full">

                <div className="flex items-center p-4 mb-7 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Gagal mengunggah!</span> Unggahan terdeteksi mengandung ujaran kebencian.
                    </div>
                </div>

                <form onSubmit={() => { }}>
                    <div className="flex">
                        <img src="https://placekitten.com/40/40" alt="Profile Picture" className="w-10 h-10 rounded-full"></img>
                        <div className="input_wrapper ml-4 w-full">
                            <textarea className="mb-4 p-2 w-full outline-none min-h-[100px]" placeholder="Apa yang anda pikirkan?"></textarea>


                            <div className="button_wrapper flex flex-end">
                                <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full">
                                    Unggah
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <TweetCardList data={tweets} />
        </section>
    );
}

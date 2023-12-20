"use client";

import Image from "next/image";

export default function TweetCard({
    tweet
}) {
    return (
        <div className="tweet_card">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex">
                    <img src="https://placekitten.com/40/40" alt="Profile Picture" className="w-10 h-10 rounded-full"></img>
                    <div className="tweet_header ml-4">
                        <h3 className="font-semibold text-lg">John Doe</h3>
                        <p className="text-gray-600">@johndoe • 2h</p>
                    </div>
                </div>

                <p className="tweet_body mt-4 text-gray-800">
                    This is a sample tweet using Tailwind CSS. You can customize it further based on your needs.
                </p>
            </div>
        </div>
    )
}

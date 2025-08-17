import React from "react";
import data from "../data/data.json";

export default function PostsList() {
    return (
        <>
            <ul>
                {data.map((post) => (
                    <li key={post.id} className="mb-4">
                        <h2 className="text-lg font-bold">{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

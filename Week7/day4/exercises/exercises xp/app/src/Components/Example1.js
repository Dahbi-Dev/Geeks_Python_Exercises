import React from "react";
import data from "../data/portfolio.json";

export default function Example1() {
    return (
        <div>
            <h1 className="text-lg font-bold mb-2">Social Media</h1>
            <ul>
            {
                data.SocialMedias.map((link, index) => (
                    <li className="text-bold" key={index}>{link}</li>
                ))
            }
            </ul>
        </div>
    );
}

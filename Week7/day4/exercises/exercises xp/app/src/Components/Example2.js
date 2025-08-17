import React from "react";
import data from "../data/portfolio.json";

export default function Example2() {
    return (
        <div>
            {data.Skills.map((skill, index) => (
                <div key={index}>
                    <h1 className="text-lg font-bold mb-2">{skill.Area}</h1>
                    <ul>
                        {skill.SkillSet.map((set, index) => (
                            <li className="text-bold" key={index}>{set.Name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

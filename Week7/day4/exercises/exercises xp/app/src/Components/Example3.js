import React from "react";
import data from "../data/portfolio.json";

export default function Example3() {
    return (
        <div>
            {data.Experiences.map((exp, index) => (
                <div className="mb-4" key={index}>
                    
                    <img
                        className="max-w-20 h-20 border rounded-full"
                        src={exp.logo}
                        alt=""
                    />
                    <a className="mb-2" href={exp.url}>
                        {exp.companyName}
                    </a>
                    {
                        exp.roles.map((role, index) => (
                            <div key={index} className="mb-2">
                                <h2 className="text-xl font-bolder mb-1">{role.title}</h2>
                                <p>{role.endDate} {role.location}</p>
                                <p>{role.description}</p>

                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    );
}

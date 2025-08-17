import { useState } from "react"

function mySubmitHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    alert(`You are submitting ${event.target.name.value}`);
}

export default function Forms() {

    const [userName, setUserName] = useState("");
    const [age, setAge] = useState(null);
    const [car, setCar] = useState("Volvo");
    const [errorMessage, setErrorMessage] = useState("");

    let header = null;
    if (userName) {
        header = <h1 className="mb-4 text-2xl font-bold">Hello, {userName}!</h1>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={mySubmitHandler} className="w-100 max-w-xl flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md">

                <label className="flex flex-col">
                    {header}
                    <span className="mb-2 text-gray-700">Enter your name :</span>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="name"
                        onChange={(e) => setUserName(e.target.value)}
                    ></input>
                </label>

                <label className="flex flex-col">
                    <span className="mb-2 text-gray-700">Enter your age :</span>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="age"
                        onChange={(e) => {
                            if (isNaN(e.target.value)) {
                                setErrorMessage("Please enter a valid number for age");
                                e.preventDefault();
                            } else {
                                setAge(e.target.value)
                                setErrorMessage("")
                            }
                        }}
                    ></input>
                </label>
                {errorMessage && (
                    <div className="p-2 text-red-600 bg-red-100 rounded">
                        {errorMessage}
                    </div>
                )}

                <textarea
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="comments"
                    placeholder="Enter your comments here..."
                    rows="4"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                ></textarea>

                <select
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="cars"
                    onChange={(e) => setCar(e.target.value)}
                >
                    <option value="Volvo">Volvo</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                </select>

                <input
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value="Submit"
                ></input>
            </form>
        </div>
    )
}

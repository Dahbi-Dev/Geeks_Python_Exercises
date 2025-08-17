import React, { useState } from "react";

const initialState = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
};

function validate({ firstName, lastName, phone, email }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/;
    if (!firstName.trim() || !lastName.trim()) return false;
    if (!emailRegex.test(email)) return false;
    if (!phoneRegex.test(phone)) return false;
    return true;
}

export default function UserForm() {
    const [formData, setFormData] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(formData)) {
            setSubmitted(true);
        } else {
            setError("Please enter valid information in all fields.");
        }
    };

    const handleReset = () => {
        setFormData(initialState);
        setSubmitted(false);
        setError("");
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50">
            {!submitted ? (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            First Name:
                        </label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Last Name:
                        </label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Phone:
                        </label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            type="tel"
                            placeholder="Digits only"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            type="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {error && (
                        <div className="text-red-600 font-semibold mb-4">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md text-center">
                    <h2 className="text-xl font-bold mb-4">User Data</h2>
                    <p className="mb-2">
                        <strong>First Name:</strong> {formData.firstName}
                    </p>
                    <p className="mb-2">
                        <strong>Last Name:</strong> {formData.lastName}
                    </p>
                    <p className="mb-2">
                        <strong>Phone:</strong> {formData.phone}
                    </p>
                    <p className="mb-4">
                        <strong>Email:</strong> {formData.email}
                    </p>
                    <button
                        onClick={handleReset}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
}
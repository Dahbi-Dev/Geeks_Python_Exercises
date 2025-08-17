import { useState } from "react";
import Input from "./Input";

function validateInput(name, value) {
    const errors = [];
    if (value.trim() === "") {
        errors.push(`${name} is required`);
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        errors.push("Email is invalid");
    }
    if (name === "phone" && !/^\d{10}$/.test(value)) {
        errors.push("Phone number must be 10 digits");
    }
    return errors;
}

export default function Form() {
    const [formData, setFormData] = useState({
        firstName: { value: "", errors: [] },
        lastName: { value: "", errors: [] },
        phone: { value: "", errors: [] },
        email: { value: "", errors: [] },
    });

    function handleChange(event) {
        const { name, value } = event.target;
        const errors = validateInput(name, value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: { value, errors },
        }));
    }

    return (
        <form className="flex flex-col w-full max-w-xl justify-center bg-white rounded-lg shadow-lg p-8 w-80 mx-auto mt-8"
        onSubmit={(e) => { console.log("Form submitted", formData); e.preventDefault(); }}>
            <h2 className="text-3xl font-bold mb-4 text-blue-700">
                Form validation
            </h2>
            <Input
                name="firstName"
                label="First Name"
                type="text"
                value={formData.firstName.value}
                errors={formData.firstName.errors}
                handleChange={handleChange}
            ></Input>
            <Input
                name="lastName"
                label="Last Name"
                type="text"
                value={formData.lastName.value}
                errors={formData.lastName.errors}
                handleChange={handleChange}
            ></Input>
            <Input
                name="phone"
                label="Phone"
                type="tel"
                value={formData.phone.value}
                errors={formData.phone.errors}
                handleChange={handleChange}
            ></Input>
            <Input
                name="email"
                label="Email"
                type="email"
                value={formData.email.value}
                errors={formData.email.errors}
                handleChange={handleChange}
            ></Input>
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
                Submit
            </button>
        </form>
    );
}

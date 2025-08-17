function Form({ formData, handleChange, handleSubmit }) {
    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg space-y-4"
        >
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-1">
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                        className="accent-blue-500"
                    />
                    <span>Male</span>
                </label>
                <label className="flex items-center space-x-1">
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                        className="accent-pink-500"
                    />
                    <span>Female</span>
                </label>
            </div>
            <label className="block">
                <span className="block mb-1">Destination:</span>
                <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">-- Please Choose a destination --</option>
                    <option value="Japan">Japan</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Norway">Norway</option>
                </select>
            </label>
            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="nutsFree"
                    checked={formData.nutsFree === true}
                    onChange={handleChange}
                    className="accent-green-500"
                />
                <span>Nuts Free</span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="lactoseFree"
                    checked={formData.lactoseFree === true}
                    onChange={handleChange}
                    className="accent-green-500"
                />
                <span>Lactose Free</span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="vegan"
                    checked={formData.vegan === true}
                    onChange={handleChange}
                    className="accent-green-500"
                />
                <span>Vegan</span>
            </label>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
                Submit
            </button>
            <hr className="my-4" />
            <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">
                    Entered information:
                </h3>
                <p>
                    Your name:{" "}
                    <span className="font-medium">
                        {formData.firstName} {formData.lastName}
                    </span>
                </p>
                <p>
                    Your age:{" "}
                    <span className="font-medium">{formData.age}</span>
                </p>
                <p>
                    Your gender:{" "}
                    <span className="font-medium">{formData.gender}</span>
                </p>
                <p>
                    Your destination:{" "}
                    <span className="font-medium">{formData.destination}</span>
                </p>
                <p>
                    Nuts Free:{" "}
                    <span className="font-medium">
                        {formData.nutsFree ? "Yes" : "No"}
                    </span>
                </p>
                <p>
                    Lactose Free:{" "}
                    <span className="font-medium">
                        {formData.lactoseFree ? "Yes" : "No"}
                    </span>
                </p>
                <p>
                    Vegan:{" "}
                    <span className="font-medium">
                        {formData.vegan ? "Yes" : "No"}
                    </span>
                </p>
            </div>
        </form>
    );
}

export default Form;

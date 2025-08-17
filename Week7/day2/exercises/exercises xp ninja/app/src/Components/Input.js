export default function Input({
    name,
    label,
    type = "text",
    value = "",
    handleChange,
    errors = [],
}) {
    return (
        <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2" htmlFor="name">
                {label.toUpperCase()}
            </label>
            <input
                type={type}
                name={name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={handleChange}
            />
            {errors.length > 0 && (
                <ul className="mt-2 text-red-600">
                    {errors.map((error, index) => (
                        <li key={index} className="text-sm">
                            {error}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

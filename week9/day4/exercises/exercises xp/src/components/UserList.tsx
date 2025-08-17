/*
Create a new UserList.tsx component
Define User interface for API data
Implement loading and error states
Fetch and display user data from the API https://jsonplaceholder.typicode.com/users. Use the useEffect hook to fetch data from the API when the component mounts.
Handle potential errors properly
Display the fetched data in the component.
*/

import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export default function UserList() {
    function fetchUsers(): Promise<User[]> {
        return fetch("https://jsonplaceholder.typicode.com/users").then(
            (response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            }
        );
    }

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers()
            .then((data: User[]) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);
    return (
        <div className="min-w-56 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">User List</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="mb-2">
                            <strong>{user.name}</strong> ({user.username}) -{" "}
                            {user.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

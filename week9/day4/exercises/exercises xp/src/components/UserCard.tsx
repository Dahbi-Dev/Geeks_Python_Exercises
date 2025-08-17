/*Create a new UserCard.tsx component
Define interface with optional name, age, and role props
Implement default values for optional props
Test component with various prop combinations*/

interface UserCardProps {
    name?: string;
    age?: number;
    role?: string;
}
export default function UserCard({
    name = "Anonymous",
    age = 0,
    role = "User",
}: UserCardProps) {
    return (
        <div className="min-w-56 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-600">Age: {age}</p>
            <p className="text-gray-600">Role: {role}</p>
        </div>
    );
}

function getAction(role: string): string {
    const normalizedRole = role.toLowerCase();

    switch (normalizedRole) {
        case "admin":
            return "Manage users and settings";
        case "editor":
            return "Edit content";
        case "viewer":
            return "View content";
        case "guest":
            return "Limited access";
        default:
            return "Invalid role";
    }
}

console.log(getAction("admin"));
console.log(getAction("editor"));
console.log(getAction("viewer"));
console.log(getAction("guest"));
console.log(getAction("unknown"));
console.log(getAction("ADMIN"));
console.log(getAction("Editor"));
console.log(getAction("VIEWER"));

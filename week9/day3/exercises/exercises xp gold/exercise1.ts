interface User {
    name: string;
    email: string;
}
interface Admin {
    adminLevel: number;
}   

type AdminUser = User & Admin;

function getProperty(user: AdminUser, property: string): string | number | undefined {
    if (user.hasOwnProperty(property)) {
        return user[property]
    }
    return undefined;
}
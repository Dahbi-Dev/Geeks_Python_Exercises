interface User {
    readonly id: string;
    name: string;
    email: string;
}

interface PremiumUser extends User {
    membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
    console.log(`ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    if (user.membershipLevel) {
        console.log(`Membership Level: ${user.membershipLevel}`);
    } else {
        console.log("Membership Level: Not specified");
    }
}

const premiumUser: PremiumUser = {
    id: "12345",
    name: "John Doe",
    email: "Johndoe@gmail.com",
    membershipLevel: "Premium"
};

printUserDetails(premiumUser);

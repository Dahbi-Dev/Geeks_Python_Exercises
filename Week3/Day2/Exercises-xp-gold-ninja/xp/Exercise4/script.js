const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

// 1. Console.log the number of floors in the building.
console.log("Number of floors:", building.numberOfFloors);

// 2. Console.log how many apartments are on the floors 1 and 3.
const firstFloor = building.numberOfAptByFloor.firstFloor;
const thirdFloor = building.numberOfAptByFloor.thirdFloor;
console.log(`Apartments on 1st floor: ${firstFloor}`);
console.log(`Apartments on 3rd floor: ${thirdFloor}`);

// 3. Console.log the name of the second tenant and the number of rooms he has in his apartment.
const secondTenant = building.nameOfTenants[1]; 
console.log("q3", secondTenant)
const danRooms = building.numberOfRoomsAndRent.dan[0];
console.log(`${secondTenant} has ${danRooms} rooms`);

// 4. Check if the sum of Sarah’s and David’s rent is bigger than Dan’s rent.
// If it is, increase Dan’s rent to 1200.
const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];

const sum = sarahRent + davidRent;

if (sum > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
    console.log("Dan’s rent was increased to 1200.");
} else {
    console.log("No change to Dan’s rent.");
}

console.log("Updated rent info:", building.numberOfRoomsAndRent);

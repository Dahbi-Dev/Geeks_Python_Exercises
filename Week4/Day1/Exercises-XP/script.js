// Exercise 1 : Comparison

function compareToTen(num) {
    return new Promise((resolve, reject) => {
        if (num <= 10) {
            resolve(`${num} is less than or equal to 10`);
        } else {
            reject(`${num} is greater than 10`);
        }
    });
}


// In the example, the promise should reject
compareToTen(15)
    .then(result => console.log(result))
    .catch(error => console.log(error));

// In the example, the promise should resolve
compareToTen(8)
    .then(result => console.log(result))
    .catch(error => console.log(error));

    // 🌟 Exercise 2 : Promises
    // Instructions
    // Create a promise that resolves itself in 4 seconds and returns a “success” string.
    function successFunc() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("success");
            }, 4000);
        });
    }

    successFunc()
        .then(result => console.log(result));

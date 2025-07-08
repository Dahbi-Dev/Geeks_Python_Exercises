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

compareToTen(15)
    .then(result => console.log(result))
    .catch(error => console.log(error));

compareToTen(8)
    .then(result => console.log(result))
    .catch(error => console.log(error));




    // 🌟 Exercise 2 : Promises

    function successFunc() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("success");
            }, 4000);
        });
    }

    successFunc()
        .then(result => console.log(result));


//  Exercise 3 : Resolve & Reject

Promise.resolve(3)
    .then(result => console.log(result));

Promise.reject("Boo!")
    .catch(error => console.log(error));

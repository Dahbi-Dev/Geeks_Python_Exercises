let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}


const displayGroceries = ( ) =>{
    groceries.fruits.forEach((fruits,index )=> {
        console.log(`Fruit ${index +1} : ${fruits}`)
    })
      
}

const cloneGroceries = () => {
    let user = client;
    client = "Betty"
    // user get old data before inisilasaion and then the modification came out
    console.log(user, client)

    const shopping  = groceries;
  
    shopping.totalPrice = "35$";
    console.log(shopping.totalPrice)

    shopping.other.paid = false
    console.log(shopping.other.paid)


}

cloneGroceries()
displayGroceries()
type Person = {
    name: string
    age: number
}

type Adress = {
    street: string
    city: string
}

type PersonWithAddress = Person & Adress
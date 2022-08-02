
const contactOne = {
    name: 'Jimmy',
    age: 41,
    address: {
        city: 'Lynwood',
        state: 'Washington'
    }
}

const contactTwo = {
    name: 'Jane',
    age: 34,
    occupation: 'Software Engineer I',
    address: {
        city: 'Renton',
        state: 'Washington'
    }
}

const { name, address: { city } } = contactTwo;


const obj1 = {
    name: 'Liane',
    age: 30
}

const obj2 = {
    age: 35
}

const obj3 = { ...obj1, ...obj2 };
console.log(obj3)


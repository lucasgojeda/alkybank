
export const initialState = {
    id: null,
    email: "",
    first_name: "",
    last_name: "",
    roleId: null,
    points: null,
    checking: true,
    transactions: [],
}

export const demoUser = {
    id: '123',
    email: 'ojedalucasgabriel2@gmail.com',
    first_name: 'Lucas',
    last_name: 'Ojeda',
    roleId: '1',
    points: '200',
    transactions: [],
}

export const authenticatedState = {
    checking: false,
    uid: '123',
    name: 'Lucas Ojeda'
}

export const unAuthenticatedState = {
    id: null,
    email: "",
    first_name: "",
    last_name: "",
    roleId: null,
    points: null,
    transactions: [],
    checking: false
}
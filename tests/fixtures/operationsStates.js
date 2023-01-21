
export const initialState = {
    users: null,
    transactions: null,
    balance: {
        charges: null,
        expenses: null,
        total: null,
    }
}

export const usersData = {
    previousPage: null,
    nextPage: "/users/?page=2",
    data: [
        {
            id: 1,
            first_name: "Juan",
            last_name: "Perez",
            email: "juanperesz@example.com",
            password: "$2b$10$irgtiQtWcyZ6xEaRDJzSEeuLU4PmN8V42L6l2lnuPhs2Du.iJGDeq",
            points: 50,
            roleId: 1,
            createdAt: "2022-10-31T11:24:28.000Z",
            updatedAt: "2022-11-10T13:53:59.000Z"
        },
        {
            id: 2,
            first_name: "na",
            last_name: "podes-288",
            email: "napodes@wa.com",
            password: "$2b$10$aBz7EexiQKAco2O/hrdGZOiPmqe6CUDMxqEw1lg/QLbDViLo5EseK",
            points: 50,
            roleId: 1,
            createdAt: "2022-10-31T13:07:19.000Z",
            updatedAt: "2022-11-09T18:40:47.000Z"
        },
        {
            id: 4,
            first_name: "Lucas",
            last_name: "Carnero No Admin",
            email: "l.carnero@lucascarnero.com.ar",
            password: "$2b$10$N/Zx4d0V2MdzqDf7QJoY7.mj5u.cFaOdOb.7JpDLfxhQxGQjkLy5m",
            points: 95,
            roleId: 2,
            createdAt: "2022-10-31T13:09:39.000Z",
            updatedAt: "2022-10-31T13:19:09.000Z"
        }
    ]
}

export const transactionsList = [
    {
        id: 5260,
        amount: "15000",
        concept: "PAGOS",
        date: "2023-01-02T15:43:48.000Z",
        type: "topup",
        accountId: 132,
        userId: 586,
        to_account_id: 2,
        createdAt: "2023-01-02T15:43:45.000Z",
        updatedAt: "2023-01-02T15:43:45.000Z"
    },
    {
        id: 5259,
        amount: "2000",
        concept: "Pagos",
        date: "2023-01-02T15:43:33.000Z",
        type: "topup",
        accountId: 132,
        userId: 586,
        to_account_id: 2,
        createdAt: "2023-01-02T15:43:32.000Z",
        updatedAt: "2023-01-02T15:43:32.000Z"
    },
    {
        id: 3713,
        amount: "1000",
        concept: "rompeee???",
        date: "2022-11-23T06:40:19.000Z",
        type: "payment",
        accountId: 132,
        userId: 586,
        to_account_id: 400,
        createdAt: "2022-11-23T06:40:19.000Z",
        updatedAt: "2022-11-23T06:40:19.000Z"
    }
]
/** Redux toolkit - Slices */
import {
    addCharges,
    addExpenses,
    addTotal,
    loadTransactions,
    loadUsers,
    operationsSlice
} from "../../../src/store/slices/operationsSlice";

/** Fixtures */
import {
    initialState,
    transactionsList,
    usersData
} from "../../fixtures/operationsStates";


describe('Testing on operationsSlice', () => {

    let state;

    beforeEach(() => {
        state = operationsSlice.getInitialState();
    });

    test('should be called "operations"', () => {

        expect(operationsSlice.name).toBe('operations');
    });

    test('should return the initial state', () => {

        expect(operationsSlice.getInitialState()).toEqual(initialState);
    });

    test('should load the users list', () => {

        state = operationsSlice.reducer(state, loadUsers(usersData));

        expect(state.users).toEqual(usersData);
    });

    test('should load the transactions list', () => {

        state = operationsSlice.reducer(state, loadTransactions(transactionsList));

        expect(state.transactions).toEqual(transactionsList);
    });

    test('should add a charge', () => {

        const charge = 500;

        state = operationsSlice.reducer(state, addCharges(charge));

        expect(state.balance.charges).toEqual(charge);
    });

    test('should add an expense', () => {

        const expense = 250;

        state = operationsSlice.reducer(state, addExpenses(expense));

        expect(state.balance.expenses).toEqual(expense);
    });

    test('should load the total', () => {

        const total = 250;

        state = operationsSlice.reducer(state, addTotal(total));

        expect(state.balance.total).toEqual(total);
    });

});
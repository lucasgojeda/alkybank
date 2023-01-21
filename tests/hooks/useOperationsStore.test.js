/** Libraries */
import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

/** Redux toolkit - Slices */
import { authSlice } from '../../src/store/slices/authSlice';
import { operationsSlice } from '../../src/store/slices/operationsSlice';

/** Custom hooks */
import { useAuthStore } from '../../src/hooks/useAuthStore';

/** Fixtures */
import { initialState, unAuthenticatedState } from '../fixtures/authStates';
import { initialState as initialOperationsState } from '../fixtures/operationsStates';

/** Api */
import walletApi from '../../src/api/walletApi';
import { useOperationsStore } from '../../src/hooks/useOperationsStore';

const getMockStore = (initialAuthState, initialCalendarState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
            operations: operationsSlice.reducer
        },
        preloadedState: {
            auth: { ...initialAuthState },
            operations: { ...initialCalendarState }
        }
    })
}

describe('Testing on useOperationsStore part 1', () => {

    beforeEach(async () => {
        localStorage.clear();
        jest.clearAllMocks();

        const user = {
            email: 'testjabb@test.com',
            password: '123456789'
        };

        const mockStore = getMockStore(unAuthenticatedState, initialOperationsState);

        const { result, rerender } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { StartLogin } = result.current;

        await act(async () => {
            await StartLogin(user)
        });

        rerender();

        await waitFor(() => {
            expect(result.current.id).toEqual(expect.any(Number));
        })
    })

    test('should return the default values', () => {

        const mockStore = getMockStore(unAuthenticatedState, initialOperationsState);

        const { result } = renderHook(() => useOperationsStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        expect(result.current).toEqual({
            users: null,
            transactions: null,
            balance: {
                charges: null,
                expenses: null,
                total: null,
            },
            StartGetUsers: expect.any(Function),
            StartSendMoney: expect.any(Function),
            StartGetTransactions: expect.any(Function),
            StartAddNewCharge: expect.any(Function),
            StartDeleteDeposit: expect.any(Function)
        })
    }, 15000);

    test('should load transactions', async () => {

        const mockStore = getMockStore(unAuthenticatedState, initialOperationsState);

        const { result, rerender } = renderHook(() => useOperationsStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { StartGetTransactions } = result.current;

        await act(async () => {
            await StartGetTransactions()
        });

        rerender();

        await waitFor(() => {
            expect(result.current.transactions.previousPage).toBe(null)
            expect(result.current.transactions.nextPage).toBe("/transactions/?page=2")
            expect(result.current.transactions.data[0]).toEqual({
                id: expect.any(Number),
                amount: expect.any(String),
                concept: expect.any(String),
                date: expect.any(String),
                type: expect.any(String),
                accountId: expect.any(Number),
                userId: expect.any(Number),
                to_account_id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
        })
    });

    test('should load users', async () => {

        const mockStore = getMockStore(unAuthenticatedState, initialOperationsState);

        const { result, rerender } = renderHook(() => useOperationsStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { StartGetUsers } = result.current;

        await act(async () => {
            await StartGetUsers()
        });

        rerender();

        await waitFor(() => {
            expect(result.current.users.previousPage).toBe(null)
            expect(result.current.users.nextPage).toBe("/users/?page=2")
            expect(result.current.users.data[0]).toEqual({
                id: expect.any(Number),
                first_name: expect.any(String),
                last_name: expect.any(String),
                email: expect.any(String),
                password: expect.any(String),
                points: expect.any(Number),
                roleId: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
        })
    });
});

describe('Testing on useOperationsStore part 2', () => {

    let mockStore = getMockStore(unAuthenticatedState, initialOperationsState);

    beforeEach(async () => {

        /** localStorage cleaning */
        localStorage.clear();

        /** Mocks cleaning */
        jest.clearAllMocks();

        /** We get credentials of the application */
        const user = {
            email: 'testjabb@test.com',
            password: '123456789'
        };

        const { result, rerender } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { StartLogin } = result.current;

        await act(async () => {
            await StartLogin(user)
        });

        rerender();

        await waitFor(() => {
            expect(result.current.id).toEqual(expect.any(Number));
        })

        /** We initializate thing necesary related to operations store */
        const { result: resultOperations, rerender: rerenderOperations } = renderHook(() => useOperationsStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { StartGetTransactions } = resultOperations.current;

        await act(async () => {
            await StartGetTransactions()
        });

        rerenderOperations();

        await waitFor(() => {
            expect(resultOperations.current.transactions.data[0]).toEqual({
                id: expect.any(Number),
                amount: expect.any(String),
                concept: expect.any(String),
                date: expect.any(String),
                type: expect.any(String),
                accountId: expect.any(Number),
                userId: expect.any(Number),
                to_account_id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
        })
    })

    test('should add a new charge', async () => {

        const charge = {
            type: "topup",
            amount: 500,
            concept: "Adedd from test side",
        }

        const { result, rerender } = renderHook(() => useOperationsStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const chargeBefore = result.current.balance.charges;
        const totalBefore = result.current.balance.total;

        const { StartAddNewCharge } = result.current;

        await act(async () => {
            await StartAddNewCharge(charge)
        });

        rerender();

        await waitFor(() => {
            expect(result.current.balance.charges).toBe(chargeBefore + charge.amount)
            expect(result.current.balance.total).toBe(totalBefore + charge.amount)
        })
    })
});
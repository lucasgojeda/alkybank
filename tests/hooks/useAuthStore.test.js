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

/** Api */
import walletApi from '../../src/api/walletApi';

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

describe('Testing on useAuthStore custom hook', () => {

    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    })

    test('should return the default values', () => {

        const mockStore = getMockStore(initialState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        expect(result.current).toEqual({
            id: null,
            email: '',
            first_name: '',
            last_name: '',
            roleId: null,
            points: null,
            checking: true,
            StartLogin: expect.any(Function),
            StartRegister: expect.any(Function),
            StartChecking: expect.any(Function),
            StartLogout: expect.any(Function)
        })
    });

    test('StartLogin must perform the login correctly', async () => {

        const user = {
            email: 'testjabb@test.com',
            password: '123456789'
        };

        const mockStore = getMockStore(unAuthenticatedState);

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

        const { id, email } = result.current;

        expect({ id, email }).toEqual({
            id: 586,
            email: 'testjabb@test.com'
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
    });

    test('startRegister should create a user', async () => {

        const authLogin = jest.fn();

        const newUser = {
            email: 'testjabb@test.com',
            password: '123456789',
            first_name: 'test'
        }

        const mockStore = getMockStore(unAuthenticatedState);

        const { result, rerender } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const spy = jest.spyOn(walletApi, 'post').mockReturnValue({
            data: {
                id: 586,
                first_name: "test",
                last_name: "test",
                email: "testjabb@test.com",
                password: "$2b$10$No1QxRx.WfFZMFqn8HmNsO5bAhpYEFiLZYJTSeRIC4KbAabvEbA22",
                roleId: 1,
                points: 14462
            },
            status: 201
        })

        const { StartRegister } = result.current;

        await act(async () => {
            await StartRegister(newUser)
        });

        rerender();

        const { id, email } = result.current;

        expect({ id, email }).toEqual({
            id: 586,
            email: 'testjabb@test.com'
        });

        spy.mockRestore();
    });

    test('startChecking should fail if there is no token', async () => {

        const mockStore = getMockStore(initialState);

        const { result, rerender } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { StartChecking } = result.current;

        await act(async () => {
            await StartChecking()
        });

        rerender();

        const { id, email, checking } = result.current;
        expect({ id, email, checking }).toEqual({
            checking: false,
            id: null,
            email: ""
        })
    });

    test('startChecking should authenticate the user if there is a token', async () => {

        const user = {
            email: 'testjabb@test.com',
            password: '123456789'
        };

        const mockStore = getMockStore(unAuthenticatedState);

        const { result, rerender } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { StartLogin, StartLogout, StartChecking } = result.current;

        await act(async () => {
            await StartLogin(user)
        }); 

        rerender();
        
        const token = localStorage.getItem('token');

        act(() => {
            StartLogout()
        }); 

        rerender(); 
        
        localStorage.setItem("token", token)
        
        await act(async () => {
            await StartChecking(user)
        }); 

        rerender();
        
        await waitFor(() => {
            expect(result.current.id).toEqual(expect.any(Number));
        })

        const { id, email } = result.current;

        expect({ id, email }).toEqual({
            id: 586,
            email: 'testjabb@test.com'
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
    });
});
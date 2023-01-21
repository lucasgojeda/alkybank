/** Libraries */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

/** Components */
import Home from '../../src/application/home/pages/Home';

/** Custom hooks */
import { useAuthStore, useOperationsStore } from '../../src/hooks';

/** Redux toolkit - Store */
import { DashboardRoute } from '../../src/router/DashboardRoute';
import { store } from '../../src/store';

/** Mock of custom hooks */
jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/hooks/useOperationsStore');

describe('Testing on <DashboardRoute />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("should show 'Footer' component correctly", async () => {

        const mockStartChecking = jest.fn();

        useAuthStore.mockReturnValue({
            checking: false,
            StartChecking: mockStartChecking
        });

        useOperationsStore.mockReturnValue({
            transactions: [],
            balance: { total: false }
        });

        await act(() => {
            render(
                <MemoryRouter initialEntries={['/home']}>
                    <DashboardRoute />
                </MemoryRouter>
            )
        })

        await waitFor(() => {
            expect(screen.queryByTestId(/footer/i)).toBeTruthy();
        })

    }, 10000);

    test("should show 'Navbar' component correctly", async () => {

        const mockStartChecking = jest.fn();

        useAuthStore.mockReturnValue({
            checking: false,
            StartChecking: mockStartChecking
        });

        useOperationsStore.mockReturnValue({
            transactions: [],
            balance: { total: false }
        });

        await act(() => {
            render(
                <MemoryRouter initialEntries={['/home']}>
                    <DashboardRoute />
                </MemoryRouter>
            )
        })

        await waitFor(() => {
            expect(screen.queryByTestId(/navbar/i)).toBeTruthy();
        })

    }, 10000);

    test("should show 'Home' component correctly", async () => {

        const mockStartChecking = jest.fn();

        useAuthStore.mockReturnValue({
            checking: false,
            StartChecking: mockStartChecking
        });

        useOperationsStore.mockReturnValue({
            transactions: [],
            balance: { total: false }
        });

        await act(() => {
            render(
                <MemoryRouter initialEntries={['/home']}>
                    <DashboardRoute />
                </MemoryRouter>
            )
        })

        await waitFor(() => {
            expect(screen.queryByTestId(/home-skeleton/i)).toBeTruthy();
        })

    }, 10000);

    test("should show 'Balance' component correctly", async () => {

        const mockStartChecking = jest.fn();

        useAuthStore.mockReturnValue({
            checking: false,
            StartChecking: mockStartChecking
        });

        useOperationsStore.mockReturnValue({
            transactions: [],
            balance: { total: null }
        });

        await act(() => {
            render(
                <MemoryRouter initialEntries={['/balance']}>
                    <DashboardRoute />
                </MemoryRouter>
            )
        })

        await waitFor(() => {
            expect(screen.queryByTestId(/balance-skeleton/i)).toBeTruthy();
        })

    }, 10000);

    test("should show 'Movements' component correctly", async () => {

        const mockStartChecking = jest.fn();

        useAuthStore.mockReturnValue({
            checking: false,
            StartChecking: mockStartChecking
        });

        useOperationsStore.mockReturnValue({
            transactions: [],
            balance: { total: null }
        });

        await act(() => {
            render(
                <MemoryRouter initialEntries={['/movements']}>
                    <DashboardRoute />
                </MemoryRouter>
            )
        })

        await waitFor(() => {
            expect(screen.queryByTestId(/movements-page/i)).toBeTruthy();
        })
    }, 10000);

    test("should show 'UsersPage' component correctly", async () => {

        const mockStartChecking = jest.fn();
        const mockStartGetUsers = jest.fn();

        useAuthStore.mockReturnValue({
            checking: false,
            StartChecking: mockStartChecking
        });

        useOperationsStore.mockReturnValue({
            transactions: [],
            balance: { total: null },
            StartGetUsers: mockStartGetUsers
        });

        await act(() => {
            render(
                <MemoryRouter initialEntries={['/users']}>
                    <DashboardRoute />
                </MemoryRouter>
            )
        })

        await waitFor(() => {
            expect(screen.queryByTestId(/users-table/i)).toBeTruthy();
        })
    }, 10000);

});
/** Libraries */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

/** Components */
import { AppRouter } from '../../src/router/AppRouter';
import { LoginPage } from '../../src/application/auth/pages';
import { Home } from '../../src/application/home/pages/Home';

/** Custom hooks */
import { useAuthStore, useOperationsStore } from '../../src/hooks';

/** Redux toolkit - Store */
import { store } from '../../src/store';

/** Mock of custom hooks */
jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/hooks/useOperationsStore');

/** Mock of components */
jest.mock('../../src/application/auth/pages/LoginPage', () => ({
    LoginPage: () => <h1 data-testid="loginPage">LoginPage</h1>
}))

jest.mock('../../src/application/auth/pages/RegisterPage', () => ({
    RegisterPage: () => <h1 data-testid="registerPage">RegisterPage</h1>
}))



describe('Testing on <AppRouter />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("should show the component 'LoginPage' if checking is 'false'", () => {

        const mockStartChecking = jest.fn();

        useAuthStore.mockReturnValue({
            checking: false,
            StartChecking: mockStartChecking
        });

        const { queryByTestId } = render(
            <MemoryRouter initialEntries={['/login']}>
                <AppRouter />
            </MemoryRouter>
        )

        expect(queryByTestId(/loginPage/i)).toBeTruthy();
    });

    test("shouldn't show the component 'LoginPage' if checking is 'true'", () => {

        const mockStartChecking = jest.fn();

        useAuthStore.mockReturnValue({
            checking: true,
            StartChecking: mockStartChecking
        });

        const { queryByTestId } = render(
            <MemoryRouter initialEntries={['/login']}>
                <AppRouter />
            </MemoryRouter>
        )

        expect(queryByTestId(/loginPage/i)).toBeNull();
    });

    test("should show the component 'RegisterPage' if checking is 'false'", () => {

        const mockStartChecking = jest.fn();

        useAuthStore.mockReturnValue({
            checking: false,
            StartChecking: mockStartChecking
        });

        const { queryByTestId } = render(
            <MemoryRouter initialEntries={['/register']}>
                <AppRouter />
            </MemoryRouter>
        )

        expect(queryByTestId(/registerPage/i)).toBeTruthy();
    });

    test("shouldn't show the component 'RegisterPage' if checking is 'true'", () => {

        const mockStartChecking = jest.fn();

        useAuthStore.mockReturnValue({
            checking: true,
            StartChecking: mockStartChecking
        });

        const { queryByTestId } = render(
            <MemoryRouter initialEntries={['/register']}>
                <AppRouter />
            </MemoryRouter>
        )

        expect(queryByTestId(/registerPage/i)).toBeNull();
    });
});
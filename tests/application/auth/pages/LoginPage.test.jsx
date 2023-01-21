/** Libraries */
import { act, fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

/** Components */
import { LoginPage } from "../../../../src/application/auth/pages";

/** Custom hooks */
import { useAuthStore } from '../../../../src/hooks';

/** Redux toolkit - Store */
import { store } from '../../../../src/store';

jest.mock('../../../../src/hooks/useAuthStore');

const mockStartLogin = jest.fn();
useAuthStore.mockReturnValue({
    StartLogin: mockStartLogin,
})

describe('Testing on <LoginPage />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should show the componenet correctly', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });


    test("submit shouldn't call StartLogin if there are no arguments", async () => {

        const email = '';
        const password = '';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole('textbox', {
            name: 'Email'
        });

        await act(() => {
            fireEvent.change(emailField, { target: { name: 'email', value: email } });
        });

        const passwordField = screen.getByLabelText('Password');

        await act(() => {
            fireEvent.change(passwordField, { target: { name: 'password', value: password } });
        });

        const loginButton = screen.getByRole('button', {
            name: 'Login'
        });

        await act(() => {
            fireEvent.click(loginButton);
        });

        expect(mockStartLogin).not.toHaveBeenCalled();
    });

    test('submit should call StartLogin with the arguments', async () => {

        const email = 'ojedalucasgabriel2@gmail.com';
        const password = '654321';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole('textbox', {
            name: 'Email'
        });

        await act(() => {
            fireEvent.change(emailField, { target: { name: 'email', value: email } });
        });

        const passwordField = screen.getByLabelText('Password');

        await act(() => {
            fireEvent.change(passwordField, { target: { name: 'password', value: password } });
        });

        const loginButton = screen.getByRole('button', {
            name: 'Login'
        });

        await act(() => {
            fireEvent.click(loginButton);
        });

        expect(mockStartLogin).toHaveBeenCalledWith({email, password});
    });

});
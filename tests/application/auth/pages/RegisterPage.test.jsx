/** Libraries */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

/** Components */
import { RegisterPage } from "../../../../src/application/auth/pages";

/** Custom hooks */
import { useAuthStore } from '../../../../src/hooks';

/** Redux toolkit - Store */
import { store } from '../../../../src/store';

jest.mock('../../../../src/hooks/useAuthStore');

const mockStartRegister = jest.fn();
useAuthStore.mockReturnValue({
    StartRegister: mockStartRegister,
})

describe('Testing on <RegisterPage />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should show the componenet correctly', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByText('Sign in').length).toBeGreaterThanOrEqual(1);
    });

    test("submit shouldn't call StartRegister if there are no arguments", async () => {

        const firstName = '';
        const lastName = '';
        const email = '';
        const password = '';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>
        )

        /** First Name */
        const nameField = screen.getByRole('textbox', {
            name: 'Name'
        });

        await act(() => {
            fireEvent.change(nameField, { target: { name: 'firstName', value: firstName } });
        });

        /** Last Name */
        const lastNameField = screen.getByRole('textbox', {
            name: 'Last name'
        });

        await act(() => {
            fireEvent.change(lastNameField, { target: { name: 'lastName', value: lastName } });
        });

        /** Email */
        const emailField = screen.getByRole('textbox', {
            name: 'Email'
        });

        await act(() => {
            fireEvent.change(emailField, { target: { name: 'email', value: email } });
        });

        /** Password */
        const passwordField = screen.getByLabelText('Password');

        await act(() => {
            fireEvent.change(passwordField, { target: { name: 'password', value: password } });
        });

        const registerButton = screen.getByRole('button', {
            name: 'Sign in'
        });

        await act(() => {
            fireEvent.click(registerButton);
        });

        expect(mockStartRegister).not.toHaveBeenCalled();
    }, 10000);

    test('submit should call StartRegister with the arguments', async () => {

        const firstName = 'Lucas';
        const lastName = 'Ojeda';
        const email = 'ojedalucasgabriel2@gmail.com';
        const password = '654321';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>
        )

        /** First Name */
        const nameField = screen.getByRole('textbox', {
            name: 'Name'
        });

        await act(() => {
            fireEvent.change(nameField, { target: { name: 'firstName', value: firstName } });
        });

        /** Last Name */
        const lastNameField = screen.getByRole('textbox', {
            name: 'Last name'
        });

        await act(() => {
            fireEvent.change(lastNameField, { target: { name: 'lastName', value: lastName } });
        });

        /** Email */
        const emailField = screen.getByRole('textbox', {
            name: 'Email'
        });

        await act(() => {
            fireEvent.change(emailField, { target: { name: 'email', value: email } });
        });

        /** Password */
        const passwordField = screen.getByLabelText('Password');

        await act(() => {
            fireEvent.change(passwordField, { target: { name: 'password', value: password } });
        });

        const registerButton = screen.getByRole('button', {
            name: 'Sign in'
        });

        await act(() => {
            fireEvent.click(registerButton);
        });

        expect(mockStartRegister).toHaveBeenCalledWith({
            firstName,
            lastName,
            email,
            password
        });
    }, 10000);
});
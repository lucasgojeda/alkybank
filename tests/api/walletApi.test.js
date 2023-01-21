/** Api */
import walletApi from "../../src/api/walletApi";

describe('Testing on walletApi', () => {

    test('should have default settings', () => {

        expect(walletApi.defaults.baseURL).toBe(process.env.VITE_REACT_APP_API_URL)
    });

    test('must have the "x-token" in the header of all requests', async () => {

        const user = {
            correo: 'test1@test.com',
            password: '123456'
        }

        const token = 'ABC-123-XYZ';

        localStorage.setItem('token', token);

        try {

            const { config: { headers } } = await walletApi.post('auth/login', user);

            expect(headers["Authorization"]).toBe(`Bearer ${token}`);

        } catch (error) {

            const { config: { headers } } = error;

            expect(headers["Authorization"]).toBe(`Bearer ${token}`);
        }


    }, 10000);
}); 
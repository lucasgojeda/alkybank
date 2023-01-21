/** Redux toolkit - Slices */
import {
  authCheckingFinish,
  authLogin,
  authLogout,
  authSlice
} from "../../../src/store/slices/authSlice";

/** Fixtures */
import {
  demoUser,
  initialState,
  unAuthenticatedState
} from "../../fixtures/authStates";



describe('Testing on authSlice', () => {

  let state;

  beforeEach(() => {
    state = authSlice.getInitialState();
  });

  test('should be called "auth"', () => {

    expect(authSlice.name).toBe('auth');
  });

  test('should return the initial state', () => {

    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('should login the user', () => {

    state = authSlice.reducer(state, authLogin(demoUser));

    expect(state).toEqual({
      checking: false,
      ...demoUser
    });

    expect(state).toMatchObject({
      id: expect.any(String),
      email: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      roleId: expect.any(String),
      points: expect.any(String),
      checking: expect.any(Boolean),
      transactions: expect.any(Array),
    })
  });

  test('must mark the check as completed', () => {

    state = authSlice.reducer(state, authCheckingFinish());

    expect(state).toEqual({
      checking: false,
      id: null,
      email: "",
      first_name: "",
      last_name: "",
      roleId: null,
      points: null,
      transactions: [],
    });
  });

  test('should logout the user', () => {

    state = authSlice.reducer(state, authLogout());

    expect(state).toEqual(unAuthenticatedState);

    expect(state).toMatchObject({
      id: null,
      email: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      roleId: null,
      points: null,
      checking: expect.any(Boolean),
      transactions: expect.any(Array),
    })
  });
});
/** Libraries */
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

/** Api */
import walletApi from "../api/walletApi";

/** Slices - Store */
import {
  authCheckingFinish,
  authLogin,
  authLogout,
} from "../store/slices/authSlice";

/** Custom hooks */
import { useOperationsStore } from "./useOperationsStore";

/** Helpers */
import { getEnvironmets } from '../helpers/getEnvironmets';

const { NODE_ENV } = getEnvironmets();

/**
 * On this useHook you can put http requests and once you get
 * data you want then you can put that data on the store of the app.
 */
export const useAuthStore = () => {
  const { StartGetTransactions } = useOperationsStore();

  const dispatch = useDispatch();
  const { id, email, first_name, last_name, roleId, points, checking } =
    useSelector((state) => state.auth);

  /**
   * This function is used to log the user into the application
   * using their credentials.
   */
  const StartLogin = async (data) => {
    try {
      /**
       * We send the credentials to the API which give us an accessToken.
       */
      const {
        data: { accessToken },
      } = await walletApi.post("/auth/login", data);

      /**
       * Once we have the accesToken then we get the user data fron
       * the API.
       */
      if (accessToken) {
        localStorage.setItem("token", accessToken);

        StartChecking();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al iniciar sesión",
        text: error?.response?.data?.error,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  /**
   * This function is used to register the user into the application
   * creating credentials.
   */
  const StartRegister = async (data) => {
    /**
     * First we create an account
     */
    try {
      const newData = await walletApi.post("/users", {
        ...data,
        roleId: 2,
        points: 10000,
      });

      /**
       * If the account has succeffully created then we login the user,
       * this step is important because the endpoint to create an account
       * doesn't send a token to keep the session open as the login endpoint does.
       */
      if (newData.status === 201) {
        StartLogin(data);

        // TODO: revisar esto.
        dispatch(authLogin(newData.data));
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al iniciar sesión",
        text: error.response.data.error,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  /**
   * This function is used to refresh the user session using an access token.
   */
  const StartChecking = async () => {
    /**
     * If the token doesn't exist on localStorage
     * we don't continue with the function.
     */
    if (!localStorage.getItem("token")) return dispatch(authCheckingFinish());

    try {
      /**
       * We get the data from the API.
       */
      const newData = await walletApi.get("/auth/me");

      if (newData.status === 200) {
        /**
         * Send the user data to the store
         */
        dispatch(authLogin(newData.data));

        if (NODE_ENV !== 'test') {
          StartGetTransactions();
        }
      }
      dispatch(authCheckingFinish());
    } catch (error) {
      dispatch(authCheckingFinish());
      console.log(error);
    }
  };

  /**
   * This function is used to logout the user cleaning his credentials from
   * store and his token from localStorage.
   */
  const StartLogout = () => {
    dispatch(authLogout());
  };

  return {
    /**
     * Values of authSlice
     */
    id,
    email,
    first_name,
    last_name,
    roleId,
    points,
    checking,

    /**
     * Functions AUTH
     */
    StartLogin,
    StartRegister,
    StartChecking,
    StartLogout,
  };
};

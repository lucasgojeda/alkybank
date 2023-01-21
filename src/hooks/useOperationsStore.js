/** Libraries */
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

import { useMediaQuery, useTheme } from "@mui/material";

/** Api */
import walletApi from "../api/walletApi";

/** Slices - Store */
import {
  loadTransactions,
  loadUsers,
  addExpenses,
  addCharges,
  addTotal,
} from "../store/slices/operationsSlice";

/** Utils */
import { colors } from "../utils/colors";

/**
 * On this useHook you can put http requests and once you get
 * data you want then you can put that data on the store of the app.
 */
export const useOperationsStore = () => {
  const dispatch = useDispatch();

  /**
   * We will fetch the statuses of each of the data we will
   * need in order to be able to send and update the balance sheet.
   */
  const { id } = useSelector((state) => state.auth);
  const { users, transactions, balance } = useSelector(
    (state) => state.operations
  );

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  /**
   * In this function we fetch the data of all the user's transfers
   * from the API.
   * Then with the data of the uploads and downloads of money we will
   * assign them to their corresponding global states, dispatching each
   * of the necessary actions.
   */
  const StartGetTransactions = async () => {
    try {
      /**
       * First we make the request to the API.
       */
      const { data, status } = await walletApi.get("/transactions");

      /**
       * If the response return a status 200, then we put the data
       * into the store.
       */
      if (status === 200) {
        const res = data.data.map((e) => ({ amount: e.amount, type: e.type }));

        /**
         * We filter and calculate charges, expenses and total.
         */
        const charges = res
          .filter((e) => e.type === "topup")
          .map((e) => Number(e.amount))
          .reduce((a, b) => a + b, 0);
        const expenses = res
          .filter((e) => e.type === "payment")
          .map((e) => Number(e.amount))
          .reduce((a, b) => a + b, 0);

        /**
         * We put in store the charges, expenses and total, all of that
         * into the balance.
         */
        dispatch(addTotal(charges - expenses));
        dispatch(addExpenses(expenses));
        dispatch(addCharges(charges));

        /**
         * We put in store the transactions.
         */
        dispatch(loadTransactions(data));
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al cargar transacciones.",
        text: error?.response?.data?.error,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  /**
   * This function create a new charge or expense.
   */
  const StartAddNewCharge = async (data) => {
    const { concept, type, amount } = data;

    /**
     * If the id of user who's gonna create the expense or charge
     * doesn't exist then the function stop right here.
     * But this shouldn't happen because to a user can use
     * this function he need to be logged first.
     */
    if (!id) return console.log("No hay userId, debe de logearse primero");

    try {
      /**
       * This is the data to be sended to the API.
       */
      const cleanData = {
        accountId: 132,
        amount: amount,
        concept: concept,
        date: new Date(),
        to_account_id: 2,
        type: type,
        userId: id,
      };

      /**
       * We make the request to the API.
       */
      const { data, status } = await walletApi.post("/transactions", cleanData);

      /**
       * If the response return a status 201 then we proceed to put the data
       * into the store.
       */
      if (status === 201) {
        /**
         * In case it's a expense.
         */
        if (data.type === "payment") {
          dispatch(addTotal(balance.total - Number(data.amount)));
          dispatch(addExpenses(balance.expenses + Number(data.amount)));
        }

        /**
         * In case it's a payment.
         */
        if (data.type === "topup") {
          dispatch(addTotal(balance.total + Number(data.amount)));
          dispatch(addCharges(balance.charges + Number(data.amount)));
        }

        Swal.fire({
          position: "center",
          icon: "success",
          background:
            "linear-gradient(10deg, #171fb36f, #1976d2b7, #1976d2, #0479ee)",
          iconColor: colors.white1,
          color: colors.white1,
          width: sm ? "80%" : "50%",
          text: `Carga de ${
            type === "topup" ? "saldo" : "gasto"
          } realizada con exito!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        width: sm ? "80%" : "50%",
        background:
          "linear-gradient(10deg, #171fb36f, #1976d2b7, #1976d2, #0479ee)",
        iconColor: colors.white1,
        color: colors.white1,
        text: `No sde pudo realizar la carga de ${
          type === "topup" ? "saldo" : "gasto"
        }`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  /**
   * With this funcion we delete a deposit
   */
  const StartDeleteDeposit = async () => {
    try {
      const deposit = await walletApi.delete(`/transactions/${286}`);

      console.log(deposit);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * This function get the users from the API.
   * This users will be used by the user to send them money.
   */
  const StartGetUsers = async (page = 1) => {
    try {
      /**
       * First we make the request to the API.
       */
      const { data, status } = await walletApi.get(`/users/?page=${page}`);

      /**
       * If the response return a status 200 then we proceed to put the data
       * into the store.
       */
      if (status === 200) {
        dispatch(loadUsers(data));
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Role administrador requerido",
        text: error.response.data.error,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  /**
   * This function send money to another user.
   */
  const StartSendMoney = async (transaction, id) => {
    try {
      /**
       * We send the request with the data of the transaction to
       * the API.
       */
      const { status } = await walletApi.post(`/accounts/${id}`, transaction);

      /**
       * If the response return a status 200 then
       * we proceed to throw a success alert.
       */
      if (status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Envio de dinero exitoso!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al enviar dinero",
        text: error.response.data.error,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  /**
   * We return the states and the functions so that they can be used
   * from any component that needs to evaluate, display or edit these states.
   * As well as those who wish to send a transfer or update the balance.
   */
  return {
    /**
     * States of authOperations
     */
    users,
    transactions,
    balance,

    /**
     * Functions of Operations
     */
    StartGetUsers,
    StartSendMoney,
    StartGetTransactions,
    StartAddNewCharge,
    StartDeleteDeposit,
  };
};

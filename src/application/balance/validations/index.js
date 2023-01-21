import * as yup from "yup";

const schemaAmount = yup
  .string()
  .required("Este campo es requerido")
  .matches(/^\d+$/, "El valor no es un número")
  .min(2, "Debe ser mínimo 2 dígitos")
  .max(6, "No debe superar 6 dígitos");

const schemaConcept = yup
  .string()
  .required("Este campo es requerido")
  .matches(/^[aA-zZ]+$/, "Debe contener sólo letras")
  .min(5, "Debe ser mínimo 5 dígitos")
  .max(10, "No debe superar 10 dígitos");

const schemaCurrency = yup.string().required("Este campo es requerido");
const schemaForm = yup.object().shape({
  amount: schemaAmount,
  concept: schemaConcept,
  currency: schemaCurrency,
});

export const validationConcept = async (value, error) => {
  await schemaConcept
    .validate(value)
    .then(() => {
      error(false);
    })
    .catch((err) => {
      error(err.errors[0]);
    });
};
export const validationCurrency = async (value, error) => {
  await schemaCurrency
    .validate(value)
    .then(() => {
      error(false);
    })
    .catch((err) => {
      error(err.errors[0]);
    });
};
export const validationAmount = async (value, error) => {
  await schemaAmount
    .validate(value)
    .then(() => {
      error(false);
    })
    .catch((err) => {
      error(err.errors[0]);
    });
};

export const validation = async (formValues, state) => {
  await schemaForm
    .validate(formValues)
    .then(() => {
      state(true);
    })
    .catch((err) => {
      state(false);
    });
};

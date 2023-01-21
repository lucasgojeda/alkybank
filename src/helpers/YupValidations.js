/** Libraries */
import * as Yup from 'yup';

export const YupRegisterValidations = Yup.object({
  firstName: Yup.string()
    .max(15, 'Debe tener 15 caracteres o menos')
    .required('El campo es requerido'),
  lastName: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .required('El campo es requerido'),
  email: Yup.string()
    .email('Email inválido asegurate de colocar "@"')
    .required('El campo es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('El campo es requerido'),
});

export const YupLoginValidations = Yup.object({
  email: Yup.string()
    .email('Email inválido asegurate de colocar "@"')
    .required('El campo es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('El campo es requerido'),
});

export const YupSendMoneyValidations = Yup.object({
  amount: Yup.number()
    .min(1, 'El monto debe ser mayor a 0')
    .required('El campo es requerido'),
  context: Yup.string()
    .min(10, 'Debe tener un minimo de 10 caracteres')
    .max(25, 'Debe tener un máximo de 25 caracteres')
    .required('El campo es requerido'),
});

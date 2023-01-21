/** Libraries */
import { Link as LinkRouter } from 'react-router-dom';

import { useFormik } from 'formik';
import { Box, Button, Grid, Link, TextField } from '@mui/material';

/** Components */
import Title from '../../utils/Title';

/** Custom hooks */
import { useAuthStore } from '../../../hooks';

/** Helpers */
import { YupRegisterValidations } from '../../../helpers';

export const RegisterPage = () => {
  const { StartRegister } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },

    validationSchema: YupRegisterValidations,
    onSubmit: async (values, { resetForm }) => {
      StartRegister(values);
      resetForm();
    },
  });
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
      }}
    >
      <Box
        width="90%"
        height="70%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          width="100%"
          maxHeight="30vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            '& img': {
              maxWidth: '30ch',
              objectFit: 'cover',
              objectPosition: '20% 10%',
              borderRadius: '50%',
            },
            mb: 2,
          }}
        >
          <img
            src="https://res.cloudinary.com/the-kings-company/image/upload/v1663785540/dashboard-ecommerce-app/assets/3515462_rw5fkz.jpg"
            alt=""
          />
        </Box>

        <Box
          component="form"
          sx={{ mt: 3, width: '60%' }}
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last name"
                name="lastName"
                autoComplete="family-name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#2AE3C8',
              ':hover': {
                backgroundColor: '#00DFC0',
              },
            }}
          >
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link as={LinkRouter} to="/login" variant="body2">
                <Title
                  variant="h4"
                  color="#1976D2"
                  text="Do you already have an account?"
                />
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

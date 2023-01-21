/** Libraries */
import React from 'react'

import { Box } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/** Components */
import Footer from './Footer'
import { Navbar } from './Navbar'
import { NavbarMovil } from './NavbarMovil'

export const LayoutPage = ({ children }) => {
	const theme = useTheme()
	const sm = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<Box bgcolor="#fff">
			{!sm ? <Navbar /> : <></>}

			<div>{children}</div>

			{!sm ? <Footer /> : <NavbarMovil />}
		</Box>
	)
}

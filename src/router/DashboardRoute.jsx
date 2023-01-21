/** Libraries */
import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

/** Utils */
import { Loader } from '../application/utils/Loader'
import { LayoutPage } from '../application/utils/LayoutPage'

/** Components */
const Home = lazy(() => import('../application/home/pages/Home'))
const Balance = lazy(() => import('../application/balance/pages/Balance'))
const Movements = lazy(() => import('../application/movements/pages/Movements'))
const UsersPage = lazy(() => import('../application/users/pages/UsersPage'))

export const DashboardRoute = () => {

	return (
		<LayoutPage>
			<Routes>
				<Route
					path="/home"
					element={
						<React.Suspense
							fallback={
								<Loader />
							}
						>
							<Home />
						</React.Suspense>
					}
				/>
				<Route
					path="/balance"
					element={
						<React.Suspense
							fallback={
								<Loader />
							}
						>
							<Balance />
						</React.Suspense>
					}
				/>
				<Route
					path="/movements"
					element={
						<React.Suspense
							fallback={
								<Loader />
							}
						>
							<Movements />
						</React.Suspense>
					}
				/>

				<Route
					path="/users"
					element={
						<React.Suspense
							fallback={
								<Loader />
							}
						>
							<UsersPage />
						</React.Suspense>
					}
				/>
			</Routes>
		</LayoutPage>
	)
}

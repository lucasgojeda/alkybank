/** Libraries */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

/** Routes */
import { AppRouter } from './router/AppRouter'

/** Store */
import { store } from './store'

/** Styles */
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)

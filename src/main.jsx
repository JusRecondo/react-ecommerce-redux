import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import './styles/index.scss'

createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter basename='/react-ecommerce-redux/'>
        <App />
      </BrowserRouter>
    </Provider>
  </PersistGate>
)

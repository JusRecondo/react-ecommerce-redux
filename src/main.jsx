import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import App from './App.jsx'
import './styles/index.scss'

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </PersistGate>
)

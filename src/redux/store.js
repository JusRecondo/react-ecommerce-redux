import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import cartSlice from './features/cartSlice'
import storageSession from 'redux-persist/lib/storage/session'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user', 'cart']
}

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ]
      }
    })
})

export default store

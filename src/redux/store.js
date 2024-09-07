import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
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
  whitelist: ['user']
}

const rootReducer = combineReducers({
  user: userSlice
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

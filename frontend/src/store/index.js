import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './auth/authSlice';
import empresaReducer from './empresa/empresaSlice';
import localReducer from './local/localSlice';

/**
 * Configuração de persistência apenas para auth
 * Garante que dados de autenticação sejam mantidos entre sessões
 */
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['usuario', 'token'],
};

/**
 * Combina todos os reducers da aplicação
 * Aplica persistência apenas ao reducer de auth
 */
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  empresa: empresaReducer,
  local: localReducer,
});

/**
 * Configura a store Redux com middleware adequado para persistência
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
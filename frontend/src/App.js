import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { store, persistor } from './store';
import RotaProtegida from './components/common/RotaProtegida';
import theme from './styles/theme/theme';
import './styles/utils/fontImports';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() => import('./pages/Login'));
const Cadastro = lazy(() => import('./pages/Cadastro'));
const Empresas = lazy(() => import('./pages/Empresas'));
const Locais = lazy(() => import('./pages/Locais'));

const LoadingComponent = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: theme.palette.background.default
    }}
  >
    <CircularProgress color="primary" size={60} thickness={4} />
  </Box>
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Router>
            <Suspense fallback={<LoadingComponent />}>
              <Routes>
                {/* Rotas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                {/* Rotas protegidas */}
                <Route
                  path="/empresas"
                  element={
                    <RotaProtegida>
                      <Empresas />
                    </RotaProtegida>
                  }
                />
                <Route
                  path="/empresas/:id/locais"
                  element={
                    <RotaProtegida>
                      <Locais />
                    </RotaProtegida>
                  }
                />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
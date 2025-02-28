import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useContext } from 'react';
import { AuthContext } from './context/authProvider';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';

const routes = [
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    path: '/app', element: <ProtectedRoute />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  },
]
function App() {

  const { token } = useContext(AuthContext);

  return (
    <>
      <div className='dark'>
        <Routes>
          {routes.map((route, index) =>
            <Route key={index} path={route.path} element={route.element}>
              {route.children && route.children.map((route, index) => {
                return <Route key={index} path={route.path} element={route.element}></Route>
              })}
            </Route>
          )}
          <Route path='*' element={<Navigate to={token ? '/app/home' : '/login'} />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App

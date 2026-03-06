import {  Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost'; // ez lesz a feed + posztolás
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Routes>

            <Route
              path="/"
              element={
                <div className="flex-1 flex items-center justify-center px-4">
                  <div className="max-w-md w-full text-center space-y-8">
                    <h1 className="text-5xl font-bold text-gray-900">
                      Üdvözöl a WebBlog!
                    </h1>
                    <p className="text-xl text-gray-600 mt-4">
                      Oszd meg gondolataidat, olvass posztokat, likeolj és kommentelj.
                    </p>

                    <div className="mt-10 space-y-4">
                      <Link
                        to="/register"
                        className="block w-full py-4 px-6 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                      >
                        Regisztráció
                      </Link>

                      <Link
                        to="/login"
                        className="block w-full py-4 px-6 bg-white text-indigo-600 text-lg font-semibold rounded-lg shadow-md border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                      >
                        Bejelentkezés
                      </Link>
                    </div>

                    <p className="text-sm text-gray-500 mt-8">
                      Már van fiókod? Csak kattints a Bejelentkezés gombra!
                    </p>
                  </div>
                </div>
              }
            />

            
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            
            <Route element={<PrivateRoute />}>
              <Route path="/feed" element={<CreatePost />} /> 
              
            </Route>

            
            <Route
              path="*"
              element={
                <div className="p-10 text-3xl text-center">
                  404 - Az oldal nem található
                </div>
              }
            />
          </Routes>
        </div>
      
    </AuthProvider>
  );
}

export default App;
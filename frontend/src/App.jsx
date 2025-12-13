import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './componets/ProtectedRoute'
import Home from './pages/Home'
import { Toaster } from "react-hot-toast";
import MyProfile from './pages/MyProfile'
function App() {

  return (
    <>
     <Toaster position="top-right" />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
<Route path='/profile' element={<MyProfile/>}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App

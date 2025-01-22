import { Route, Routes } from 'react-router'
import Login from '../pages/Auth/Login/indeex'
import Register from '../pages/Auth/Register'

const Router = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    )
}

export default Router

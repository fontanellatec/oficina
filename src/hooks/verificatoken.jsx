import usuarios from '../services/login_service/index'
import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function PublicRoutes() {
    let props = false
    if(isAuthenticated() != null ){return props = true}
    return props ? <Navigate to="/" /> : <Outlet />
}

export const ProtectedRoutes = () => {
    const [returnValue, setReturnValue] = useState();
    validToken(isAuthenticated()).then(isLoggedIn => {
        setReturnValue(isLoggedIn)
    });

    return returnValue ? <Outlet/> : <Navigate to="/login" />
}

export function isAuthenticated() {
    return localStorage.getItem('TOKEN_KEY')
}

export async function validToken(token) {
    let response =  await usuarios.postToken(token)
    if (response == false) {
        localStorage.removeItem('TOKEN_KEY');
    }
    return response
};



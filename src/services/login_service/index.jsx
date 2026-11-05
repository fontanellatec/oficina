import api from '../api'
import { trackPromise } from 'react-promise-tracker';

const asyncLocalStorage = {
    setStorage: async function (key, value) {
        await null;
        return localStorage.setItem(key, value);
    },

    getStorage: async function (key) {
        await null;
        return localStorage.getItem(key);
    }
};

const verifySet = (token) => {
    token = token.data.token
    if (typeof token !== 'string') {
        return null
    }
    asyncLocalStorage.setStorage("TOKEN_KEY", token)
    return token
}

const usuarios = {
    postUsuario: async (dataUsuario) => {
        let response = await api.post('/login', dataUsuario, { headers: { 'Content-Type': 'text/plain'}});
        verifySet(response.data)
        return response.data;
    }
}


export default usuarios;
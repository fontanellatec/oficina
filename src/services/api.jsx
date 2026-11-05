import axios from 'axios';

let host = 0
let protocol = 0
let hostDestino = ''

if (window.location.host == 'erp.fontanellatransportes.com.br' ){ host = 1 }
if (window.location.host == '177.153.18.28' ){ host = 1 }
// if (window.location.host == 'fontanella1.sevenkeys.cloud'){host = 2}
if (window.location.protocol == 'https:' ){ protocol = 1 }

if (host==1) {
    hostDestino='//erp.fontanellatransportes.com.br'
} else {
    hostDestino='//192.168.0.12'
}

// if (host==2) {
//     hostDestino='//fontanella1.sevenkeys.cloud'
// } else {
//     hostDestino='//192.168.0.12'
// }

if (protocol==1) {
    hostDestino='https:' + hostDestino +':443'
} else {
    hostDestino='http:' + hostDestino + ':80'
}

export const passHost = () => {
    let passHostAll = hostDestino + '/app'
    return passHostAll 
}

const api = axios.create({  
    baseURL: hostDestino + '/api/?/app/oficina',   
});

api.interceptors.request.use(request => {
    const headers = request.headers ?? {} 
    let getToken = localStorage.getItem("TOKEN_KEY")

    if (getToken) {      
        headers['Authorization'] = `${getToken}`
    }

    request.headers = headers
    return request
});

api.interceptors.response.use(
    (response) => {
        if(response.data.data.valid == false){
            localStorage.removeItem('TOKEN_KEY')
            localStorage.removeItem('data1')
            localStorage.removeItem('data2')

            window.location.href = hostDestino + '/app/oficina/login'
        }
        return response;
    }
);

export default api;
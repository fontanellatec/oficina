import api from '../api'
import { trackPromise } from 'react-promise-tracker';

const mecanicos = {   
    postMecanicosHorarios: async (dataSubmit) => { 
        let response = await trackPromise(api.post('/mecanico/horarios',dataSubmit));
        return response;
    },

    postMecanico: async (dataSubmit) => {
        let response = await trackPromise(api.post('/mecanico/confirm', dataSubmit))
       
        return response;
    },

    postSearchMecanico: async (dataSubmit) => {
        let response = await trackPromise(api.post('/mecanico/semordemservico', dataSubmit))
        return response;
    },

    getSetores: async () => {
        let response = await trackPromise(api.get('/mecanico/setor'));
        return response;
    },
}
export default mecanicos;
import api from '../api'
import { trackPromise } from 'react-promise-tracker';

const ordensServico = {    
    postOrdemServico: async (dataSubmit) => {
        let response = await trackPromise(api.post('/ordemservico/valid', dataSubmit))
        return response;
    },

    postConcluirOS: async (dataSubmit) => { 
        let response = await trackPromise(api.post('/ordemservico/concluir',dataSubmit));
        return response;
    }
}
export default ordensServico;
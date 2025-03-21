import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/paciente/cadastro'
});

export default api;
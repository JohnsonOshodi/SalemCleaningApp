import axios from 'axios';

const api = axios.create({
    baseURL: 'https://your-backend-url.com/api',
});

export const getServices = async () => {
    try {
        const response = await api.get('/services');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch services:', error);
    }
};

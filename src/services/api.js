import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const createOrder = (planId) => API.post('/payments/create-order', { planId });
export const processBogusPayment = (data) => API.post('/payments/process-bogus', data);
export const verifyPayment = (verificationData) => API.post('/payments/verify', verificationData);
export const getPaymentHistory = () => API.get('/payments/history');
import { getOrCreateDeviceId } from '@/utils/device';
import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiClient: AxiosInstance = axios.create({
    baseURL: `${API_URL}/api/v1`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use(
    config => {
        //  const deviceId = getOrCreateDeviceId();
        const deviceId = '123';

        // const token = localStorage.getItem('accessToken');
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTRhNzE5ZGQwZGMyZjUzZjUyNmY5NTMiLCJpYXQiOjE3NjczMjgwNTksImV4cCI6MTc2NzQxNDQ1OX0.cus1I88xwKT8KSWOghBndWaMJBMtEMAr_gR9un07d4k';

            
        // Always add deviceId to all requests
        config.headers['x-device-id'] = deviceId;

        // Add token if available (skip for login/register endpoints)
        if (
            token &&
            !config.url?.includes('/auth/login') &&
            !config.url?.includes('/auth/register')
        ) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

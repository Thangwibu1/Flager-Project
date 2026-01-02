import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { RegisterRequest } from '../types';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: RegisterRequest) => authService.register(data),

        onSuccess: () => {
            navigate('/login');
        },
    });
};

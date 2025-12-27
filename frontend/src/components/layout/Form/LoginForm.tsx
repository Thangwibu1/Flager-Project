import React, { useState } from 'react';
import { FormGroup } from './FormGroup';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { Lock, Mail } from 'lucide-react';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useLogin } from '@/features/auth/hooks';

export const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Use the login hook
    const { login, isLoading, isError, error } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Call login mutation
        login(formData);
    };

    return (
        <div className="w-full bg-background-dark">
            <div className="p-2">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Welcome back
                    </h1>
                    <p className="text-gray-500 dark:text-text-muted">
                        Enter your details to access your account.
                    </p>
                </div>

                <FormGroup onSubmit={handleSubmit}>
                    {/* Error Message */}
                    {isError && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-sm text-red-500">
                                {error?.response?.data?.message ||
                                    'Login failed. Please try again.'}
                            </p>
                        </div>
                    )}

                    {/* Email Input */}
                    <Input
                        id="email"
                        type="text"
                        label="Username or Email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={e =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        leftIcon={<Mail className="w-5 h-5" />}
                        disabled={isLoading}
                    />

                    {/* Password Input */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-white">
                                Password
                            </label>
                            <a
                                href="#"
                                className="text-sm font-medium text-[#ec1313] hover:text-red-500 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            leftIcon={<Lock className="w-5 h-5" />}
                            showPasswordToggle
                            disabled={isLoading}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 flex items-center justify-center rounded-lg bg-[#ec1313] text-white text-sm font-bold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:ring-offset-2 focus:ring-offset-[#181111] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Logging in...
                            </>
                        ) : (
                            'Log In'
                        )}
                    </button>
                </FormGroup>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300 dark:border-border-dark"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background-light dark:bg-background-dark px-2 text-gray-500 dark:text-text-muted">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="secondary" disabled={isLoading}>
                        <FcGoogle className="w-5 h-5 mr-2" />
                        Google
                    </Button>
                    <Button variant="secondary" disabled={isLoading}>
                        <FaApple className="w-5 h-5 mr-2" />
                        Apple
                    </Button>
                </div>
            </div>
        </div>
    );
};

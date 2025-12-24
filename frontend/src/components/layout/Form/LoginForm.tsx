import React, { useState } from 'react';
import { FormGroup } from './FormGroup';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { Lock, Mail } from 'lucide-react';

export const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', formData);
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
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full h-12 flex items-center justify-center rounded-lg bg-[#ec1313] text-white text-sm font-bold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:ring-offset-2 focus:ring-offset-[#181111] transition-colors"
                    >
                        Log In
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
                    <Button variant="secondary">
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </Button>
                    <Button variant="secondary">
                        <svg
                            className="h-5 w-5 mr-2 fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path d="M13.135 6.056c-.19.98-1.07 1.84-1.97 1.88-.34-1.09.43-2.19 1.97-2.38.07.28.09.44 0 .5zm-4.3 12.02c1.78 0 2.37-1.18 4.23-1.18 1.8 0 2.19 1.14 4.24 1.14 1.47 0 2.76-2.04 3.52-4.43-.2-.53-.47-1.03-.76-1.5-1.87.53-3.64-1.61-2.92-4.22 1.37-.53 2.15-1.97 2.27-2.22-1.78-2.19-4.89-2.22-5.78-.66-.88 1.41-3.1 1.34-4 0-.8-1.22-3.1-1.31-4.78 1.13-2.62 3.75-2.84 9.16 1.13 13.03.62.62 1.25.91 2.84-.91z" />
                        </svg>
                        Apple
                    </Button>
                </div>
            </div>
        </div>
    );
};

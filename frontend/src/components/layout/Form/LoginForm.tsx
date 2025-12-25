import React, { useState } from 'react';
import { FormGroup } from './FormGroup';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { Lock, Mail } from 'lucide-react';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
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
                        <FcGoogle className="w-5 h-5 mr-2" />
                        Google
                    </Button>
                    <Button variant="secondary">
                        <FaApple className="w-5 h-5 mr-2" />
                        Apple
                    </Button>
                </div>
            </div>
        </div>
    );
};

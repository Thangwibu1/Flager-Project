import React, { useState } from 'react';
import { FormGroup } from './FormGroup';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { Lock, Mail, Phone } from 'lucide-react';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoCardOutline } from 'react-icons/io5';
import { MdOutlineLockReset } from 'react-icons/md';
import { RegisterFormData, RegisterRequest } from '@/features/auth/types';
import { useRegister } from '@/features/auth/hooks/useRegister';
export const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        phone: '',
    });

    const confirmPasswordError =
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword
            ? 'Passwords do not match'
            : undefined;

    const registerMutation = useRegister();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return; // chặn submit
        }

        registerMutation.mutate({
            email: formData.email,
            password: formData.password,
            username: formData.username,
            phone: formData.phone,
        });
        console.log(formData.username);
    };
    return (
        <div className="w-full bg-background-dark">
            <div className="p-2">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create your account
                    </h1>
                    <p className="text-gray-500 dark:text-text-muted">
                        Join millions of people discovering new interests,
                        friends, and communities every day.
                    </p>
                </div>

                <FormGroup onSubmit={handleSubmit}>
                    {/* username Input */}
                    <Input
                        id="username"
                        type="text"
                        label="Full Name"
                        placeholder="Dao Thi Ut Trinh"
                        value={formData.username}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                username: e.target.value,
                            })
                        }
                        leftIcon={<IoCardOutline className="w-5 h-5" />}
                    />
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
                    {/* Email Input */}
                    <Input
                        id="phone"
                        type="number"
                        label="Phone"
                        placeholder="0901928382"
                        value={formData.phone}
                        onChange={e =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        leftIcon={<Phone className="w-5 h-5" />}
                    />
                    {/* Password Input */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-white">
                                Password
                            </label>
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

                    <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-white">
                                Confirm Password
                            </label>
                        </div>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value,
                                })
                            }
                            leftIcon={
                                <MdOutlineLockReset className="w-5 h-5" />
                            }
                            showPasswordToggle
                            error={confirmPasswordError}
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="w-full h-12 flex items-center justify-center rounded-lg bg-[#ec1313] text-white text-sm font-bold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:ring-offset-2 focus:ring-offset-[#181111] transition-colors">
                        Sign Up
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

import { Logo } from '@/components/common/Logo/Logo';
import { LoginForm } from '@/components/layout/Form/LoginForm';
import { useState } from 'react';

export const LoginPage = ({
    onSwitchToRegister,
}: {
    onSwitchToRegister: () => void;
}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', formData);
    };

    return (
        <div className="flex min-h-screen w-full bg-[#181111]">
            {/* left section */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3 text-white">
                        <div className="text-[#ec1313]">
                            <Logo size="md" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            SocialApp
                        </h2>
                    </div>

                    {/* Quote */}
                    <div className="max-w-lg">
                        <blockquote className="text-2xl font-medium leading-relaxed text-white mb-4">
                            "Connect with friends, share what you're up to, and
                            see what's new from others all over the world."
                        </blockquote>
                        <div className="flex gap-2">
                            <div className="h-1 w-8 rounded-full bg-[#ec1313]" />
                            <div className="h-1 w-2 rounded-full bg-white/30" />
                            <div className="h-1 w-2 rounded-full bg-white/30" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#181111]">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="lg:hidden flex justify-center">
                        <div className="text-[#ec1313]">
                            <Logo size="md" />
                        </div>
                    </div>

                    {/* Form */}
                    <LoginForm></LoginForm>
                    {/* Sign Up Link */}
                    <div className="text-center text-sm">
                        <span className="text-[#b99d9d]">
                            Don't have an account?{' '}
                        </span>
                        <button
                            onClick={onSwitchToRegister}
                            className="font-bold text-white hover:text-[#ec1313] transition-colors"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

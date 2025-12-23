import React from 'react';
import { LoginForm } from './components/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex bg-[#0f0a0a] text-white">
            {/* Left Side: Branding & Image */}
            <div
                className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-cover bg-center relative"
                style={{
                    backgroundImage: 'url("/path-to-your-abstract-image.jpg")',
                }}
            >
                <div className="flex items-center gap-2 relative z-10">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-sm"></span>
                    </div>
                    <span className="text-xl font-bold"></span>
                </div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-medium leading-relaxed max-w-md">
                        "Connect with friends, share what you're up to, and see
                        what's new from others all over the world."
                    </h2>
                    <div className="flex gap-2 mt-6">
                        <div className="w-6 h-1 bg-red-600 rounded-full"></div>
                        <div className="w-2 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Right Side: Login Form */}
            <LoginForm></LoginForm>
        </div>
    );
};

export default LoginPage;

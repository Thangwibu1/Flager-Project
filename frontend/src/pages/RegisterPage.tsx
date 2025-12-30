import { Button } from '@/components/common/Button/Button';
import Logo from '@/components/common/Logo/Logo';
// import { Logo } from '@/components/common/Logo/Logo';
import { RegisterForm } from '@/components/layout/Form/RegisterForm';

export const RegisterPage = ({
    onSwitchToLogin,
}: {
    onSwitchToLogin: () => void;
}) => {
    return (
        <div className="flex min-h-screen w-full bg-[#181111]">
            {/* left section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#181111]">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="lg:hidden flex justify-center">
                        <div className="text-[#ec1313]">
                            <Logo />
                        </div>
                    </div>

                    {/* Form */}
                    <RegisterForm></RegisterForm>
                    {/* Sign Up Link */}
                    <div className="text-center text-sm">
                        <span className="text-[#b99d9d]">
                            Already a member?{' '}
                        </span>
                        <button
                            onClick={onSwitchToLogin}
                            className="font-bold text-white hover:text-[#ec1313] transition-colors"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>

            {/* Right section */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

                <div className="relative z-10 flex flex-col justify-between p-10 w-full">
                    {/* Logo */}
                    <div className="flex items-center text-white">
                        <div className="text-[#ec1313]">
                            <Logo />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Flager
                        </h2>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm">
                        <span className="text-[#b99d9d]">
                            Already a member?{' '}
                        </span>
                        <Button
                            onClick={onSwitchToLogin}
                            className="font-bold text-white transition-colors"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

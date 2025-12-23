import { Navbar } from './components/Layout/Navbar';

function App() {
    return (
        // 1. Thiết lập nền tối toàn màn hình (min-h-screen, bg-black)
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans">
            {/* 2. Nhúng Navbar vào đây để test */}
            <Navbar />

            {/* 3. Phần nội dung giả lập (để test scroll) */}
            <main className="max-w-1920px mx-auto pt-6 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Cột Trái (Giả lập Sidebar Profile) */}
                <div className="hidden md:block col-span-1">
                    <div className="bg-[#181818] rounded-xl p-4 h-64 border border-gray-800">
                        <h2 className="font-bold text-lg mb-2">Intro Widget</h2>
                        <p className="text-gray-400 text-sm">
                            Đây là nơi hiển thị thông tin profile...
                        </p>
                    </div>
                </div>

                {/* Cột Giữa (Giả lập News Feed) */}
                <div className="col-span-1 md:col-span-2 space-y-4">
                    {[1, 2, 3, 4, 5].map(item => (
                        <div
                            key={item}
                            className="bg-[#181818] rounded-xl p-6 border border-gray-800 h-96 flex items-center justify-center"
                        >
                            <span className="text-gray-500">
                                Post Content #{item} (Scroll down to test Sticky
                                Navbar)
                            </span>
                        </div>
                    ))}
                </div>

                {/* Cột Phải (Giả lập Suggestion) */}
                <div className="hidden md:block col-span-1">
                    <div className="bg-[#181818] rounded-xl p-4 h-80 border border-gray-800">
                        <h2 className="font-bold text-lg mb-2">
                            You might know
                        </h2>
                        <div className="space-y-3 mt-4">
                            <div className="h-10 bg-gray-800 rounded-full w-full"></div>
                            <div className="h-10 bg-gray-800 rounded-full w-full"></div>
                            <div className="h-10 bg-gray-800 rounded-full w-full"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;

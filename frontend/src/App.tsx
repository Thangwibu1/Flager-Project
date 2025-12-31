import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePost from './pages/homepost/HomePost';
import { AuthRoutes } from './routes/AuthRoutes';
import { MessagePage } from './pages/messagepage/MessagePage';
import { SocketProvider } from './contexts/SocketContext';

// Create QueryClient instance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 30, // 30 minutes
            refetchOnWindowFocus: true,
            retry: 1,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SocketProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Auth routes */}
                        <Route path="/auth/*" element={<AuthRoutes />} />

                        {/* Protected routes */}
                        <Route path="/" element={<HomePost />} />

                        {/* Messages routes with optional chatId parameter */}
                        <Route path="/messages" element={<MessagePage />} />
                        <Route
                            path="/messages/:chatId"
                            element={<MessagePage />}
                        />
                    </Routes>
                </BrowserRouter>

                {/* React Query DevTools */}
                <ReactQueryDevtools initialIsOpen={false} />
            </SocketProvider>
        </QueryClientProvider>
    );
}

export default App;

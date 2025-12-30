import React, { useState, useEffect } from 'react';
import NewPost from '@/components/common/NewPost/NewPost';
import '../../common/NewPost/NewPost.css';

interface PostData {
    id: string;
    user: { name: string; avatar: string; time: string; location: string };
    content: string;
    image?: string;
    likes: number;
    comments: number;
}

export default function PostList() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                setIsLoading(true);
                const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTRhNzE5ZGQwZGMyZjUzZjUyNmY5NTMiLCJpYXQiOjE3NjcwOTMyMDksImV4cCI6MTc2NzE3OTYwOX0.FwfStluYO5ipCemyTOFTRhMHUmcsrYBHajHASNi0du0`;
                const response = await fetch(
                    `http://localhost:5000/api/v1/users/694a719dd0dc2f53f526f953/posts`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`, // BẮT BUỘC có dòng này
                        },
                    }
                );

                if (!response.ok) {
                    // Nếu lỗi 401, thông báo yêu cầu đăng nhập
                    if (response.status === 401)
                        throw new Error('Login to access this resource');
                    throw new Error('Failed to fetch posts');
                }

                const result = await response.json();

                // SỬA TẠI ĐÂY: Theo Postman là result.data.postList
                const dataArray = result.data?.postList || [];

                const formatted = dataArray.map((item: any) => ({
                    id: item._id,
                    user: {
                        name: item.authorId?.name || 'User',
                        avatar:
                            item.authorId?.avatar ||
                            'https://via.placeholder.com/150',
                        time: item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : 'Vừa xong',
                        location: item.location || 'Việt Nam',
                    },
                    content: item.content || '',
                    image:
                        item.media && item.media.length > 0
                            ? item.media[0]
                            : undefined,
                    likes: Array.isArray(item.totalReact)
                        ? item.totalReact.length
                        : 0,
                    comments: item.totalComment || 0,
                }));

                setPosts(formatted);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        getPosts();
    }, []);

    if (isLoading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">Lỗi: {error}</div>;

    return (
        <div className="list-post-container">
            {posts.length > 0 ? (
                posts.map(post => <NewPost key={post.id} {...post} />)
            ) : (
                <div className="no-data">Can not find any data.</div>
            )}
        </div>
    );
}

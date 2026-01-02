
import NewPost from '@/components/common/NewPost/NewPost';
import '../../common/NewPost/NewPost.css';
import { usePosts } from '../../../features/post/hooks/usePosts';

export default function PostList() {
    const { data, isLoading, isError, error } = usePosts();

    if (isLoading) return <div className="loading">Đang tải...</div>;
    if (isError)
        return (
            <div className="error">
                Lỗi: {error instanceof Error ? error.message : 'Lỗi kết nối'}
            </div>
        );

    const posts = (data?.data?.postList || []).map((item: any) => ({
        id: item._id,
        user: {
            name: item.authorId?.name || 'User',
            avatar: item.authorId?.avatar || 'https://via.placeholder.com/150',
            time: item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : 'Vừa xong',
            location: item.location || 'Việt Nam',
        },
        content: item.content || '',
        image: item.media?.[0],
        likes: Array.isArray(item.totalReact) ? item.totalReact.length : 0,
        comments: item.totalComment || 0,
    }));

    return (
        <div className="list-post-container">
            {posts.length > 0 ? (
                posts.map((post: any) => <NewPost key={post.id} {...post} />)
            ) : (
                <div className="no-data">Can not find any data.</div>
            )}
        </div>
    );
}


import { useState, useEffect } from 'react';
import { postService } from '../services/post.service';
import { useAuthStore } from '../../auth/store/auth.store';

export const usePosts = () => {
    const { user } = useAuthStore();
    const userId = user?._id;
    // const userId : string = '694a719dd0dc2f53f526f953'; //này đang hard code để test

    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!userId) return;

            setIsLoading(true);
            setIsError(false);
            try {
                const result = await postService.getUserPosts(userId);
                setData(result);
            } catch (err) {
                setIsError(true);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [userId]); // Chạy lại khi userId thay đổi

    return { data, isLoading, isError, error };
};
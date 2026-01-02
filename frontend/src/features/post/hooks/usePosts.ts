import { useQuery } from '@tanstack/react-query';
import { postService } from '../services/post.service';
import { useAuthStore } from '../../auth/store/auth.store';

export const usePosts = () => {
    const { user } = useAuthStore();

    // const userId = user?._id;
    const userId : string = '694a719dd0dc2f53f526f953'; //này đang hard code để test

    return useQuery({
        queryKey: ['posts', userId],
        queryFn: async () => {
            // Kiểm tra nghiệp vụ: Nếu không có ID thì không gọi API
            if (!userId) throw new Error('User ID is required');
            return postService.getUserPosts(userId);
        },
        enabled: !!userId, // Query chỉ kích hoạt khi userId tồn tại (truthy)
    });
};

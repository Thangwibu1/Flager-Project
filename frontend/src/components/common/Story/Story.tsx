import './Story.css';
interface StoryProps {
    image: string;
    name: string;
    isMyStory?: boolean;
}

export default function Story({ image, name, isMyStory }: StoryProps) {
    return (
        <div className="story-item">
            <div className="story-avatar-wrapper">
                <img src={image} alt={name} className="story-avatar" />
                {isMyStory && (
                    <div className="story-add-icon">
                        <span>+</span>
                    </div>
                )}
            </div>
            <span className="story-name">{name}</span>
        </div>
    );
}
// sau này sẽ xử lý kiểu , mảng Story , phẩn từ đầu tiên [vị trí 0] luôn luôn là user sở hữu account
// sau đó mới tới mảng các story tải lên từ DB
// giờ mới đang là dữ liệu fix cứng thôi
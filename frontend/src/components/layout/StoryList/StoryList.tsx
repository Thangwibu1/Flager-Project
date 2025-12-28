
import Story from '@/components/common/Story/Story';

// chỗ này mốt sẽ lấy từ list bạn bè của user để up lên
const DUMMY_STORIES = [
    {
        id: 1,
        name: 'My Story',
        image: 'https://i.pravatar.cc/150?u=1',
        isMyStory: true,
    },
    { id: 2, name: 'Sarah', image: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Mike', image: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Jessica', image: 'https://i.pravatar.cc/150?u=4' },
];

export default function StoryList() {
    return (
        <div className="story-list-container">
            {DUMMY_STORIES.map(story => (
                <Story
                    key={story.id}
                    image={story.image}
                    name={story.name}
                    isMyStory={story.isMyStory}
                />
            ))}
        </div>
    );
}

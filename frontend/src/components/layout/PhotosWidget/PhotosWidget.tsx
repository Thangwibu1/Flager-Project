import Card from '@/components/common/Card/Card';
import './PhotosWidget.css';

export interface Photo {
    id: string;
    url: string;
    alt?: string;
}

export interface PhotosWidgetProps {
    photos: Photo[];
    totalCount?: number;
    maxDisplay?: number;
    onSeeAll?: () => void;
    onPhotoClick?: (photoId: string) => void;
}

function PhotosWidget({
    photos,
    totalCount,
    maxDisplay = 6,
    onSeeAll,
    onPhotoClick,
}: PhotosWidgetProps) {
    const displayPhotos = photos.slice(0, maxDisplay);
    const count = totalCount || photos.length;

    return (
        <Card
            title="Photos"
            action={
                onSeeAll && (
                    <span className="widget-action" onClick={onSeeAll}>
                        See All
                    </span>
                )
            }
        >
            <div className="photos-widget">
                <div className="photos-widget__grid">
                    {displayPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            className="photos-widget__item"
                            onClick={() => onPhotoClick?.(photo.id)}
                        >
                            <img
                                src={photo.url}
                                alt={photo.alt || 'Photo'}
                                className="photos-widget__image"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default PhotosWidget;

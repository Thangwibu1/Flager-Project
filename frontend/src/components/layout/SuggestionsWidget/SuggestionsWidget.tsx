import Card from '@/components/common/Card/Card';
import { IoPersonAdd } from 'react-icons/io5';
import './SuggestionsWidget.css';

export interface Suggestion {
    id: string;
    name: string;
    username: string;
    avatar: string;
    mutualFriends?: number;
}

export interface SuggestionsWidgetProps {
    suggestions: Suggestion[];
    maxDisplay?: number;
    onSeeAll?: () => void;
    onFollow?: (userId: string) => void;
}

function SuggestionsWidget({
    suggestions,
    maxDisplay = 5,
    onSeeAll,
    onFollow,
}: SuggestionsWidgetProps) {
    const displaySuggestions = suggestions.slice(0, maxDisplay);

    return (
        <Card
            title="You might know"
            action={
                onSeeAll && (
                    <span className="widget-action" onClick={onSeeAll}>
                        See All
                    </span>
                )
            }
        >
            <div className="suggestions-widget">
                <div className="suggestions-widget__list">
                    {displaySuggestions.map((suggestion) => (
                        <div
                            key={suggestion.id}
                            className="suggestions-widget__item"
                        >
                            <div className="suggestions-widget__avatar">
                                <img
                                    src={suggestion.avatar}
                                    alt={suggestion.name}
                                    className="suggestions-widget__avatar-img"
                                />
                            </div>
                            <div className="suggestions-widget__info">
                                <p className="suggestions-widget__name">
                                    {suggestion.name}
                                </p>
                                <p className="suggestions-widget__meta">
                                    {suggestion.mutualFriends
                                        ? `${suggestion.mutualFriends} mutual friends`
                                        : `@${suggestion.username}`}
                                </p>
                            </div>
                            <button
                                className="suggestions-widget__follow-btn"
                                onClick={() => onFollow?.(suggestion.id)}
                                aria-label={`Follow ${suggestion.name}`}
                            >
                                <IoPersonAdd />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default SuggestionsWidget;

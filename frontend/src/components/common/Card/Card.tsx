export interface CardProps {
    title?: string;
    action?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

function Card({ title, action, children, className = '' }: CardProps) {
    return (
        <div className={`card ${className}`}>
            {(title || action) && (
                <div className="card__header">
                    {title && <h3 className="card__title">{title}</h3>}
                    {action && <div className="card__action">{action}</div>}
                </div>
            )}
            <div className="card__content">{children}</div>
        </div>
    );
}

export default Card;

import React from 'react';
import Card from '@/components/common/Card/Card';
import './InfoCard.css';

export interface InfoItem {
    icon: React.ReactNode;
    label?: string;
    value: string;
    highlight?: boolean;
}

export interface InfoCardProps {
    items: InfoItem[];
    onEditDetails?: () => void;
}

function InfoCard({ items, onEditDetails }: InfoCardProps) {
    return (
        <Card title="Intro">
            <div className="info-card">
                <div className="info-card__items">
                    {items.map((item, index) => (
                        <div key={index} className="info-card__item">
                            <div className="info-card__icon">{item.icon}</div>
                            <div className="info-card__text">
                                {item.label && (
                                    <span className="info-card__label">
                                        {item.label}{' '}
                                    </span>
                                )}
                                <span
                                    className={`info-card__value ${
                                        item.highlight
                                            ? 'info-card__value--highlight'
                                            : ''
                                    }`}
                                >
                                    {item.value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {onEditDetails && (
                    <button
                        className="info-card__edit-btn"
                        onClick={onEditDetails}
                    >
                        Edit Details
                    </button>
                )}
            </div>
        </Card>
    );
}

export default InfoCard;

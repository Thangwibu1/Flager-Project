import './ProfileBody.css';

export interface ProfileBodyProps {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
    className?: string;
}

function ProfileBody({ left, center, right, className = '' }: ProfileBodyProps) {
    return (
        <div className={`profile-body ${className}`}>
            {left && <div className="profile-body__left">{left}</div>}
            {center && <div className="profile-body__center">{center}</div>}
            {right && <div className="profile-body__right">{right}</div>}
        </div>
    );
}

export default ProfileBody;

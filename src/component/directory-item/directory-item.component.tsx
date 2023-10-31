import React from 'react';
import { useNavigate } from 'react-router-dom';
import './directory-item.styles.scss';

interface Category {
  imageUrl: string;
  title: string;
  route: string;
}

interface DirectoryItemProps {
  category: Category;
}

const DirectoryItem: React.FC<DirectoryItemProps> = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className="directory-item-container" onClick={onNavigateHandler}>
      <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="body">
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;

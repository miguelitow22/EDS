//src\components\TopicCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './TopicCard.css';

function TopicCard({ title, description, imageUrl, topicId }) {
  return (
    <div className="topic-card">
      <img src={imageUrl} alt={title} className="topic-image" />
      <div className="topic-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={`/topic/${topicId}`} className="learn-more">Leer Más</Link>
      </div>
    </div>
  );
}

export default TopicCard;

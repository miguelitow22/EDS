import React from 'react';
import { useParams } from 'react-router-dom';
import topics from '../data/topics';
import './TopicDetail.css';

function TopicDetail() {
  const { topicId } = useParams();
  const topic = topics.find((t) => t.id === parseInt(topicId));

  if (!topic) {
    return <div className="topic-detail">Topic not found</div>;
  }

  return (
    <div className="topic-detail">
      <div className="back-button">
        <a href="/">← Back to Home</a>
      </div>
      <h2>{topic.title}</h2>
      <p className="description">{topic.description}</p>
      {topic.videoUrl && (
        <div className="video-container">
          <iframe
            src={topic.videoUrl}
            title={topic.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <p className="additional-info">{topic.additionalInfo}</p>
    </div>
  );
}

export default TopicDetail;

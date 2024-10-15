// src/pages/Techniques.js
import React from 'react';

const Techniques = () => {
  const techniques = [
    { name: 'Diaphragmatic Breathing', description: 'Deep belly breathing to relax.' },
    { name: 'Box Breathing', description: '4-4-4-4 breathing for focus.' },
    { name: '4-7-8 Breathing', description: 'A calming breathing technique.' },
  ];

  return (
    <div>
      <h1>Breathwork Techniques</h1>
      <ul>
        {techniques.map((technique, index) => (
          <li key={index}>
            <h3>{technique.name}</h3>
            <p>{technique.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Techniques;

// src/models/breathworkModel.js

export const breathworkTechniques = [
    { name: 'Box Breathing', description: 'A simple 4-4-4-4 breathing technique that helps reduce stress and improve focus.' },
    { name: 'Diaphragmatic Breathing', description: 'Deep belly breathing that relaxes the body and increases lung capacity.' },
    { name: 'Pursed Lip Breathing', description: 'Helps control breathing, improves lung function, and reduces shortness of breath.' },
    { name: '4-7-8 Breathing', description: 'A calming technique for anxiety and insomnia, using a rhythmic breath pattern.' }
  ];
  
  // Function to get techniques
  export const getTechniques = () => {
    return breathworkTechniques;
  };
  
  // Add these missing functions
  export const saveUserPreferences = (userId, preferences) => {
    localStorage.setItem(`user-${userId}-preferences`, JSON.stringify(preferences));
  };
  
  export const getUserPreferences = (userId) => {
    const preferences = localStorage.getItem(`user-${userId}-preferences`);
    return preferences ? JSON.parse(preferences) : null;
  };
  
// src/controllers/breathworkController.js

import { getTechniques } from '../models/breathworkModel';

export const fetchBreathworkTechniques = () => {
  return getTechniques();  // Fetch techniques from the model
};

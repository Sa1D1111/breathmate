 // src/pages/Home.js 
 import React from 'react';
 import './Home.css';
import Sidebar from '../components/Sidebar';
 
 const Home = () => {
   return (
    <div>
     <div className="home-container">
       <header className="intro-section">
         <h1>Welcome to BreathMate</h1>
         <p>Discover the power of breathwork to enhance your physical and mental health. This page provides a comprehensive guide to breathwork techniques that reduce stress, improve sleep, and enhance your overall well-being.</p>
         <img src={require('../images/image1.png')} alt="Breathwork" className="hero-image" />
       </header>
 
       <section className="about-breathwork">
         <h2>What is Breathwork?</h2>
         <p>Breathwork consists of techniques that focus on mindful breathing to improve mental, physical, and spiritual health. It's proven to help with stress, anxiety, and overall well-being.
         Breathwork refers to a variety of breathing techniques and exercises that can help with mental, physical, and spiritual health. It involves changing your breathing patterns for healing and self-care purposes. Using breathwork has been proven to help people reduce their stress and anxiety levels.
         </p>
       </section>
 
      
 
       <section className="beginner-techniques">
         <h2>Breathwork Techniques for Beginners</h2>
         <div className="technique-grid">
           <div className="technique-item">
             <h3>Box Breathing</h3>
             <p>A simple 4-4-4-4 breathing technique that helps reduce stress and improve focus.</p>
           </div>
           <div className="technique-item">
             <h3>Diaphragmatic Breathing</h3>
             <p>Deep belly breathing that relaxes the body and increases lung capacity.</p>
           </div>
           <div className="technique-item">
             <h3>Pursed Lip Breathing</h3>
             <p>Helps control breathing, improves lung function, and reduces shortness of breath.</p>
           </div>
           <div className="technique-item">
             <h3>4-7-8 Breathing</h3>
             <p>A calming technique for anxiety and insomnia, using a rhythmic breath pattern.</p>
           </div>
         </div>
       </section>
 
       <section className="advanced-techniques">
         <h2>Advanced Breathing Techniques</h2>
         <div className="technique-grid">
           <div className="technique-item">
             <h3>Holotropic Breathwork</h3>
             <p>A spiritual technique designed to access altered states of consciousness for personal growth.</p>
           </div>
           <div className="technique-item">
             <h3>Shamanic Breathwork</h3>
             <p>Combines music and movement to promote spiritual healing.</p>
           </div>
           <div className="technique-item">
             <h3>Pranayama Breathwork</h3>
             <p>Yoga-based breathing exercises that balance energy and cleanse the mind.</p>
           </div>
           <div className="technique-item">
             <h3>Rebirthing Breathwork</h3>
             <p>A therapeutic technique for emotional healing and personal development.</p>
           </div>
         </div>
       </section>
 
 
 
       
 
       <section className="benefits-breathwork">
  <h2>Benefits of Breathwork</h2>
  <ul>
    <li><b>Reduces stress & anxiety:</b> Calms your body and reverses stress response.</li>
    <li><b>Enhances physical health: </b>Increases oxygen levels, boosts your immunity, and releases toxins.</li>
    <li><b>Improves digestion:</b> Increases blood flow to the digestive tract, improving digestion.</li>
    <li><b>Increases happiness and self-love: </b>Promotes awareness of the present moment, which causes a shift in perspective.</li>
    <li><b>Improves sleep:</b> Calms the nervous system and quiets the mind.</li>
    <li><b>Helps with pain management: </b>Allows your body to release endorphins, reducing sensitivity and increasing pleasure.</li>
  </ul>
</section>
 
       <section className="types-of-breathwork">
         <h2>Types of Breathwork</h2>
         <p>There are a large number of breathwork techniques and exercises available to try. Here are some breathwork techniques that anyone can do:</p>
         <ul>
           <li>Box breathing</li>
           <li>Diaphragmatic breathing</li>
           <li>Pursed lip breathing</li>
           <li>4-7-8 breathing</li>
           <li>Alternate nostril breathing</li>
           <li>Breath focus technique</li>
           <li>Equal breathing</li>
           <li>Resonant breathing</li>
         </ul>
       </section>
 
       <section className="beginner-techniques">
         <h2>8 Breathwork Techniques for Beginners</h2>
 
         <h3>1. Box Breathing</h3>
         <p>Box breathing, also known as square breathing or 4-4-4-4 breathing, helps to focus on taking slow, deep breaths. It’s used by a wide variety of professionals and athletes for stress reduction and improved performance. Here’s how to do it:</p>
         <ul>
           <li>Sit up straight and exhale slowly out your mouth.</li>
           <li>Breathe in through your nose for a count of 4.</li>
           <li>Hold your breath for another count of 4.</li>
           <li>Breathe out through your mouth for a count of 4.</li>
           <li>Hold your breath for a count of 4 and repeat.</li>
         </ul>
         <p>Developed by Mark Divine, a former Navy SEAL commander, this method is used in high-stress environments to reduce stress.</p>
 
         <h3>2. Diaphragmatic Breathing</h3>
         <p>Diaphragmatic breathing, or belly breathing, engages the diaphragm to allow more air into the lungs. Here’s how to practice it:</p>
         <ul>
           <li>Sit comfortably, place one hand on your chest and one on your stomach.</li>
           <li>Breathe in deeply through your nose, focusing on your stomach rising.</li>
           <li>Exhale through pursed lips, letting your stomach fall.</li>
         </ul>
         <p>This technique helps improve lung capacity and promote relaxation.</p>
       </section>
 
       
     </div>
     </div>

 
 
   );
 };
 
 export default Home;
import React from "react";
import "./Help.css";

const Help = () => {
  return (
    <div className="help-page">
      <h1 className="help-header">Help & Support</h1>

      {/* Getting Started Section */}
      <div className="help-section">
        <h2>Getting Started</h2>
        <p>
          Welcome to the Breathing Techniques app! Here's how to get started:
        </p>
        <ol>
          <li>Select a breathing technique from the breathing techniques tab.</li>
          <li>Adjust the timers if needed for just the custom breathing page and press "Start".</li>
          <li>Follow the on-screen instructions for the breathing pattern.</li>
          <li>Enjoy the relaxing music and visual animations!</li>
        </ol>
      </div>

      {/* FAQ Section */}
      <div className="help-section">
        <h2>Frequently Asked Questions (FAQ)</h2>
        <ul className="help-faq">
          <li>
            <p className="help-faq-question">How do I adjust the breathing timers?</p>
            <p className="help-faq-answer">
              Use the sliders on the breathing page to set the inhale, hold, and exhale times.
            </p>
          </li>
          <li>
            <p className="help-faq-question">Can I use the app offline?</p>
            <p className="help-faq-answer">
              An internet connection is required for music playback and real-time updates.
            </p>
          </li>
          <li>
            <p className="help-faq-question">What is the best technique for stress relief?</p>
            <p className="help-faq-answer">
              Try the "4-7-8 Breathing" method for calming effects and better sleep.
            </p>
          </li>
        </ul>
      </div>

      {/* Tips Section */}
      <div className="help-section">
        <h2>Tips for Effective Breathing Practice</h2>
        <p>
          - Practice in a quiet, comfortable space. <br />
          - Try using headphones for the best audio experience. <br />
          - Be consistent—set aside time daily for practice. <br />
          - Experiment with different techniques to find what works for you!
        </p>
      </div>

      {/* Contact Section */}
      <div className="help-section help-contact">
        <h2>Contact Us</h2>
        <p>
          Have a question or feedback? Reach out to us at{" "}
          <a href="mailto:support@breathingapp.com">support@breathingapp.com</a>.
        </p>
      </div>

      {/* Disclaimer Section */}
      <div className="disclaimer">
        <p>
          Disclaimer: This app is designed for general wellness and relaxation.
          It is not a substitute for medical advice. Consult a healthcare
          provider for specific concerns.
        </p>
      </div>
    </div>
  );
};

export default Help;

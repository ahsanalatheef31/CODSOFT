import React from 'react';
import '../CssFiles/ContactUs.css';
import Navbar from './Navbar';

function ContactUs() {
  return (
    <div className='contact-container'>
    <Navbar/>
    <div className="contact-info-container">
      
      <h2>Contact Me</h2>
      <p>If you'd like to get in touch, you can reach me through the following:</p>

      <ul className="contact-list">
        <li><strong>Email:</strong> Ahsanalatheef31@gmail.com </li>
        <li><strong>GitHub:</strong> <a href=" https://github.com/ahsanalatheef31" target="_blank" rel="noopener noreferrer">ahsanalatheef31</a></li>
        <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/AhsanaLatheef31" target="_blank" rel="noopener noreferrer">AhsanaLatheef31</a></li>
        <li><strong>Instagram:</strong> <a href="https://www.instagram.com/ahsana_latheef?igsh=MWNoeWh3MTkzajg1bg==" target="_blank" rel="noopener noreferrer">@ahsana_latheef</a></li>
      </ul>

      <p>Feel free to reach out for collaborations, feedback, or just to say hi 😊</p>
    </div>
    </div>
  );
}

export default ContactUs;

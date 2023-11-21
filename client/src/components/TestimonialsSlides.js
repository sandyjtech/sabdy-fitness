import React, { useState } from "react";
import './Testimonial.css'
import { IonIcon } from "@ionic/react";

import { arrowBackCircleOutline, arrowForwardCircleOutline} from "ionicons/icons";

const TestimonialsSlides = ({ testimonials }) => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const handleLeftButtonClick = () => {
    setCurrentTestimonialIndex(Math.max(0, currentTestimonialIndex - 1));
  };

  const handleRightButtonClick = () => {
    setCurrentTestimonialIndex(Math.min(testimonials.length - 1, currentTestimonialIndex + 1));
  };

  return (
    <div className="testimonial-container blue" size-lg="8" size-md="4">
      <button className="nav-button left-button" onClick={handleLeftButtonClick}>
      <IonIcon icon={arrowBackCircleOutline} className="orange icon"/>
      </button>
      
      <div className="testimonial">
        <p className="testimonial-text">{testimonials[currentTestimonialIndex].text}</p>
        <p className="testimonial-author">{testimonials[currentTestimonialIndex].author}</p>
      </div>
      
      <button className="nav-button right-button" onClick={handleRightButtonClick}>
        <IonIcon icon={arrowForwardCircleOutline} className="orange icon"/>
      </button>
    </div>
  );
};

export default TestimonialsSlides;





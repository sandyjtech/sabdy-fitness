// PromoModal.js
import React from "react";
import { IonModal, IonButton, IonIcon, IonTitle } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import "./PromoModal.css";

const PromoModal = ({ closeModal }) => {
  return (
    <div className="ion-padding promo-modal-content">
      <IonButton
        className="close-button"
        onClick={closeModal}
        color="danger"
      >
        <IonIcon icon={closeCircleOutline} className="close-icon"></IonIcon>
      </IonButton>

      <h2 style={{ textAlign: "center" }}>Welcome to Sabdy Fitness</h2>
      <IonTitle
        className="promo-modal-tagline"
        style={{ textAlign: "center", fontFamily: "Vina Sans" }}
      >
        Your Personalized Path to Wellness!
      </IonTitle>
      <p className="promo-modal-highlight" style={{ color: "#85f08e" }}>
        🌟 Elevate Your Fitness Journey with Expert Guidance 🌟
      </p>
      <p className="message">
        At Sabdy Fitness, we're passionate about helping you achieve your
        fitness and nutrition goals through personalized attention and tailored
        programs.
      </p>
      <div className="promo-modal-points">
        <p>
          ✅ <strong>Personalized Training Programs:</strong> Our certified
          trainers craft customized workout plans based on your unique
          strengths, preferences, and challenges, ensuring your journey is as
          individual as you are.
        </p>
        <p>
          ✅ <strong>Holistic Nutrition Guidance:</strong> Nutrition is key! Our
          expert nutritionists create personalized meal plans to complement your
          fitness goals, providing the right balance of nutrients for optimal
          results.
        </p>
        <p>
          ✅ <strong>Flexible Scheduling:</strong> Life gets busy, and we get
          it. Enjoy the convenience of flexible scheduling – morning, afternoon,
          or evening sessions, designed to fit seamlessly into your lifestyle.
        </p>
        <p>
          ✅ <strong>Motivational Support:</strong> We're not just trainers;
          we're your cheerleaders! Our supportive community and dedicated
          trainers are here to inspire and motivate you, making your fitness
          journey enjoyable and sustainable.
        </p>
      </div>
      <p className="message">
        Ready to embark on a journey to a healthier, stronger you? 🚀 Schedule
        your complimentary consultation now by contacting us at
        Trainer@Sabdyfitness.com. Let's make your fitness aspirations a reality!
      </p>
      <p className="promo-modal-signature">
        Here's to your health and happiness,
      </p>
      <p className="promo-modal-team">Sabdy Fitness Team</p>
    </div>
  );
};

export default PromoModal;

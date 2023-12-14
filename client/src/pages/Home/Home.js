import {
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/react";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TestimonialsSlides from "../../components/TestimonialsSlides";
import VideoPlayer from "../../components/VideoPlayer";
import logo from "../../media/main-logo.png";
const Home = () => {
  const testimonials = [
    {
      text: "Sabdy helped me fit into my wedding dress with only a few months left.",
      author: "- Sandra G.",
    },
    {
      text: "Ive had weight problem since I had my first baby. Thanks to Sabdy, I finally feel beautiful in my own skin.",
      author: "- Hannah L.",
    },
  ];

  return (
    <>
      <Header />
      <div className="page-container2">
        <IonGrid className="content-container">
          <IonRow>
            <IonCol
              size="10"
              size-sm="3"
              size-md="6"
              style={{ margin: "0 auto" }}
            >
              <IonTitle className="title">Meet Sabdy</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              size="10"
              size-sm="3"
              size-md="6"
              style={{ margin: "0 auto" }}
            >
              <p
                className="p"
                style={{
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                "Hey there! Picture this: 12-year-old me, super stoked for gym class like it was Christmas morning.
                  Fast forward to college, where a sneaky spinal curve stole my athletic scholarship dreams.
                  But guess what? I didn't let that stop me from turning into a fitness fanatic! Now, 
                  I'm here to make sweating it out feel like a party and help you crush your goals.
                  Let's kick some fitness butt together, and I promise, we'll have a blast doing it!
                  Who said workouts couldn't be both effective and downright fun? Let's make your fitness journey the coolest adventure ever!"
              </p>
            </IonCol>
            <IonCol
              size="10"
              size-sm="3"
              size-md="6"
              style={{ margin: "0 auto" }}
            >
              <VideoPlayer />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol
              size="10"
              size-sm="3"
              size-md="5"
              style={{ margin: "0 auto" }}
            >
                <IonImg className="card" src={logo}></IonImg>
            </IonCol>
            <IonCol
              size="10"
              size-sm="3"
              size-md="6"
              style={{ margin: "0 auto" }}
            >
              <p
                className="p"
                style={{
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                "When I finally found the wedding dress of my dream it was two
                sizes too small luckily I found Sabdy and she helped me feel
                beautiful on the most import day of my life"
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              size="10"
              size-sm="3"
              size-md="6"
              style={{ margin: "0 auto" }}
            >
              <IonTitle className="title">Testimonials</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              size="10"
              size-sm="3"
              size-md="6"
              style={{ margin: "0 auto" }}
            >
              <TestimonialsSlides testimonials={testimonials} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
      <Footer />
    </>
  );
};

export default Home;


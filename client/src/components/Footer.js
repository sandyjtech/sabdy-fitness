/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import logo from "../media/logo.png";

import {
  IonFooter,
  IonGrid,
  IonImg,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonIcon,
} from "@ionic/react";
import { logoFacebook, logoTwitter, logoInstagram } from "ionicons/icons";
import "./styles.css";

function Footer() {
  return (
    <IonFooter className="custom-footer blue">
      <IonGrid>
        <IonRow className="footer-row">
          <IonCol size="12" size-md="4">
            <div className="footer-section">
              <h6>About Me</h6>
              <p className="ion-text-justify">
                I am Sabdy a personal trainer specializing in reshaping your
                life.
              </p>
              <IonImg
            src={logo}
            alt="certified"
            style={{
              width: "30%",
              backgroundColor: 'whitesmoke',
              margin: '0 auto'
            
            }}
          />
            </div>
          </IonCol>

          <IonCol size="6" size-md="4">
            <div className="footer-section">
              <h6>Certificates</h6>
              <IonList   className="ion-no-padding item">
                <IonItem className="item" color="danger" href="https://drive.google.com/file/d/1dwC6RyMGzWwLUya_toAMtqKQWqBkbOXg/view?usp=sharing">
                  Fitness Coach
                </IonItem>

                <IonItem className="item" color="danger" href="https://drive.google.com/file/d/1hPzbYD6VgCoA4DQ0RbiSFmCbpMyycFnY/view?usp=sharing">
                  Personal Trainer
                </IonItem>
                <IonItem className="item" color="danger" href="https://drive.google.com/file/d/1aODFov4sPSY1nk83EQzJQUjUc3k7sMq8/view?usp=sharing">
                  Transformation Specialist
                </IonItem>
              </IonList>
            </div>
          </IonCol>

          <IonCol size="6" size-md="4">
            <div className="footer-section">
              <h6>Quick Links</h6>
              <IonList className="ion-no-padding item">
                <IonItem className="item" color="danger" href="#about" >About Us</IonItem>
                <IonItem href="/contact" className="item" color="danger">Contact Us</IonItem>
                <IonItem href="/plans" className="item" color="danger">Available Plans</IonItem>
                {/* <IonItem href="www.google.com">Privacy Policy</IonItem> */}
                {/* <IonItem href="www.google.com">Sitemap</IonItem> */}
              </IonList>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonGrid>
        <IonRow className="footer-row">
          <IonCol size="12" size-md="8">
            <p className="ion-text-center ion-text-md-left">
              © {new Date().getFullYear()} All Rights Reserved by{" "}
              <a
                href="www.google.com"
                style={{
                  color: "#ff6000",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontFamily: 'Fira Sans Condensed", sans-serif',
                  visited: { color: "#ff6000" },
                }}
              >
                Sabdy's Fitness
              </a>
            </p>
          </IonCol>

          <IonCol size="12" size-md="4">
            <ul className="social-icons ion-justify-content-center ion-justify-content-md-end">
              <li>
                <a
                  href="/"
                  style={{
                    color: "whitesmoke",
                    textDecoration: "none",
                    visited: { color: "whitesmoke" },
                  }}
                >
                  <IonIcon icon={logoFacebook} className="social-icon" />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/sabdyfitness/?fbclid=IwAR0EMVdC171gnJ9q0QDKEBYRb7HaPOfj5AVvaYgzc2CV99xzTnF9D7WXHag"
                  target="_blank"
                  style={{
                    color: "whitesmoke",
                    textDecoration: "none",
                    visited: { color: "whitesmoke" },
                  }}
                >
                  <IonIcon icon={logoInstagram} className="social-icon" />
                </a>
              </li>
            </ul>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonFooter>
  );
}

export default Footer;

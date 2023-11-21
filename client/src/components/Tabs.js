import React from "react";
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";

import { home, fitness, personCircle, mail } from "ionicons/icons";
const Tabs = () => {
  return (
    <div style={{position: 'sticky', bottom: '0', zIndex: '2'}}>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="fitness" href="/plans">
        <IonIcon icon={fitness} />
        <IonLabel>Plans</IonLabel>
      </IonTabButton>
      <IonTabButton tab="mail" href="/contact">
        <IonIcon icon={mail} />
        <IonLabel>Contact</IonLabel>
      </IonTabButton>

      {/* <IonTabButton tab="search" href="/about">
        <IonIcon icon={search} />
        <IonLabel>My Account</IonLabel>
      </IonTabButton> only visiable if subscribed*/}

 {/* <IonTabButton tab="search" href="/about">
        <IonIcon icon={search} />
        <IonLabel>Admin</IonLabel>
      </IonTabButton> only visiable if user admin == true*/}
      
      {/* <IonTabButton tab="personCircle" href="/account">
        <IonIcon icon={personCircle} />
        <IonLabel>Account</IonLabel>
      </IonTabButton> */}
    </IonTabBar></div>
  );
};

export default Tabs;

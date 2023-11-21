import {
  IonTitle,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useUserAuth } from "../../context/UserAuthProvider";
import { usePlans } from "../../context/PlansProvider";
const Account = () => {
  const {user} = useUserAuth()
  return (
    <>
      <Header />

      <div className="page-container2">
        <IonGrid className="content-container">
          <IonTitle className="title">Welcome {user ? user.username : null}</IonTitle>
          <IonText>
  Subscription Status: {user && user.isSubscribed ? 'Subscribed' : 'Not Subscribed'}
</IonText>
     
<IonButton routerLink="/manage-subscription">Manage Subscription</IonButton>
<IonButton routerLink="/payment-information">Payment Information</IonButton>
<IonButton onClick={() => console.log(user.id, 'subscribe')}>
  Subscribe
</IonButton>

<IonButton onClick={() => console.log(user.id, 'unsubscribe')}>
  Unsubscribe
</IonButton>

Transaction
<IonList>
  {user && user.subscriptionHistory.map((historyItem, index) => (
    <IonItem key={index}>
      {historyItem.action} on {historyItem.date}
    </IonItem>
  ))}
</IonList>
        </IonGrid>
      </div>
      <Footer />
    </>
  );
};

export default Account;

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
import "./Plans.css"; // Import the CSS file
import NewPlanForm from "./NewPlanForm";
import { useUserAuth } from "../../context/UserAuthProvider";
import { usePlans } from "../../context/PlansProvider";
const Plans = () => {
  const { plans, updatePlan, deletePlan } = usePlans();
  const [expandedCard, setExpandedCard] = useState(null);
  const [isAddingNewPlan, setIsAddingNewPlan] = useState(false);
  const [editedPlanText, setEditedPlanText] = useState("");
  const [editingPlan, setEditingPlan] = useState(null);
  const {user} = useUserAuth();

  const toggleNewPlanForm = () => {
    setIsAddingNewPlan(!isAddingNewPlan);
    setEditingPlan(null);
  };

  const toggleAccordion = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };
  // Function to start editing a plan
  const startEditPlan = (planId) => {
    console.log("Editing plan with ID:", planId);
    const planToEdit = plans.find((plan) => plan.id === planId);
    if (planToEdit) {
      setEditingPlan(planId);
      setEditedPlanText(""); // Reset edited text
      setIsAddingNewPlan(true); // Open the form for editing
    } else {
      console.error("Plan not found.");
    }
  };

  return (
    <>
      <Header />

      <div className="page-container2">
        <IonGrid className="content-container">
          <IonTitle className="title">Choose a plan</IonTitle>
     {user && user.admin ? (
                        <>     
    <button
            style={{
              backgroundColor: "#262a56",
              color: "whitesmoke",
              fontWeight: "bold",
              fontSize: "1.1em",
              fontFamily: "Fira Sans Condensed",
              width: "90%",
              margin: "15px",
              borderRadius: "10px",
            }}
            onClick={toggleNewPlanForm}
            className="add-post-button"
          >
            <FaPlus /> Add New Plan
         </button>
          </>) : null}
          {isAddingNewPlan || editingPlan ? (
            <NewPlanForm
              editingPlan={editingPlan}
              setEditedPlanText={setEditedPlanText}
              setEditingPlan={setEditingPlan}
              isOpen={isAddingNewPlan}
              onCancel={() => {
                setIsAddingNewPlan(false);
                setEditingPlan(null);
              }}
              onAdd={() => {
                setIsAddingNewPlan(false);
                setEditingPlan(null);
              }}
              planToEdit={
                editingPlan
                  ? plans.find((plan) => plan.id === editingPlan)
                  : null
              }
            />
          ) : null}

          <IonRow>
            {plans.map((plan, index) => (
              <>
                <IonCol key={index} size="12" size-md="4">
                  <IonCard className="plan-card">
                    <IonCardHeader>
                      <IonCardTitle
                        style={{
                          color: "black",
                          fontFamily: "Fira Sans Condensed",
                          fontSize: "1.5em",
                          fontWeight: "bold",
                        }}
                      >
                        {plan && plan.title}
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {user && user.admin ? (
                        <>
                          <button
                            onClick={() => startEditPlan(plan.id)}
                            style={{
                              borderRadius: "10px",
                              margin: "5px",
                              fontFamily: "Fira Sans Condensed",
                              fontSize: "1.2em",
                              fontWeight: "bold",
                              border: "1px solid #262a56",
                              background:
                                "linear-gradient(45deg, #262a56, #262a56)",
                              color: "whitesmoke",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              transition: "background-color 0.3s ease",
                            }}
                          >
                            <FaPencilAlt />
                          </button>
                          <button
                            className="btn"
                            onClick={() => deletePlan(plan.id)}
                            style={{
                              borderRadius: "10px",
                              margin: "5px",
                              fontFamily: "Fira Sans Condensed",
                              fontSize: "1.2em",
                              fontWeight: "bold",
                              border: "1px solid #ff6000",
                              background:
                                "linear-gradient(45deg, #ff6000, red)",
                              color: "whitesmoke",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              transition: "background-color 0.3s ease",
                            }}
                          >
                            <FaTrash />
                          </button>
                        </>
                      ) : null}

                      <p
                        style={{
                          color: "#262a56",
                          fontFamily: "Fira Sans Condensed",
                          fontSize: "1em",
                          fontWeight: "bold",
                        }}
                      >
                        {plan.description}
                      </p>
                      <IonButton
                        style={{
                          borderRadius: "10px",
                          margin: "5px",
                          fontFamily: "Fira Sans Condensed",
                          fontSize: "1.2em",
                          fontWeight: "bold",
                          border: "1px solid #ff6000",
                          background: "linear-gradient(45deg, #ff6000, red)",
                          color: "whitesmoke",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "background-color 0.3s ease",
                        }}
                        expand="block"
                        onClick={() => toggleAccordion(index)}
                        color={expandedCard === index ? "danger" : "secondary"}
                      >
                        {expandedCard === index ? "Close" : "Learn more"}
                      </IonButton>
                      {expandedCard === index && (
                        <div className="home">
                          <IonList
                            style={{
                              borderRadius: "5px",
                              fontFamily: "Fira Sans Condensed",
                              fontSize: "1.2em",
                              color: "#262a56",
                              background: "beige",
                            }}
                          >
                            {plan.all_features &&
                              plan.all_features.map((feature, i) => (
                                <IonItem
                                  key={i}
                                  style={{
                                    "--ion-background-color": "beige",
                                    fontWeight: "bolder",
                                    color: "#262a56",
                                  }}
                                >
                                  {feature}
                                </IonItem>
                              ))}

                            <IonItem
                              style={{
                                "--ion-background-color": "beige",
                                fontWeight: "bolder",
                                color: "#262a56",
                              }}
                            >
                              Duration: {plan.duration}
                            </IonItem>
                            <IonItem
                              style={{
                                "--ion-background-color": "beige",
                                fontWeight: "bolder",
                                color: "#262a56",
                              }}
                            >
                              Days per week: {plan.days_per_week}
                            </IonItem>
                            <IonItem
                              style={{
                                "--ion-background-color": "beige",
                                fontWeight: "bolder",
                                color: "#326532",
                              }}
                            >
                              Price: ${plan.price}
                            </IonItem>
                          </IonList>

                          <IonButton
                            expand="block"
                            routerLink="/Contact"
                            style={{
                              borderRadius: "10px",
                              margin: "5px",
                              fontFamily: "Fira Sans Condensed",
                              fontSize: "1.2em",
                              fontWeight: "bold",
                              border: "1px solid #ff6000",
                              background:
                                "linear-gradient(45deg, #ff6000, red)",
                              color: "whitesmoke",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              transition: "background-color 0.3s ease",
                            }}
                          >
                            Contact Me
                          </IonButton>
                        </div>
                      )}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </>
            ))}
          </IonRow>
        </IonGrid>
      </div>
      <Footer />
    </>
  );
};

export default Plans;

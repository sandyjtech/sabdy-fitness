import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import TextField from "@mui/material/TextField";
import { usePlans } from "../../context/PlansProvider";

const NewPlanForm = ({
  isOpen,
  onCancel,
  onAdd,
  editingPlan,
  setEditedPlanText,
  setEditingPlan,
  planToEdit,
}) => {
  const { createPlan, updatePlan } = usePlans();
  const [planData, setPlanData] = useState({
    title: "",
    description: "",
    price: 0.0,
    duration: 0.0,
    days_per_week: 0,
    feature_one: "",
    feature_two: "",
    feature_three: "",
  });

  // Set initial values if editing a plan
  useEffect(() => {
    if (planToEdit && planToEdit.id && editingPlan) {
      // Editing mode - use existing plan values
      console.log("planToEdit:", planToEdit);
      console.log("editingPlan:", editingPlan);
      setPlanData({
        title: planToEdit.title || "",
        description: planToEdit.description || "",
        price: planToEdit.price || 0.0,
        duration: planToEdit.duration || 0.0,
        days_per_week: planToEdit.days_per_week || 0,
        feature_one: planToEdit.feature_one || "",
        feature_two: planToEdit.feature_two || "",
        feature_three: planToEdit.feature_three || "",
      });
    } else {
      // Creating a new plan - use default values
      setPlanData({
        title: "",
        description: "",
        price: 0.0,
        duration: 0.0,
        days_per_week: 0,
        feature_one: "",
        feature_two: "",
        feature_three: "",
      });
    }
  }, [planToEdit, editingPlan]);

  // Function to save the edited plan
  const saveEditedPlan = (planId, planData) => {
    updatePlan(planId, planData);
    setEditingPlan(null);
    setEditedPlanText("");
  };

  // Function to cancel editing a post
  const cancelEditPlan = () => {
    setEditingPlan(null);
    setEditedPlanText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if planToEdit exists and editingPlan is truthy
    if (editingPlan && planToEdit) {
      // If editing, update the plan
      saveEditedPlan(planToEdit.id, planData);
    } else if (planToEdit) {
      // If planToEdit exists but not in editing mode, update the plan
      updatePlan(planToEdit.id, planData);
    } else if (!editingPlan) {
      onCancel();
      onAdd();
    }
  };

  return (
    <div className={`new-post-form ${isOpen ? "open" : ""}`}>
      <IonCard
        style={{
          width: "50%",
          margin: "20px auto",
          backgroundColor: "#262a56",
        }}
      >
        <IonCardContent>
          <IonCardHeader className="title" style={{ fontSize: "1.2em" }}>
            Add a fitness plan
          </IonCardHeader>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div
              className="form-group"
              style={{ width: "100%", margin: "0 auto" }}
            >
              <TextField
                style={{
                  width: "90%",
                  borderRadius: "10px",
                  background: "whitesmoke",
                  margin: "5px",
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                }}
                InputLabelProps={{
                  style: {
                    color: "#ff6000",
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bolder",
                    fontSize: "1.2em",
                  },
                }}
                label="Title"
                placeholder="Title"
                name="title"
                value={planData.title}
                onChange={(e) =>
                  setPlanData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }))
                }
              />
              <TextField
                style={{
                  width: "90%",
                  borderRadius: "10px",
                  background: "whitesmoke",
                  margin: "5px",
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                }}
                InputLabelProps={{
                  style: {
                    color: "#ff6000",
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bolder",
                    fontSize: "1.2em",
                  },
                }}
                label="Description"
                placeholder="Description"
                name="description"
                value={planData.description}
                onChange={(e) =>
                  setPlanData((prevData) => ({
                    ...prevData,
                    description: e.target.value,
                  }))
                }
              />
              <TextField
                style={{
                  width: "90%",
                  borderRadius: "10px",
                  background: "whitesmoke",
                  margin: "5px",
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                }}
                InputLabelProps={{
                  style: {
                    color: "#ff6000",
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bolder",
                    fontSize: "1.2em",
                  },
                }}
                label="Price"
                placeholder="Price"
                type="number"
                step="0.1"
                min="0"
                name="price"
                value={planData.price}
                onChange={(e) =>
                  setPlanData((prevData) => ({
                    ...prevData,
                    price: e.target.value,
                  }))
                }
              />
              <TextField
                style={{
                  width: "90%",
                  borderRadius: "10px",
                  background: "lightgray",
                  margin: "5px",
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                }}
                InputLabelProps={{
                  style: {
                    color: "#ff6000",
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bolder",
                    fontSize: "1.2em",
                  },
                }}
                label="Duration (hours)"
                type="number"
                step="0.1"
                min="0"
                name="duration"
                value={planData.duration}
                onChange={(e) =>
                  setPlanData((prevData) => ({
                    ...prevData,
                    duration: e.target.value,
                  }))
                }
              />
              <IonSelect
                style={{
                  color: "#ff6000",
                  margin: "5px",
                  width: "90%",
                  fontFamily: "Fira Sans Condensed",
                  fontSize: "1.2em",
                }}
                label="Days per week"
                name="days_per_week"
                value={planData.days_per_week.toString()}
                onChange={(e) => setPlanData.days_per_week(e.target.value)}
                interface="popover"
                interfaceOptions={{
                  header: "Days per week",
                  subHeader: "Choose days",
                  translucent: true,
                  placeholderStyle: {
                    color: "yellow",
                  },
                  itemStyle: {
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bolder",
                    fontSize: "1.2em",
                  },
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <IonSelectOption key={day} value={day.toString()}>
                    {day}
                  </IonSelectOption>
                ))}
              </IonSelect>
              <TextField
                style={{
                  width: "90%",
                  borderRadius: "10px",
                  background: "whitesmoke",
                  margin: "5px",
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                }}
                InputLabelProps={{
                  style: {
                    color: "#ff6000",
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bolder",
                    fontSize: "1.2em",
                  },
                }}
                label="First Feature"
                name="feature_one"
                value={planData.feature_one}
                onChange={(e) =>
                  setPlanData((prevData) => ({
                    ...prevData,
                    feature_one: e.target.value,
                  }))
                }
              />
              <TextField
                style={{
                  width: "90%",
                  borderRadius: "10px",
                  background: "whitesmoke",
                  margin: "5px",
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                }}
                InputLabelProps={{
                  style: {
                    color: "#ff6000",
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bolder",
                    fontSize: "1.2em",
                  },
                }}
                label="Second Feature"
                name="feature_two"
                value={planData.feature_two}
                onChange={(e) =>
                  setPlanData((prevData) => ({
                    ...prevData,
                    feature_two: e.target.value,
                  }))
                }
              />
              <TextField
                style={{
                  width: "90%",
                  borderRadius: "10px",
                  background: "whitesmoke",
                  margin: "5px",
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                }}
                InputLabelProps={{
                  style: {
                    color: "#ff6000",
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bolder",
                    fontSize: "1.2em",
                  },
                }}
                label="Third Feature"
                name="feature_three"
                value={planData.feature_three}
                onChange={(e) =>
                  setPlanData((prevData) => ({
                    ...prevData,
                    feature_three: e.target.value,
                  }))
                }
              />
              <button
                style={{
                  color: "whitesmoke",
                  borderRadius: "10px",
                  background: "#ff6000",
                  margin: "5px",
                  fontFamily: "Fira Sans Condensed",
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  border: "1px solid #ff6000",
                }}
                onClick={editingPlan ? cancelEditPlan : onCancel}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                style={{
                  color: "whitesmoke",
                  borderRadius: "10px",
                  background: "#326532",
                  margin: "5px",
                  fontFamily: "Fira Sans Condensed",
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  border: "1px solid #326532",
                }}
                type="submit"
                onClick={() =>
                  editingPlan
                    ? saveEditedPlan(planToEdit.id, planData)
                    : createPlan(planData)
                }
                className="form-button"
              >
                {editingPlan ? "Save Update" : "Create Plan"}
              </button>
            </div>
          </form>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default NewPlanForm;

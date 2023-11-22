// PostsContext.js
import React, { useContext, useState, useEffect } from "react";
import { useUserAuth } from "./UserAuthProvider";

const PlansContext = React.createContext();
export const usePlans = () => {
  return useContext(PlansContext);
};

const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { user } = useUserAuth();
  useEffect(() => {
    fetch("/all_plans")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw r;
      })
      .then((data) => {
        setPlans(data);
        //console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  //Create Post// Function to create a new post
  function createPlan(planData) {
    // Set default values if postData is not provided
    const defaultPlanData = {
        title: "",
        description: "",
        price: 0.0,
        duration: 0.0,
        days_per_week: 0,
        feature_one: "",
        feature_two: "",
        feature_three: "",
    };

    // Merge the default values with the provided postData (if any)
    const mergedPostData = { ...defaultPlanData, ...planData };

    fetch("/all_plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mergedPostData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to create plan");
      })
      .then((newPlan) => {
        // Append the new post to the existing posts state
        setPlans((prevPlans) => [...prevPlans, newPlan]);
      })
      .catch((error) => {
        console.error("Error creating plan:", error);
      });
  }

  //Delete the post
  function deletePlan(planId) {
    fetch(`/plan-by-id/${planId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // Remove the deleted post from the posts state
          setPlans((prevPlans) =>
            prevPlans.filter((plan) => plan.id !== planId)
          );
        } else {
          throw new Error("Failed to delete plan");
        }
      })
      .catch((error) => {
        console.error("Error deleting plan:", error);
      });
  }
  //Update the post
  async function updatePlan(planId, updatedData) {
    try {
      const response = await fetch(`/plan-by-id/${planId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      console.log("Response from server:", response);
  
      if (!response.ok) {
        throw new Error("Failed to update plan");
      }
  
      const updatedPlan = await response.json();
  
      console.log("Updated plan:", updatedPlan);
  
      // Update the plans state with the updated plan
      setPlans((prevPlans) =>
        prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
      );
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle the error gracefully, e.g., display an error message to the user.
    }
  }

  const contextValue = {
    plans,
    loading,
     createPlan,
    deletePlan,
    updatePlan,
  };

  return (
    <PlansContext.Provider value={contextValue}>
      {children}
    </PlansContext.Provider>
  );
};

export default PlansProvider;

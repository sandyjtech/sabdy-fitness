import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserAuth } from "../context/UserAuthProvider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { IonGrid, IonCard,  IonImg } from "@ionic/react";
import fitnessLogo from "../media/fitness.png";
function Login({ toggleSignupModal, handleClose }) {
  const { handleAuthSubmit, error } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <IonCard
      style={{
        backgroundColor: "#262a56",
        height: "90%",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#ff6000", fontSize: "190%" }}>
        Please Log In
      </h2>
      <IconButton
        edge="start"
        onClick={handleClose}
        aria-label="close"
        style={{
          color: "rgb(200, 67, 67)",
          position: "absolute",
          top: "5%",
          right: "5%",
        }}
      >
        <CloseIcon />
      </IconButton>

      <IonGrid style={{ alignItems: "center", margin: "5%" }}>
        {error && (
          <IonCard
            style={{
              backgroundColor: "lightgray",
              padding: "2%",
              textAlign: "center",
              fontSize: "large",
            }}
          >
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          </IonCard>
        )}

        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={(values, actions) => {
            handleAuthSubmit(values, actions, "SignIn");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
              <ErrorMessage name="username" />
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "5px",
                    margin: "5px",
                    padding: "5%",
                    width: "85%",
                  }}
                />
                
              </div>
              <div className="form-group">
                <div style={{ position: "relative" }}>
                <ErrorMessage name="password" />
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "5px",
                      margin: "5px",
                      padding: "5%",
                      width: "85%",
                    }}
                  />
                  {showPassword ? (
                    <VisibilityOff
                      onClick={() => setShowPassword(!showPassword)}
                      style={eyeIconStyle}
                    />
                  ) : (
                    <Visibility
                      onClick={() => setShowPassword(!showPassword)}
                      style={eyeIconStyle}
                    />
                  )}
                </div>
                
              </div>
              <div
                className="form-group"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  type="submit"
                  style={submitButtonStyle}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Log In"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        
        <p style={{ color: "white", fontSize: "large" }} className="little-text">
          Don't have an account?{" "}
          <span className="little-text" onClick={toggleSignupModal} style={createAccountLinkStyle}>
            Create Account
          </span>
        </p>
        <p className="little-text">Forgot password? </p>
        <p className="little-text">Privacy terms</p>
      </IonGrid>
      <IonImg
        alt="Sabdys Fitness"
        src={fitnessLogo}
        className="fitness-img"
        style={{ width: "40%", height: "30%", margin: "-20% auto " }}
      />
    </IonCard>
  );
}

// Styles
const eyeIconStyle = {
  cursor: "pointer",
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
};

const submitButtonStyle = {
  fontFamily: "Fira Sans Condensed",
  fontWeight: "bold",
  fontSize: "145%",
  backgroundColor: "#ff6000",
  borderRadius: "5px",
  margin: "5% ",
  padding: "1%",
  alignSelf: "flex-end",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#ff4500",
  },
};

const createAccountLinkStyle = {
  cursor: "pointer",
  color: "#ff6000",
  fontWeight: "bold",
};

export default Login;

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserAuth } from "../context/UserAuthProvider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { IonGrid, IonCard, IonImg } from "@ionic/react";
import fitnessLogo from "../media/fitness.png";

function Signup({ toggleSignInModal, handleClose }) {
  const { signUp, handleAuthSubmit, handleClick, error } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//test

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const usaTimeZones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    // Add more time zones as needed
  ];
  return (
    <IonCard
      style={{
        backgroundColor: "#262a56",
        height: "100%",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#ff6000", fontSize: "190%" }}>
        Please Sign Up!
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
            full_name: "",
            username: "",
            email: "",
            phone: "",
            time_zone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string()
              .required("Password is required")
              .min(6, "Password must be at least 6 characters long.")
              .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter."
              )
              .matches(/[0-9]/, "Password must contain at least one digit.")
              .matches(
                /[!@#$%^&*()_\-+=<>?/~.]/,
                "Password must contain at least one special character."
              ),
            confirmPassword: signUp
              ? Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Confirm Password is required")
              : Yup.string(),
            space: Yup.string(),
            email: signUp
              ? Yup.string()
                  .email("Invalid email address")
                  .required("Email is required")
              : Yup.string(),
          })}
          onSubmit={(values, actions) => {
            handleAuthSubmit(values, actions, "signup");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <ErrorMessage name="full_name" />
                <Field
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "5px",
                    margin: "5px",
                    padding: "5%",
                    width: "85%",
                  }}
                  type="text"
                  placeholder="Full Name"
                  id="full_name"
                  name="full_name"
                />
              </div>
              <div className="form-group">
                <ErrorMessage name="username" />
                <Field
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "5px",
                    margin: "5px",
                    padding: "5%",
                    width: "85%",
                  }}
                  type="text"
                  placeholder="Username"
                  id="username"
                  name="username"
                />
              </div>
              <div className="form-group">
                <ErrorMessage name="email" />

                <Field
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "5px",
                    margin: "5px",
                    padding: "5%",
                    width: "85%",
                  }}
                  type="text"
                  placeholder="Enter Email Address"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <ErrorMessage name="phone" />

                <Field
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "5px",
                    margin: "5px",
                    padding: "5%",
                    width: "85%",
                  }}
                  type="text"
                  placeholder="Enter Phone Number (Optional)"
                  id="phone"
                  name="phone"
                />
              </div>
              <div className="form-group">
                <ErrorMessage
                  name="time_zone"
                  component="div"
                  className="error"
                />

                <Field
                  as="select"
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "5px",
                    margin: "5px",
                    padding: "5%",
                    width: "95%",
                  }}
                  id="time_zone"
                  name="time_zone"
                >
                  <option value="" label="Select your time zone" />
                  {usaTimeZones.map((timeZone) => (
                    <option key={timeZone} value={timeZone} label={timeZone} />
                  ))}
                </Field>
              </div>
              <div className="form-group">
                <div style={{ position: "relative" }}>
                  <ErrorMessage name="password" />

                  <Field
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "5px",
                      margin: "5px",
                      padding: "5%",
                      width: "85%",
                    }}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Choose a password"
                    autoComplete="current-password"
                  />
                  {showPassword ? (
                    <VisibilityOff
                      onClick={togglePasswordVisibility}
                      style={eyeIconStyle}
                    />
                  ) : (
                    <Visibility
                      onClick={togglePasswordVisibility}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div style={{ position: "relative" }}>
                  <Field
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "5px",
                      margin: "5px",
                      padding: "5%",
                      width: "85%",
                    }}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    autoComplete="current-password"
                  />
                  {showConfirmPassword ? (
                    <VisibilityOff
                      onClick={toggleConfirmPasswordVisibility}
                      style={eyeIconStyle}
                    />
                  ) : (
                    <Visibility
                      onClick={toggleConfirmPasswordVisibility}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                </div>
                <ErrorMessage name="confirmPassword" />
              </div>

              <p
                style={{ color: "white", fontSize: "large" }}
                className="little-text"
              >
                Already a member?{" "}
                <span
                  onClick={toggleSignInModal}
                  style={createAccountLinkStyle}
                >
                  Log In!
                </span>
              </p>
              <div
                className="form-group"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={submitButtonStyle}
                >
                  {isSubmitting ? "Loading..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="little-text">User Agreement </p>
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
export default Signup;

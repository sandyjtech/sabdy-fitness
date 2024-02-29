import React, { useState } from "react";
import { IonHeader, IonToolbar, IonTitle, IonImg } from "@ionic/react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Login from "./Login";
import Signup from "./Signup";
import "./styles.css";
import strengthLogo from "../media/strength.png";
import { useUserAuth } from "../context/UserAuthProvider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user, handleLogout } = useUserAuth();

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };
  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };
  const closeSignup = () => {
    setShowSignup(false);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "black",
    fontFamily: "Fira Sans Condensed",
    fontWeight: "bold",
    backgroundColor: "#ff6000",
    margin: "5%",
    "&:hover": {
      backgroundColor: "green",
      padding: "10px",
    },
  }));

  return (
    <IonHeader collapse="fade">
      <IonToolbar>
        <header className="head">
          <IonTitle className="header">
            Sabdy
            <span className="fitness">'s</span>
            Fitness
          </IonTitle>
          {/* <IonImg
            src="test"
            alt="certified"
            style={{
              width: "15%",
            
            }}
          /> */}
          <div style={{ width: "30%", textAlign: "right" }}>
            {user ? (
              <ColorButton onClick={handleLogout} size="medium">
                Logout
              </ColorButton>
            ) : (
              <>
                <ColorButton onClick={openLogin} size="medium">
                  Login
                </ColorButton>
                <ColorButton onClick={openSignup} size="medium">
                  Signup
                </ColorButton>
                <Dialog fullScreen open={showLogin} onClose={closeLogin}>
                  <DialogContent>
                    <Login
                      toggleSignupModal={openSignup}
                      handleClose={closeLogin}
                    />
                  </DialogContent>
                </Dialog>
                <Dialog fullScreen open={showSignup} onClose={closeSignup}>
                  <DialogContent>
                    <Signup
                      toggleSignInModal={openLogin}
                      handleClose={closeSignup}
                    />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </header>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;


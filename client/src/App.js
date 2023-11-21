import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
import Contact from "./pages/Contact/Contact";
import Plans from "./pages/Plans/Plans";
//import NotAuthorized from "./pages/NotAuthorized";
import Tabs from "./components/Tabs";
import { setupIonicReact } from "@ionic/react";
import PlansProvider from "./context/PlansProvider";
import { useUserAuth } from "./context/UserAuthProvider";
setupIonicReact();

function App() {
  const { user, checkAuthorized } = useUserAuth();
  useEffect(() => {
    checkAuthorized();
  }, []);
  return (

      <PlansProvider>
        <div style={{ paddingTop: "env(safe-area-insert-top)" }}>
          <Routes>
            {/* Not auth landing page */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/plans" element={<Plans />}></Route>
          </Routes>{" "}
          <Tabs />
        </div>
      </PlansProvider>
  
  );
}

export default App;

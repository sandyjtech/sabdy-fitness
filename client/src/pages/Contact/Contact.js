import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Contact.css";

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    console.log("Form submitted");
    fetch("/send-email", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
  })
  .then((res) => {
      if(res.ok) {
        return res.json();
      }  
      throw new Error("Failed to send email");
  })
  .catch((err) => {
  console.log(err);
  })
    setShowModal(false); 
  };

  return (
    <div>
      <Header />

      <div className="content-container">
        <h2 className="title">Contact Me</h2>
        <div>
          <div className="center-envelope" onClick={() => setShowModal(true)}>
            <div className="envelope">
              <div className="envelope-front"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Contact Form</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Message"
              multiline
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Contact;

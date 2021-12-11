import React, { useState } from "react";
import { Form, Button, Container, Segment, Message } from "semantic-ui-react";
import { set, ref, onValue } from "firebase/database";

import { db } from "../firebase.config";

let data = {};

const ContactForm = ({ userId }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessge] = useState("");

  // TODO: Add Validation

  const isFormValid = (name, phoneNumber) => {
    if (!name.length || !phoneNumber.length) {
      setErrorMessge("Please fill All Fields!");
      setTimeout(() => {
        setErrorMessge("");
      }, 2000);

      return false;
    } else if (phoneNumber.length <= 7) {
      setErrorMessge("Phone Number must be greater than 7!");
      setTimeout(() => {
        setErrorMessge("");
      }, 2000);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid(name, phoneNumber)) {
      await onValue(ref(db, `users/${userId}`), (snapshot) => {
        console.log(snapshot.val());
        data = snapshot.val();
        console.log(data);
      });

      if (!Array.isArray(data.phoneNumbers)) {
        data.phoneNumbers = [];
      }

      let newData = {
        ...data,
        phoneNumbers: [
          ...data.phoneNumbers,
          {
            name,
            phoneNumber,
          },
        ],
      };
      set(ref(db, `users/${userId}/`), newData)
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Segment
        style={{
          maxWidth: "500px",
          padding: "50px",
          margin: "0 auto",
        }}
      >
        {errorMessage ? <Message color="red">{errorMessage}</Message> : ""}
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Phone Number</label>
            <input
              type="number"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </Form.Field>
          <Button type="submit">Add</Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default ContactForm;

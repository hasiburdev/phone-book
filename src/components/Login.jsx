import React, { useState } from "react";
import { Container, Segment, Form, Button, Message } from "semantic-ui-react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase.config";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isFormValid = (email, password) => {
    if (!email.length || !password.length) {
      setErrorMessage("Please Fill All Fields!");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(email, password)) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          setSuccessMessage("Login Successful!");
          setTimeout(() => {
            window.location = "/";
          }, 1500);
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setErrorMessage("Wrong Email or Password!");
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
          } else {
            setErrorMessage("Something went wrong!");
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
          }
        });
    }
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Segment style={{ maxWidth: "500px", margin: "0 auto", padding: "40px" }}>
        {errorMessage ? <Message color="red">{errorMessage}</Message> : ""}
        {successMessage ? (
          <Message color="green">{successMessage}</Message>
        ) : (
          ""
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>

          <Button type="submit">Login</Button>
        </Form>
      </Segment>
      <Segment
        style={{
          marginTop: "30px",
          maxWidth: "500px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        Don't Have an Account? <Link to="/register">Sign Up</Link>
      </Segment>
    </Container>
  );
};

export default Login;

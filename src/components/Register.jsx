import React, { Component } from "react";
import { Form, Button, Container, Segment, Message } from "semantic-ui-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

import { auth, db } from "../firebase.config";
import { set, ref } from "firebase/database";

export default class Register extends Component {
  state = {
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
    successMessage: "",
    email: "",
  };

  isValidForm = ({ name, phone, password, confirmPassword, email }) => {
    if (
      !name.length ||
      !phone.length ||
      !password.length ||
      !confirmPassword.length ||
      !email.length
    ) {
      this.setState({ errorMessage: "Please fill all fields!" });
      setTimeout(() => {
        this.setState({ errorMessage: "" });
      }, 2000);
      return false;
    } else if (password !== confirmPassword) {
      this.setState({ errorMessage: "Password does not match!" });
      setTimeout(() => {
        this.setState({ errorMessage: "" });
      }, 2000);
      return false;
    } else if (phone.length <= 7) {
      this.setState({
        errorMessage: "Phone Number Must be Greater than 7 Digits!",
      });
      setTimeout(() => {
        this.setState({ errorMessage: "" });
      }, 2000);
      return false;
    } else {
      return true;
    }
  };
  setUserData = async (userId) => {
    try {
      await set(ref(db, `users/${userId}`), {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        phoneNumbers: [],
      });

      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = (e) => {
    console.clear();
    e.preventDefault();
    const validate = this.isValidForm(this.state);
    console.log(validate);

    if (this.isValidForm(this.state)) {
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then(async (userCredentials) => {
          console.log(userCredentials);
          await this.setUserData(auth.currentUser.uid);
          this.setState({
            successMessage: "Account Created Successfully!",
          });
          setTimeout(() => {
            window.location = "/";
          }, 1500);
          return;
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            this.setState({
              errorMessage: "Email already in Use!",
            });
            setTimeout(() => {
              this.setState({ errorMessage: "" });
            }, 2000);
          } else {
            this.setState({
              errorMessage: "Something Went Wrong!",
            });
            setTimeout(() => {
              this.setState({ errorMessage: "" });
            }, 2000);
          }

          console.log(error);
        });
    }
  };

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errorMessage, successMessage } = this.state;
    return (
      <Container style={{ marginTop: "50px" }}>
        <Segment
          style={{ maxWidth: "500px", margin: "0 auto", padding: "40px" }}
        >
          {errorMessage ? <Message color="red">{errorMessage}</Message> : ""}
          {successMessage ? (
            <Message color="green">{successMessage}</Message>
          ) : (
            ""
          )}
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Name</label>
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Name"
                name="name"
              />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <input
                type="number"
                placeholder="Phone Number"
                name="phone"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="submit">Register</Button>
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
          Already Have an Account? <Link to="/login">Log In</Link>
        </Segment>
      </Container>
    );
  }
}

import React, { Component } from "react";
import { Loader } from "semantic-ui-react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import ContactForm from "./ContactForm";
import NumberList from "./NumberList";
import UserHeader from "./UserHeader";

let userId = "";

export default class Home extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        userId = auth.currentUser.uid;
        console.log("Logged In");

        this.setState({ loading: false });
      } else {
        window.location = "/login";
      }
    });
  };

  render() {
    const { loading } = this.state;

    return loading ? (
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div>
          <Loader active inline="centered" />
          Loading...
        </div>
      </div>
    ) : (
      <div>
        <UserHeader userId={userId} />
        <ContactForm userId={userId} />
        <NumberList userId={userId} />
      </div>
    );
  }
}

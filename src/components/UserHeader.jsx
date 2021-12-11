import React, { useEffect, useState } from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import { signOut } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../firebase.config";

const UserHeader = ({ userId }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onValue(ref(db, `users/${userId}`), (snapshot) => {
      console.log(snapshot.val());
      setUserData(() => snapshot.val());
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        window.location = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Container>
        <Menu pointing>
          <Menu.Item name={userData.name} />
          <Menu.Item name={userData.phone} />

          <Menu.Menu position="right">
            <Menu.Item>
              <Button onClick={handleSignOut}>Log Out</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    </div>
  );
};

export default UserHeader;

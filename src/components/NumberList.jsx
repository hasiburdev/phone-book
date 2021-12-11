import React, { useEffect, useState } from "react";
import { Table, Header, Segment } from "semantic-ui-react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase.config";

let data = {};

const NumberList = ({ userId }) => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  useEffect(() => {
    onValue(ref(db, `users/${userId}`), (snapshot) => {
      console.log(snapshot.val());
      data = snapshot.val();
      console.log(data);
      if (Array.isArray(data.phoneNumbers)) {
        setPhoneNumbers(() => data.phoneNumbers);
      }
      console.log(phoneNumbers);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Segment style={{ marginBottom: "40px" }}>
        <Table basic="very" celled collapsing style={{ minWidth: "500px" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sl No.</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Phone Number</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {phoneNumbers.map((number, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>{number.name}</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{number.phoneNumber}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  );
};

export default NumberList;

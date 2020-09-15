import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

import Popup from '../popup/Popup';
import AddEventForm from '../addEventForm/AddEventForm';
import AddEventButton from '../buttons/AddEventButton';
import Event from '../event/Event';

export default class Events extends Component {
  render() {
    return (
      <div>
        <div className="p-2 d-flex flex-row justify-content-between align-items-center">
          <h2> My Events </h2>
          <Popup
            title="Add New Event"
            BodyModal={AddEventForm}
            ButtonModal={AddEventButton}
          />
        </div>
        {/* Need to be events.map and each child is accordination!!! */}
        <Accordion defaultActiveKey="0" className="p-2">
          <Card>
            <Card.Header> Event Name </Card.Header>
            <div className="p-2">
              <Card.Title> Date and Time </Card.Title>
              <Card.Text> Maybe Invites? </Card.Text>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Detailes
              </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Event />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

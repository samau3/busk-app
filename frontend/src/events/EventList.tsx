import { useState, useEffect, useContext } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Map } from "../map/Map";
import { AddEventForm } from "./AddEventForm";

import { NewCoordinatesContext } from "../map/NewCoordinatesContext";
import { UserContext } from "../users/UserContext";
import { EventCard } from "./EventCard";

import { Coordinates } from "../interfaces/Coordinates";
import { AddEventFormData } from "../interfaces/AddEventFormData";
import { Event } from "../interfaces/Event";

import BuskApi from "../api/api";

/** Renders EventList
 *
 * Props: none
 * State: none
 *
 * Routes --> List
 */

function EventList() {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newCoordinates, setNewCoordinates] = useState<Coordinates | undefined>(
    undefined
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [needsEvents, setNeedsEvents] = useState(true);
  const currentUser = useContext(UserContext);

  useEffect(
    function fetchEventsOnLoad() {
      async function getEventsfromApi() {
        console.log("get events from api");
        try {
          const events = await BuskApi.getEvents();
          setEvents(events);
          setNeedsEvents(false);
        } catch (err) {
          console.log("Errors on getting Events.");
          // setErrors(previousErrors => [...previousErrors, ...err]);
        }
      }

      getEventsfromApi();
    },
    [needsEvents]
  );
  // await BuskApi.getEvents();

  function addEvent() {
    setIsAddingEvent(true);
  }

  function updateNewCoordinates(mapCoordinates: Coordinates) {
    setNewCoordinates(mapCoordinates);
  }

  async function submitEvent(formData: AddEventFormData) {
    const eventDetails = {
      buskerId: 1,
      title: formData.title,
      type: formData.type,
      coordinates: {
        lat: newCoordinates?.lat,
        lng: newCoordinates?.lng,
      },
    };
    if (!currentUser) {
      console.log("Please log in to submit an event.");
    } else if (!newCoordinates) {
      console.log("Please select a location");
    } else {
      const newEvent = await BuskApi.createEvent(eventDetails);
      setEvents((previousData) => [...previousData, newEvent]);
    }
    setIsAddingEvent(false);
    setNewCoordinates(undefined);
  }

  if (needsEvents) {
    return (
      <Container className="text-center">
        <h1>Loading...</h1>
      </Container>
    );
  }

  function newEventComponent() {
    if (!currentUser) {
      return (
        <div className="mt-auto">
          <p>
            Please <Link to="/login">login</Link> or{" "}
            <Link to="/register">register</Link> to add an event.
          </p>
        </div>
      );
    }

    if (isAddingEvent) {
      return <AddEventForm submitEvent={submitEvent} />;
    }

    return (
      <Button
        className="mt-2 bottom"
        type="submit"
        size="lg"
        onClick={addEvent}
      >
        Add Event
      </Button>
    );
  }

  let firstFourEvents = events.slice(-4);

  async function remove(eventId:number) {
    await BuskApi.removeEvent(eventId);
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
  }

  return (
    <Container className="text-center ">
      <header className="p-3 mb-4 bg-light border rounded-3">
        <h1>Current events in New York</h1>
      </header>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={4} className="shownEvents">
            <h5 className="text-start mb-3">Most recent events:</h5>
            {firstFourEvents.map((event) => (
              <EventCard key={event.id} event = {event} remove={remove}/>
            ))}
            {newEventComponent()}
          </Col>
          <Col>
            <NewCoordinatesContext.Provider
              value={{ newCoordinates, updateNewCoordinates }}
            >
              <Map events={events} isAddingEvent={isAddingEvent} />
            </NewCoordinatesContext.Provider>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default EventList;
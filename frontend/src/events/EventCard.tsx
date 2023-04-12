import { Card } from "react-bootstrap";

import { Event } from "../interfaces/Event";

interface EventCardParamsInterface {
  event: Event;
}

/** Show limited information about an Event
 *
 * Is rendered by EventList to show a "card" for each event.
 *
 * Props:
 *  - event: event object {eventId, buskerId, title, type, coordinates{lat,lng}}
 *
 * On click, redirects to page with EventDetail component about event.
 *
 * EventList -> EventCard
 */

export function EventCard({ event }: EventCardParamsInterface) {
  const { title, type } = event;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{type}</Card.Text>
      </Card.Body>
    </Card>
  );
}

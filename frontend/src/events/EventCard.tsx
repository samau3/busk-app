import { Card, Button } from "react-bootstrap";

import { Event } from "../interfaces/Event";

interface EventCardParamsInterface {
  event: Event;
  remove: (eventId:number) => void
}

export function EventCard({ event, remove }: EventCardParamsInterface) {
  const { title, type, id } = event;

  async function handleRemove() {
    await remove(id);
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{type}</Card.Text>
        <Button onClick={handleRemove}>Remove</Button>
      </Card.Body>
    </Card>
  );
}

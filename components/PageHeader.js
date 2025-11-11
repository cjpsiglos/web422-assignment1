import { Card } from 'react-bootstrap';

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light text-center p-4 shadow-sm">
        <Card.Body>
          <h1 className="mb-2">{text}</h1>
          {subtext && <p className="text-muted fs-5">{subtext}</p>}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

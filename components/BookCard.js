import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";

export default function BookCard({ workID }) {
  const { data, error } = useSWR(
    workID ? `https://openlibrary.org/works/${workID}.json` : null
  );

  if (!data && !error) return <p>Loading...</p>;
  if (error || !data) return <Error statusCode={404} />;

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
        }}
        className="img-fluid"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt="Cover Image"
      />
      <Card.Body>
        <Card.Title>{data.title || ""}</Card.Title>
        <Card.Text>
          <strong>Published: </strong>{data.first_publish_date || data.first_publish_year || "N/A"}
        </Card.Text>
        <Link href={`/works/${workID}`}>
          <Button variant="primary">View Book</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

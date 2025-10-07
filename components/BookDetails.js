import { Container, Row, Col } from 'react-bootstrap';

export default function BookDetails({ book }) {
  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null; // Remove the event handler to prevent infinite loop
              event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>
        <Col lg="8">
          <h3>{book.title}</h3>
          {book.description && (
            <p>
              {typeof book.description === "string" ? book.description : book.description.value}
            </p>
          )}
          <br />
          {book.subject_people && (
            <>
              <h5>Characters</h5>
              {book.subject_people.join(", ")}
              <br />
              <br />
            </>
          )}
          {book.subject_places && (
            <>
              <h5>Settings</h5>
              {book.subject_places.join(", ")}
              <br />
              <br />
            </>
          )}
          {book.links && (
            <>
              <h5>More Information</h5>
              {book.links.map((link, index) => (
                <span key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title || "More Info"}
                  </a>
                  <br />
                </span>
              ))}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
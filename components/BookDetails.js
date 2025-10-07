import { Container, Row, Col } from "react-bootstrap";

export default function BookDetails({ book }) {
  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br/><br/>
        </Col>
        <Col lg="8">
          <h3>{book.title}</h3>
          {book.description && (
            <p>{typeof book.description === "string" ? book.description : book.description.value}</p>
          )}

          {book.subject_people?.length > 0 && (
            <>
              <br/>
              <h5>Characters</h5>
              <p>{book.subject_people.join(', ')}</p>
            </>
          )}

          {book.subject_places?.length > 0 && (
            <>
              <br/>
              <h5>Settings</h5>
              <p>{book.subject_places.join(', ')}</p>
            </>
          )}

          {book.links?.length > 0 && (
            <>
              <br/>
              <h5>More Information</h5>
              {book.links.map((link, i) => (
                <span key={i}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a><br/>
                </span>
              ))}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

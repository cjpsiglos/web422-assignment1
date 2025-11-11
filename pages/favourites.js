import { Row, Col } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <>
      {favouritesList.length > 0 ? (
        <>
          <PageHeader text="Favourites" subtext="All your favourite books, in one place" />

          <Row className="gy-4">
            {favouritesList.map((workID) => (
              <Col lg={3} md={6} key={workID}>
                <BookCard workID={workID} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <PageHeader text="Nothing Here" subtext="Add a book to your favourites" />
      )}
    </>
  );
}

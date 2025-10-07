import Link from 'next/link';
import { Card } from 'react-bootstrap';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export default function About({ book }) {
  const authorName = book.authors?.[0]?.author?.name || "Unknown Author";

  return (
    <>
      <PageHeader text="About the Developer - Carlos Siglos" />
      <Card className="bg-light">
        <Card.Body>
          <p>
            Hello! My name is Carlos. I am a 3rd year CPA student at Seneca College. I have a passion for software development and I have a strong interest in the 
            theory of computation and algorithms. This is my assignment 1 submission for WEB4222. I hope this assignment is sufficient and meets the requirements.
          </p>
        </Card.Body>
      </Card>
      <br />
      <BookDetails book={book} />
    </>
  );
}

// Fetch data for the book using getStaticProps
export async function getStaticProps() {
  const workId = "OL453657W"; // Replace with the Work ID of your chosen book
  const res = await fetch(`https://openlibrary.org/works/${workId}.json`);
  const data = await res.json();

  console.log("Fetched book data:", data); // Debugging log

  return {
    props: {
      book: data,
    },
  };
}
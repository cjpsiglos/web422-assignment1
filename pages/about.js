import Link from 'next/link';
import { Card } from 'react-bootstrap';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export default function About({ book }) {
  const authorName = book.authors?.[0]?.author?.name || "Unknown Author";

  return (
    <>
      <PageHeader text="About the Developer - Your Name" />
      <Card className="bg-light">
        <Card.Body>
          <p>
            Hello! My name is [Your Name], and I am a web developer passionate about creating interactive and
            user-friendly web applications. I enjoy working with modern frameworks like React and Next.js to build
            scalable and efficient solutions.
          </p>
          <p>
            The book I chose to showcase is {book.title} by {book.authors?.[0]?.name || "Unknown Author"}. This book
            is a fascinating read and has inspired me in many ways.
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
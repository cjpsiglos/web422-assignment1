import { useRouter } from 'next/router';
import useSWR from 'swr';
import BookDetails from '@/components/BookDetails';
import Error from 'next/error';
import PageHeader from '@/components/PageHeader';

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  // Fetch book data using SWR
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  // If data is still loading, return null
  if (!data && !error) return null;

  // If there is an error or no data, show a 404 error
  if (error || !data) {
    console.error("Error fetching book data:", error);
    return <Error statusCode={404} />;
  }

  // Render the book details
  return (
    <>
      <PageHeader text={data?.title || "Unknown Title"} />
      <BookDetails book={data} />
    </>
  );
}
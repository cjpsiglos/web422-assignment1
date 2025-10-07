import { useRouter } from 'next/router';
import useSWR from 'swr';
import BookDetails from '@/components/BookDetails';
import Error from 'next/error';
import PageHeader from '@/components/PageHeader';

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  const { data, error } = useSWR(workId ? `https://openlibrary.org/works/${workId}.json` : null);

  if (!data && !error) return <p>Loading book data...</p>;
  if (error || !data) return <Error statusCode={404} />;

  console.log("Rendering book:", data.title, data.description?.value);

  return (
    <>
      <PageHeader text={data.title || "Unknown Title"} />
      <BookDetails
        book={{
          ...data,
          description: data.description?.value || "No description available",
          authorNames: data.authors?.map(a => a.author?.key) || [],
        }}
      />
    </>
  );
}

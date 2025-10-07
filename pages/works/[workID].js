import { useRouter } from 'next/router';
import useSWR from 'swr';
import BookDetails from '@/components/BookDetails';
import Error from 'next/error';
import PageHeader from '@/components/PageHeader';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Work() {
  const router = useRouter();
  const { workID } = router.query; // must match filename [workID].js

  // Wait until router is ready
  const { data, error } = useSWR(
    workID ? `https://openlibrary.org/works/${workID}.json` : null,
    fetcher
  );

  if (!data && !error) return <p>Loading book data...</p>;
  if (error || !data) return <Error statusCode={404} />;

  return (
    <>
      <PageHeader text={data.title || 'Unknown Title'} />
      <BookDetails
        book={{
          ...data,
          description: data.description?.value || 'No description available',
        }}
      />
    </>
  );
}

// Optional: If you want to pre-render some pages at build time
export async function getStaticPaths() {
  // Pre-render only these specific works at build time (example)
  const paths = [
    { params: { workID: 'OL453657W' } },
    { params: { workID: 'OL453989W' } },
  ];
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { workID } = params;

  // Defensive check
  if (!workID || typeof workID !== 'string') {
    return { notFound: true };
  }

  return { props: {} }; // actual data is fetched on client with SWR
}

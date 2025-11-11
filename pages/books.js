
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Table, Pagination } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';


export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const queryString = new URLSearchParams(router.query).toString();

  // Fetch search results
  const { data, error } = useSWR(`https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`);  if (error) return <p>Error loading data...</p>;
  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error loading data...</p>;


  const books = data.docs || [];

  const previous = () => page > 1 && setPage(page - 1);
  const next = () => setPage(page + 1);

  const querySummary =
    Object.keys(router.query).length > 0
      ? Object.entries(router.query)
          .map(([key, value]) => `${key}: "${value}"`)
          .join(', ')
      : 'No search parameters provided';

  return (
    <>
      <PageHeader
        text="Search Results"
        subtext={<span>Showing results for {querySummary}</span>}
      />

      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const workId = book.key.replace('/works/', '');
            return (
              <tr
                key={book.key}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/works/${workId}`)}
              >
                <td>{book.title}</td>
                <td>{book.first_publish_year || 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
        <br/>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} disabled={page === 1} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}

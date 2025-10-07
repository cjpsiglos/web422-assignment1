// pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Table, Pagination } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

// Fetcher for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const author = 'Terry Pratchett';

  // Fetch search results from Open Library API
  const { data, error } = useSWR(
    `https://openlibrary.org/search.json?author=${encodeURIComponent(author)}&page=${page}&limit=10`,
    fetcher
  );

  if (error) return <p>Error loading data...</p>;
  if (!data) return <p>Loading...</p>;

  // Defensive check for docs
  const books = data.docs || [];

  const previous = () => page > 1 && setPage(page - 1);
  const next = () => setPage(page + 1);

  return (
    <>
      <PageHeader text={`Novels by ${author}`} />

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
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} disabled={page === 1} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}

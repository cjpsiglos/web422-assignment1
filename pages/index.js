/*********************************************************************************
* WEB422 – Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Carlos Siglos Student ID:168536233 Date: 2025-10-07
*
********************************************************************************/

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

  // Fetch search results
  const { data, error } = useSWR(
    `https://openlibrary.org/search.json?author=${encodeURIComponent(author)}&page=${page}&limit=10`,
    fetcher
  );

  if (error) return <p>Error loading data...</p>;
  if (!data) return <p>Loading...</p>;

  const books = data.docs || [];

  const previous = () => page > 1 && setPage(page - 1);
  const next = () => setPage(page + 1);

  return (
    <>
      <PageHeader text={<span style={{ fontWeight: 'bold' }}>Novels By {author}</span>} />

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

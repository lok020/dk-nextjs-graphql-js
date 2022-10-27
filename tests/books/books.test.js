import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
const Books = require("../../pages/books/index").default;
import { getStaticProps } from "../../pages/books";


// route
test('route able to render', () => {
  render(<Books />);
  const route = screen.getByTestId("route");
  expect(route).toBeInTheDocument();
})

// sort
test('sort by able to render', () => {
  render(<Books />);
  const sort = screen.getByTestId("sort");
  expect(sort).toBeInTheDocument();
})

// fetch
test('data fetch and able to get title', async () => {
  render(<Books />);
  // wait for response of fetching data
  await getStaticProps();
  // get first book title
  const title = await screen.getByTestId("book_title");
  // expect to be The Night The Moon Went Missing
  expect(title).toBe("The Night The Moon Went Missing");
})
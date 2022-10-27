import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
const Book = require("../../pages/books/[id]").default;
import { getServerSideProps } from "../../pages/books/[id]";


// route
test('route able to render', () => {
  render(<Book />);
  const route = screen.getByTestId("route");
  expect(route).toBeInTheDocument();
})

// fetch
// test_id: ckzjs2mp41uoy0b63aj5r5riq
test('data fetch and able to get title', async () => {
  render(<Book />);
  // wait for response of fetching data
  await getServerSideProps({ id: 'ckzjs1dy01tpx0c52zab5uzdk' });
  // get title
  const title = await screen.getByTestId("title");
  // expect to be Star Wars The Mandalorian Handbook
  expect(title).toBe("Star Wars The Mandalorian Handbook");
})
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
const Home = require("../pages/index").default;
import { getStaticProps } from "../pages";
import { handleInputOnFocus } from '../pages/index';


// search bar
test('Search bar able to render', () => {
  render(<Home />);
  const input = screen.getByTestId("search_bar");
  expect(input).toBeInTheDocument();
})

test('test input', async () => {
  render(<Home />);
  handleInputOnFocus();
  // get recommend element
  const recommend = await screen.getByTestId("recommend");
  // expect recommend element exsist (shown) in the page
  expect(recommend).toBeInTheDocument;
})

// search
test('"Search" text on button able to render', () => {
  render(<Home />);
  const text = screen.getByText("Search");
  expect(text).toBeInTheDocument();
})

test('Search button able to render', () => {
  render(<Home />);
  const button = screen.getByTestId("search");
  expect(button).toBeInTheDocument();
})

// view all books
test('"View all books" text on button able to render', () => {
  render(<Home />);
  const text = screen.getByText("View all books");
  expect(text).toBeInTheDocument();
})

test('view all books button able to render', () => {
  render(<Home />);
  const button = screen.getByTestId("view_all");
  expect(button).toBeInTheDocument();
})

// fetch
test('data fetch and able to get recommend box', async () => {
  render(<Home />);
  // wait for response of fetching data
  await getStaticProps();
  // get search bar element
  const input = screen.getByTestId("search_bar");
  // input "Mic" into the search bar
  input.value = "Mic";
  // get recommend element
  const recommend = await screen.getByTestId("recommend");
  // expect recommend element exsist (shown) in the page
  expect(recommend).toBeInTheDocument;
})
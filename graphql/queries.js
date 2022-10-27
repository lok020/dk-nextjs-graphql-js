import { gql } from 'graphql-request';

// init search on home page only return result with only id and title
export const INIT = gql`
{
  books {
    id
    title
    isbn
  }
}`

// search for /books to should off id, title, price, and imageUrl
export const ALL_BOOKS = gql`
{
  books {
    id
    title
    price
    imageUrl
  }
}`

export const ONE_BOOK = gql`
query Book($id: ID!){
  book(where: {id: $id}) {
    id
    title
    isbn
    price
    imageUrl
    description {
      markdown
      html
    }
  }
}`
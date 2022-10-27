// graphql
import graphql_client from '../../graphql/client';
import { ALL_BOOKS } from '../../graphql/queries';

// css
import styles from '../../styles/book_list.module.scss';

// nextjs
import Link from 'next/link';
import { useState } from 'react';

// fetch and get all books
export async function getStaticProps () {
  const data = await graphql_client.request(ALL_BOOKS);

  return {
    props: { data }
  }
}

export default function Books({data}) {
  const [books, setBooks] = useState(data?.books);               // books from the fetch data
  const [sort, setSort] = useState(0);                          // id from the sorting

  // sort books based on id, then set the books to the result
  const sortBy = (id) => {
    let result = JSON.parse(JSON.stringify(books));
    if (id == 1)  result.sort((a,b) => a.price - b.price) ;                         // Price - ascending (Low to High)
    else if (id == 2)  result.sort((a,b) => b.price - a.price) ;                    // Price - descending (High to Low)
    else if (id == 3)  result.sort((a,b) => a.title.localeCompare(b.title)) ;       // Name - ascending (a to z)
    else if (id == 4)  result.sort((a,b) => b.title.localeCompare(a.title)) ;       // Name - descending (z to a)
    setBooks(result);
  }

  // after select a option, set the id from the sorting, then call the sortBy function to sort based on the id
  const handleSelect = (e) => {
    let id = e.target.value;
    setSort(id);
    sortBy(id);
  }
  
  // play sound, for accessibility
  const playSound = () => {
    let sound = document.getElementById("myClick");
    sound.play();
  }

  return (
    <>
      <audio id={"myClick"}>
        <source src="/audio/hint.mp3" type="audio/mp3" />
      </audio>
      <div className={styles.route} data-testid="route">
        <Link href={"/"}>{"Home"}</Link>
        <p className={styles.arrow}>{" > "}</p>
        <p>{"Books"}</p>
      </div>
      <div className={styles.sortby} data-testid="sort">
        <label>Sort by:</label>
        <select value={sort} onChange={handleSelect}>
          <option value={0} disabled hidden>{"--- Choose ---"}</option>
          <option value={1}>{"Price - Low to High"}</option>
          <option value={2}>{"Price - High to Low"}</option>
          <option value={3}>{"Title - A to Z"}</option>
          <option value={4}>{"Title - Z to A"}</option>
        </select>
      </div>
      <div className={styles.grid}>
        {books?.map(({title, imageUrl, id, price}) => 
          <a key={id} href={"/books/" + id} className={styles.card} onMouseDown={() => playSound()}>
            <div className={styles.image_container}>
              <img src={imageUrl} className={styles.image}/>
            </div>
            <h2 className={styles.title} data-testid="book_title">{title}</h2>
            <p className={styles.price}>&#163; {price}</p>
          </a>
        )}
      </div>
    </>
  )
}
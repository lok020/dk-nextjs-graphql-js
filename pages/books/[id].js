// graphql
import graphql_client from '../../graphql/client';
import { ONE_BOOK } from '../../graphql/queries';

// css
import styles from '../../styles/book.module.scss';

// nextjs
import Link from 'next/link';

// fetch and get all books
export async function getServerSideProps({ params }){
  const data = await graphql_client.request(ONE_BOOK, params);

  return {
    props: { data }
  }
}

export default function Book({data}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.route} data-testid="route">
          <Link href={"/"}>{"Home"}</Link>
          <p className={styles.arrow}>{" > "}</p>
          <Link href={"/books/"}>{"Books"}</Link>
          <p className={styles.arrow}>{" > "}</p>
          <p data-testid="title">{data?.book?.title}</p>
        </div>
        <h1>{data?.book?.title}</h1>
        <img src={data?.book?.imageUrl}/>
        <div className={styles.info}>
          <div className={styles.block}>
            <strong>ISBN</strong>
            <p>{data?.book?.isbn}</p>
          </div>
          <div className={styles.block}>
            <strong>Price</strong>
            <p>&#163; {data?.book?.price}</p>
          </div>
        </div>
        <div className={styles.summary} dangerouslySetInnerHTML={{ __html: data?.book?.description?.html }}></div>
      </div>
    </>
  )
}
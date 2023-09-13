import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Fragment } from 'react';
import Link from 'next/link';
import Button from '../components/button';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>QueryGenius</title>
      </Head>
      <div className={`${styles.container}`}>
        <div className={`${styles.topbar}`}>
          <h1>QueryGenius</h1>
        </div>
        <div className={`${styles.body}`}>
          <form className={`${styles.form}`}>
            <Link href='/metagen'>
              <Button className={`${styles.redirbutton}`}>
                Metadata Generator
              </Button>
            </Link>
            <Link href='/sqlgen'>
              <Button className={`${styles.redirbutton}`}>SQL Generator</Button>
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

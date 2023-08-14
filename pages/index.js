import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Fragment } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>SQL GEN</title>
      </Head>
      <div className={`${styles.container}`}>
        <div className={`${styles.topbar}`}>
          <h1>Metadata And SQL Generator</h1>
        </div>
        <div className={`${styles.body}`}>
          <form className={`${styles.form}`}>
            <Link href='/metagen'>
              <button className={`${styles.redirbutton}`}>
                Metadata Generator
              </button>
            </Link>
            <Link href='/sqlgen'>
              <button className={`${styles.redirbutton}`}>SQL Generator</button>
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

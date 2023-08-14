import React, { Fragment } from 'react';
import Link from 'next/link';

import styles from '../../styles/components/Layout/Layout.module.css';

function layout(props) {
  return (
    <Fragment>
      <div className={`${styles.container}`}>
        <div className={`${styles.topbar}`}>
          <Link href='/'>
            <h1>{props.heading}</h1>
          </Link>
          <div>{props.red}</div>
        </div>
        <div className={`${styles.body}`}>{props.children}</div>
      </div>
    </Fragment>
  );
}

export default layout;

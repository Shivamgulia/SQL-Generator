import React, { Fragment } from 'react';

import styles from '../../styles/components/Layout/Layout.module.css';

function layout(props) {
  return (
    <Fragment>
      <div className={`${styles.container}`}>
        <div className={`${styles.topbar}`}>
          <h1>{props.heading}</h1>
        </div>
        <div className={`${styles.body}`}>{props.children}</div>
      </div>
    </Fragment>
  );
}

export default layout;

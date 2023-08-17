import React, { Fragment } from 'react';
import styles from './button.module.css';

function button(props) {
  return (
    <Fragment>
      <button class={`${styles.btn}`}>
        <span>{props.children}</span>
      </button>
    </Fragment>
  );
}

export default button;

import React, { useState } from 'react';
import Layout from '../components/Layout/layout';
import Link from 'next/link';

import styles from '../styles/pages/sqlgen.module.css';

function Sqlgen() {
  const [metadata, setMetadata] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  function submitionHandler(event) {
    event.preventDefault();
    if (input.replace(/\s+/g, '').length > 5) {
      setError(null);
      console.log(input);

      fetch('http://localhost:3000/api/gensql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: input }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Handle the data from the successful response
          console.log('Response data:', data);
          setMetadata(data.Response.text);
        })
        .catch((error) => {
          // Handle errors that occurred during the request
          console.error('Error:', error);
        });
    } else {
      setError('Please provide proper Input');
    }
  }

  console.log(metadata);

  return (
    <Layout
      heading={'SQL Generator'}
      red={
        <Link href='/metagen' className={`${styles.redirect}`}>
          <button className={`${styles.genbutton}`}>Metadata Generator</button>
        </Link>
      }
    >
      <div className={`${styles.container}`}>
        {error && <h2 className={`${styles.error}`}>{error}</h2>}
        <form className={`${styles.form}`} onSubmit={submitionHandler}>
          <textarea
            name=''
            id=''
            cols='30'
            rows='10'
            className={`${styles.text}`}
            placeholder='Write Your Query Here'
            onChange={(event) => {
              setInput(event.target.value);
            }}
          ></textarea>
          <button className={`${styles.genbutton}`} type='submit'>
            Generate SQL
          </button>
        </form>
        {metadata && (
          <div className={`${styles.generated}`}>
            <h3>Generated SQL</h3>
            <h4>{metadata}</h4>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Sqlgen;

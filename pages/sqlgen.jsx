import React, { useState } from 'react';
import Layout from '../components/Layout/layout';
import Link from 'next/link';

import Loaders from '../components/loaders';
import Button from '../components/button';

import styles from '../styles/pages/sqlgen.module.css';

// const url = "http://localhost:3000";
const url = 'https://sqlgen.vercel.app';

function Sqlgen() {
  const [metadata, setMetadata] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submitionHandler(event) {
    event.preventDefault();
    setLoading(true);
    if (input.replace(/\s+/g, '').length > 5) {
      setError(null);
      console.log(input);

      await fetch(`/api/gensql`, {
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
    setLoading(false);
  }

  const splitStrings = metadata.split('Description of SQL Query');
  var beforeDescription = '';
  var afterDescription = '';
  if (splitStrings.length === 2) {
    beforeDescription = splitStrings[0].trim();
    afterDescription = splitStrings[1].trim();
  } else {
    console.log(
      "The content 'Description of SQL Query' was not found in the input string."
    );
  }

  console.log(metadata);

  return (
    <Layout
      heading={'SQL Generator'}
      red={
        <Link href='/metagen' className={`${styles.redirect}`}>
          <Button className={`${styles.genbutton}`}>Metadata Generator</Button>
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

        {loading && (
          <div style={{ margin: '20px' }}>
            <Loaders />
          </div>
        )}

        {metadata && (
          <div className={`${styles.generated}`}>
            <h3>Generated SQL</h3>
            {/* <h4>{metadata}</h4> */}
            <h4>{beforeDescription}</h4>
            <h4>{'Descreption ' + afterDescription}</h4>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Sqlgen;

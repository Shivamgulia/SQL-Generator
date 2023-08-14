import React, { Fragment, useState } from 'react';
import Layout from '../components/Layout/layout';

import styles from '../styles/pages/metagen.module.css';

function metagen() {
  const [metadata, setMetadata] = useState('');
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  function submitionHandler(event) {
    event.preventDefault();
    if (input.replace(/\s+/g, '').length > 5) {
      setError(null);
      console.log(input);

      fetch('http://localhost:3000/api/createmeta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
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

  function saveHandler(event) {
    event.preventDefault();

    if (name.replace(/\s+/g, '').length > 0) {
      fetch('http://localhost:3000/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: metadata, name: name }),
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
      setError('Provide Proper Name');
    }
  }

  console.log(metadata);

  return (
    <Layout heading={'Meta Data Generator'}>
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
            Generate Metadata
          </button>
        </form>

        {metadata && (
          <div className={`${styles.generated}`}>
            <h3>Generated Metadata</h3>
            <h4>{metadata}</h4>
            <form className={`${styles.form}`} onSubmit={saveHandler}>
              <input
                type='text'
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <button className={`${styles.genbutton}`} type='submit'>
                Save Metadata
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default metagen;
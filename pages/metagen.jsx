import React, { Fragment, useState } from 'react';
import Layout from '../components/Layout/layout';
import Link from 'next/link';

import Loaders from '../components/loaders';
import JsonFormatter from 'react-json-formatter';
import Button from '../components/button';

import styles from '../styles/pages/metagen.module.css';

// const url = "http://localhost:3000";
const url = 'https://sqlgen.vercel.app';

function Metagen() {
  const [metadata, setMetadata] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  async function submitionHandler(event) {
    event.preventDefault();
    if (input.replace(/\s+/g, '').length > 5) {
      setError(null);
      console.log(input);

      setIsLoading(true);

      fetch(`/api/createmeta`, {
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
          setIsLoading(false);
        })
        .catch((error) => {
          // Handle errors that occurred during the request
          console.error('Error:', error);
        });
    } else {
      setError('Please provide proper Input');
    }
  }

  async function saveHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    if (name.replace(/\s+/g, '').length > 0) {
      fetch(`/api/save`, {
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
          setIsLoading(false);
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
  const jsonStyle = {
    propertyStyle: { color: 'maroon' },
    stringStyle: { color: 'blue' },
    numberStyle: { color: 'darkorange' },
  };
  return (
    <Layout
      heading={'Meta Data Generator'}
      red={
        <Link href='/sqlgen' className={`${styles.redirect}`}>
          <Button className={`${styles.genbutton}`}>SQL Generator</Button>
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
            Generate Metadata
          </button>
        </form>
        <div style={{ margin: '20px' }}>{isLoading && <Loaders />}</div>
        {metadata && (
          <div className={`${styles.generated}`}>
            <h3>Generated Metadata</h3>
            <h4>
              {
                <JsonFormatter
                  json={metadata}
                  tabWith={5}
                  jsonStyle={jsonStyle}
                />
              }
            </h4>
            <form className={`${styles.form}`} onSubmit={saveHandler}>
              <input
                type='text'
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder='Table Name'
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

export default Metagen;

import React, { useState } from 'react';
import Search from './search/Search';
import './services.css';

export default function Services() {
  const [users, setUsers] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const updateSearchState = (stateObj) => {
    setUsers(stateObj.users);
    setIsFirst(stateObj.isFirst);
    setIsLoading(stateObj.isLoading);
    setErr(stateObj.err);
  };

  return (
    <section id='services'>
    <div className='services__container'>
      <Search updateSearchState={updateSearchState} />
      <div className='row_card'>
        {isFirst ? (
          <h2>歡迎使用搜尋功能</h2>
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : err ? (
          <h2 style={{ color: 'red' }}>{err}</h2>
        ) : (
          users.map((userObj) => {
            return (
              <div key={userObj.id} className='card'>
                <a rel='noreferrer' href={userObj.html_url} target='_blank'>
                  <img alt='頭像' src={userObj.avatar_url}  />
                </a>
                <p className='card-text'>{userObj.login} </p>
              </div>
            );
          })
        )}
      </div>
    </div>
    </section>
  );
}



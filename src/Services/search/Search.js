import React, { useState } from 'react';
import axios from 'axios';
import {FiSearch} from 'react-icons/fi';

export default function Services({ updateSearchState }) {
  const [keyWord, setKeyWord] = useState('');

  const search = () => {
    console.log(keyWord);
    
    axios
      .get(`https://api.github.com/search/users?q=${keyWord}`)
      .then(
        (response) => {
          updateSearchState({ isLoading: false, users: response.data.items });
          console.log(response.data);
        },
        (error) => {
          updateSearchState({ isLoading: false, err: error.message });
        }
      );
  };

  return (
      <div className='github_header'>
      <h3>Search Github Users In English</h3>
      <div>
        <input
        className='github_input'
          type='text'
          placeholder='輸入關鍵詞'
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <button  className='github_btn' onClick={search}><FiSearch /></button>
      </div>
      </div>
  );
}

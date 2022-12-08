import React from 'react';
import DuckCard from './DuckCard.js';
import data from '../data.js';
import './styles/DuckList.css';

function DuckList() {
  return (
    <div className="duck-list">
      {
        data.ducks.map((duck) => {
          return (
            <DuckCard duck={duck} key={duck.id}/>
          );
        })
      }
    </div>
  );
}

export default DuckList;

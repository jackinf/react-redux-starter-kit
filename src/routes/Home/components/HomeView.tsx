import * as React from 'react';
declare const require;
import './HomeView.scss'
const DuckImage = require('../assets/Duck.jpg');

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={DuckImage} />
  </div>
);

export default HomeView

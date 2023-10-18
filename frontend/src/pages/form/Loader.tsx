import React from 'react';
import loading from './Loading.module.css';

const Loader: React.FC = () => (
  <div>
    <div className={loading.hourglass}></div>
    <p className={loading.text}>Adding a new course ..</p>
  </div>
);

export default Loader;

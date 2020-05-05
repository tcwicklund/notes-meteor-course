import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Status 404 - Page Not Found</h1>
        <p>We're unable to find that page.</p>
        <Link to="/" className="button button--link">Head Home</Link>
      </div>
    </div>
  )
}

// export const Signup = () => (
//   <p>Signup component here</p>
// );

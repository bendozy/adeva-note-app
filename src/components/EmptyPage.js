import React from 'react';
import PropTypes from 'prop-types';

const EmptyPage = ({ title, text }) => (
  <div>
    <h1>{title}</h1>
    <p>{text}</p>
  </div>
);

EmptyPage.defaultProps = {
  title: 'Page Not Found',
  text: 'The requested url could not be found',
};

EmptyPage.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default EmptyPage;

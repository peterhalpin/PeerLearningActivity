import React from 'react';
import PropTypes from 'prop-types';
import styles from './TogetherButton.module.css';

const TogetherButton = () => (
  <div className={styles.TogetherButton} data-testid="TogetherButton">
    TogetherButton Component
  </div>
);

TogetherButton.propTypes = {};

TogetherButton.defaultProps = {};

export default TogetherButton;

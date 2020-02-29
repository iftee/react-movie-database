import React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import { FiPlusCircle, FiPlus } from 'react-icons/fi';
import './LoadMoreButton.scss';

const LoadMoreButton = ({ onClick, text }) => {
  return(
    <div className="load-more-button-wrapper">
      <Button onClick={onClick}>
        <FiPlusCircle />
        <FiPlus />
        {text}        
      </Button>
    </div>
  )
}

export default LoadMoreButton;
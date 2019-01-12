import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import isNil from 'lodash/fp/isNil';


const styles = theme => ({
    
    '@global': {
        'body': { overflow: 'hidden' },
      },
      
      // The modal wrapper: absolute positioning,
      // 100% of the browser window height and width.
      modalOverlay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '9999',
        opacity: 1,
        overflowX: 'auto',
        overflowY: 'scroll',
        animation: 'show .5s ease',
        paddingTop: '300px',
        boxSizing: 'content-box',
      },
      
      // Fade-in open animation
      '@keyframes show': {
        '0%': {
          display: 'none',
          opacity: 0,
        },
        '1%': {
          display: 'flex',
          opacity: 0,
        },
        '100%': {
          opacity: 1,
        },
      },
    
      // The modal window: a empty div, vertical and horizontal cenetered.
      modal: {
        width: '70%',
        backgroundColor: '#fff',
        boxShadow: [0, 0, '0.625rem', 'rgba(0, 0, 0, 0.2)'],
    
        
      },
    
      // The close button: absolute positioning on top left of the
      // browser window, white background square with a gray X.
      closeButton: {
        position: 'fixed',
        top: 0,
        right: 0,
        background: '#fff',
        width: '2.5rem',
        height: '2.5rem',
        padding: 0,
        border: 0,
        cursor: 'pointer',
        outline: 0,
        boxShadow: [0, 0, '0.625rem', 'rgba(0, 0, 0, 0.2)'],
    
        '&:before, &:after': {
          content: '""',
          position: 'absolute',
          top: '1.2rem',
          left: '0.25rem',
          width: '2rem',
          height: '0.1rem',
          backgroundColor: '#888',
        },
    
        '&:before': { transform: 'rotate(45deg)' },
        '&:after': { transform: 'rotate(-45deg)' },
    
        '&:hover:before, &:hover:after': {
          backgroundColor: '#444',
        },
      },
    
  });
// Declaration of the component as React Class Component
class SimpleModal extends Component {
  
  // Init of the component before it is mounted.
  constructor(props) {
    super(props);

   
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  
  // Add listeners immediately after the component is mounted.
  componentDidMount() {
    
    document.addEventListener('click', this.handleOutsideClick, false);
    //console.log(this.props)
  }

  // Remove listeners immediately before a component is unmounted and destroyed.
  componentWillUnmount() {
  
    document.removeEventListener('click', this.handleOutsideClick, false);
  }
  
  // Handle the key press event.

  
  // Handle the mouse click on browser window.
  handleOutsideClick(e) {
    const { onCloseRequest } = this.props;

    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onCloseRequest();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }
  
  // Render the component passing onCloseRequest and children as props.
  render () {
    const {
      onCloseRequest,
      children,
       classes ,
    } = this.props;
    
    
    return (
      <div className={classes.modalOverlay}>
        <div
          className={classes.modal}
          ref={node => (this.modal = node)}
        >
          <div className={classes.modalContent}>
            {children}
          </div>
        </div>

        <button
          type="button"
          className={classes.closeButton}
          onClick={onCloseRequest}
        />
      </div>
    );
  }
}

// Export the component to use it in other components.

SimpleModal
.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SimpleModal
);
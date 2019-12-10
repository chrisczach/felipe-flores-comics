import React from 'react';
import {
  TransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group';

const timeout = 100;
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    // transform: 'translateY(-60px)',
    filter: `blur(12px) saturate(0)`,
    opacity: .0,
  },
  entered: {
    transition: `all ${timeout}ms ease-in-out`,
    // transform: 'rotate(0deg)',
     filter: `blur(0) saturate(1)`,
    opacity: 1,
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
    // transform: 'translateY(-60px)',
    filter: `blur(12px) saturate(0)`,
    opacity: 0,
  },
};

const PageTransition = ({ children, location }) => {
  return (
    <TransitionGroup>
      <ReactTransition
        key={location.pathname}
        timeout={{
          enter: timeout,
          exit: timeout,
        }}
      >
        {status => (
          <div
            style={{
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};

export default PageTransition;

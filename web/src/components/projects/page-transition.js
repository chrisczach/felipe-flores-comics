import React from 'react'
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"

const timeout = 200
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    transform: 'rotate(90deg) scale(0)',
    opacity: 0,
  },
  entered: {
    transition: `all ${ timeout }ms ease-in-out`,
    transformOrigin: 'center bottom',
    transform: 'rotate(0deg) scale(1)',
    opacity: 1,
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
    transform: 'rotate(-270deg) scale(0)',
    opacity: 1,
  },
}


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
  )
}

export default PageTransition

# use-state-machine

This is a state machine trapped inside a React hook.

## How To Use It

To use it you have to provide a state machine definition to the hook. In return, it will provide you with the current state, actions to trigger transitions from state to state and utility functions to query the state.

The state machine definition describes two things:

- What the possible states are
- What are the valid transitions from state to state

## State Machine Definition

A state machine definition is composed of the following:

- A state interface
- A type with the possible states for the state machine (state names)
- A type with the possible actions for the state machine (transition names)
- A map of the concrete possible states
- A list describing the edges that link possible states to each other via actions

## To Do

- [ ] Document the interface thoroughly
- [ ] Add more tests using react-hooks-testing-library
- [ ] Explore property based testing approaches
- [ ] Publish to NPM

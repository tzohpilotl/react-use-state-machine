# use-state-machine

This is a state machine trapped inside a React hook.

## How To Use It

To use it you have to provide a state machine definition to the hook. In return, it will provide you with the current state, actions to trigger transitions from state to state and utility functions to query the state.

The state machine definition describes two things:

- What the possible states are
- What are the valid transitions from state to state

**The machine state will use the first state as the initial state**

## State Machine Definition

A state machine definition is composed of the following:

- A state interface
- A type with the possible states for the state machine (state names)
- A type with the possible actions for the state machine (transition names)
- A map of the concrete possible states
- A list describing the edges that link possible states to each other via actions

### State Machine Definition Example

`stateMachine.ts`
This definition describes a state machine that can be in one of two states
: "on" or "off". It has two transitions, one to transition from the "on
" state to the "off" state: "turnOff"; and another one to transiton from the
"off" state to the "on" state: "turnOn".

```typescript
import {
  StateMachineState,
  StateMachineStates,
} from "@react/use-state -machine";

interface Transition<S, T> {
  from: keyof S;
  to: keyof S;
  via: T;
}

export type State = {
  active: boolean;
};

export type States = {
  on: StateMachineState<State, StateMachineStates<State>>;
  off: StateMachineState<State, StateMachineStates<State>>;
};

export type Transitions = "turnOn" | "turnOff";

export const states: States = {
  on: {
    name: "on",
    state: {
      active: true,
    },
  },
  off: {
    name: "off",
    state: {
      active: false,
    },
  },
};

export const edges: Transition<States, Transitions>[] = [
  {
    from: states.on.name as keyof States,
    to: states.off.name as keyof States,
    via: "turnOff",
  },
  {
    from: states.off.name as keyof States,
    to: states.on.name as keyof States,
    via: "turnOn",
  },
];
```

`component.tsx`
This component configures the hook and uses the state machine's state and
transitions in it's render function.

```typescript jsx
import React from "react";
import { useStateMachine } from "@react/use-state-machine";
import { states, edges, State, States, Transitions } from "./stateMachine";

const Component = () => {
  // state -> { active: boolean }
  // transitions -> { turnOn: () => void, turnOff: () => void }
  const [state, transitions] = useStateMachine<State, States, Transitions>({
    states,
    edges,
  });

  /* "turnOn" will only "work" when the machine is in "off" state and
 "turnOff" will only "work" when the machine is in "on" state. */

  return state.active ? (
    <div>
      <button onClick={transitions.turnOff}>Bye</button>
      Hello
    </div>
  ) : null;
};
```

## To Do

- [ ] Document the interface thoroughly
- [ ] Add more tests using react-hooks-testing-library
- [ ] Explore property based testing approaches
- [ ] Publish to NPM

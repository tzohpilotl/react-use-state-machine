import { StateMachineState, StateMachineStates } from "../useStateMachine";

interface Transition<S, T> {
  from: keyof S;
  to: keyof S;
  via: T;
}

// TODO: Check if this can be re enabled
// Can't use this because of
// https://github.com/microsoft/TypeScript/issues/15300 export interface States
// extends StateMachineStates<State> { on: StateMachineState<State, States>,
// off: StateMachineState<State, States>, };

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

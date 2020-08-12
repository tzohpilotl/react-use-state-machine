import {Dispatch, useReducer, Reducer} from "react";

interface Action<AT> {
  type: AT;
}

export interface StateMachineState<State, States> {
  state: State;
  name: Extract<keyof States, string>;
}

interface StateMachineDefinition<States, Transitions> {
  from: keyof States;
  to: keyof States;
  via: Transitions;
}

interface UseStateMachine<States, Transitions> {
  states: States;
  edges: StateMachineDefinition<States, Transitions>[];
}

export interface StateMachineStates<State> {
  [k: string]: StateMachineState<State, StateMachineStates<State>>
}

type Graph<S, T extends string> = {
  [K in keyof S]: { [V in T]: keyof S };
};

function buildGraph<States extends {},
  Transitions extends string>(edges: UseStateMachine<States, Transitions>["edges"]): Graph<States, Transitions> {
  return edges.reduce((acc, {from, to, via}) => ({
    ...acc,
    [from]: {...acc[from], [via]: to},
  }), {} as Graph<States, Transitions>);
}

function createReducer<State extends {},
  States extends StateMachineStates<State>,
  Transitions extends string>(
  states: UseStateMachine<States, Transitions>["states"],
  graph: Graph<States, Transitions>,
) {
  return (
    state: StateMachineState<State, States>,
    action: Action<Transitions>,
  ): StateMachineState<State, States> => {
    const currentStateTransitions = graph[state.name];

    if (!currentStateTransitions || !currentStateTransitions.hasOwnProperty(
      action.type)) {
      return state;
    }

    const nextState = currentStateTransitions[action.type];
    return states[nextState];
  };
}

function generateMutations<State extends {},
  States extends StateMachineStates<State>,
  Transitions extends string>(
  edges: UseStateMachine<States, Transitions>["edges"],
  dispatch: Dispatch<Action<Transitions>>,
) {
  return edges.reduce((acc, {via}) => ({
    ...acc,
    [via]: () => dispatch({type: via}),
  }), {} as { [key in Transitions]: () => void });
}

function getInitialState<State>(states: StateMachineStates<State>) {
  const stateName = Object.keys(states)[0];
  return states[stateName];
}

function useStateMachine<State extends {},
  States extends StateMachineStates<State>,
  Transitions extends string>({
                                states,
                                edges,
                              }: UseStateMachine<States, Transitions>): [
  State,
  { [key in Transitions]: () => void }
] {
  const graph = buildGraph<States, Transitions>(edges);
  const reducer = createReducer<State, States, Transitions>(
    states, graph);
  const [state, dispatch] = useReducer<Reducer<StateMachineState<State, States>, Action<Transitions>>>(
    reducer,
    getInitialState(states),
  );
  const mutations = generateMutations<State, States, Transitions>(edges,
                                                                  dispatch);
  return [state.state, mutations];
}

export {useStateMachine};

import { Dispatch, useReducer } from "react";

interface Action<AT> {
  type: AT;
}

interface StateMachineDefinition<PossibleStates, ActionType> {
  from: PossibleStates;
  to: PossibleStates;
  via: ActionType;
}

interface UseStateMachine<ExternalState, PossibleStates, ActionType> {
  states: Map<PossibleStates, ExternalState>;
  edges: StateMachineDefinition<PossibleStates, ActionType>[];
}

interface LocalState<ExternalState, PossibleStates> {
  value: ExternalState;
  name: PossibleStates;
}

function buildGraph<
  ExternalState extends any,
  PossibleStates extends string,
  ActionTypes extends string
>(edges: UseStateMachine<ExternalState, PossibleStates, ActionTypes>["edges"]) {
  const graph = new Map<PossibleStates, Map<ActionTypes, PossibleStates>>();
  edges.forEach(function({ from, to, via }) {
    const currentTransitions = graph.get(from);
    const transitions = currentTransitions
      ? new Map([...currentTransitions, [via, to]])
      : new Map([[via, to]]);
    graph.set(from, transitions);
  });
  return graph;
}

function createReducer<
  ExternalState extends any,
  PossibleStates extends string,
  ActionTypes extends string
>(
  states: UseStateMachine<ExternalState, PossibleStates, ActionTypes>["states"],
  graph: Map<PossibleStates, NonNullable<Map<ActionTypes, PossibleStates>>>
) {
  return function(
    state: LocalState<ExternalState, PossibleStates>,
    action: Action<ActionTypes>
  ): LocalState<ExternalState, PossibleStates> {
    const currentStateTransitions = graph.get(state.name);
    /* TODO: Deal with states that don't have a transition */
    if (currentStateTransitions) {
      if (currentStateTransitions.has(action.type)) {
        /* TODO: Use .has as null check
         * See https://github.com/microsoft/TypeScript/issues/9619
         */
        const name = currentStateTransitions.get(action.type);
        /* TODO: Convince the compiler we won't have extraneous state names */
        // @ts-ignore
        const value = states.get(name);
        // @ts-ignore
        return { value, name };
      }
    }
    return state;
  };
}

function generateMutations<
  ExternalState extends any,
  PossibleStates extends string,
  ActionTypes extends string
>(
  edges: UseStateMachine<ExternalState, PossibleStates, ActionTypes>["edges"],
  dispatch: Dispatch<Action<ActionTypes>>
) {
  const mutations = {} as { [key in ActionTypes]: () => void };
  const verbs = edges.map(edge => edge.via);
  verbs.forEach(function(verb) {
    /* TODO: Find a way to be able to call .toLowerCase on verb here
     * This limits us to define ActionTypes in lowercase because we'd get a
     * TypeError when trying to destructure like { action1, action2 } (even if
     * it'd work) when using "ACTION1 | ACTION2" as ActionTypes.
     */
    mutations[verb] = () => {
      dispatch({ type: verb });
    };
  });
  return mutations;
}

function getInitialState<K, V, T extends Map<K, V>>(states: T) {
  const state = states.entries().next().value;
  return {
    name: state[0],
    value: state[1]
  };
}

function useStateMachine<
  ExternalState extends any,
  PossibleStates extends string,
  ActionTypes extends string
>({
  states,
  edges
}: UseStateMachine<ExternalState, PossibleStates, ActionTypes>): [
  ExternalState,
  { [key in ActionTypes]: () => void }
] {
  const graph = buildGraph<ExternalState, PossibleStates, ActionTypes>(edges);
  const [state, dispatch] = useReducer(
    createReducer(states, graph),
    getInitialState(states)
  );
  const mutations = generateMutations(edges, dispatch);
  return [state.value, mutations];
}

export { useStateMachine };

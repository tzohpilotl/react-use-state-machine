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
    [k: string]: StateMachineState<State, StateMachineStates<State>>;
}
declare function useStateMachine<State extends Record<string, unknown>, States extends StateMachineStates<State>, Transitions extends string>({ states, edges, }: UseStateMachine<States, Transitions>): [State, {
    [key in Transitions]: () => void;
}];
export { useStateMachine };

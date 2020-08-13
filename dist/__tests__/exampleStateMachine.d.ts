import { StateMachineState, StateMachineStates } from "../useStateMachine";
interface Transition<S, T> {
    from: keyof S;
    to: keyof S;
    via: T;
}
export declare type State = {
    active: boolean;
};
export declare type States = {
    on: StateMachineState<State, StateMachineStates<State>>;
    off: StateMachineState<State, StateMachineStates<State>>;
};
export declare type Transitions = "turnOn" | "turnOff";
export declare const states: States;
export declare const edges: Transition<States, Transitions>[];
export {};

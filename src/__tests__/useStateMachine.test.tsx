import test from "ava";
import { renderHook, act } from "@testing-library/react-hooks";
import { useStateMachine } from "../useStateMachine";
import {
  states,
  edges,
  State,
  States,
  Transitions,
} from "./exampleStateMachine";

test("useStateMachine() changes the state if the state machine definition allows", (t) => {
  const { result } = renderHook(() =>
    useStateMachine<State, States, Transitions>({ states, edges })
  );

  let [state, transitions] = result.current;

  t.true(state.active);

  act(() => {
    transitions.turnOff();
  });
  console.log("state", state);

  [state, transitions] = result.current;

  t.false(state.active);
});

test("useStateMachine() does not change the state if the state machine definition doesn't allow it", (t) => {
  const { result } = renderHook(() =>
    useStateMachine<State, States, Transitions>({ states, edges })
  );

  let [state, transitions] = result.current;

  t.true(state.active);

  act(() => {
    transitions.turnOn();
  });

  [state, transitions] = result.current;

  t.true(state.active);
});

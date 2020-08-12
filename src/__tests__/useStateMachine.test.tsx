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

  t.true(result.current[0].active);

  act(() => {
    result.current[1].turnOff();
  });

  t.false(result.current[0].active);
});

test("useStateMachine() does not change the state if the state machine definition doesn't allow it", (t) => {
  const { result } = renderHook(() =>
    useStateMachine<State, States, Transitions>({ states, edges })
  );

  t.true(result.current[0].active);

  act(() => {
    result.current[1].turnOn();
  });

  t.true(result.current[0].active);
});

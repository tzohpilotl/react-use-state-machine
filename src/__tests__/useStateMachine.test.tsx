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

test("useStateMachine()", (t) => {
  const { result } = renderHook(() =>
    useStateMachine<State, States, Transitions>({ states, edges })
  );

  t.true(result.current[0].active);

  act(() => {
    result.current[1].turnOff();
  });

  t.false(result.current[0].active);
});

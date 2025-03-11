import { describe, it, expect} from 'vitest';
import { createRoutesStub } from "react-router";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LogIn } from "./Log-in";

test("LoginForm renders error messages", async () => {
  const USER_MESSAGE = "Username is required";
  const PASSWORD_MESSAGE = "Password is required";

  const Stub = createRoutesStub([
    {
      path: "/log-in",
      Component: LogIn,
      action() {
        return {
          errors: {
            username: USER_MESSAGE,
            password: PASSWORD_MESSAGE,
          },
        };
      },
    },
  ]);

  // render the app stub at "/login"
  render(<Stub initialEntries={["/log-in"]} />);

  // simulate interactions
  userEvent.click(screen.getByText("log-in"));
  
});

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});
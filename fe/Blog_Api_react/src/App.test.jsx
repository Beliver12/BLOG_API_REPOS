import { expect, vi, test} from 'vitest';

import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import "@testing-library/jest-dom";
import {App} from "./App";
import {Signup} from "./Signup"

global.fetch = vi.fn().mockResolvedValue({json: () => ({res: "hello"})});


test("event route", async () => {
  const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        { path: 'signup', element: <Signup /> },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/"],
    initialIndex: 1,
  });
  
  render(<RouterProvider router={router} />);
  
  await waitFor(() => screen.getAllByRole("heading"));
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent(
    "MY-BLOG"
  );
  screen.debug()
});

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});
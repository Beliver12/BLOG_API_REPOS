import { describe, it, expect} from 'vitest';
import { createRoutesStub } from "react-router";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LogIn } from "./Log-in";
import {CommentPost} from "./CommentPost"
import { Link, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import * as React from "react";
import "@testing-library/jest-dom";
import {App} from "./App";
import {Signup} from "./Signup"

test("event route", async () => {
  const FAKE_EVENT = { name: "test event" };
  const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        { path: 'signup', element: <Signup /> },
      ],
      loader: () => FAKE_EVENT,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/"],
    initialIndex: 1,
  });
  <BrowserRouter>
  render(<RouterProvider router={router} />);
  </BrowserRouter>
  await waitFor(() => screen.getByRole("heading"));
  expect(screen.getByRole("heading")).toHaveTextContent(
    FAKE_EVENT.name
  );
});

describe('LogIn', () => {
  it('renders LogIn component', () => {
    <BrowserRouter>
    render(<LogIn />);
    </BrowserRouter>
  });
});

describe('CommentPost', () => {
  it('renders CommentPost component', () => {
    <BrowserRouter>
    render(<CommentPost />);
    </BrowserRouter>
  });
});


describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});
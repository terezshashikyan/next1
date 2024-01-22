"use client";

import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxWrapper;

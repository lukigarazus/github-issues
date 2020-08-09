import React, { ChangeEvent, useState, useCallback } from "react";

import Issues from "./components/issues";

import "./styles.css";

export default () => {
  const [state, setState] = useState({
    user: "facebook",
    repo: "react",
    issuesKey: "facebook/react",
  });
  const setValue = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({
      ...state,
      [ev.target.getAttribute("id") as string]: ev.target.value,
    }));
  }, []);
  const setIssueKey = useCallback(() => {
    setState((state) => ({
      ...state,
      issuesKey: `${state.user}/${state.repo}`,
    }));
  }, []);
  return (
    <div className="app">
      <div className="config">
        <div className="config__element">
          <label htmlFor="user">User</label>
          <input id="user" value={state.user} onChange={setValue} />
        </div>
        <div className="config__element">
          <label htmlFor="repo">Repo</label>
          <input id="repo" value={state.repo} onChange={setValue} />
        </div>
        <div className="config__element">
          <div></div>
          <button onClick={setIssueKey}>Get the issues</button>
        </div>
      </div>
      <Issues key={state.issuesKey} user={state.user} repo={state.repo} />
    </div>
  );
};

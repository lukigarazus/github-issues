import AppModel from "./issuesModel";

const waitUntil = async (predicate, i = 0) => {
  if (i > 10) throw new Error("Timeout");
  if (predicate()) {
    return;
  }
  await new Promise((r) => setTimeout(r, 500));
  waitUntil(predicate, i + 1);
};

it("App model fetches issues and behaves correctly", async () => {
  const mockSuccessResponse = [
    {
      url: "https://api.github.com/repos/facebook/react/issues/19549",
      repository_url: "https://api.github.com/repos/facebook/react",
      labels_url:
        "https://api.github.com/repos/facebook/react/issues/19549/labels{/name}",
      comments_url:
        "https://api.github.com/repos/facebook/react/issues/19549/comments",
      events_url:
        "https://api.github.com/repos/facebook/react/issues/19549/events",
      html_url: "https://github.com/facebook/react/pull/19549",
      id: 674477716,
      node_id: "MDExOlB1bGxSZXF1ZXN0NDY0MTYzMjMw",
      number: 19549,
      title: "extra symbol",
      user: {
        login: "andrii-frankiv",
        id: 5855131,
        node_id: "MDQ6VXNlcjU4NTUxMzE=",
        avatar_url: "https://avatars0.githubusercontent.com/u/5855131?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/andrii-frankiv",
        html_url: "https://github.com/andrii-frankiv",
        followers_url: "https://api.github.com/users/andrii-frankiv/followers",
        following_url:
          "https://api.github.com/users/andrii-frankiv/following{/other_user}",
        gists_url:
          "https://api.github.com/users/andrii-frankiv/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/andrii-frankiv/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/andrii-frankiv/subscriptions",
        organizations_url: "https://api.github.com/users/andrii-frankiv/orgs",
        repos_url: "https://api.github.com/users/andrii-frankiv/repos",
        events_url:
          "https://api.github.com/users/andrii-frankiv/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/andrii-frankiv/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 1,
      created_at: "2020-08-06T17:19:15Z",
      updated_at: "2020-08-06T17:21:24Z",
      closed_at: null,
      author_association: "NONE",
      active_lock_reason: null,
      pull_request: {
        url: "https://api.github.com/repos/facebook/react/pulls/19549",
        html_url: "https://github.com/facebook/react/pull/19549",
        diff_url: "https://github.com/facebook/react/pull/19549.diff",
        patch_url: "https://github.com/facebook/react/pull/19549.patch",
      },
      body:
        "<!--\r\n  Thanks for submitting a pull request!\r\n  We appreciate you spending the time to work on these changes. Please provide enough information so that others can review your pull request. The three fields below are mandatory.\r\n\r\n  Before submitting a pull request, please make sure the following is done:\r\n\r\n  1. Fork [the repository](https://github.com/facebook/react) and create your branch from `master`.\r\n  2. Run `yarn` in the repository root.\r\n  3. If you've fixed a bug or added code that should be tested, add tests!\r\n  4. Ensure the test suite passes (`yarn test`). Tip: `yarn test --watch TestName` is helpful in development.\r\n  5. Run `yarn test-prod` to test in the production environment. It supports the same options as `yarn test`.\r\n  6. If you need a debugger, run `yarn debug-test --watch TestName`, open `chrome://inspect`, and press \"Inspect\".\r\n  7. Format your code with [prettier](https://github.com/prettier/prettier) (`yarn prettier`).\r\n  8. Make sure your code lints (`yarn lint`). Tip: `yarn linc` to only check changed files.\r\n  9. Run the [Flow](https://flowtype.org/) type checks (`yarn flow`).\r\n  10. If you haven't already, complete the CLA.\r\n\r\n  Learn more about contributing: https://reactjs.org/docs/how-to-contribute.html\r\n-->\r\n\r\n## Summary\r\n\r\n<!-- Explain the **motivation** for making this change. What existing problem does the pull request solve? -->\r\n\r\n## Test Plan\r\n\r\n<!-- Demonstrate the code is solid. Example: The exact commands you ran and their output, screenshots / videos if the pull request changes the user interface. -->\r\n",
      performed_via_github_app: null,
    },
  ];
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

  const model = new AppModel({ user: "facebook", repo: "react" });

  await waitUntil(() => model.issues.length);

  expect(model.issues.length).toBe(1);
  expect(model.issuesToDisplay.length).toBe(1);
  expect(model.issues[0].date.fromNow()).toMatch("ago");
  expect(model.getOpenAndClosedIssues()).toEqual({ open: 1, closed: 0 });
});

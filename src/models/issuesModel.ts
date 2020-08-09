import { observable, action, computed } from "mobx";

import IssueModel from "./issueModel";
import { IIssueServer } from "../types";

class IssuesModel {
  private user: string;
  private repo: string;

  @observable
  public issues = observable.array();
  @observable
  public loading = true;
  @observable
  public error: string | void = undefined;
  @observable
  public detailsOpen: IssueModel | void = undefined;

  @computed
  public get issuesToDisplay() {
    // client-side filters would be implemented here
    return this.issues;
  }

  @computed
  public get openAndClosedIssues() {
    return (
      this.issues.reduce(
        (acc: { open: number; closed: number }, issue: IssueModel) => {
          if (issue.open) acc.open++;
          else acc.closed++;
          return acc;
        },
        { open: 0, closed: 0 }
      ) || { open: 0, closed: 0 }
    );
  }

  constructor({ user, repo }: { user: string; repo: string }) {
    this.user = user;
    this.repo = repo;
    this.fetchIssues();
  }

  @action
  public fetchIssues = () => {
    this.setLoading(true);
    fetch(`https://api.github.com/repos/${this.user}/${this.repo}/issues`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          this.error = res.message;
          this.setLoading(false);
          return;
        } // Api rate, most likely
        this.issues.push(
          ...res.map(
            (resObj: IIssueServer) => new IssueModel(resObj, this.openDetails)
          )
        );
        this.setLoading(false);
      });
  };

  @action
  public closeDetails = () => {
    this.detailsOpen = undefined;
  };

  @action
  public openDetails = (issueModel: IssueModel) => {
    this.detailsOpen = issueModel;
  };

  @action
  public setLoading = (value: boolean) => {
    this.loading = value;
  };

  // This is used in order to avoid the whole app relying on a computed property. Arrow to preserve context
  public getOpenAndClosedIssues = () => {
    return this.openAndClosedIssues;
  };
}

export default IssuesModel;

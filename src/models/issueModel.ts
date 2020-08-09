import moment, { Moment } from "moment";
import { observable, action } from "mobx";

import { IIssueServer, IUser, IComment } from "../types";

class IssueModel {
  public id: number;
  public date: Moment;
  public open: boolean;
  public body: string;
  public user: IUser;
  public title: string;
  public commentsUrl: string;
  public openDetails: () => void;

  @observable
  public comments: IComment[] = observable.array();

  constructor(
    serverObj: IIssueServer,
    openDetails: (issueModel: IssueModel) => void
  ) {
    this.id = serverObj.id;
    this.date = moment(serverObj.created_at);
    this.body = serverObj.body;
    this.user = serverObj.user;
    this.title = serverObj.title;
    this.open = serverObj.state === "open";
    this.commentsUrl = serverObj.comments_url;
    this.openDetails = () => openDetails(this);
    // Need this at this point to display comment count, maybe there's a better way
    this.fetchComments();
  }

  @action
  private fetchComments() {
    fetch(this.commentsUrl)
      .then((res) => res.json())
      .then((res: IComment[] & { message?: string }) => {
        if (res.message) return;
        res.forEach((c) => (c.created_at = moment(c.created_at)));
        this.comments.push(...res);
      });
  }
}

export default IssueModel;

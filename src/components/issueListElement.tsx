import React from "react";
import { observer } from "mobx-react";

import IssueModel from "../models/issueModel";
import Exclamation from "./exclamationIcon";

interface IIssueListElementProps {
  issueModel: IssueModel;
}
@observer
class IssueListElement extends React.Component<IIssueListElementProps> {
  model: IssueModel;

  constructor(props: IIssueListElementProps) {
    super(props);
    this.model = props.issueModel;
  }

  render() {
    return (
      <div className="issue-list__element">
        <div className="issue-list__element__info">
          {this.model.open ? (
            <Exclamation color="green" />
          ) : (
            <Exclamation color="red" />
          )}
          <div
            onClick={this.model.openDetails}
            className="issue-list__element__info__header"
          >
            <b>{this.model.title}</b>
          </div>
          <div></div>
          <div className="issue-list__element__info__subheader">
            #{this.model.id} opened {this.model.date.fromNow()} by{" "}
            {this.model.user.login}
          </div>
        </div>
        <div className="issue-list__element__comments">
          <img
            height="20px"
            alt="comment-icon"
            src="https://cdn.icon-icons.com/icons2/1875/PNG/512/comment_120216.png"
          />{" "}
          <span>{this.model.comments.length}</span>
        </div>
      </div>
    );
  }
}

export default IssueListElement;

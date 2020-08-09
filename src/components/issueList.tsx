import React from "react";
import { observer } from "mobx-react";

import IssueModel from "../models/issueModel";
import IssueListElement from "./issueListElement";

@observer
class IssueList extends React.Component<{
  issues: IssueModel[];
}> {
  render() {
    return (
      <div className="issue-list">
        {this.props.issues.map((issueModel) => {
          return (
            <IssueListElement key={issueModel.id} issueModel={issueModel} />
          );
        })}
      </div>
    );
  }
}

export default IssueList;

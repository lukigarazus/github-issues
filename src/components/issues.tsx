import * as React from "react";
import { observer } from "mobx-react";
import Modal from "react-modal";

import MetaInformation from "./metaInformation";
import IssueList from "./issueList";
import IssueDetails from "./issueDetails";
import Loader from "./loader";
import Error from "./error";
import AppModel from "../models/issuesModel";

interface IIssuesProps {
  user: string;
  repo: string;
}

@observer
export default class Issues extends React.Component<IIssuesProps> {
  model: AppModel;

  constructor(props: IIssuesProps) {
    super(props);
    this.model = new AppModel(props);
  }

  render() {
    return (
      <div className="issues">
        <Modal
          onRequestClose={this.model.closeDetails}
          isOpen={Boolean(this.model.detailsOpen)}
        >
          <IssueDetails issueModel={this.model.detailsOpen} />
        </Modal>
        {this.model.loading ? (
          <Loader />
        ) : (
          <>
            {this.model.error && (
              <div className="error-container">
                <Error error={this.model.error} />
                <button onClick={this.model.fetchIssues}>Retry</button>
              </div>
            )}
            <div className="issue-list-container light-border">
              <div className="meta-and-filters">
                <MetaInformation
                  getOpenAndClosedIssues={this.model.getOpenAndClosedIssues}
                />
              </div>
              <IssueList issues={this.model.issuesToDisplay} />
            </div>
          </>
        )}
      </div>
    );
  }
}

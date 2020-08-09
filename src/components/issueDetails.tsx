import React from "react";

import Comment from "./comment";
import IssueModel from "../models/issueModel";

export default ({ issueModel }: { issueModel: IssueModel | void }) => (
  <div className="issue-details">
    {issueModel !== undefined && (
      <>
        <div className="issue-details__header">
          <h2>
            {issueModel.title} #{issueModel.id}
          </h2>
        </div>
        <div className="issue-details__comments">
          <Comment
            comment={{
              body: issueModel.body,
              id: 0,
              user: issueModel.user,
              created_at: issueModel.date,
            }}
          />
          {issueModel.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </>
    )}
  </div>
);

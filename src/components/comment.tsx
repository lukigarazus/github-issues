import React from "react";
import ReactMarkdown from "react-markdown";

import { IComment } from "../types";

export default ({ comment }: { comment: IComment }) => (
  <div className="comment light-border">
    <div className="comment__header">
      {comment.user.login} commented {comment.created_at.fromNow()}
    </div>
    <div className="comment__body">
      <ReactMarkdown source={comment.body} />
    </div>
  </div>
);

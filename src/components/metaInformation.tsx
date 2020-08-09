import React from "react";
import { observer } from "mobx-react";

@observer
class MetaInformation extends React.Component<{
  getOpenAndClosedIssues: () => { open: number; closed: number };
}> {
  render() {
    const { open, closed } = this.props.getOpenAndClosedIssues();
    return (
      <div className="meta">
        <span>{open} Open</span>
        <span>{closed} Closed</span>
      </div>
    );
  }
}

export default MetaInformation;

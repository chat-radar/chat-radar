import * as React from 'react';
import ITrackableLinkProps from './i-trackable-link-props';
import * as app from '../../../lib/application';
let ga;
try {
  ga = require('ga');
} catch (err) {
  app.get('logger').error(err.toString());
}

class TrackableLink extends React.Component<ITrackableLinkProps, {}> {

  protected handleLinkClick(label: string) {
    if (!ga)
      return;
    ga('send', 'event', 'Outbound Link', 'click', label);
  }

  render() {
    return (
      <a
        href={this.props.href}
        onClick={this.handleLinkClick.bind(this, this.props.label)}
        className={this.props.className}
        target='_blank'
      >
        {this.props.children}
      </a>
    );
  }

}

export default TrackableLink;

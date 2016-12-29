import * as app from '../../../lib/application';
import * as React from 'react';

class SidebarFooter extends React.Component<{}, {}> {

  protected handleExternalLinkClick() {
    try {
      const ga = require('ga');
      ga('send', 'event', 'Outbound Link', 'click', 'Vultr');
    } catch (err) {
      app.get('logger').error(err.toString());
    }
  }

  render() {
    return (
      <div className='sidebar-footer'>
        {this.props.children ? this.props.children : (<p>Размещено на хостинге <a href='http://www.vultr.com/?ref=6842617' onClick={this.handleExternalLinkClick.bind(this)} target='_blank'>Vultr</a></p>)}
      </div>
    );
  }

}

export default SidebarFooter;

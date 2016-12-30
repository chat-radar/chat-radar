import * as React from 'react';
import { TrackableLink } from '../trackable-link';

class SidebarFooter extends React.Component<{}, {}> {

  render() {
    return (
      <div className='sidebar-footer'>
        {this.props.children ? this.props.children : (<p>Размещено на хостинге <TrackableLink href='http://www.vultr.com/?ref=6842617' label='Vultr'>Vultr</TrackableLink></p>)}
      </div>
    );
  }

}

export default SidebarFooter;

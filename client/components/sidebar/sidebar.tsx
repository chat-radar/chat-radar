import * as React from 'react';
import { UISref } from 'ui-router-react';
import './sidebar.scss';

class Sidebar extends React.Component<{}, {}> {

  render() {
    return (
      <div className='sidebar'>
        <div className='sidebar-header'>
          <UISref to='root.cities'><a>Chat Radar</a></UISref>
        </div>
        <div className='sidebar-content'>
          {this.props.children}
        </div>
        <div className='sidebar-footer'>
          Размещено на хостинге <a href='http://www.vultr.com/?ref=6842617' target='_blank'>Vultr</a>
        </div>
      </div>
    );
  }

}

export default Sidebar;

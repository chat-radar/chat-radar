import * as React from 'react';
import SidebarHeaderRow from './sidebar-header-row';
import SidebarHeaderCol from './sidebar-header-col';

class SidebarHeader extends React.Component<{}, {}> {

  render() {

    return (
      <div className='sidebar-header'>
        {this.props.children ? this.props.children : (<SidebarHeaderRow><SidebarHeaderCol><h1>Chat Radar</h1></SidebarHeaderCol></SidebarHeaderRow>)}
      </div>
    );
  }

}

export default SidebarHeader;

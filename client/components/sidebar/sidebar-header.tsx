import * as React from 'react';
import { UISref } from 'ui-router-react';

class SidebarHeader extends React.Component<{}, {}> {

  render() {

    return (
      <div className='sidebar-header'>
        {this.props.children ? this.props.children : (<h1><UISref to='root.cities'><a>Chat Radar</a></UISref></h1>)}
      </div>
    );
  }

}

export default SidebarHeader;

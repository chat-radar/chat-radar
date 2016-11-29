import * as React from 'react';

class SidebarHeader extends React.Component<{}, {}> {

  render() {

    return (
      <div className='sidebar-header'>
        {this.props.children ? this.props.children : (<h1>Chat Radar</h1>)}
      </div>
    );
  }

}

export default SidebarHeader;

import * as React from 'react';

class SidebarContent extends React.Component<{}, {}> {

  render() {
    return (
      <div className='sidebar-content'>
        {this.props.children}
      </div>
    );
  }

}

export default SidebarContent;

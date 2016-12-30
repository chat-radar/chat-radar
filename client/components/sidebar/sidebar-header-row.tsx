import * as React from 'react';

class SidebarHeaderRow extends React.Component<{}, {}> {

  render() {

    return (
      <div className='sidebar-header-row'>
        {this.props.children}
      </div>
    );
  }

}

export default SidebarHeaderRow;

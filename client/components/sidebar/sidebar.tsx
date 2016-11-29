import * as React from 'react';
import './sidebar.scss';

class Sidebar extends React.Component<{}, {}> {

  render() {
    return (
      <div className='sidebar'>
        {this.props.children}
      </div>
    );
  }

}

export default Sidebar;

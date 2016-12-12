import * as React from 'react';

class SidebarFooter extends React.Component<{}, {}> {

  render() {
    return (
      <div className='sidebar-footer'>
        {this.props.children ? this.props.children : (<p>Размещено на хостинге <a href='/vultr' target='_blank'>Vultr</a></p>)}
      </div>
    );
  }

}

export default SidebarFooter;

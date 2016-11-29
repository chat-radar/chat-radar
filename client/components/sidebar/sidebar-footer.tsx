import * as React from 'react';

class SidebarFooter extends React.Component<{}, {}> {

  render() {
    return (
      <div className='sidebar-footer'>
        {this.props.children ? this.props.children : (<p>Размещено на хостинге <a href='http://www.vultr.com/?ref=6842617' target='_blank'>Vultr</a></p>)}
      </div>
    );
  }

}

export default SidebarFooter;

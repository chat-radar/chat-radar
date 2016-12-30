import * as React from 'react';
import ISidebarHeaderColProps from './i-sidebar-header-col-props';
import * as classnames from 'classnames';

class SidebarHeaderCol extends React.Component<ISidebarHeaderColProps, {}> {

  render() {
    return (
      <div className={classnames({ 'sidebar-header-col': true, 'sidebar-header-col-expand': !!this.props.expand })}>
        {this.props.children}
      </div>
    );
  }

}

export default SidebarHeaderCol;

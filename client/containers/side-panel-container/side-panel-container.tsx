import * as React from 'react';
import ISidePanelContainerProps from './i-side-panel-container-props';
import { observer } from 'mobx-react';
// import * as Parse from 'parse';
import './side-panel-container.scss';

@observer
class SidePanelContainer extends React.Component<ISidePanelContainerProps, {}> {

  renderList() {
    return (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    );
  }

  renderFooter() {
    return (
      <div>
        Размещено на хостинге <a href='http://www.vultr.com/?ref=6842617' target='_blank'>Vultr</a>
      </div>
    );
  }

  render() {
    return (
      <div className='side-panel-container'>
        <div className='side-panel-container-content'>
          {this.renderList()}
        </div>
        <div className='side-panel-container-footer'>
          {this.renderFooter()}
        </div>
      </div>
    );
  }

}

export default SidePanelContainer;

import * as React from 'react';
import IMainMenuState from './i-main-menu-state';
import { UISref } from 'ui-router-react';
import { TrackableLink } from '../trackable-link';
import * as classnames from 'classnames';
import 'bootstrap/scss/bootstrap.scss';
import './main-menu.scss';

class MainMenu extends React.Component<{}, IMainMenuState> {

  constructor() {
    super();

    this.state = { isOpen: false };
  }

  handleTogglerClick() {
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen });
  }

  render() {
    return (
      <div className={classnames({ 'main-menu': true, 'bs-dropdown': true, 'bs-open': this.state.isOpen })}>
        <a className='main-menu-toggler fa fa-2x fa-ellipsis-v' onClick={this.handleTogglerClick.bind(this)} />
        <div className='bs-dropdown-menu bs-dropdown-menu-right'>
          <UISref to='about'><a className='bs-dropdown-item' href='https://github.com/chat-radar/chat-radar'>О сервисе</a></UISref>
          <TrackableLink className='bs-dropdown-item' href='https://github.com/chat-radar/chat-radar' label='GitHub'>Поставить <i className='fa fa-star' /> на GitHub</TrackableLink>
        </div>
      </div>
    );
  }

}

export default MainMenu;

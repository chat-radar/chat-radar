import * as React from 'react';
import IPersonItemProps from './i-person-item-props';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from '../list-group';
import * as moment from 'moment';

import './person-item.scss';

class PersonItem extends React.Component<IPersonItemProps, {}> {

  protected renderStatus() {
    if (this.props.online) {
      return (
        <div className='person-item-status'>
          <i className='person-item-status-icon person-item-status-icon-online fa fa-circle'></i>
          <span className='text-muted person-item-status-text'>онлайн</span>
        </div>
      );
    } else {
      return (
        <div className='person-item-status'>
          <i className='person-item-status-icon person-item-status-icon-offline fa fa-circle'></i>
          <span className='text-muted person-item-status-text'>последняя активность {moment(this.props.lastSeen).toNow(true)} назад</span>
        </div>
      );
    }
  }

  render() {
    return (
      <ListGroupItem className='person-item'>
        <ListGroupItemHeading>{this.props.nickname}</ListGroupItemHeading>
        <ListGroupItemText>{this.renderStatus()}</ListGroupItemText>
      </ListGroupItem>
    );
  }

}

export default PersonItem;

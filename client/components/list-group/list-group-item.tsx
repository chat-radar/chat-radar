import * as React from 'react';
import IListGroupItemProps from './i-list-group-item-props';
import './list-group.scss';

class ListGroupItem extends React.Component<IListGroupItemProps, {}> {

  render() {
    const { href } = this.props;
    const attribs = { href };

    return (
      <a {...attribs} className='list-group-item bs-list-group-item'>
        {this.props.children}
      </a>
    );
  }

}

export default ListGroupItem;

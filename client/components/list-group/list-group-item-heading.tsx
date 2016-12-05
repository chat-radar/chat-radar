import * as React from 'react';
import './list-group.scss';

class ListGroupItemHeading extends React.Component<{}, {}> {

  render() {
    return (
      <h4 className='list-group-item-heading bs-list-group-item-heading'>
        {this.props.children}
      </h4>
    );
  }

}

export default ListGroupItemHeading;

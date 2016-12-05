import * as React from 'react';
import './list-group.scss';

class ListGroupItemText extends React.Component<{}, {}> {

  render() {
    return (
      <small className='list-group-item-text bs-list-group-item-text'>
        {this.props.children}
      </small>
    );
  }

}

export default ListGroupItemText;

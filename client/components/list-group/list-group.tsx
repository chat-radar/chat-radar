import * as React from 'react';
import 'bootstrap/scss/bootstrap.scss';
import './list-group.scss';

class ListGroup extends React.Component<{}, {}> {

  render() {
    return (
      <div className='list-group bs-list-group'>
        {this.props.children}
      </div>
    );
  }

}

export default ListGroup;

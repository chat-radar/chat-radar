import * as React from 'react';
import * as classnames from 'classnames';
import IListGroupItemProps from './i-list-group-item-props';
import './list-group.scss';

class ListGroupItem extends React.Component<IListGroupItemProps, {}> {

  render() {
    const { href } = this.props;
    const className = classnames(this.props.className, 'list-group-item', 'bs-list-group-item');

    const attribs = { className, href };

    if (!href)
      return (<div {...attribs}>{this.props.children}</div>);
    return (<a {...attribs}>{this.props.children}</a>);
  }

}

export default ListGroupItem;

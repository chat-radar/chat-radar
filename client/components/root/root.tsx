import * as React from 'react';
import { UIView } from 'ui-router-react';
import IRootProps from './i-root-props';
import './root.scss';

class Root extends React.Component<IRootProps, {}> {

  static childContextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      personStore: this.props.personStore,
      cityStore: this.props.cityStore,
      chatStore: this.props.chatStore,
    };
  }

  render() {
    return (
      <div className='root'>
        <UIView name='background' />
        <UIView />
      </div>
    );
  }

}

export default Root;

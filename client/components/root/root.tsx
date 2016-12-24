import * as React from 'react';
import { Provider } from 'mobx-react';
import { UIView } from 'ui-router-react';
import IRootProps from './i-root-props';
import './root.scss';

class Root extends React.Component<IRootProps, {}> {

  render() {
    const { personStore, cityStore, chatStore } = this.props;

    return (
      <Provider
        personStore={personStore}
        cityStore={cityStore}
        chatStore={chatStore}
      >
        <div className='root'>
          <UIView name='background' />
          <UIView />
        </div>
      </Provider>
    );
  }

}

export default Root;

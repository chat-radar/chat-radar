import * as React from 'react';
import 'spinkit/scss/spinners/6-chasing-dots.scss';
import './spinner.scss';

class Spinner extends React.Component<{}, {}> {

  render() {
    return (
      <div className='spinner sk-chasing-dots'>
        <div className='spinner-child sk-child sk-dot1' />
        <div className='spinner-child sk-child sk-dot2' />
      </div>
    );
  }

}

export default Spinner;

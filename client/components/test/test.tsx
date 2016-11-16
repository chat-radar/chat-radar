/// <reference path='../../../typings/index.d.ts' />

import React = require('react');
import TestProps = require('./test-props.d');
import TestState = require('./test-state.d');

class Test extends React.Component<TestProps, TestState> {

  render() {
    return (
      <h1>It works</h1>
    );
  }

}

export = Test;

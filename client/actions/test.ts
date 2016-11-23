import IAction from './i-action';

export const TEST_ACTION = 'TEST_ACTION';

export type TEST_ACTION = {
  foo: number,
  message: string,
};

export function testAction(message: string): IAction<TEST_ACTION> {
  return {
    type: TEST_ACTION,
    payload: {
      foo: 1,
      message: message,
    },
  };
}

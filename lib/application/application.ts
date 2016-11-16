/// <reference path='../../typings/index.d.ts' />

import { extend } from 'lodash';

class Application {

  protected container;

  constructor() {
    this.container = {};
  }

  init(config): void {
    this.container = config;
  }

  get(key: string): any {
    return this.container[key];
  }

  set<T>(key: string, value: T): T {
    this.container[key] = value;
    return value;
  }

  async boot(): Promise<void> {
    return Promise.resolve();
  }

}

export = Application

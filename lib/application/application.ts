/// <reference path='../../typings/index.d.ts' />

import { extend } from 'lodash';

class Application {

  protected container;

  constructor() {

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

}

export = Application

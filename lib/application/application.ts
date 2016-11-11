/// <reference path='../../typings/index.d.ts' />

import { extend } from 'lodash';

class Application {

  protected container;

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

  boot(): Promise<void> {
    return Promise.resolve();
  }

}

export = Application

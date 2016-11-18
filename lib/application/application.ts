/// <reference path='../../typings/index.d.ts' />

class Application {

  protected container;

  constructor() {
    this.container = {};
  }

  init(config: any): void {
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

export = Application;

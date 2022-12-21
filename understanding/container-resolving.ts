import 'reflect-metadata'

import { Container, injectable } from 'inversify'

interface FooBar {
  printMe(): void
}

@injectable()
class Foo implements FooBar {
  constructor() {}

  printMe(): void {
    console.log('I\'m foo');
  }
}

@injectable()
class Bar implements FooBar {
  constructor() {}

  printMe(): void {
    console.log('I\'m bar')
  }
}

const container = new Container()

container.resolve<Foo>(Foo).printMe() // I'm foo
container.resolve<Bar>(Bar).printMe() // I'm bar
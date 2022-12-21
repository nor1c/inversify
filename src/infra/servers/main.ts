import 'reflect-metadata'

import express from 'express'
import { injectable } from 'inversify'

import container from '@infra/inversify/init-container'

@injectable()
class App {
  private app: express.Express

  constructor() {
    this.app = express()
  }

  public async bootstrap(): Promise<void> {
    container.bind<App>(App).toSelf().inSingletonScope()
    
    await this.app.listen(3000, () => console.log('App running on port 3000'))
  }
}

(async function() {
  await container.resolve(App).bootstrap()
})()
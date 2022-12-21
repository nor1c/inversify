import 'reflect-metadata'

// entities
import { Container, inject, injectable } from 'inversify'

// interfaces
interface Warrior {
  fight(): string
  sneak(): string
}

interface Weapon {
  hit(): string
}

interface ThrowableWeapon {
  throw(): string
}

// types
const TYPES = {
  Warrior: Symbol.for("Warrior"),
  Weapon: Symbol.for("Weapon"),
  ThrowableWeapon: Symbol.for("ThrowableWeapon")
}

@injectable()
class Katana implements Weapon {
  public hit() {
    return "cut!"
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw() {
    return "hit!"
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Weapon
  private _shuriken: ThrowableWeapon

  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
  ) {
    this._katana = katana
    this._shuriken = shuriken
  }

  public fight() { return this._katana.hit() }
  public sneak() { return this._shuriken.throw() }
}

// configure container
const myContainer = new Container()
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja)
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana)
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken)

// resolve dependencies
const ninja = myContainer.get<Warrior>(TYPES.Warrior)

console.log(ninja.fight()) // cut!
console.log(ninja.sneak()) // hit!
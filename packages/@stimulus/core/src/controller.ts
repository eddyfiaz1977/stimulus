import { Application } from "./application"
import { Context } from "./context"
import { DataMap } from "./data_map"
import { Scope } from "./scope"
import { TargetSet } from "./target_set"
import { TargetPropertiesBlessing } from "./target_properties_blessing"
import { performBlessings } from "./blessing"

export interface ControllerConstructor {
  bless(): ControllerConstructor
  new(context: Context): Controller
}

export class Controller {
  static targets: string[] = []

  readonly context: Context

  static bless(): ControllerConstructor {
    return performBlessings(this, [ TargetPropertiesBlessing ])
  }

  constructor(context: Context) {
    this.context = context
  }

  get application(): Application {
    return this.context.application
  }

  get scope(): Scope {
    return this.context.scope
  }

  get element(): Element {
    return this.scope.element
  }

  get identifier(): string {
    return this.scope.identifier
  }

  get targets(): TargetSet {
    return this.scope.targets
  }

  get data(): DataMap {
    return this.scope.data
  }

  initialize() {
    // Override in your subclass to set up initial controller state
  }

  connect() {
    // Override in your subclass to respond when the controller is connected to the DOM
  }

  disconnect() {
    // Override in your subclass to respond when the controller is disconnected from the DOM
  }
}

export const DEFAULTS = {
  namespace:      '--physics',
  mass:           1, 
  tension:        100,
  friction:       10,
  start_velocity: 0,
}

export class SpringPhysics {
  constructor({startAt, options, update}) {
    this.start = startAt
    this.options = Object.assign({}, DEFAULTS, options)
    this.cb = update
  }

  to(targetValue) {
    if (this.tickValue) this.start = this.tickValue
    this.target = targetValue
    this.solver = this.#solver()

    this.in_motion = true
    this.startTime = Date.now() / 1000

    window.requestAnimationFrame(this.#tick.bind(this))
  }

  #tick() {
    if (!this.in_motion) return

    const elapsed = Date.now() / 1000 - this.startTime
    const change = this.solver(elapsed)
    
    this.tickValue = this.start + (this.target - this.start) * change
    this.cb({
      namespace: this.options.namespace,
      value: this.tickValue,
    })

    if (elapsed < 5 || change !== 1) {
      window.requestAnimationFrame(this.#tick.bind(this))
    } 
    else {
      this.in_motion = false
      window.cancelAnimationFrame(this.#tick.bind(this))
    }
  }

  // https://webkit.org/demos/spring/spring.js
  #solver() {
    const {mass, tension, friction, start_velocity} = this.options

    this.m_w0 = Math.sqrt(tension / mass)
    this.m_zeta = friction / (2 * Math.sqrt(tension * mass))

    if (this.m_zeta < 1) {
      this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta)
      this.m_A = 1
      this.m_B = (this.m_zeta * this.m_w0 + -start_velocity) / this.m_wd
    } 
    else {
      this.m_wd = 0
      this.m_A = 1
      this.m_B = -start_velocity + this.m_w0
    }

    return function (t) {
      if (this.m_zeta < 1) {
        t = Math.exp(-t * this.m_zeta * this.m_w0) * (this.m_A * Math.cos(this.m_wd * t) + this.m_B * Math.sin(this.m_wd * t))
      } else {
        t = (this.m_A + this.m_B * t) * Math.exp(-t * this.m_w0)
      }
      return 1 - t
    }
  }
}

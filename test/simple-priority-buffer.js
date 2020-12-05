/**
 * Super simple priority buffer to act as an exemplar for PriorityBuffer tests.
 * It matches the expected behavior of PriorityBuffer, but is extremely slow.
 *
 * It also violates Liskov substitutability for Array, but that's not an issue here.
 */
export class SimplePriorityBuffer extends Array {
  constructor (comparator, capacity) {
    super()
    this.capacity = capacity
    this.comparator = comparator
  }

  front () { return this[0] }
  back () { return this[this.length - 1] }

  push (value) {
    super.push(value)
    super.sort(this.comparator)
    if (this.length > this.capacity) this.pop()
    return this.length
  }
}

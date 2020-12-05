/**
 * Priority buffer with highest priority elements at front, and fixed maximum length.
 *
 * Buffers are expected to be short, so that the naive prioritization process is quick.
 */
export class PriorityBuffer {
  /**
   * Constructor.
   *
   * @param {Function} comparator - comparator that matches the Array.sort() comparator API. High
   * priority items should sort before lower priority items.
   * @param {Number} capacity - maximum length of buffer
   */
  constructor (comparator, capacity = 100) {
    this.buffer = []
    this.comparator = comparator
    this.capacity = capacity
  }

  get length () { return this.buffer.length }

  /**
   * Empties the buffer.
   */
  clear () {
    this.buffer = []
  }

  /**
   * Returns the lowest priority element in the buffer.
   *
   * @returns {any} - the lowest priority element, or `undefined` if empty
   */
  back () {
    return this.buffer[this.buffer.length - 1]
  }

  /**
   * Returns the highest priority value.
   *
   * @returns {any} - the the highest priority value or `undefined` if empty
   */
  front () {
    return this.buffer[0]
  }

  /**
   * Inserts a value into the queue. If length === capacity,
   * the lowest priority value is discarded.
   * @param {any} value - value to push
   * @returns {Number} - the current length of the buffer
   */
  push (value) {
    if (this.buffer.length === 0) {
      this.buffer.push(value)
    } else if (this.comparator(value, this.front()) < 0) {
      this.buffer.unshift(value)
    } else if (this.comparator(this.back(), value) < 0) {
      this.buffer.push(value)
    } else {
      this.buffer.push(value)
      this.buffer.sort(this.comparator)
    }

    if (this.buffer.length > this.capacity) this.buffer.pop()
    return this.buffer.length
  }

  /**
   * Removes the highest priority value and returns it.
   * @returns {any} the value removed from the queue
   * or `undefined` if empty.
   */
  shift () {
    return this.buffer.shift()
  }

  /**
   * Iterator that goes from highest priority to lowest priority.
   * @returns {Generator} - iterates from front to back
   */
  [Symbol.iterator] () {
    return this.buffer[Symbol.iterator]()
  }
}

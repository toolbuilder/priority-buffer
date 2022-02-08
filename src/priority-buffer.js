import { List } from '@toolbuilder/list'
// @ts-check

/**
 * Simplest O(n/2) insertion possible.
 * @template Type
 * @param {List<Type>} list - list where value should be inserted
 * @param {CompareFunction<Type>} comparator - provides sort order of list
 * @param {Type} value - value to be inserted
 */
const insertInSortOrder = (list, comparator, value) => {
  for (const node of list.nodes()) {
    if (comparator(node.value, value) > 0) {
      list.insertBefore(node, value)
      break
    }
  }
}

/**
 * @template Type
 * @callback CompareFunction
 * @param {Type} a - first value to compare
 * @param {Type} b - second value to compare
 * @returns {number} - three possibilities
 * a > b, returns > 0, and b sorts before a
 * a === b, returns 0, keep original order of a and b
 * a < b, returns < 0, and a sorts before b
 */

/**
 * Priority buffer with highest priority elements at front, and fixed maximum length.
 *
 * Buffers are expected to be short, so that the naive prioritization process is quick.
 * @template Type
 */
export class PriorityBuffer {
  /**
   * Constructor.
   *
   * @param {CompareFunction<Type>} comparator - comparator that matches the Array.sort() comparator API. High
   * priority items should sort before lower priority items.
   * @param {number} capacity - maximum length of buffer
   */
  constructor (comparator, capacity = 100) {
    /**
     * @protected
     * @type List<Type>
     */
    this.buffer = List.from()
    this.comparator = comparator
    this.capacity = capacity
  }

  /**
   * Getter to provide current number of elements in buffer. Can never be larger than capacity.
   * @returns {number}
   */
  get length () { return this.buffer.length }

  /**
   * Empties the buffer. After this operation buffer.length === 0
   */
  clear () {
    this.buffer = List.from()
  }

  /**
   * Returns the lowest priority element in the buffer.
   *
   * @returns {Type} - the lowest priority element, or `undefined` if empty
   */
  back () {
    return this.buffer.last()
  }

  /**
   * Returns the highest priority value.
   *
   * @returns {Type} - the the highest priority value or `undefined` if empty
   */
  front () {
    return this.buffer.first()
  }

  /**
   * Inserts a value into the queue. If length === capacity,
   * the lowest priority value is discarded. If two items with
   * the same priority are in the queue, the older one is before
   * the newer one.
   *
   * @param {Type} value - value to push
   * @returns {number} - the current length of the buffer
   */
  push (value) {
    if (this.buffer.length === 0) {
      this.buffer.push(value)
    } else if (this.comparator(value, this.buffer.first()) < 0) {
      this.buffer.unshift(value)
    } else if (this.comparator(this.buffer.last(), value) <= 0) {
      this.buffer.push(value)
    } else {
      insertInSortOrder(this.buffer, this.comparator, value)
    }

    if (this.buffer.length > this.capacity) this.buffer.pop()
    return this.buffer.length
  }

  /**
   * Removes the highest priority value and returns it.
   *
   * @returns {Type} the value removed from the queue
   * or `undefined` if empty.
   */
  shift () {
    return this.buffer.shift()
  }

  /**
   * Iterator that goes from highest priority to lowest priority.
   * @returns {IterableIterator<Type>} - iterates from highest priority to lowest priority
   */
  [Symbol.iterator] () {
    return this.buffer[Symbol.iterator]()
  }
}

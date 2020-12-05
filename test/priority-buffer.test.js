import { test } from 'zora'
import { PriorityBuffer } from '../src/priority-buffer.js'
import { RingBufferDriver } from '@toolbuilder/ring-buffer-tests'

// comparator for test
const comparator = (a, b) => b - a

/**
 * Super simple priority buffer to compare PriorityBuffer against.
 * Violates Liskov substitutability, but matches PriorityBuffer
 * behavior and API as required.
 */
class SimplisticPriorityBuffer extends Array {
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

// Method collects state from buffers for comparing buffer states
const getBufferState = (priorityBuffer) => {
  return {
    capacity: priorityBuffer.capacity,
    length: priorityBuffer.length,
    front: priorityBuffer.front(),
    back: priorityBuffer.back(),
    contents: [...priorityBuffer]
  }
}

// RingBufferDriver options for this test
const driverOptions = {
  exemplarFactory: (capacity) => new SimplisticPriorityBuffer(comparator, capacity),
  getState: getBufferState,
  methodPairs: [['push', 'shift']] // PriorityBuffer does not support unshift/pop
}

test('test ring buffer interface', assert => {
  const driver = new RingBufferDriver(driverOptions)
  const factory = (capacity) => new PriorityBuffer(comparator, capacity)
  const capacities = [1, 10, 100]
  capacities.forEach(capacity => {
    const [actual, expected] = driver.testRingBuffer(capacity, factory)
    assert.deepEqual(actual, expected, `ring buffer passed test suite for capacity ${capacity}`)
  })
})

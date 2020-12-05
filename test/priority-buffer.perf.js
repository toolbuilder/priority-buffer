import { PriorityBuffer } from '../src/priority-buffer.js'
import { RingBuffer } from '@toolbuilder/ring-buffer'

const iterations = 50000000
const length = 100

const time = (queue) => {
  for (let i = 0; i < length; ++i) {
    queue.push(Math.random(i))
  }
  for (let i = 0; i < iterations; ++i) {
    queue.shift()
    queue.push(Math.random(i))
  }
}

console.time('RingBuffer')
time(new RingBuffer(length)) // unprioritized
console.timeEnd('RingBuffer')

console.time('array')
time([]) // unprioritized
console.timeEnd('array')

console.time('PriorityBuffer')
const comparator = (a, b) => a - b
time(new PriorityBuffer(comparator, length))
console.timeEnd('PriorityBuffer')

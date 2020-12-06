import { PriorityBuffer } from '../src/priority-buffer.js'
import { RingBuffer } from '@toolbuilder/ring-buffer'

const iterations = 50000000
const length = 200

const dataLength = length * 5
const data = new Array(dataLength).fill().map((s, index) => Math.random())

// If shifts <= pushes, and items of the lowest priority are inserted, buffer will
// fill up with those items, and they will start getting dropped. Essentially,
// the buffer will start acting like a filter for the lowest priority items.
// So this test cycles the buffer between empty and full. This emphasizes the
// insertion time for the priority buffer.
const filterTime = (queue) => {
  let shiftThreshold = 0.80
  for (let i = 0; i < iterations; ++i) {
    // Math.random is slow, and therefore masks the performance differences a bit
    // so cycle through a list of random numbers
    const value = data[i % dataLength]
    if (value > shiftThreshold) queue.shift()
    if (value > (1 - shiftThreshold)) queue.push(value)
    // flip threshold to make buffer grow or shrink
    if (queue.length === length) shiftThreshold = 0.20
    if (queue.length === 0) shiftThreshold = 0.80
  }
}

const comparator = (a, b) => a - b

const queues = [
  { name: 'RingBuffer', queue: new RingBuffer(length) },
  { name: 'PriorityBuffer', queue: new PriorityBuffer(comparator, length) },
  { name: 'Array', queue: [] } // Array gets disproportionately worse than the buffers as length increases
]

queues.forEach(({ name, queue }) => {
  console.time(name)
  filterTime(queue)
  console.timeEnd(name)
})

# RingBuffer

`PriorityBuffer` implements a simple fixed length priority queue. Your comparator function is used for prioritization. If the buffer is full, lower priority items are dropped as new ones are added. The methods `push`, `shift`, and `length` match the `Array` API to make substitution easier.

`PriorityBuffer` is a minimalist implementation and does not currently use a deque in the underlying implementation, so it is intended for small buffer sizes. It is intended as another drop in buffer implementation for the event queue of [Await-For-It](https://github.com/toolbuilder/await-for-it).

## Performance

For reference, here is a quick and dirty [test](test/priority-buffer.perf.js) against unprioritized buffers. Insertions are random numbers and queue length is 100.

* [RingBuffer](https://github.com/toolbuilder/ring-buffer)(no priority ordering): 1.126s
* Array (no priority ordering): 4.222s
* PriorityBuffer: 1.859s

### Doubly Linked List Performance

At this point I improved the performance test to cycle the buffer from empty to full and back repeatedly.

* RingBuffer: 982.927ms
* PriorityBuffer: 4.281s
* Array: 2.615s

## Installation

```bash
npm install --save @toolbuilder/priority-buffer
```

## Getting Started

The API documentation is [here](docs/priority-buffer.md).  This is a quick example to get you started.

```javascript
import { PriorityBuffer } from '@toolbuilder/priority-buffer'
const log = console.log

const comparator = (a, b) => a.localeCompare(b)
const buffer = new PriorityBuffer(comparator, 10) // max length 10
log(buffer.length) // prints 0

const input = ['C', 'A', 'B']
input.forEach(x => buffer.push(x))
log([...buffer]) // prints ['A', 'B', 'C']
log(buffer.length) // prints 3
log(buffer.front()) // prints 'A'
log(buffer.back()) // prints 'C'
log(buffer.shift()) // prints 'A'
log(buffer.length) // prints 2
log([...buffer]) // prints ['B', 'C']
log(buffer.length) // prints 2
```

## Alternatives

There are **lots** of alternatives on npm.

## Contributing

Contributions are welcome. Please create a pull request.

I use [pnpm](https://pnpm.js.org/) instead of npm, which is why `pnpm-lock.yaml` exists in the git repo.

## Issues

This project uses Github issues.

# RingBuffer

`PriorityBuffer` implements a simple fixed length priority queue. Your comparator function is used for prioritization. If the buffer is full, lower priority items are dropped as new ones are added. The methods `push`, `shift`, and `length` match the `Array` API to make substitution easier. The primary motivation for this package is to provide another `drop in` buffer implementation for the event queue of [Await-For-It](https://github.com/toolbuilder/await-for-it).

## Performance

Most likely, the time to evaluate prioritized items swamps the time required to prioritize them. Therefore, buffer performance isn't likely an issue in normal use. Nevertheless, I tried several packages with higher theoretical performance O(log(n)) for the underlying implementation. Surprisingly, all of them performed substantially worse than the simple O(n/2) implementation selected. I lack an explanation.

The current implementation is very fast if the inserted item is lower or higher in priority than all the currently buffered items. When the item fits somewhere in the buffer, the implementation resorts to O(n/2) insertion.

To measure performance, I wrote a quick and dirty [test](test/priority-buffer.perf.js) that grows and shrinks the buffer repeatedly. The roughly 100 million push/shift operations ensure that the insertion performance is emphasized.

* [RingBuffer](https://github.com/toolbuilder/ring-buffer)(no priority ordering): 982.927ms
* Array (no priority ordering): 2.615s
* PriorityBuffer: 21.720s ouch

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

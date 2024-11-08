# PriorityBuffer

`PriorityBuffer` implements a simple fixed length priority queue. Your comparator function is used for prioritization. If the buffer is full, lower priority items are dropped as new ones are added. If two items have the same priority, the older one has higher priority than the newer one. The methods `push`, `shift`, and `length` match the `Array` API to make substitution easier.

`PriorityBuffer` is a minimal implementation developed for use with [Await-For-It](https://github.com/toolbuilder/await-for-it) iterable queues.

There are two related buffers:

* [RingBuffer](https://github.com/toolbuilder/ring-buffer) ring buffer with fixed maximum size - faster than Array as a buffer.
* [DynamicRingBuffer](https://github.com/toolbuilder/dynamic-ring-buffer) ring buffer that manages memory in chunks to support large capacity for data bursts with low overhead when small.

## Performance

In common use cases, the time to evaluate prioritized items swamps the time required to prioritize them. Therefore, buffer performance isn't likely an issue in normal use. Nevertheless, I tried several packages with higher theoretical performance O(log(n)) for the underlying implementation. Surprisingly, all of them performed substantially worse than the simple O(n/2) implementation selected. I lack an explanation.

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

const input = ['C', 'A', 'B'] // unprioritized input
input.forEach(x => buffer.push(x))
log([...buffer]) // prints ['A', 'B', 'C']
log(buffer.length) // prints 3
log(buffer.front()) // prints 'A'
log(buffer.back()) // prints 'C'
log(buffer.shift()) // removes highest priority element. Prints 'A'
log(buffer.length) // prints 2
log([...buffer]) // prints ['B', 'C']
```

## Alternatives

There are **lots** of alternatives on npm.

## Contributing

Contributions are welcome. Please create a pull request.

* I use [pnpm](https://pnpm.js.org/) instead of npm.
* Package verification requires [pnpm](https://pnpm.io/) to be installed globally.
  * `npm install -g pnpm`
  * `pnpm install --frozen-lockfile`
  * `pnpm test` to run unit tests
  * `pnpm run check:packfile` to test against Node ES and CommonJS projects, as well as Electron.
  * `pnpm run check` to validate the package is ready for commit
  * `pnpm run release` to update version, update changelog using Conventional Commits, check it all in, and tag the release.

## Issues

This project uses Github issues.

## License

MIT

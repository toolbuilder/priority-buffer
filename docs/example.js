/*
  This module is still commonjs, so to run this example directly, you need esm.
  To run this example from the command line at project root:
  pnpm install
  node -r esm docs/example.js
*/
import { PriorityBuffer } from '../src/priority-buffer.js'
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

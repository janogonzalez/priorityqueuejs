# priorityqueue.js

A simple queue data structure for Node.js and the browser.

## Installation

As component for the browser:

```
$ component install janogonzalez/priorityqueuejs
```

As npm for Node.js:

```
$ npm install priorityqueuejs
```

## Example

```js
var PriorityQueue = require('priorityqueuejs');

var queue = new PriorityQueue(function(a, b) {
  return a.priority - b.priority;
});

queue.enq({ cash: 250, name: 'Valentina' });
queue.enq({ cash: 300, name: 'Jano' });
queue.enq({ cash: 150, name: 'Fran' );
queue.size(); // 3
queue.peek(); // { cash: 300, name: 'Jano' }
queue.deq(); // { cash: 300, name: 'Jano' }
```

## API

### PriorityQueue(comparator)

Initializes a new empty `PriorityQueue` with the given `comparator(a, b)`
function, uses `.DEFAULT_COMPARATOR()` when no function is provided.

The comparator function must return a positive number when `a > b`, 0 when
`a == b` and a negative number when `a < b`.

### PriorityQueue.DEFAULT_COMPARATOR(a, b)

Compares two `Number` or `String` objects.

### PriorityQueue#deq()

Dequeues the top element of the `PriorityQueue`.
Throws an `Error` when the queue is empty.

### PriorityQueue#empty()

Returns whether the `PriorityQueue` is empty or not.

### PriorityQueue#enq(element)

Enqueues the `element` at the end of the `PriorityQueue` and returns its new
size.

### PriorityQueue#peek()

Peeks at the top element of the `PriorityQueue`.
Throws an `Error` when the queue is empty.

### PriorityQueue#size()

Returns the size of the `PriorityQueue`.

## Testing

```
$ npm test
```

## Licence

MIT

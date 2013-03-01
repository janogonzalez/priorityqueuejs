/**
 * Expose `PriorityQueue`.
 */
module.exports = PriorityQueue;

/**
 * Initializes a new empty `PriorityQueue` with the given `comparator(a, b)`
 * function, uses `.DEFAULT_COMPARATOR()` when no function is provided.
 *
 * The comparator function must return a positive number when `a > b`, 0 when
 * `a == b` and a negative number when `a < b`.
 *
 * @param {Function}
 * @return {PriorityQueue}
 */
function PriorityQueue(comparator) {
  this._comparator = comparator || PriorityQueue.DEFAULT_COMPARATOR;
  this._elements = [];
}

/**
 * Compares `a` and `b`, when `a > b` it returns a positive number, when
 * it returns 0 and when `a < b` it returns a negative number.
 *
 * @param {String|Number} a
 * @param {String|Number} b
 * @return {Number}
 */
PriorityQueue.DEFAULT_COMPARATOR = function(a, b) {
  if (a instanceof Number) {
    return a - b;
  } else {
    a = a.toString();
    b = b.toString();

    if (a == b) return 0;

    return (a > b) ? 1 : -1;
  }
};

/**
 * Returns whether the `PriorityQueue` is empty or not.
 *
 * @return {Boolean}
 */
PriorityQueue.prototype.empty = function() {
  return this.size() === 0;
};

/**
 * Peeks at the top element of the `PriorityQueue`.
 *
 * @return {Object}
 * @throws {Error} when the queue is empty.
 */
PriorityQueue.prototype.peek = function() {
  if (this.empty()) throw new Error('PriorityQueue is empty');

  return this._elements[0];
};

/**
 * Dequeues the top element of the `PriorityQueue`.
 *
 * @return {Object}
 * @throws {Error} when the queue is empty.
 */
PriorityQueue.prototype.deq = function() {
  if (this.empty()) throw new Error('PriorityQueue is empty');

  var first = this._elements[0];
  var end = this._elements.pop();
  var size = this.size();

  this._elements[0] = end;

  var currentIndex = 0;

  while (currentIndex < size) {
    var largestIndex = currentIndex;
    var leftIndex = 2 * currentIndex + 1;
    var rightIndex = (2 * currentIndex) + 2;

    if (leftIndex >= size && rightIndex >= size) break;

    var left = (leftIndex < size) ? this._elements[leftIndex] : null;
    var right = (rightIndex < size) ? this._elements[rightIndex] : null;
    var current = this._elements[currentIndex];
    var largest = this._elements[largestIndex];

    if (leftIndex < size && this._comparator(left, largest) > 0) {
      largestIndex = leftIndex;
      largest = left;
    }

    if (rightIndex < size && this._comparator(right, largest) > 0) {
      largestIndex = rightIndex;
      largest = right;
    }

    if (largestIndex != currentIndex) {
      this._elements[currentIndex] = largest;
      this._elements[largestIndex] = current;
      currentIndex = largestIndex;
    }
  }

  return first;
};

/**
 * Enqueues the `element` at the end of the `PriorityQueue` and returns its new size.
 *
 * @param {Object} element
 * @return {Number}
 */
PriorityQueue.prototype.enq = function(element) {
  var size = this._elements.push(element);
  var currentIndex = size - 1;

  while (currentIndex > 0) {
    var parentIndex = Math.floor((currentIndex - 1) / 2);
    var current = this._elements[currentIndex];
    var parent = this._elements[parentIndex];

    if (this._comparator(current, parent) <= 0) break;

    this._elements[parentIndex] = current;
    this._elements[currentIndex] = parent;

    currentIndex = parentIndex;
  }

  return size;
};

/**
 * Returns the size of the `PriorityQueue`.
 *
 * @return {Number}
 */
PriorityQueue.prototype.size = function() {
  return this._elements.length;
};

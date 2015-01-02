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
 * @api public
 * @complexity O(n) where `n` === array.length
 */
function PriorityQueue(array, comparator) {
  this._elements = []
  if (array instanceof Array) {
    if (array.length > 0) {
      var size = array.length;
      var i;
      for (i = 0; i < size; i++) {
        this._elements.push(array[i]);
      }
      this._comparator = comparator || PriorityQueue.DEFAULT_COMPARATOR;
      for (i = Math.floor(size / 2); i >= 0; i--) {
        _sink.call(this, i, size);
      }
    }
  } else {
    this._comparator = array || PriorityQueue.DEFAULT_COMPARATOR;
  }

  
}

/**
 * Compares `a` and `b`, when `a > b` it returns a positive number, when
 * it returns 0 and when `a < b` it returns a negative number.
 *
 * @param {String|Number} a
 * @param {String|Number} b
 * @return {Number}
 * @api public
 */
PriorityQueue.DEFAULT_COMPARATOR = function(a, b) {
  if (a instanceof Number && b instanceof Number) {
    return a - b;
  } else {
    a = a.toString();
    b = b.toString();

    if (a == b) return 0;

    return (a > b) ? 1 : -1;
  }
};

/**
 * Returns whether the priority queue is empty or not.
 *
 * @return {Boolean}
 * @api public
 * @complexity O(1)
 */
PriorityQueue.prototype.isEmpty = function() {
  return this.size() === 0;
};

/**
 * Peeks at the top element of the priority queue.
 *
 * @return {Object}
 * @throws {Error} when the queue is empty.
 * @api public
 * @complexity O(1)
 */
PriorityQueue.prototype.peek = function() {
  if (this.isEmpty()) throw new Error('PriorityQueue is empty');

  return this._elements[0];
};

/**
 * Dequeues the top element of the priority queue.
 *
 * @return {Object}
 * @throws {Error} when the queue is empty.
 * @api public
 * @complexity O(log(n)) where `n` === this.size()
 */
PriorityQueue.prototype.deq = function() {
  var first = this.peek();
  var last = this._elements.pop();
  var size = this.size();

  if (size === 0) return first;

  this._elements[0] = last;
  
  _sink.call(this, 0, size);

  return first;
};

/**
 * Enqueues the `element` at the priority queue and returns its new size.
 *
 * @param {Object} element
 * @return {Number}
 * @api public
 * @complexity O(log(n)) where `n` === this.size()
 */
PriorityQueue.prototype.enq = function(element) {
  var size = this._elements.push(element);

  _swim.call(this, size - 1)

  return size;
};

/**
 * Returns the size of the priority queue.
 *
 * @return {Number}
 * @api public
 * @complexity O(1)
 */
PriorityQueue.prototype.size = function() {
  return this._elements.length;
};

/**
 *  Iterates over queue elements
 *
 *  @param {Function} fn
 *  @complexity O(n) where `n` === this.size() 
 */
PriorityQueue.prototype.forEach = function(fn) {
  return this._elements.forEach(fn);
};

/**
 * Compares the values at position `a` and `b` in the priority queue using its
 * comparator function.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @api private
 */
var _compare = function(a, b) {
  return this._comparator(this._elements[a], this._elements[b]);
};

/**
 * Swaps the values at position `a` and `b` in the priority queue.
 *
 * @param {Number} a
 * @param {Number} b
 * @api private
 * @complexity O(1)
 */
var _swap = function(a, b) {
  var aux = this._elements[a];
  this._elements[a] = this._elements[b];
  this._elements[b] = aux;
};

/**
 * Swaps the values at position `a` and `b` in the priority queue.
 *
 * @param {Number} a
 * @param {Number} b
 * @api private
 * @complexity O(1)
 */
var _sink = function (current, size) {
  while (current < size) {
    var largest = current;
    var left = (2 * current) + 1;
    var right = (2 * current) + 2;

    if (left < size && _compare.call(this, left, largest) > 0) {
      largest = left;
    }

    if (right < size && _compare.call(this, right, largest) > 0) {
      largest = right;
    }

    if (largest === current) break;

    _swap.call(this, largest, current);
    current = largest;
  }
}

var _swim = function (current) {
  while (current > 0) {
    var parent = Math.floor((current - 1) / 2);

    if (_compare.call(this, current, parent) < 0) break;

    _swap.call(this, parent, current);
    current = parent;
  }
}

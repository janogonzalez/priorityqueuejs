function constructSampleQueue() {
  var queue = new PriorityQueue(['a', 'b', 'd']);
  queue.forEach(function() {});
  queue.enq('c')
  queue.enq('e')
  queue.enq('b')

  return queue
}

describe('PriorityQueue()', function() {
  it('returns an new PriorityQueue', function() {
    expect(new PriorityQueue()).to.be.a(PriorityQueue);
  });

  it('accepts a comparator function', function() {
    var queue = new PriorityQueue(function(a, b) {
      return a - b;
    });

    expect(queue).to.be.a(PriorityQueue);
  });

  describe('.DEFAULT_COMPARATOR()', function() {
    context('given strings', function() {
      it('returns a negative number when a < b', function() {
        expect(PriorityQueue.DEFAULT_COMPARATOR('jano', 'valentina')).to.be.
          below(0);
      });

      it('returns 0 number when a == b', function() {
        expect(PriorityQueue.DEFAULT_COMPARATOR('jano', 'jano')).to.be(0);
      });

      it('returns a positive number when a > b', function() {
        expect(PriorityQueue.DEFAULT_COMPARATOR('jano', 'fran')).to.be.
          above(0);
      });
    });

    context('given numbers', function() {
      it('returns a negative number when a < b', function() {
        expect(PriorityQueue.DEFAULT_COMPARATOR(10, 1000)).to.be.below(0);
      });

      it('returns 0 number when a == b', function() {
        expect(PriorityQueue.DEFAULT_COMPARATOR(10, 10)).to.be(0);
      });

      it('returns a positive number when a > b', function() {
        expect(PriorityQueue.DEFAULT_COMPARATOR(10, 1)).to.be.above(0);
      });
    });
  });

  describe('#isEmpty()', function() {
    it('returns true when the queue is empty', function() {
      var queue = new PriorityQueue();
      expect(queue.isEmpty()).to.be(true);
    });

    it('returns false when the queue is not empty', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      expect(queue.isEmpty()).to.be(false);
    });
  });

  describe('#peek()', function() {
    it('fails when the queue is empty', function() {
      var queue = new PriorityQueue();
      expect(function() {
        queue.peek();
      }).to.throwException('PriorityQueue is empty');
    });

    it('returns the top element of the queue', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      queue.enq('valentina');
      queue.enq('zombie');
      queue.enq('fran');
      queue.enq('albert');
      queue.enq('albert');
      queue.enq('frank');
      expect(queue.peek()).to.be('zombie');
    });
  });

  describe('#deq()', function() {
    it('fails when the queue is empty', function() {
      var queue = new PriorityQueue();
      expect(function() {
        queue.deq();
      }).to.throwException('PriorityQueue is empty');
    });

    it('dequeues the top element of the queue', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      queue.enq('valentina');
      queue.enq('zombie');
      queue.enq('fran');
      queue.enq('albert');
      queue.enq('albert');
      queue.enq('frank');
      queue.enq('jano');
      queue.enq('valentina');
      queue.enq('zombie');
      expect(queue.deq()).to.be('zombie');
      expect(queue.deq()).to.be('zombie');
      expect(queue.deq()).to.be('valentina');
      expect(queue.deq()).to.be('valentina');
      expect(queue.deq()).to.be('jano');
      expect(queue.deq()).to.be('jano');
      expect(queue.deq()).to.be('frank');
      expect(queue.deq()).to.be('fran');
      expect(queue.deq()).to.be('albert');
      expect(queue.deq()).to.be('albert');
      expect(queue.isEmpty()).to.be(true);
    });

    it('not fails with only one element', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      expect(queue.deq()).to.be('jano');
      expect(queue.size()).to.be(0);
    });

    it('works with custom comparators', function() {
      var queue = new PriorityQueue(function(a, b) {
        return b.priority - a.priority;
      });

      queue.enq({ priority: 100 });
      queue.enq({ priority: -1 });
      queue.enq({ priority: 0 });
      queue.enq({ priority: 5 });
      expect(queue.deq()).to.be.eql({ priority: -1 });
      expect(queue.deq()).to.be.eql({ priority: 0 });
      expect(queue.deq()).to.be.eql({ priority: 5 });
      expect(queue.deq()).to.be.eql({ priority: 100 });
      expect(queue.isEmpty()).to.be(true);
    });

    it('dequeues seven elements in queue of six elements', function () {
      var queue = constructSampleQueue();
      //console.log(queue._elements, queue._sorted_elements.slice(queue._index))
      expect(queue.deq()).to.be.eql('e');
      //console.log(queue._elements, queue._sorted_elements.slice(queue._index))
      expect(queue.deq()).to.be.eql('d');
      //console.log(queue._elements, queue._sorted_elements.slice(queue._index))
      expect(queue.deq()).to.be.eql('c');
      //console.log(queue._elements, queue._sorted_elements.slice(queue._index))
      expect(queue.deq()).to.be.eql('b');
      //console.log(queue._elements, queue._sorted_elements.slice(queue._index))
      expect(queue.deq()).to.be.eql('b');
      //console.log(queue._elements, queue._sorted_elements.slice(queue._index))
      expect(queue.deq()).to.be.eql('a');
      //console.log(queue._elements, queue._sorted_elements.slice(queue._index))
      expect(function() {
        queue.deq();
      }).to.throwException('PriorityQueue is empty');
    });
  });

  describe('#enq()', function() {
    it('enqueues an element at the end of the queue', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      queue.enq('valentina');
      queue.enq('fran');
      expect(queue.peek()).to.be('valentina');
      expect(queue.size()).to.be(3);
    });

    it('returns the new size of the queue', function() {
      var queue = new PriorityQueue();
      expect(queue.enq('jano')).to.be(1);
    });

    it('works with custom comparators', function() {
      var queue = new PriorityQueue(function(a, b) {
        return b.priority - a.priority;
      });

      queue.enq({ priority: 100 });
      queue.enq({ priority: -1 });
      queue.enq({ priority: 0 });
      queue.enq({ priority: 5 });
      expect(queue.peek()).to.be.eql({ priority: -1 });
      expect(queue.size()).to.be(4);
    });
  });

  describe('#size()', function() {
    it('returns 0 when the queue is empty', function() {
      var queue = new PriorityQueue();
      expect(queue.size()).to.be(0);
    });

    it('returns the size of the queue', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      queue.enq('valentina');
      expect(queue.size()).to.be(2);
    });
  });

  describe('#constructor()', function() {
    it('create a empty priority queue', function () {
      var queue = new PriorityQueue([]);

      expect(queue.isEmpty()).to.be(true);
    });

    it('create a priority queue based on array', function () {
      var queue = new PriorityQueue([3,4,1,7,6,4]);
      var sorted_array = [];

      while (!queue.isEmpty()) {
        sorted_array.push(queue.deq());
      }

      expect(sorted_array[0]).to.be(7);
      expect(sorted_array[1]).to.be(6);
      expect(sorted_array[2]).to.be(4);
      expect(sorted_array[3]).to.be(4);
      expect(sorted_array[4]).to.be(3);
      expect(sorted_array[5]).to.be(1);
    });

    it('create a priority queue based on array and custom comparator', function () {
      var queue = new PriorityQueue([3,4,1,7,6,4], function (a, b) {
        return b - a
      });
      var sorted_array = [];

      while (!queue.isEmpty()) {
        sorted_array.push(queue.deq());
      }

      expect(sorted_array[0]).to.be(1);
      expect(sorted_array[1]).to.be(3);
      expect(sorted_array[2]).to.be(4);
      expect(sorted_array[3]).to.be(4);
      expect(sorted_array[4]).to.be(6);
      expect(sorted_array[5]).to.be(7);
    });
  });

  describe('#forEach()', function() {
    var queue = new PriorityQueue(['a', 'b', 'd'])

    function expectForEach (iteration, iteration_expected, length_expected) {
      iteration.forEach(function (item, index) {
        expect(item[1]).to.be.eql(index);
        expect(item[0]).to.be.eql(iteration_expected[index])
      });
    }

    it('iterates over all queue elements in order (1)', function () {
      var iteration = [];

      queue.forEach(function(element, index) {
        iteration.push([element, index]);
      });

      expectForEach(iteration, ['d', 'b', 'a'], 3)
    });

    it('iterates over all queue elements in order (2)', function () {
      var iteration = [];

      queue.forEach(function(element, index) {
        iteration.push([element, index]);
      });

      expectForEach(iteration, ['d', 'b', 'a'], 3)
    });

    it('enqueues three elements at the end of the queue', function () {
      queue.enq('c')
      queue.enq('e')
      queue.enq('b')
      expect(queue.size()).to.be(6);
    });

    it('iterates over all queue elements in order (3)', function () {
      var iteration = [];

      queue.forEach(function(element, index) {
        iteration.push([element, index]);
      });

      expectForEach(iteration, ['e', 'd', 'c', 'b', 'b', 'a'], 6)
    });

    it('dequeues the top element of the queue', function() {
      var top = queue.deq()
      expect(top).to.be('e');
    });

    it('iterates over all queue elements in order (4)', function () {
      var iteration = [];

      queue.forEach(function(element, index) {
        iteration.push([element, index]);
      });

      expectForEach(iteration, ['d', 'c', 'b', 'b', 'a'], 5)
    });

    it('dequeues two elements of the queue and iterates over all queue elements in order', function() {
      var q = constructSampleQueue()
      var top
      top = q.deq()
      expect(top).to.be('e');
      top = q.deq()
      expect(top).to.be('d');

      var iteration = [];

      q.forEach(function(element, index) {
        iteration.push([element, index]);
      });

      expectForEach(iteration, ['c', 'b', 'b', 'a'], 4)
    });

    it('dequeues three elements of the queue and iterates over all queue elements in order', function() {
      var q = constructSampleQueue()
      var top
      top = q.deq()
      expect(top).to.be('e');
      top = q.deq()
      expect(top).to.be('d');
      top = q.deq()
      expect(top).to.be('c');

      var iteration = []

      q.forEach(function(element, index) {
        iteration.push([element, index]);
      });

      expectForEach(iteration, ['b', 'b', 'a'], 3)
    });

/*
    it('iterates over all queue elements in order', function () {
      var iteration = []
      
      queue.forEach(function(element, index) {
        iteration.push([element, index]);
      });
      
      expect(iteration[0][0]).to.be.eql('d');
      expect(iteration[0][1]).to.be.eql(0);
      expect(iteration[1][0]).to.be.eql('c');
      expect(iteration[1][1]).to.be.eql(1);
      expect(iteration[2][0]).to.be.eql('b');
      expect(iteration[2][1]).to.be.eql(2);
      expect(iteration[3][0]).to.be.eql('a');
      expect(iteration[3][1]).to.be.eql(3);
    });*/
  });
});

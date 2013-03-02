var PriorityQueue = require('./index');

describe('PriorityQueue()', function() {
  it('returns an new PriorityQueue', function() {
    (new PriorityQueue()).should.be.an.instanceof(PriorityQueue);
  });

  it('accepts a comparator function', function() {
    var queue = new PriorityQueue(function(a, b) {
      return a - b;
    });

    queue.should.be.an.instanceof(PriorityQueue);
  });

  describe('.DEFAULT_COMPARATOR()', function() {
    context('given strings', function() {
      it('returns a negative number when a < b', function() {
        PriorityQueue.DEFAULT_COMPARATOR('jano', 'vale').should.be.below(0);
      });

      it('returns 0 number when a == b', function() {
        PriorityQueue.DEFAULT_COMPARATOR('jano', 'jano').should.equal(0);
      });

      it('returns a positive number when a > b', function() {
        PriorityQueue.DEFAULT_COMPARATOR('jano', 'fran').should.be.above(0);
      });
    });

    context('given numbers', function() {
      it('returns a negative number when a < b', function() {
        PriorityQueue.DEFAULT_COMPARATOR(10, 1000).should.be.below(0);
      });

      it('returns 0 number when a == b', function() {
        PriorityQueue.DEFAULT_COMPARATOR(10, 10).should.equal(0);
      });

      it('returns a positive number when a > b', function() {
        PriorityQueue.DEFAULT_COMPARATOR(10, 1).should.be.above(0);
      });
    });
  });

  describe('#empty()', function() {
    it('returns true when the queue is empty', function() {
      var queue = new PriorityQueue();
      queue.empty().should.be.equal(true);
    });

    it('returns false when the queue is not empty', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      queue.empty().should.be.equal(false);
    });
  });

  describe('#peek()', function() {
    it('fails when the queue is empty', function() {
      var queue = new PriorityQueue();
      (function() {
        queue.peek().should.be.equal(0);
      }).should.throwError('PriorityQueue is empty');
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
      queue.peek().should.be.equal('zombie');
    });
  });

  describe('#deq()', function() {
    it('fails when the queue is empty', function() {
      var queue = new PriorityQueue();
      (function() {
        queue.deq();
      }).should.throwError('PriorityQueue is empty');
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
      queue.deq().should.be.equal('zombie');
      queue.deq().should.be.equal('zombie');
      queue.deq().should.be.equal('valentina');
      queue.deq().should.be.equal('valentina');
      queue.deq().should.be.equal('jano');
      queue.deq().should.be.equal('jano');
      queue.deq().should.be.equal('frank');
      queue.deq().should.be.equal('fran');
      queue.deq().should.be.equal('albert');
      queue.deq().should.be.equal('albert');
      queue.empty().should.be.equal(true);
    });

    it('not fails with only one element', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      queue.deq().should.be.equal('jano');
      queue.size().should.be.equal(0);
    });

    it('works with custom comparators', function() {
      var queue = new PriorityQueue(function(a, b) {
        return b.priority - a.priority;
      });

      queue.enq({ priority: 100 });
      queue.enq({ priority: -1 });
      queue.enq({ priority: 0 });
      queue.enq({ priority: 5 });
      queue.deq().should.eql({ priority: -1 });
      queue.deq().should.eql({ priority: 0 });
      queue.deq().should.eql({ priority: 5 });
      queue.deq().should.eql({ priority: 100 });
      queue.empty().should.be.equal(true);
    });
  });

  describe('#enq()', function() {
    it('enqueues an element at the end of the queue', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      queue.enq('valentina');
      queue.enq('fran');
      queue.peek().should.equal('valentina');
      queue.size().should.be.equal(3);
    });

    it('returns the new size of the queue', function() {
      var queue = new PriorityQueue();
      queue.enq('jano').should.equal(1);
    });

    it('works with custom comparators', function() {
      var queue = new PriorityQueue(function(a, b) {
        return b.priority - a.priority;
      });

      queue.enq({ priority: 100 });
      queue.enq({ priority: -1 });
      queue.enq({ priority: 0 });
      queue.enq({ priority: 5 });
      queue.peek().should.eql({ priority: -1 });
      queue.size().should.be.equal(4);
    });
  });

  describe('#size()', function() {
    it('returns 0 when the queue is empty', function() {
      var queue = new PriorityQueue();
      queue.size().should.be.equal(0);
    });

    it('returns the size of the queue', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      queue.enq('valentina');
      queue.size().should.be.equal(2);
    });
  });
});

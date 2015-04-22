if (typeof window !== 'undefined') {
  var assert = chai.assert
  fetchival.mode = 'cors'
} else {
  var assert = require('chai').assert
  var fetchival = require('../')
  fetchival.fetch = require('node-fetch')
}

describe('fetchival', function () {
  this.timeout(5000)
  this.slow(5000)

  describe('fetchival(/posts)', function () {
    var posts = fetchival('http://jsonplaceholder.typicode.com/posts')

    it('should #get()', function (done) {
      posts
        .get()
        .then(function (arr) {
          assert(arr.length)
          done()
        })
        .catch(done)
    })

    it('should #get(1)', function (done) {
      posts(1)
        .get()
        .then(function (obj) {
          assert.property(obj, 'title')
          done()
        })
        .catch(done)
    })

    it('should #get({ query: })', function (done) {
      posts
        .get({ userId: 1 })
        .then(function (arr) {
          assert.lengthOf(arr, 10)
          done()
        })
        .catch(done)
    })

    it('should #post({ data: }', function (done) {
      posts
        .post({ title: 'foo'})
        .then(function (obj) {
          assert.property(obj, 'id')
          done()
        })
        .catch(done)
    })

    it('should #put({ data: })', function (done) {
      posts(1)
        .put({ title: 'foo'})
        .then(function (obj) {
          assert.propertyVal(obj, 'title', 'foo')
          done()
        })
        .catch(done)
    })

    it('should #patch({ data: })', function (done) {
      posts(1)
        .patch({ title: 'foo'})
        .then(function (obj) {
          assert.propertyVal(obj, 'title', 'foo')
          done()
        })
        .catch(done)
    })

    it('should #delete()', function (done) {
      posts(1)
        .delete()
        .then(function (obj) {
          assert.deepEqual(obj, {})
          done()
        })
        .catch(done)
    })
  })

  describe('fetchival(/posts/1/comments)', function () {
    var posts = fetchival('http://jsonplaceholder.typicode.com/posts')
    var comments = posts(1, 'comments')

    it('should #get()', function (done) {
      comments
        .get()
        .then(function (arr) {
          assert(arr.length)
          done()
        })
    })
  })

  describe('fetchival(/not/found)', function () {
    var notFound = fetchival('http://jsonplaceholder.typicode.com/not/found')

    it('should fail with 404', function (done) {
      notFound
        .get()
        .catch(function (err) {
          assert.equal(err.response.status, 404)
          done()
        })
    })
  })
})

if (typeof window !== 'undefined') {
  var assert = chai.assert
} else {
  var assert = require('chai').assert
  var fetchival = require('../')
  fetchival.fetch = require('node-fetch')
}

var requestJSON = fetchival('http://jsonplaceholder.typicode.com', {
  mode: 'cors',
  headers: { 'X-TEST': 'test' }
})

var requestText = fetchival('http://jsonplaceholder.typicode.com', {
  mode: 'cors',
  headers: { 'X-TEST': 'test' },
  responseAs: 'text'
})

describe('fetchival', function () {
  this.timeout(5000)
  this.slow(5000)

  describe('requestText(posts) [text]', function() {
      var postsStr = requestText('posts')

      it('should #get()', function(done) {
          postsStr
            .get()
            .then(function (data) {
                assert(data.substring(0, 1) === '[')
                done()
            })
            .catch(done)
      })
  })

  describe('requestJSON(posts) [json]', function () {
    var posts = requestJSON('posts')

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

  describe('requestJSON(posts/1/comments)', function () {
    var posts = requestJSON('posts')
    var comments = posts(1 + '/comments')

    it('should #get()', function (done) {
      comments
        .get()
        .then(function (arr) {
          assert(arr.length)
          done()
        })
    })
  })

  describe('requestJSON(not/found)', function () {
    var notFound = requestJSON('not/found')

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

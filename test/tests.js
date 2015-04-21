var assert = chai.assert
fetchival.mode = 'cors'

describe('fetchival', function () {
  this.slow(2000)

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
      // Actually delete fails on jsonplaceholder because it doesn't return JSON
      posts(1)
        .delete()
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
    var notFound = fetchival('/not/found')

    it('should fail with 404', function (done) {
      notFound
        .get()
        .catch(function (err) {
          console.log(err)
          assert.equal(err.response.status, 404)
          done()
        })
    })
  })
})

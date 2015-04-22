# fetchival

> Makes writing JSON requests with [fetch](https://github.com/github/fetch) easier.

![img](http://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Sem_t%C3%ADtulo_holi_festival_colours_2013.jpg/1024px-Sem_t%C3%ADtulo_holi_festival_colours_2013.jpg)

### fetch

```javascript
fetch('/users', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Typicode',
    login: 'typicode',
  })
})
.then(function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }
  throw new Error(response.statusText)
})
.then(function(json) {
  // ...
})
```

### fetch + fetchival = <3


```javascript
fetchival('/users').post({
  name: 'Typicode',
  login: 'typicode'
})
.then(function(json) {
  // ...
})
```

## Installation

Fetchival is available on Bower and npm (Browserify)

```bash
bower install es6-promise fetch # polyfills
bower install fetchival
```

```bash
npm install es6-promise whatwg-fetch --save # polyfills
npm install fetchival --save
```

## Usage examples

```javascript
//posts
var posts = fetchival('/posts')

posts.get()
posts.get({ category: 'javascript' })
posts.post({ title: 'Fetchival' })

//posts/1
posts(1).get()
posts(1).put({ title: 'Fetchival is simple' })
posts(1).patch({ title: 'Fetchival is simple' })
posts(1).delete()

//posts/1/comments
var comments = posts(1, 'comments')
comments.get()

//posts/1/comments/1
comments(1).get()
```

To build URLs, you can pass any numbers of arguments

```javascript
fetchival('/posts', 1, 'comments').get()
fetchival('/posts')(1)('comments').get()
```

To catch errors

```javascript
fetchival('/posts')
  .get()
  .catch(function(err) {
    console.log(err)
  })
```

To enable CORS

```javascript
// Globally
fetchival.mode = 'cors'

// Locally
var posts = fetchival('/posts', { mode: 'cors' })
```

## Credit

Image by Gianluca Ramalho Misiti (Flickr: sem título-25) [<a href="http://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>], <a href="http://commons.wikimedia.org/wiki/File%3ASem_t%C3%ADtulo_holi_festival_colours_2013.jpg">via Wikimedia Commons</a>

## License

MIT - [Typicode](https://github.com/typicode)

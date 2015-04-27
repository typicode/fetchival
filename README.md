# fetchival.js [![](https://travis-ci.org/typicode/fetchival.svg?branch=master)](https://travis-ci.org/typicode/fetchival)

> Makes writing JSON requests with [fetch](https://github.com/github/fetch) easier

Fetchival supports all major __browsers__ (IE9+) and __Node__.

It's also Promise based and weighs only 0.5kb min/gz.

![img](http://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Sem_t%C3%ADtulo_holi_festival_colours_2013.jpg/1024px-Sem_t%C3%ADtulo_holi_festival_colours_2013.jpg)

### fetch only

```javascript
// POST request
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
// POST request
fetchival('/users').post({
  name: 'Typicode',
  login: 'typicode'
})
.then(function(json) {
  // ...
})
```

`.get()`, `.put()`, `.patch()` and `.delete()` methods are also available.

## Installation

Fetchival is available on Bower and npm

__Browser__

```bash
bower install es6-promise fetch # polyfills
bower install fetchival
```

```bash
npm install es6-promise whatwg-fetch --save # polyfills
npm install fetchival --save # Browserify
```

__Node__

```bash
npm install node-fetch fetchival --save
```

## Usage examples

```javascript
var posts = fetchival('/posts')

//posts
posts.get()
posts.post({ title: 'Fetchival' })

//posts?category=javascript
posts.get({ category: 'javascript' })

//posts/1
posts(1).get()
posts(1).put({ title: 'Fetchival is simple' })
posts(1).patch({ title: 'Fetchival is simple' })
posts(1).delete()

var comments = posts(1, 'comments')

//posts/1/comments
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

To use fetchival in Node, you need to install `node-fetch` and configure fetchival to use it

```javascript
var fetchival = require('fetchival')
fetchival.fetch = require('node-fetch')
```

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 9+ ✔ | Latest ✔ | 6.1+ ✔ |

## Credit

Image by Gianluca Ramalho Misiti (Flickr: sem título-25) [<a href="http://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>], <a href="http://commons.wikimedia.org/wiki/File%3ASem_t%C3%ADtulo_holi_festival_colours_2013.jpg">via Wikimedia Commons</a>

## License

MIT - [Typicode](https://github.com/typicode)

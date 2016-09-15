## CarPool

This is a WebApp based on <a href="https://github.com/trueadm/inferno">Inferno.js</a>, an <a href="http://infernojs.org/benchmarks/dbmonster-spike/">extremely fast</a>, <a href="http://facebook.github.io/react/">React-API</a> compatible library.

Currently, there's not much in this demo but it contains:

- a complete **infrastructure** built on <a href="https://github.com/trueadm/inferno">Inferno.js</a> and <a href="http://getbootstrap.com/">Bootstrap</a>
- a **web server** based on <a href="http://hapijs.com/">Hapi</a>
- **Babel.js** and the needed presets and plugins. [*see .babelrc*]
- **build configs** for Gulp.js and WebPack
- **testing skeleton** based on Mocha & Chai
- a minimal **<a href="http://redux.js.org/">Redux</a>** state management
- a **rudimentary** 'CarPool' **WebApp** showing a few (*freely available*) car pictures

<img src="http://fs5.directupload.net/images/160209/ihft79fr.png">

## Installation

```shell
npm install
```

## Building

```shell
gulp
```

Gulp will then copy all the files from `src/` to `build/tmp` and invoke WebPack which in turn will create a new release under `build/release`.

For continuous development use:

```shell
gulp watch
```

There's no `hot-reloading` because Inferno.js Components can't be consumed by WebPack's Hot-Loader. This is understandable as Inferno's components
only have a React-compatible API but not the internal structure. For example, the <a href="https://github.com/trueadm/inferno/blob/master/src/DOM/rendering.js#L32">InfernoDOM.render()</a> function doesn't return the instance of the root
Component. And without it the HotLoader will be <a href="https://christianalfoni.github.io/react-webpack-cookbook/Hot-loading-components.html">unable to localize the root of the WebApp.</a>

#### Example code from React Hot-Loading Docs

```javascript
// When you render it, assign it to a variable
var rootInstance = React.render(RootComponent(), document.body);

// Then just copy and paste this part at the bottom of
// the file
if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}
```

I'll try to find out if there's any possibility to hot-load Inferno's components and for the time being you can use the older `livereload` functionality provided by <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei">LiveReload Chrome-Plugin</a> + `gulp watch` from the console.

## Running

```shell
npm start
```

Hapi.js will use `index.js` from the root of the project and serve the contents on <a href="http://localhost:8080">http://localhost:8080</a>

## Testing

```shell
npm test
```

<img src="http://fs5.directupload.net/images/160916/hyed7e2h.png">


or for continuous testing

```shell
npm test:watch
```

Currently, there's not much to test because everything here is still in flux.

## License

<a href="https://github.com/brakmic/CarPool/blob/master/LICENSE">MIT</a>

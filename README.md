## CarPool

This is a WebApp based on <a href="https://github.com/trueadm/inferno">Inferno.js</a>, an <a href="http://infernojs.org/benchmarks/dbmonster-spike/">extremely fast</a>, <a href="http://facebook.github.io/react/">React-API</a> compatible library.

Currently, there's not much in this demo but:

- it contains a complete **infrastructure** built on <a href="https://github.com/trueadm/inferno">Inferno.js</a> and <a href="http://getbootstrap.com/">Bootstrap</a>
- it contains a **web server** based on <a href="http://hapijs.com/">Hapi</a>
- it contains **Babel.js** and the needed presets and plugins. [*see .babelrc*]
- it contains **build scripts** built with Gulp.js and WebPack
- it contains a **testing skeleton** based on Mocha & Chai
- it contains a few **<a href="http://redux.js.org/">Redux</a>** action creators and a reducer (soon I'll provide a Redux-based state management)
- it contains a **rudimentary** 'CarPool' **WebApp** showing a few (*freely available*) car pictures

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

Currently, there's no `hot-reloading` but I'll provide this functionality very soon. :smile:

## Running

```shell
npm start
```

Hapi.js will use `index.js` from the root of the project and serve the contents on <a href="http://localhost:8080">http://localhost:8080</a>

## Testing

```shell
npm test
```

or for continuous testing

```shell
npm test:watch
```

Currently, there's not much to test because everything here is still in flux.

## License

<a href="https://github.com/brakmic/CarPool/blob/master/LICENSE">MIT</a>

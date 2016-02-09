## CarPool

This is a WebApp based on Inferno.js

Currently, there's not much in it but:

- it contains a complete infrastructure built on Inferno.js (a React.js API compatible library) and Bootstrap
- it contains a web server based on Hapi.js
- it contains build scripts built with Gulp.js and WebPack
- it contains a testing skeleton based on Mocha & Chai
- it contains a few Redux action creators and a reducer (soon I'll provide a Redux-based state management)
- it contains a rudimentary 'CarPool' WebApp showing a few (*freely available*) car pictures


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

MIT

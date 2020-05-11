<div align="center">
  <img src="https://raw.githubusercontent.com/whizzes/avocado/master/docs/logo/app-icon.png" height="120" width="120" />
  <h1>avocado</h1>
  <small>Web APIs Testing tool</small>
</div>

## Development

### Requirements

- NodeJS `v12` *(or greater)*

### Installation

Install dependencies:
```sh
# whizzes/avocado
$ npm run dist
```

Run the development mode:
```sh
# whizzes/avocado
$ npm start
```

## Release
A release matching your OS is made when running `npm run build` from this directory.
The final distribution is available in `avocado/dist/`.

### Scaffold
```
avocado
└── dist
    ├── desktop   # executables for your OS
    │   └── {os}
    │
    └── ui        # webpack bundle files from ui package
```

## License
This project is licensed under the MIT License.
[License](https://github.com/whizzes/avocado/blob/master/LICENSE)

<div align="center">
  <img src="https://raw.githubusercontent.com/whizzes/avocado/master/docs/logo/app-icon.png" height="120" width="120" />
  <h1>avocado</h1>
  <small>Web APIs Testing tool</small>
</div>

## Development
Any contribution to this project is welcome. Please read the following instructions
in order to contribute and setup the environment required to work with this project.

### Required Software
- NodeJS `v12` *(or greater)*

### Recommended Software
- Docker
- VSCode

### Installation

Install dependencies:

```sh
# whizzes/avocado
$ npm run setup
```

Then, run the development server and electron in development mode running `npm start`.

### Workspace
A Visual Studio Code Workspace is provided for a better development experience,
the use of this workspace is recommended in order to avoid conflicts with either meta or configuration 
files existing in each package. (e.g. tsconfig.json, .eslintrc).

### Environment
The project's `docker/` directory has containers with services such as a WebSocket
intended for testing purposes. A `docker-compose` file is also available which is used
to execute all the available containers.

```sh
$ docker-compose up --build
```

## Release
A release matching your OS is created when running `npm run build`.
The final distribution is available at the `dist` directory.

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

[Read License](https://github.com/whizzes/avocado/blob/master/LICENSE)

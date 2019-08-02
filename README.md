## Development

You need to use **Node.js** `v10.15.*` or later in your system.
Use [nvm](https://github.com/creationix/nvm) to control node version.

After cloning repo install dependencies
```sh
  npm install
```

Start development server:
```sh
  npm run dev
```

Create an optimized production build:
```sh
  npm run build
```

If you want to serve build locally:
```
  npm i -g serve
  serve -s dist/
```

## Project Structure

```
├── dist/                 # Store processed/minified files - your project's deployable output
├── text/                 # Files from this folder will be copied to public folder and served as static resouces  
└── src/                  # Source code
    ├── assets/           # Images, fonts and any kinds of media content.
    ├── markup/           # HTML files
    ├── script/           # JS files
    └── styles/           # SCSS files   
```               



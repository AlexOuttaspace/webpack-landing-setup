## Development

You need to use **Node.js** `v10.16.*` or later in your system.
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

To add a new pages, go to file `pages.js` and add new entry to array, specifying js, scss and hbs files.

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



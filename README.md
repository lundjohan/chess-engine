To run, write in prompt (nodejs must be installed):
node server.js 
=> In browser, go to localhost:3000

Notice that I added in tsconfig.json file 
"test": "tsc && mocha --reporter list dist/test" => this make sure I don't have to write 'tsc' in terminal everytime I run 'npm test'. I also added 'dist/test' so it's enough to write 'npm [run] test'

tsconfig.json file I added 
"target": "es2015". I wanted classes in .js
Perhaps should remove this.

Installation for Mocha:
  npm install mocha --save-dev
  npm install @types/mocha --save-dev
  ..Installation for Chai:
  npm install chai @types/chai --save-dev
  ..Typescript
  npm install --save-dev typescript

This will end up being a client. Why writing a client when there exists Xboard etc?
Well I want to create my engine incrementally, so it makes sense.

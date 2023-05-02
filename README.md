Chess Engine

To run the html page, write in prompt (nodejs must be installed):
node server.js 
=> In browser, go to localhost:3000

However, most of the developing is going on in the test file(s). And the html-page will perhaps never be used, as this might turn out to be only the engine (only the server and not the client). On the other hand, it might be split into its own client project. We'll see.

Notice that I added in tsconfig.json file 
"test": "tsc && mocha --reporter list dist/test" => this make sure I don't have to write 'tsc' in terminal everytime I run 'npm test'. I also added 'dist/test' so it's enough to write 'npm [run] test'.
  (Btw npx is the command that runs the local mocha, the one installed in node_modules, so the equivalent of <"test": mocha> is <npx mocha>)

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

I want to create my engine incrementally, so it CAN make sense writing a client (other than just complete the engine and hook it up against XBoard).

The server & client should incrementally implement the Universal Chess Interface (UCI) protocol.
http://page.mi.fu-berlin.de/block/uci.htm


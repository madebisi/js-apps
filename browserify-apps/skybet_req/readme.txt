
Ok..now you have unziped the file..



Prerequisites: nodejs, npm (node package manager, comes with node..)



open cmd/bash as Administrator



1.install browserify : http://browserify.org/#install
    
	run Command: npm install -g browserify


2. install all dependancies via npm: 
    
	run command: npm install


3. now lets browserify our project.. i.e build all the modules into one js file: we can mininfy this later. using other grunt/gulp tools
    
	run command: browserify ./js/bettingModule.js -o ./js/bundle.js



4. thats it..just now open index.html under any webserver path  i.e : http://localhost/skybet_req/index,html
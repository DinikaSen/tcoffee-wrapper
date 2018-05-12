# tcoffee-wrapper
A simple node module that wraps the functionalities of T-Coffee multiple sequence alignment program

Visit official T-Coffee web site to learn more about it. [http://www.tcoffee.org/Projects/tcoffee/index.html](http://www.tcoffee.org/Projects/tcoffee/index.html)

## Install

You can install tcoffee-wrapper by running,

```bash
npm install tcoffee-wrapper
```

You can download pre-compiled T-Coffee binary by running, 

```bash
node util/downloader.js
```

It will download the T-Coffee installer package to util/bin folder and launch installer for you 


## Usage
#### Align Protein Sequences using T-Coffee Default
* .alignProtein (inputFile, callback)    
  callback passed (err, data)
  
  ```javascript
  const tcoffee = require('tcoffee-wrapper');
  var inputFile = 'samples/example.fasta';
  
  tcoffee.alignProtein(inputFile, function(err,data){
      if(err){
          console.log(err);
      }else{
          console.log(data);
      }
  });
      
#### Align DNA Sequences using T-Coffee Default
* .alignDNA (inputFile, callback)   
  callback passed (err, output)
  
#### Align RNA Sequences using T-Coffee Default
* .alignRNA (inputFile, callback)   
  callback passed (err, output)

#### Align Protein Sequences using T-Coffee fast
* .alignProteinFast (inputFile, callback)   
  callback passed (err, output)

#### Align Protein Sequences using mcoffee
* .alignMcoffee (inputFile, callback)   
  callback passed (err, output)

#### Align DNA Sequences using procoffee
* .alignProCoffee (inputFile, callback)   
  callback passed (err, output)

#### Align RNA Sequences using rcoffee
* .alignProCoffee (inputFile, callback)   
  callback passed (err, output)

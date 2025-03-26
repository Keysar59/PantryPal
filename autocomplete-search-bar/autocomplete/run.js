#!/usr/bin/env node
//main
const communication = require('./communication');



async function main() {
  try {
    const result = await communication.getProductsOptionsByName("milk", 1);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

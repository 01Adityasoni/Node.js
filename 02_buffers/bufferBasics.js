const {Buffer } = require('buffer');

// create a buffer 
const buf1 = Buffer.alloc(4); // creates a buffer of 4 bytes filled with zeros


console.log(buf1); // <Buffer 00 00 00 00>


const buf2 = Buffer.from('Hello'); // creates a buffer from a string
console.log(buf2); // <Buffer 48 65 6c 6c 6f>
console.log(buf2.toString()); // Hello


const buf3 = Buffer.allocUnsafe(10); // creates a buffer of 10 bytes, but the content is not initialized (may contain old data)
console.log(buf3) // <Buffer 00 00 00 00 00 00 00 00 00 00> (may contain random data)node


const buf4 = Buffer.alloc(10) 
buf4.write('aditya'); // writes 'aditya' into the buffer
console.log(buf4.toString()) // aditya (the rest of the buffer will be filled with zeros)


const buf5 = Buffer.from('node tutorial'); // creates a buffer from a string
console.log(buf5.toString()) // node tutorial
console.log(buf5.toString('utf8', 0, 4)) // node (reads only the first 4 bytes)


const buf6 = Buffer.from("Rahul");
console.log(buf6)// <Buffer 52 61 68 75 6c>
buf6[0] = 0x4A // changes the first byte to 'J' (0x4A is the ASCII code for 'J')
console.log(buf6)// <Buffer 4A 61 68 75 6c>
console.log(buf6.toString()); // J Rahul (the first character is now 'J')



const buf7 = Buffer.from("Hello ");
const buf8 = Buffer.from("World");
const merged = Buffer.concat([buf7, buf8]); // merges two buffers into one
console.log(merged.toString()); // Hello World
console.log(merged.length); // 11 (length of the merged buffer)
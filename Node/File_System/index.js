const fs = require('node:fs'); // using node in front of fs is optional but it is recommended to use it to avoid confusion with other modules that may have the same name. The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions. It allows you to read, write, and manipulate files and directories on your computer.

// Read a file using readFileSync sync = synchronous method 
 //const data = fs.readFileSync('Notes.txt', 'utf-8');
 //console.log(data);


// create a new file using writeFileSync method
//fs.writeFileSync('Copy.txt', 'This is a new file created using writeFileSync method.' , 'utf-8'); // This will create a new file named Copy.txt and write the specified content to it.


// create a new file with a copy of first file . this writefile function overwrite the content of the file if it already exists. so if we run this code again it will overwrite the content of Duplicate.txt with the content of Notes.txt
//fs.writeFileSync('Duplicate.txt' , data , 'utf-8'); // This will create a new file named Duplicate.txt and write the content of Notes.txt to it.


// create a new file with a copy of first file without overwriting the content of the file if it already exists. this appendFileSync method will append the content of Notes.txt to Duplicate1.txt if it already exists, instead of overwriting it.
//fs.appendFileSync('Duplicate.txt' ,  '\nhey', 'utf-8'); // This will create a new file named Duplicate1.txt and append the content of Notes.txt to it if it already exists, otherwise it will create a new file and write the content of Notes.txt to it.


// create directory using mkdirSync method
// fs.mkdirSync('New_Directory/abc/a' , { recursive: true }); // This will create a new directory named New_Directory and a subdirectory named abc inside it. The { recursive: true } option allows the creation of nested directories. If the parent directory (New_Directory) does not exist, it will be created automatically along with the subdirectory (abc).


// remove directory using rmdirSync method
// fs.rmdirSync('New_Directory/abc' , { recursive: true }); // This will remove the directory named abc inside New_Directory. The { recursive: true } option allows the removal of non-empty directories. If the directory contains files or subdirectories, they will be removed along with it.

// delete a using  unlinkSync method
// fs.unlinkSync('Copy.txt'); // This will delete the file named Copy.txt from the file system. If the file does not exist, it will throw an error.
 

// till now we have used synchronous methods which block the execution of the code until the operation is completed. Now we will see how to use asynchronous methods which do not block the execution of the code and allow other operations to run while waiting for the file system operations to complete.
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// asynchronous method 

// read a file using readFile method
fs.readFile('Notes.txt', 'utf-8', (err, result) => {
    if (err) {
        console.error(err);
        return;
    }else{
        console.log(result);
    }
}); // This will read the content of Notes.txt and log it to the console. The callback function is called when the operation is complete, and it receives an error object (if any) and the data read from the file.



// create a new file using writeFile method
fs.writeFile('AsyncCopy.txt', 'This is a new file created using writeFile method.' , 'utf-8', (err) => {
    if (err) {
        console.error(err);
        return;
    }   else {
        console.log('File created successfully');
    }   
}); // This will create a new file named AsyncCopy.txt and write the specified content to it. The callback function is called when the operation is complete, and it receives an error object (if any).



// append content to a file using appendFile method
fs.appendFile('AsyncCopy.txt', '\nThis content is appended to the file using appendFile method.' , 'utf-8', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    else {      console.log('Content appended successfully');
    }   
}); // This will append the specified content to the file named AsyncCopy.txt. The callback function is called when the operation is complete, and it receives an error object (if any).

// status of a file using stat method
fs.stat('AsyncCopy.txt', (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    else {
        console.log(stats);
    }
}); // This will retrieve the status of the file named AsyncCopy.txt and log it to the console. The callback function is called when the operation is complete, and it receives an error object (if any) and a stats object containing information about the file (such as size, creation date, etc.).



// delete a file using unlink method
//fs.unlink('AsyncCopy.txt', (err) => {
  //  if (err) {
    //    console.error(err);
      //  return;
   // }   
   // else {
     //   console.log('File deleted successfully');
   // }
//}); // This will delete the file named AsyncCopy.txt from the file system. The callback function is called when the operation is complete, and it receives an error object (if any).


// create a new directory using mkdir method
fs.mkdir('AsyncDirectory', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    else {

        console.log('Directory created successfully');
    }
}
); // This will create a new directory named AsyncDirectory. The callback function is called when the operation is complete, and it receives an error object (if any).

// remove a directory using rmdir method
// fs.rmdir('AsyncDirectory', (err) => {
  //  if (err) {
    //    console.error(err);
        //  return;
    //}
    //else {
        //  console.log('Directory removed successfully');
    //}
//}); // This will remove the directory named AsyncDirectory. The callback function is called when the operation is complete, and it receives an error object (if any). Note that the directory must be empty before it can be removed, otherwise it will throw an error.



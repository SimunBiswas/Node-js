const fs = require("fs");
const crypto = require('crypto');

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => console.log("Timer is Finished"), 0);
setImmediate(() => console.log("immediate is finished"));

fs.readFile("test-file.txt", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  // console.log("File contents:", data.toString());
  console.log("I/O finished");
  console.log("-------------")

  setTimeout(() => console.log("Timer 2 is Finished"), 0);
  setTimeout(() => console.log("Timer 3 is Finished"), 3000);
  setImmediate(() => console.log("immediate 2 is finished"));

  process.nextTick( () => console.log("Process.nextTick"))

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512")
  console.log(Date.now() - start , "Password Encrypted")

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start , "Password Encrypted")
  })
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start , "Password Encrypted")
  })
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start , "Password Encrypted")
  })
});

console.log("Hello from the top level code");

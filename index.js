const { kMaxLength } = require("buffer");
const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////////////////////////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file written");

// Non-blocking, asynchronous way

// fs.readFile("./txt/startr.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("voy blyaaa error ");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("your file has been created :-)");
//       });
//     });
//   });
// });
// console.log("Will read file !");

////////////////////////////////////////////////////////////////
// SERVER


fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
  const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "overview") {
    res.end("This is a OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is a PRODUCT");
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listenning to request server");
});

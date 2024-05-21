const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require('slugify');


const replaceTemplate =  require('./module/replaceModule')
//to replace placeholder, we are creating a placeholder for that called replaceTemplate

const filePath = `${__dirname}/1-node-farm/starter/dev-data/data.json`;

const tempOverview = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(filePath, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slugs)

const server = http.createServer((req, res) => {
  const endResult = url.parse(req.url, true);
  const { query, pathname } = endResult; // Destructuring pathname from endResult

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCTCARD%}", cardHtml);
    res.end(output);
  }

  // Product view
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product)
    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }
  // Not Found
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

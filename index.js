const http = require("http");
const fs = require("fs");
const url = require("url");

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempo = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
const tempc = fs.readFileSync(`${__dirname}/templates/Templet.html`, "utf-8");
const tempp = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");

const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    const card = dataObj.map((el) => replaceTemplate(tempc, el)).join("");
    const output = tempo.replace(/{%PRODUCT_CARDS%}/g, card);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    if (!product) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>Product not found!</h1>");
      return;
    }

    const output = replaceTemplate(tempp, product);
    res.end(output);
  }
});

server.listen(3001, "127.0.0.1", () => {
  console.log("server is running on port 3001");
});

const checkout = require("./checkout");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var jsonParser = bodyParser.json();

app.use(
  cors({
    origin: "*"
  })
);

app.post("/", jsonParser, async function (req, res) {
  try {
    const data = await checkout(req.body);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (e) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).end(JSON.stringify(e));
  }
});
app.get("/", function (req, res) {
  res.write("Hello World!..."); //write a response to the client
  res.end(); //end the response
});
app.listen(8080, function () {
  console.log("server running on 8080");
}); //the server object listens on port 8080

//create a server object:
// http
//   .createServer(function (request, response) {
//     console.dir(request.param);

//     if (request.method === "POST") {
//       console.log("POST");
//       var body = "";
//       request.on("data", function (data) {
//         body += data;
//         console.log("Partial body: " + body);
//       });
//       request.on("end", function () {
//         console.log("Body: " + body);
//         response.writeHead(200, { "Content-Type": "application/json" });
//         response.end(JSON.stringify({ hello: "world" }));
//       });
//     } else {
//       console.log("GET");
//       var html = `
//             <html>
//                 <body>
//                     Hello!
//                 </body>
//             </html>`;
//       response.writeHead(200, { "Content-Type": "text/html" });
//       response.end(html);
//     }
//   })
//   .listen(8080); //the server object listens on port 8080

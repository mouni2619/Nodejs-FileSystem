const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route for the homepage
app.get("/", (req, res) => {
  res.send("<div style=background-color:#EED9C4;padding:20px><h2 style=text-align:center>Hello! This is a NodeJS File System 😊</h2><br><ul><li>Here, I've created an API endpoint that creates a text file in the TextFiles folder📁. The file's content is the current timestamp🕒, and its name is the current date📅 and time🕒 followed by .txt📄 </li><br><li>To create a file, use the <b style=font-size:18px>/create-file</b> path after the URL🔗.</li><br><li>To view a list of files, use the <b style=font-size:18px>/list-files</b> path after the URL🔗.</li></ul></div>");
});

// Route for creating file
app.get("/create-file", (req, res) => {
  let currentTime = new Date();
  let year = currentTime.getFullYear();
  let month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
  let day = currentTime.getDate().toString().padStart(2, "0");
  let hours = currentTime.getHours();
  let period = hours >= 12 ? "PM" : "AM";
  hours = (hours % 12).toString().padStart(2, "0");
  let minutes = currentTime.getMinutes().toString().padStart(2, "0");
  let seconds = currentTime.getSeconds().toString().padStart(2, "0");
  let currentTimeStamp = `${hours}-${minutes}-${seconds} ${period}`;
  let fileName = `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
  const fileContent =  `current TimeStamp - ${currentTimeStamp.toString()}`

  // write file content to a text file
  fs.writeFile( `./TextFiles/${fileName}.txt`,fileContent, (err) => {
    if (err) {
      console.error("Error occurred while writing file:", err);
      res.status(500).send("Failed to write file. Please try again later❌.");
      return;
    }
    console.log(`${fileName} added`);
    res.send(`<div style=background-color:#EED9C4;padding:20px>📁${fileName}.txt <b>file created successfully✅<b></div>`);
  });
});

// Route for reading all file names in the TextFiles directory
app.get("/list-files", (req, res) => {
  fs.readdir("./TextFiles", (err, files) => {
    if (err) {
      console.error("Error occurred while reading files:", err);
      res.status(500).send("Failed to read files. Please try again later❌.");
      return;
    }
    const fileList = files.map((file) => `<ul><li>📝${file}</ul></li>`).join("");
    res.send(`<div style=background-color:#EED9C4;padding:20px><h2 style=margin-left:20px>List of Files:</h2>${fileList}</div>`);
  });
});

// Default route for handling errors like 404
app.get('/*', (req, res) => {
  res.status(404).send(`<h1 style=text-align:center>4️⃣0️⃣4️⃣ Page not found 🤕</h1>`);
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

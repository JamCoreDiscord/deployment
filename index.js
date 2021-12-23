var express = require("express");
var bodyParser = require("body-parser");
var childProcess = require("child_process");

var app = express();
app.use(bodyParser.json());

app.get("/ping", (req, res, next) => {
  res.json({ success: true });
});

app.post("/notify", (req, res, next) => {
  //Input will be: {"build_url": https://github.com/JamCoreDiscord/builds/tree/main/...}
  var url = req.body.build_url;
  url = url.replace("tree", "raw");
  console.log("Recieived update with URL: " + url);

  res.sendStatus(200);

  if (url.includes("Pinguino") && url.includes(".jar")) {
    childProcess.exec(
      "sh updatePinguino.sh " + url,
      (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
          console.log(`Error Updating Pinguino: ${error}`);
        }
      }
    );
  }
});

app.post("/dog/deploy", (req, res, next) => {
  childProcess;
  childProcess.exec(
    "./deploy.sh",
    { cwd: "~/DogWebsite" },
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        console.log(`Error Updating dog.jamalam.tech: ${error}`);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Deployment API running on port 3000!");
});

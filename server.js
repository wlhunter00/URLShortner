const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Urls = require("./models/Urls.js");

mongoose.connect(
  "mongodb+srv://expressUser:bkQ8i3FRi2oxnIrq@cluster0-wqfvl.mongodb.net/URLShortener?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.on("connected", () => console.log("Connected"));
mongoose.connection.on("error", () => console.log("Connection failed with - "));
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const urls = await Urls.find();
    res.render("index", { urls: urls });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/shortenURL", async (req, res) => {
  try {
    await Urls.create({ fullU: req.body.fullURL });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/changeURL", async (req, res) => {
  const newShortUrl = { shortU: req.body.editURL };
  const oldShortUrl = { shortU: req.body.urlEdited };
  try {
    const existingLink = await Urls.findOne(newShortUrl);
    if (existingLink) {
      res.sendStatus(400);
      res.redirect("/");
    } else {
      try {
        const linkChanging = await Urls.findOneAndUpdate(
          oldShortUrl,
          newShortUrl,
          {
            new: true
          }
        );
        res.redirect("/");
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/:shorten", async (req, res) => {
  const requestedURL = await Urls.findOne({ shortU: req.params.shorten });
  if (requestedURL == null) {
    return res.sendStatus(404);
  } else {
    requestedURL.clicks++;
    requestedURL.save();

    res.redirect(requestedURL.fullU);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port ", port));

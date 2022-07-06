const { conn, User, Thing } = require("./db");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use("/dist", express.static("dist"));
app.use("/public", express.static("public"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/api/things", async (req, res, next) => {
  try {
    res.status(201).send(await Thing.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/things/:id", async (req, res, next) => {
  try {
    const thing = await Thing.findByPk(req.params.id);
    await thing.destroy();
    res.sendStatus(200);
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/things/:id/increaseRating", async (req, res, next) => {
  try {
    const thing = await Thing.findByPk(req.params.id);
    await thing.set({
      rating: thing.rating + 1,
    });
    await thing.save();
    res.status(200).send(thing);
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/things/:id/decreaseRating", async (req, res, next) => {
  try {
    const thing = await Thing.findByPk(req.params.id);
    await thing.set({
      rating: thing.rating - 1,
    });
    await thing.save();
    res.status(200).send(thing);
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/things/:id/selectOwner/:userid", async (req, res, next) => {
  try {
    const thing = await Thing.findByPk(req.params.id);
    await thing.set({
      userId: req.params.userid,
    });
    await thing.save();

    res.send(thing);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/things", async (req, res, next) => {
  try {
    res.send(await Thing.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/users", async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(200);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (ex) {
    next(ex);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

const init = async () => {
  try {
    await conn.sync({ force: true });
    const [moe, larry, lucy, ethyl] = await Promise.all(
      ["moe", "larry", "lucy", "ethyl"].map((name) => User.create({ name }))
    );
    const [foo, bar, bazz, quq, fizz] = await Promise.all(
      ["foo", "bar", "bazz", "quq", "fizz"].map((name) =>
        Thing.create({ name })
      )
    );
  } catch (ex) {
    console.log(ex);
  }
};

init();

const express = require("express");
const app = express();
const axios = require('axios')

app.use(express.json());
app.post('/github', async (req, res, next) => {
  try {
    const ignored = (reason) => {
      res.send({ ok: true, ignored: reason })
    }
    if (req.body.action !== 'requested') {
      return ignored('Irrelevant action')
    }
    res.send({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).send({ ok: false })
  }
})
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

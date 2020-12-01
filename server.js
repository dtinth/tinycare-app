const express = require("express");
const app = express();
const axios = require("axios");
const encrypted = require("@dtinth/encrypted")();
const appInsights = require("applicationinsights");
const { createHash } = require("crypto");
const hashSalt = (value, salt) =>
  createHash("md5")
    .update(
      createHash("md5")
        .update(String(value))
        .digest("hex")
    )
    .update(
      createHash("md5")
        .update(salt)
        .digest("hex")
    )
    .digest("hex");

appInsights.setup();

const privateKey = encrypted(`Y6LVX4qQeK77toiOG/ma/O236nV+l7m7.ypEHltakBrY2yKD8TGWjCvHBIMRE
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
u0o+lGZJE8jrgbWBNUhaud7mH7CxS6cLkg==`);

const { App } = require("@octokit/app");
let cached;
let nextFetch = Date.now() + 60e3;

async function fetchTweets() {
  const { data } = await axios.get(
    "https://pleasetakecareofyourself.now.sh/api/tweets"
  );
  return data;
}

async function getTweets() {
  if (!cached) {
    cached = {
      data: await fetchTweets()
    };
  }
  if (Date.now() > nextFetch) {
    nextFetch = Date.now() + 60e3;
    (async () => {
      cached = {
        data: await fetchTweets()
      };
    })();
  }
  return cached.data;
}

app.use(express.json());
app.post("/github", async (req, res, next) => {
  try {
    const ignored = reason => {
      res.send({ ok: true, ignored: reason });
    };
    if (req.body.action !== "requested") {
      return ignored("Irrelevant action");
    }
    if (req.body.check_suite.app.id !== 90888) {
      return ignored("Irrelevant app");
    }
    const tweets = await getTweets();
    const tweet = tweets[~~(Math.random() * tweets.length)];
    const installationId = req.body.installation.id;
    const app = new App({
      appId: 90888,
      privateKey: privateKey
    });
    const octokit = await app.getInstallationOctokit(installationId);
    await octokit.request("POST /repos/{owner}/{repo}/check-runs", {
      owner: req.body.repository.owner.login,
      repo: req.body.repository.name,
      name: "@" + tweet.user.screen_name,
      head_sha: req.body.check_suite.head_sha,
      status: "completed",
      conclusion: "neutral",
      output: {
        title: tweet.text,
        summary: "&mdash;[@" + tweet.user.screen_name + "](" + tweet.url + ")"
      }
    });
    let client = appInsights.defaultClient;
    const telemetryProperties = {
      owner: hashSalt(
        req.body.repository.owner.node_id,
        "AGNTAWXR+UsApSN8j2XdiwFfYEctM3yp"
      ),
      repo: hashSalt(
        req.body.repository.node_id,
        "Fu9rnqGYy+6Txb/efIBakosx+vftQTX6"
      )
    };
    console.log(JSON.stringify(telemetryProperties));
    client.trackEvent({
      name: "tinycare-webhook",
      properties: telemetryProperties
    });
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false });
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

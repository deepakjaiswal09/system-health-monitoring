const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = 8000;

// Enable collection of default metrics
client.collectDefaultMetrics({ register: client.register });

// Define custom Histogram
const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "Time taken for HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.001, 0.05, 0.1, 0.2, 0.4, 0.5, 0.8, 1, 2],
});

// Middleware to capture start time
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  next();
});

// Root route
app.get("/", (req, res) => {
  setTimeout(() => {
    res.send("Hello World!");
  }, 100); // simulate 100ms work
});

// Metrics route
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  res.send(await client.register.metrics());
});

// AFTER response is sent, measure time
app.use((req, res, next) => {
  res.on("finish", () => {
    if (req.url !== "/metrics") {
      const durationInSeconds = (Date.now() - res.locals.startEpoch) / 1000;

      reqResTime
        .labels({
          method: req.method,
          route: req.route?.path || req.path || req.url,
          status_code: res.statusCode.toString(),
        })
        .observe(durationInSeconds);
    }
  });
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

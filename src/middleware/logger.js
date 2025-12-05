import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const logPath = process.env.LOG_FILE || path.join(process.cwd(), "src", "logs", "requests.log");

// ensure log folder exists
const dir = path.dirname(logPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

export const logMiddleware = (req, res, next) => {
  const start = Date.now();

  // capture original send to log response body
  const oldSend = res.send;
  res.send = function (data) {
    res.responseBody = data;
    oldSend.apply(res, arguments);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      duration,
      ip: req.ip,
      body: req.body,
      status: res.statusCode,
    };
    const text = JSON.stringify(logEntry) + "\n";
    fs.appendFile(logPath, text, (err) => {
      if (err) console.error("Failed to write log:", err);
    });
  });

  next();
};


import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

const API_KEY = process.env.YOUTUBE_API_KEY;

async function testAnalytics() {
  console.log("Testing Analytics API with Key: " + API_KEY.substring(0, 10) + "...");
  
  // Analytics API endpoint to get channel views (requires OAuth usually)
  const url = new URL("https://youtubeanalytics.googleapis.com/v2/reports");
  url.searchParams.set("ids", "channel==MINE");
  url.searchParams.set("metrics", "views");
  url.searchParams.set("startDate", "2024-01-01");
  url.searchParams.set("endDate", "2024-02-01");
  url.searchParams.set("key", API_KEY);

  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${text}`);
  } catch (err) {
    console.error("Fetch failed", err);
  }
}

testAnalytics();

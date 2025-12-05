// test-uic-api.js
// Run this to test both TEST and LIVE UIC APIs

const TEST_CONFIG = {
  url: "http://travelapi.theunitedsoftware.com",
  username: "TravelAPI",
  password: "85aeezx305ae285f5a7959f89a8af9caa5f57",
  apiKey: "7b6f1ttz41169d544e4eda4b2b263e6bffe50d",
  name: "TEST API"
};

const LIVE_CONFIG = {
  url: "http://APITravel.theunitedsoftware.com",
  username: "APITravel",
  password: "9f0a47f4be114fb19ab454c7c734f332",
  apiKey: "f04d8a9a146747ccbc87258f0f1bd77ebffe50d",
  name: "LIVE API"
};

async function testEndpoint(config) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Testing ${config.name}`);
  console.log("=".repeat(60));

  const queryParams = new URLSearchParams({
    UserName: config.username,
    Password: config.password,
    TravelerName: "Test User",
    NICNo: "",
    NTNNo: "",
    TravelDays: 7,
    DOB: "1990-01-15",
    SrvSrce: "UIC",
    Covid: "Not Covered"
  });

  const url = `${config.url}/API/Travel/GetPackagesDetailByTravelPeriodWithCovid?${queryParams}`;

  console.log("\nURL:", url);
  console.log("\nSending request...\n");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    console.log("✓ Response Status:", response.status, response.statusText);

    const contentType = response.headers.get("content-type");
    console.log("✓ Content-Type:", contentType || "Not specified");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("\n✅ SUCCESS! API is working!");
      console.log("\nResponse Data:");
      console.log(JSON.stringify(data, null, 2));
      return true;
    } else {
      const text = await response.text();
      console.log("\n❌ FAILED - API returned HTML/Text instead of JSON");
      console.log("\nFirst 500 characters of response:");
      console.log(text.substring(0, 500));

      // Check if it's an IIS error page
      if (text.includes("Internet Information Services") || text.includes("IIS")) {
        console.log("\n⚠️  This looks like an IIS server error page");
        console.log("   The API endpoint might not exist or is misconfigured");
      }
      return false;
    }
  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    if (err.cause) {
      console.error("Cause:", err.cause);
    }
    return false;
  }
}

async function testAllEndpoints() {
  console.log("\n🔍 Testing UIC Travel API Endpoints\n");

  const testResult = await testEndpoint(TEST_CONFIG);
  const liveResult = await testEndpoint(LIVE_CONFIG);

  console.log(`\n${"=".repeat(60)}`);
  console.log("SUMMARY");
  console.log("=".repeat(60));
  console.log(`TEST API: ${testResult ? "✅ Working" : "❌ Not Working"}`);
  console.log(`LIVE API: ${liveResult ? "✅ Working" : "❌ Not Working"}`);

  if (!testResult && !liveResult) {
    console.log("\n⚠️  RECOMMENDATIONS:");
    console.log("1. Check if you need to be on the company VPN");
    console.log("2. Verify the API credentials with UIC");
    console.log("3. The API servers might be down");
    console.log("4. Contact UIC support: info@theunitedsoftware.com");
  } else if (testResult) {
    console.log("\n✅ Use TEST API configuration in your .env file");
  } else if (liveResult) {
    console.log("\n✅ Use LIVE API configuration in your .env file");
  }

  console.log("\n");
}

testAllEndpoints();
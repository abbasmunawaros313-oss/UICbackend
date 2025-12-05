# UIC Travel Insurance API Backend

Production-grade Node.js backend for integrating **UIC Travel Insurance API (Version 1.6)** and **PakCare API**. Built with Express.js, featuring comprehensive validation, logging, and error handling.

## 🚀 Features

- ✅ **15+ REST API Endpoints** (Travel API + PakCare API)
- ✅ **Comprehensive Validation** using Joi (age, NIC, NTN, email, phone, etc.)
- ✅ **Winston Logging** for all requests/responses
- ✅ **Centralized Error Handling** with all UIC error codes mapped
- ✅ **Auto-injection** of credentials from environment variables
- ✅ **ES Modules** syntax throughout
- ✅ **Security** with Helmet.js
- ✅ **CORS** enabled

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. **Clone or navigate to the project directory**

```bash
cd OSBACKEND
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
# Server Configuration
PORT=5001
FRONTEND_URL=http://localhost:5173

# UIC TEST API Configuration
UIC_BASE_URL=http://travelapi.theunitedsoftware.com/
UIC_USERNAME=API.OS.isb
UIC_PASSWORD=API.on@estop7*7
UIC_API_KEY=7b6f1ttz41169d544e4eda4b2b263e6bffe50d
UIC_SRVSRCE=UIC
```

## 🏃 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5001`

## 📚 API Documentation

### Base URL

```
http://localhost:5001/api
```

### Health Check

```http
GET /api/health
```

---

## 🌍 Travel API Endpoints

### 1. Get Packages by Travel Period

```http
GET /api/uic/packages
```

**Query Parameters:**
- `TravelerName` (string, required)
- `NICNo` (string, required) - 13 digits or xxxxx-xxxxxxx-x format
- `NTNNo` (string, required)
- `TravelDays` (number, required) - 1-365
- `DOB` (string, required) - DD/MM/YYYY format, age 18-86
- `Covid` (string, required) - "Covered" or "Not Covered"

**Example:**
```bash
curl "http://localhost:5001/api/uic/packages?TravelerName=John%20Doe&NICNo=1234567890123&NTNNo=1234567&TravelDays=30&DOB=01/01/1990&Covid=Covered"
```

### 2. Get All Coverages

```http
GET /api/uic/coverages/all
```

### 3. Get Coverages by Area

```http
GET /api/uic/coverages/area?AreaShortCode=SCH
```

**Area Codes:** `SCH` (Schengen), `ROW` (Rest of World), `WW` (Worldwide), `PC` (Pakistan)

### 4. Get Countries by Area

```http
GET /api/uic/countries?AreaShortCode=SCH
```

### 5. Create Policy

```http
POST /api/uic/policy/create
Content-Type: application/json
```

**Request Body:**
```json
{
  "TravelerName": "John Doe",
  "NICNo": "1234567890123",
  "NTNNo": "1234567",
  "DOB": "01/01/1990",
  "PassportNo": "AB1234567",
  "Email": "john@example.com",
  "PhoneNo": "03001234567",
  "Address": "123 Main Street, City",
  "AreaShortCode": "SCH",
  "CountryCode": "DE",
  "PlanType": "S",
  "PlanName": "GOLD",
  "TravelDays": 30,
  "StartDate": "01/12/2024",
  "EndDate": "31/12/2024",
  "Covid": "Covered",
  "Premium": 15000,
  "GSTNo": "12-34-5678-901-23"
}
```

**For Family Plans (PlanType: "F"):**
```json
{
  "PlanType": "F",
  "SpouseName": "Jane Doe",
  "SpouseDOB": "15/05/1992",
  "SpousePassportNo": "CD7654321",
  "NoOfChildren": 2,
  "Children": [
    {
      "ChildName": "Child One",
      "ChildDOB": "10/03/2015",
      "ChildPassportNo": "EF1111111"
    },
    {
      "ChildName": "Child Two",
      "ChildDOB": "20/07/2018",
      "ChildPassportNo": "GH2222222"
    }
  ]
}
```

### 6. Get Policy Requests

```http
GET /api/uic/policy/requests?Datafor=All
```

**Datafor values:** `All`, `Pending`, `Cancelled`, `Posted`

### 7. Process Policy Request

```http
POST /api/uic/policy/process
Content-Type: application/json
```

**Request Body:**
```json
{
  "RequestID": "REQ123456",
  "isCancelled": false
}
```

**For Cancellation:**
```json
{
  "RequestID": "REQ123456",
  "isCancelled": true,
  "CRemarks": "Customer requested cancellation"
}
```

---

## 🏥 PakCare API Endpoints

### 1. Get Countries

```http
GET /api/pakcare/countries
GET /api/pakcare/countries?AreaShortCode=PC
```

### 2. Get Coverages

```http
GET /api/pakcare/coverages
GET /api/pakcare/coverages?AreaShortCode=PC
```

### 3. Get Packages

```http
GET /api/pakcare/packages?TravelerName=John&NICNo=1234567890123&NTNNo=1234567&TravelDays=30&DOB=01/01/1990&Covid=Covered
```

### 4. Create Policy

```http
POST /api/pakcare/policy/create
Content-Type: application/json
```

### 5. Get Requests

```http
GET /api/pakcare/policy/requests?Datafor=All
```

### 6. Process Request

```http
POST /api/pakcare/policy/process
Content-Type: application/json
```

### 7. Get Report

```http
GET /api/pakcare/policy/report?StartDate=01/01/2024&EndDate=31/12/2024&ReportType=All
```

**ReportType values:** `Summary`, `Detailed`, `All`

### 8. Get Print URL

```http
GET /api/pakcare/policy/print-url?PolicyNo=POL123456
```

---

## 🗂️ Project Structure

```
OSBACKEND/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── travel.controller.js
│   │   └── pakcare.controller.js
│   ├── routes/              # Route definitions
│   │   ├── travel.routes.js
│   │   ├── pakcare.routes.js
│   │   └── index.js
│   ├── services/            # Business logic & API calls
│   │   ├── travel.service.js
│   │   └── pakcare.service.js
│   ├── validators/          # Joi validation schemas
│   │   ├── travel.validator.js
│   │   └── pakcare.validator.js
│   ├── utils/               # Utilities
│   │   ├── axios-instance.js
│   │   ├── error-handler.js
│   │   ├── logger.js
│   │   └── validators.js
│   ├── server.js            # Express app setup
│   └── index.js             # Entry point
├── logs/                    # Log files (auto-created)
│   ├── api.log
│   └── error.log
├── .env                     # Environment variables
├── .env.example             # Environment template
├── package.json
└── README.md
```

## 🔒 Error Codes

The API maps all UIC error codes to appropriate HTTP status codes:

| Error Code | Description | HTTP Status |
|------------|-------------|-------------|
| USTI-A001 | Required fields missing | 400 |
| USTI-A002 | User expired | 401 |
| USTI-A003 | User blocked | 403 |
| USTI-A004 | Age validation failed (18-86) | 400 |
| USTI-A005 | Invalid username/password | 401 |
| USTI-A011 | Insufficient balance | 402 |
| USTI-A036 | Invalid AreaShortCode | 400 |
| USTI-EX001 | System exception | 500 |

[See full error code list in `src/utils/error-handler.js`]

## 📝 Validation Rules

### Age Validation
- Must be between 18 and 86 years
- Format: DD/MM/YYYY

### NIC Format
- 13 digits: `1234567890123`
- Old format: `12345-1234567-1`

### NTN Format
- 7-8 digits: `1234567` or `12345678`

### Phone Format
- Pakistani: `03001234567` or `+923001234567`

### Passport Format
- Pakistani: `AB1234567` (2 letters + 7 digits)

### GST Format
- `12-34-5678-901-23`

## 📊 Logging

All API requests and responses are logged to:
- **Console**: Colored output for development
- **File**: `logs/api.log` (all logs)
- **File**: `logs/error.log` (errors only)

Log format includes:
- Timestamp
- Request method & endpoint
- Request payload
- Response status & data
- Error details (if any)

## 🧪 Testing

### Using cURL

```bash
# Test health endpoint
curl http://localhost:5001/api/health

# Test get packages
curl "http://localhost:5001/api/uic/packages?TravelerName=John&NICNo=1234567890123&NTNNo=1234567&TravelDays=30&DOB=01/01/1990&Covid=Covered"

# Test create policy
curl -X POST http://localhost:5001/api/uic/policy/create \
  -H "Content-Type: application/json" \
  -d '{
    "TravelerName": "John Doe",
    "NICNo": "1234567890123",
    "NTNNo": "1234567",
    "DOB": "01/01/1990",
    "PassportNo": "AB1234567",
    "Email": "john@example.com",
    "PhoneNo": "03001234567",
    "Address": "123 Main Street",
    "AreaShortCode": "SCH",
    "CountryCode": "DE",
    "PlanType": "S",
    "PlanName": "GOLD",
    "TravelDays": 30,
    "StartDate": "01/12/2024",
    "EndDate": "31/12/2024",
    "Covid": "Covered",
    "Premium": 15000
  }'
```

### Using Postman/Thunder Client

Import the endpoints from the root URL documentation:
```
http://localhost:5001/
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5001 |
| FRONTEND_URL | CORS origin | http://localhost:5173 |
| UIC_BASE_URL | UIC API base URL | http://travelapi.theunitedsoftware.com/ |
| UIC_USERNAME | API username | API.OS.isb |
| UIC_PASSWORD | API password | API.on@estop7*7 |
| UIC_API_KEY | API key | 7b6f1ttz41169d544e4eda4b2b263e6bffe50d |
| UIC_SRVSRCE | Service source | UIC |

## 🛡️ Security Features

- **Helmet.js**: Security headers
- **CORS**: Configurable origin
- **Input Validation**: Joi schemas for all inputs
- **Error Handling**: No sensitive data in error responses
- **Logging**: Comprehensive audit trail

## 📦 Dependencies

- **express**: Web framework
- **axios**: HTTP client
- **joi**: Validation
- **winston**: Logging
- **cors**: CORS middleware
- **helmet**: Security headers
- **dotenv**: Environment variables

## 🤝 Contributing

1. Follow the existing code structure
2. Add validation for new endpoints
3. Update error codes in `error-handler.js`
4. Add logging for all API calls
5. Update this README

## 📄 License

ISC

## 👨‍💻 Author

Built with ❤️ for UIC Travel Insurance API integration

---

**Need Help?** Check the logs in `logs/api.log` for detailed request/response information.
#   U I C b a c k e n d  
 
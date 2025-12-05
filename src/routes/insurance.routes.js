import { Router } from "express";
import * as controller from "../controllers/travel.controller.js";

const router = Router();

// POST /api/insurance/packages
router.post("/packages", controller.getPackages);

// GET /api/insurance/coverages?AreaShortCode=SCH
router.get("/coverages", controller.getCoveragesByArea);

// GET /api/insurance/countries?AreaShortCode=SCH
router.get("/countries", controller.getCoveragesByArea);

// POST /api/insurance/generate
router.post("/generate", controller.createPolicy);

// GET /api/insurance/requests?Datafor=PENDING
router.get("/requests", controller.getRequestedUWData);

// POST /api/insurance/process
router.post("/process", controller.processRequest);

// GET /api/insurance/print?PolicyNo=12345
router.get("/print", controller.getPolicyPrintUrl);

export default router;
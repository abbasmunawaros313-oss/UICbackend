import express from 'express';
import * as travelController from '../controllers/travel.controller.js';

const router = express.Router();

/**
 * @route   POST /uic/packages
 * @desc    Get packages detail by travel period with Covid coverage
 * @access  Public
 * @body    TravelerName, NICNo, NTNNo, TravelDays, DOB, Covid
 */
router.post('/packages', travelController.getPackages);

/**
 * @route   GET /uic/coverages/all
 * @desc    Get all coverages detail
 * @access  Public
 */
router.get('/coverages/all', travelController.getAllCoverages);

/**
 * @route   GET /uic/coverages/area
 * @desc    Get coverages detail by area
 * @access  Public
 * @params  AreaShortCode
 */
router.get('/coverages/area', travelController.getCoveragesByArea);

/**
 * @route   GET /uic/countries
 * @desc    Get country detail by area
 * @access  Public
 * @params  AreaShortCode
 */
router.get('/countries', travelController.getCountries);

/**
 * @route   POST /uic/policy/create
 * @desc    Generate UW document (Create Policy)
 * @access  Public
 * @body    Complete policy data including traveler info, plan details, etc.
 */
router.post('/policy/create', travelController.createPolicy);

/**
 * @route   GET /uic/policy/requests
 * @desc    Get requested UW document data
 * @access  Public
 * @params  Datafor (All, Pending, Cancelled, Posted)
 */
router.get('/policy/requests', travelController.getRequests);

/**
 * @route   POST /uic/policy/process
 * @desc    Process UW request data (Approve or Cancel)
 * @access  Public
 * @body    RequestID, isCancelled, CRemarks
 */
router.post('/policy/process', travelController.processRequest);

export default router;

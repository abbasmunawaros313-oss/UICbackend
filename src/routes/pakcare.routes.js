import express from 'express';
import * as pakcareController from '../controllers/pakcare.controller.js';

const router = express.Router();

/**
 * @route   GET /pakcare/countries
 * @desc    Get countries
 * @access  Public
 * @params  AreaShortCode (optional)
 */
router.get('/countries', pakcareController.getCountries);

/**
 * @route   GET /pakcare/coverages
 * @desc    Get coverages
 * @access  Public
 * @params  AreaShortCode (optional)
 */
router.get('/coverages', pakcareController.getCoverages);

/**
 * @route   GET /pakcare/packages
 * @desc    Get packages
 * @access  Public
 * @params  TravelerName, NICNo, NTNNo, TravelDays, DOB, Covid
 */
router.get('/packages', pakcareController.getPackages);

/**
 * @route   POST /pakcare/policy/create
 * @desc    Create PakCare policy
 * @access  Public
 * @body    Complete policy data
 */
router.post('/policy/create', pakcareController.createPolicy);

/**
 * @route   GET /pakcare/policy/requests
 * @desc    Get policy requests
 * @access  Public
 * @params  Datafor (All, Pending, Cancelled, Posted)
 */
router.get('/policy/requests', pakcareController.getRequests);

/**
 * @route   POST /pakcare/policy/process
 * @desc    Process policy request
 * @access  Public
 * @body    RequestID, isCancelled, CRemarks
 */
router.post('/policy/process', pakcareController.processRequest);

/**
 * @route   GET /pakcare/policy/report
 * @desc    Get policy report
 * @access  Public
 * @params  StartDate, EndDate, ReportType
 */
router.get('/policy/report', pakcareController.getReport);

/**
 * @route   GET /pakcare/policy/print-url
 * @desc    Get print URL for policy
 * @access  Public
 * @params  PolicyNo
 */
router.get('/policy/print-url', pakcareController.getPrintUrl);

export default router;

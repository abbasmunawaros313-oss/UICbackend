/**
 * Build/normalize the payload for GenerateUWDocumentWithCovid
 * Ensure field names match UIC API param names.
 */
export const buildGeneratePayload = (body) => {
  // Combine/normalize traveler name if separate first/last provided
  let travelerName = body.TravelerName || `${body.FirstName || ""} ${body.LastName || ""}`.trim();

  return {
    AreaShortCode: body.AreaShortCode || body.area || "",
    TravelDate: body.TravelDate || body.TravelDateFormatted || "",
    TravelerName: travelerName,
    NoOfDays: body.NoOfDays || body.TravelDays || 0,
    DOB: body.DOB || "",
    PassportNo: body.PassportNo || body.Passport || "",
    NICNo: body.NICNo || body.CNIC || body.NIC || "",
    Address: body.Address || "",
    ContactNo: body.ContactNo || body.MobileNo || "",
    BeneficiaryName: body.BeneficiaryName || "",
    Relationship: body.Relationship || "",
    Country: body.Country || body.CountryName || "",
    Remarks: body.Remarks || "",
    PlanType: body.PlanType || "S",
    Plan: body.Plan || body.PlanName || "",
    Premium: body.Premium || body.premium || 0,
    NTNNo: body.NTNNo || body.ntnno || "",
    EmailID: body.EmailID || body.traveleremail || body.Email || "",
    SpouseName: body.SpouseName || "",
    SpouseDOB: body.SpouseDOB || "",
    SpousePassport: body.SpousePassport || "",
    Child1Name: body.Child1Name || "",
    Child1DOB: body.Child1DOB || "",
    Child1Passport: body.Child1Passport || "",
    Child2Name: body.Child2Name || "",
    Child2DOB: body.Child2DOB || "",
    Child2Passport: body.Child2Passport || "",
    Child3Name: body.Child3Name || "",
    Child3DOB: body.Child3DOB || "",
    Child3Passport: body.Child3Passport || "",
    isRequestPolicy: body.isRequestPolicy ?? "True",
    ReferenceNo: body.ReferenceNo || "",
    ESystemName: body.ESystemName || "",
    EUserName: body.EUserName || "",
    Covid: body.Covid || (body.IsCovidCovered === "True" ? "Covered" : "Not Covered"),
  };
};

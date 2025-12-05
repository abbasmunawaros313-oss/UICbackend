/**
 * Calculate age from date of birth
 * @param {string} dob - Date of birth in DD/MM/YYYY format
 * @returns {number} Age in years
 */
export const calculateAge = (dob) => {
    const [day, month, year] = dob.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

/**
 * Validate age is between 18 and 86
 * @param {string} dob - Date of birth in DD/MM/YYYY format
 * @returns {boolean} True if age is valid
 */
export const isValidAge = (dob) => {
    const age = calculateAge(dob);
    return age >= 18 && age <= 86;
};

/**
 * Validate date format (DD/MM/YYYY)
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if format is valid
 */
export const isValidDateFormat = (dateString) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!dateRegex.test(dateString)) {
        return false;
    }

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
};

/**
 * Validate NIC number format (13 digits or old 15 character format)
 * @param {string} nic - NIC number
 * @returns {boolean} True if format is valid
 */
export const isValidNIC = (nic) => {
    // 13 digit CNIC: xxxxxxxxxxxxx
    // Old format: xxxxx-xxxxxxx-x
    const nicRegex13 = /^\d{13}$/;
    const nicRegexOld = /^\d{5}-\d{7}-\d{1}$/;

    return nicRegex13.test(nic) || nicRegexOld.test(nic);
};

/**
 * Validate NTN number format
 * @param {string} ntn - NTN number
 * @returns {boolean} True if format is valid
 */
export const isValidNTN = (ntn) => {
    // NTN format: 7 or 8 digits, or with dashes: xxxxxxx-x
    const ntnRegex = /^\d{7,8}$|^\d{7}-\d{1}$/;
    return ntnRegex.test(ntn);
};

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if format is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number format (Pakistani format)
 * @param {string} phone - Phone number
 * @returns {boolean} True if format is valid
 */
export const isValidPhone = (phone) => {
    // Pakistani phone: 03xxxxxxxxx or +923xxxxxxxxx
    const phoneRegex = /^(03\d{9}|\+923\d{9})$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

/**
 * Validate passport number format
 * @param {string} passport - Passport number
 * @returns {boolean} True if format is valid
 */
export const isValidPassport = (passport) => {
    // Pakistani passport: 2 letters followed by 7 digits
    const passportRegex = /^[A-Z]{2}\d{7}$/;
    return passportRegex.test(passport);
};

/**
 * Validate GST number format
 * @param {string} gst - GST number
 * @returns {boolean} True if format is valid
 */
export const isValidGST = (gst) => {
    // GST format: xx-xx-xxxx-xxx-xx (15 characters with dashes)
    const gstRegex = /^\d{2}-\d{2}-\d{4}-\d{3}-\d{2}$/;
    return gstRegex.test(gst);
};

/**
 * Convert date from DD/MM/YYYY to ISO format
 * @param {string} dateString - Date in DD/MM/YYYY format
 * @returns {string} ISO date string
 */
export const convertToISODate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

/**
 * Convert date from ISO to DD/MM/YYYY format
 * @param {string} isoDate - ISO date string
 * @returns {string} Date in DD/MM/YYYY format
 */
export const convertFromISODate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

/**
 * Validate area short code
 * @param {string} areaCode - Area code
 * @returns {boolean} True if valid
 */
export const isValidAreaCode = (areaCode) => {
    const validCodes = ['SCH', 'ROW', 'WW', 'PC'];
    return validCodes.includes(areaCode);
};

/**
 * Validate plan type
 * @param {string} planType - Plan type
 * @returns {boolean} True if valid
 */
export const isValidPlanType = (planType) => {
    const validTypes = ['S', 'F'];
    return validTypes.includes(planType);
};

/**
 * Validate Covid coverage option
 * @param {string} covid - Covid coverage
 * @returns {boolean} True if valid
 */
export const isValidCovidOption = (covid) => {
    const validOptions = ['Covered', 'Not Covered'];
    return validOptions.includes(covid);
};

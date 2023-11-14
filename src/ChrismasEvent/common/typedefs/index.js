/**
 * ChristmasEvent
 */

/**
 * @typedef {Object} ExpectedResult
 * @property {OrderState} orderState
 * @property {EventState} eventState
 * @property {number} finalPaymentAmount
 * @property {string} eventBadge
 */

/**
 * ---------------------------------------------------------------------------
 */

/**
 * OrderProcessor
 */

/**
 * @typedef {Object} OrderState
 * @property {OrderedMenu} orderedMenu
 * @property {number} totalPrice
 */

/**
 * @typedef {Object} OrderedMenu
 * @property {string} menuName
 * @property {number} count
 * @property {string} type
 * @property {number} price
 */

/**
 * @typedef {Object} Menu
 * @property {string} menuName
 * @property {number} count
 */

/**
 * ---------------------------------------------------------------------------
 */

/**
 * EventProcessor
 */

/**
 * @typedef {Object} EventState
 * @property {EventBenefitArray} eventBenefits
 * @property {number} totalBenefitAmount
 * @property {number} discountAmount
 */

/**
 * @typedef {Array<FreeGiftBenefit | DiscountBenefit>} EventBenefitArray
 */

/**
 * @typedef {Object} FreeGiftBenefit
 * @property {string} eventType
 * @property {string} menuName
 * @property {number} count
 * @property {number} benefitAmount
 */

/**
 * @typedef {Object} DiscountBenefit
 * @property {string} eventType
 * @property {string} discountType
 * @property {number} benefitAmount
 */

/**
 * ---------------------------------------------------------------------------
 */

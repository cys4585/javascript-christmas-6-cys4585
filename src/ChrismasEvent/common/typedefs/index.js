/**
 * ChristmasEvent
 */

/**
 * @typedef {Object} ExpectedResult
 * @property {OrderState} orderState 주문 관련 데이터
 * @property {EventState} eventState 이벤트 관련 데이터
 * @property {number} finalPaymentAmount 최종 결제 금액
 * @property {string} eventBadge 이벤트 배지
 */

/**
 * ---------------------------------------------------------------------------
 */

/**
 * EventPlanner
 */

/**
 * @typedef {Object} OrderState 주문 관련 데이터
 * @property {OrderedMenu} orderedMenu 주문 내역
 * @property {number} totalPrice 총주문 금액
 */

/**
 * @typedef {Object} EventState 이벤트 관련 데이터
 * @property {EventBenefitArray} eventBenefits 이벤트 혜택 내역
 * @property {number} totalBenefitAmount 총혜택 금액
 * @property {number} discountAmount 할인 금액
 */

/**
 * ---------------------------------------------------------------------------
 */

/**
 * OrderProcessor
 */

/**
 * @typedef {Object} OrderedMenu 주문 내역
 * @property {string} menuName
 * @property {number} count
 * @property {string} type
 * @property {number} price
 */

/**
 * @typedef {Object} Menu 주문 정보 (사용자가 주문한 메뉴 및 개수)
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
 * @typedef {Array<FreeGiftBenefit | DiscountBenefit>} EventBenefitArray 모든 이벤트 혜택 내역
 */

/**
 * @typedef {Object} FreeGiftBenefit 증정 이벤트 혜택
 * @property {string} eventType
 * @property {string} menuName
 * @property {number} count
 * @property {number} benefitAmount
 */

/**
 * @typedef {Object} DiscountBenefit 할인 이벤트 혜택
 * @property {string} eventType
 * @property {string} discountType
 * @property {number} benefitAmount
 */

/**
 * ---------------------------------------------------------------------------
 */

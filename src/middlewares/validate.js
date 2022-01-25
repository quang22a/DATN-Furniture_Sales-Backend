import Joi from "joi";
import { validateRequest } from "../utils";
/* -------------------auth ----------------------------*/
const registerStaffSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().alphanum().required().min(6).max(50),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

const registerCustomerSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().alphanum().required().min(6).max(50),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

const updateInfoSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    isActive: Joi.boolean().empty(),
  });
  validateRequest(req, next, schema);
};

const loginSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).max(50).empty("").required(),
  });
  validateRequest(req, next, schema);
};

const updatePassSchema = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().alphanum().min(6).max(50).empty("").required(),
    newPassword: Joi.string().alphanum().min(6).max(50).empty("").required(),
  });
  validateRequest(req, next, schema);
};

const requestResetPass = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  validateRequest(req, next, schema);
};

const changeResetPass = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().required(),
    password: Joi.string().alphanum().min(6).max(50).empty("").required(),
  });
  validateRequest(req, next, schema);
};
/*-------------admin------------------- */

const loginAdminSchema = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).max(50).empty("").required(),
  });
  validateRequest(req, next, schema);
};

const createModSchema = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).max(50).empty("").required(),
  });
  validateRequest(req, next, schema);
};
/*-------------category------------------- */

const createCategorySchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    isTrending: Joi.boolean(),
  });
  validateRequest(req, next, schema);
};

const updateCategorySchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    isTrending: Joi.boolean(),
  });
  validateRequest(req, next, schema);
};
/*-------------brand------------------- */

const createBrandSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    isFeatured: Joi.boolean(),
  });
  validateRequest(req, next, schema);
};

const updateBrandSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    isFeatured: Joi.boolean(),
  });
  validateRequest(req, next, schema);
};
/*-------------product------------------- */

const createProductSchema = (req, res, next) => {
  const schema = Joi.object({
    brandId: Joi.string().required(),
    categoryId: Joi.string().required(),
    name: Joi.string().required(),
    rating: Joi.number(),
    numberOfReview: Joi.number(),
    description: Joi.string().empty(),
    image: Joi.string().required(),
    isActive: Joi.boolean(),
    material: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
  });
  validateRequest(req, next, schema);
};

const updateProductSchema = (req, res, next) => {
  const schema = Joi.object({
    brandId: Joi.string().required(),
    categoryId: Joi.string().required(),
    name: Joi.string().required(),
    rating: Joi.number().empty(),
    numberOfReview: Joi.number().empty(),
    description: Joi.string().empty(),
    image: Joi.string().required(),
    isActive: Joi.boolean().required(),
    material: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
  });
  validateRequest(req, next, schema);
};
/*-------------rating------------------- */

const createRatingSchema = (req, res, next) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string().required(),
    customerInfo: Joi.object().required(),
  });
  validateRequest(req, next, schema);
};

const updateRatingSchema = (req, res, next) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string().required(),
    customerInfo: Joi.object().required(),
  });
  validateRequest(req, next, schema);
};
/*-------------bill------------------- */

const createBillSchema = (req, res, next) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    totalPrice: Joi.number().required(),
    totalProduct: Joi.number().required(),
    paymentMethod: Joi.string().required(),
    paymentStatus: Joi.boolean().required(),
    additional: Joi.string().empty(),
    listProducts: Joi.array().required(),
  });
  validateRequest(req, next, schema);
};

const updateBillSchema = (req, res, next) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    totalPrice: Joi.number().required(),
    totalProduct: Joi.number().required(),
    paymentMethod: Joi.string().required(),
    paymentStatus: Joi.boolean().required(),
    status: Joi.string().required(),
    additional: Joi.string().empty(),
  });
  validateRequest(req, next, schema);
};
/*-------------notification------------------- */

const createNotificationSchema = (req, res, next) => {
  const schema = Joi.object({
    content: Joi.string().required(),
    image: Joi.string().required(),
    title: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

const updateNotificationSchema = (req, res, next) => {
  const schema = Joi.object({
    content: Joi.string().required(),
    image: Joi.string().required(),
    title: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};
/*-------------contact------------------- */

const createContactSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    msg: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

const updateContactSchema = (req, res, next) => {
  console.log("Abc");
  const schema = Joi.object({
    status: Joi.boolean().required(),
  });
  validateRequest(req, next, schema);
};

export const validateRequestBody = {
  registerStaffSchema,
  registerCustomerSchema,
  loginSchema,
  createModSchema,
  loginAdminSchema,
  updateInfoSchema,
  updatePassSchema,
  requestResetPass,
  changeResetPass,
  createCategorySchema,
  updateCategorySchema,
  createBrandSchema,
  updateBrandSchema,
  createProductSchema,
  updateProductSchema,
  createRatingSchema,
  updateRatingSchema,
  createBillSchema,
  updateBillSchema,
  createNotificationSchema,
  updateNotificationSchema,
  createContactSchema,
  updateContactSchema,
};

import Joi from "joi";
import { validateRequest } from "../utils";
/* -------------------auth ----------------------------*/
const registerStaffSchema = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().alphanum().required().min(6).max(50),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
  });
  validateRequest(req, next, schema);
};

const registerCustomerSchema = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().alphanum().required().min(6).max(50),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
  });
  validateRequest(req, next, schema);
};

const updateInfoSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().empty(),
    phone: Joi.string()
      .empty()
      .regex(/^(84|0[1-9])+([0-9]{8,20})$/)
      .message(`phone incorrect format`),
    image: Joi.string().empty(),
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
    userName: Joi.string().required(),
    password: Joi.string().min(6).max(50).empty("").required(),
  });
  validateRequest(req, next, schema);
};

const createModSchema = (req, res, next) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(6).max(50).empty("").required(),
  });
  validateRequest(req, next, schema);
};
/*-------------category------------------- */

const createCategorySchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    name: Joi.string().required(),
    isTrending: Joi.boolean(),
  });
  validateRequest(req, next, schema);
};

const updateCategorySchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    name: Joi.string().required(),
    isTrending: Joi.boolean(),
  });
  validateRequest(req, next, schema);
};
/*-------------brand------------------- */

const createBrandSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    name: Joi.string().required(),
    isFeatured: Joi.boolean(),
  });
  validateRequest(req, next, schema);
};

const updateBrandSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    name: Joi.string().required(),
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
    description: Joi.string().required(),
    image: Joi.string().required(),
    isActive: Joi.boolean(),
    material: Joi.string().required(),
    color: Joi.array().required(),
    size: Joi.array().required(),
  });
  validateRequest(req, next, schema);
};

const updateProductSchema = (req, res, next) => {
  const schema = Joi.object({
    // name: Joi.string().empty(),
    // rating: Joi.number().empty(),
    // numberOfReview: Joi.number().empty(),
    // description: Joi.string().empty(),
    // image: Joi.string().empty(),
    // isActive: Joi.boolean().empty(),
    // material: Joi.boolean().empty(),
    // color: Joi.array().empty(),
    // size: Joi.array().empty(),
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
};

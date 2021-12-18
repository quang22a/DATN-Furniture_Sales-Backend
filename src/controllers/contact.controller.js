import mongo from "mongoose";
import { HttpError } from "../utils";
import { ContactService } from "../services";
import { Contact } from "../models";

const contactService = new ContactService();

const createContact = async (req, res, next) => {
  const data = req.body;
  try {
    await contactService.create(data);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  const { page, take, search } = req.query;
  try {
    const data = await contactService.getContacts(page, take, search);
    if (!data) throw new HttpError("Lỗi", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await contactService.getContact(contactId);
    if (!data) throw new HttpError("Không tìm thấy liên hệ này", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(contactId))
      throw new HttpError("Id incorrect", 401);
    if (!(await contactService.deleteContact(contactId)))
      throw new HttpError("Không tìm thấy liên hệ này", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = req.body;
  try {
    if (!mongo.Types.ObjectId.isValid(contactId))
      throw new HttpError("Không tìm thấy liên hệ  này", 400);

    const category = await Contact.findOne({ _id: contactId }, { __v: 1 });
    if (!category) throw new HttpError("Không tìm thấy liên hệ này", 401);

    if (!(await contactService.update(contactId, data)))
      throw new HttpError("Không tìm thấy liên hệ  này", 404);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const contactController = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
};

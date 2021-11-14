import { Admin } from "../models";
import bcrypt from "bcryptjs";
import log from "datalog";
import csv from "csv-parser";
import fs from "fs";

export const initAccountAmin = async () => {
  try {
    let admin = await Admin.findOne({ userName: "admin" });
    if (admin) {
      log.info("Account admin is already");
      return;
    }
    const password = "123456";
    const hash = await bcrypt.hash(password, 12);
    admin = await Admin.create({
      userName: "admin",
      password: hash,
      role: "admin",
    });
    log.info(`Account admin has been created.`);
  } catch (error) {
    log.error(error);
  }
};

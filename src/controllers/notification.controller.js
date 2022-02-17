import { NotificationService } from "../services";

const notificationService = new NotificationService();

const notifications = async (req, res, next) => {
  try {
    const data = await notificationService.getNotifications();
    res.status(200).json({
      status: 200,
      msg: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getListNotifications = async (req, res, next) => {
  try {
    const { page, take } = req.query;
    const data = await notificationService.getListNotifications(page, take);
    res.status(200).json({
      status: 200,
      msg: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await notificationService.getNotification(id);
    res.status(200).json({
      status: 200,
      msg: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const numberOfNotifications = async (req, res, next) => {
  try {
    const numberOfNotifications =
      await notificationService.getNumberOfNotifications(req.user._id);
    res.status(200).json({
      status: 200,
      msg: "Success",
      numberOfNotifications,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const reset = async (req, res, next) => {
  try {
    await notificationService.reset(req.user._id);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createNotification = async (req, res, next) => {
  const data = req.body;
  try {
    await notificationService.createNotification(data);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  try {
    await notificationService.update(id, data);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteNoti = async (req, res, next) => {
  const { id } = req.params;
  try {
    await notificationService.delete(id);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const notificationController = {
  notifications,
  getListNotifications,
  numberOfNotifications,
  reset,
  createNotification,
  getNotification,
  update,
  deleteNoti
};

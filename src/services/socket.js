import { verifyToken } from "../utils";
import { NotificationService, BillService } from "../services";
import { Bill } from "../models";

const notificationService = new NotificationService();
const billService = new BillService();

export const socketServer = (io) => {
  io.on("connection", (socket) => {
    socket.on("client-get-notifications", async (data) => {
      if (data) {
        await notificationService.createNotification(data);
      }
      const notifications = await notificationService.getNotifications();
      io.emit("server-send-notifications", notifications);
    });

    socket.on("client-create-bill", async (data) => {
      if (data) {
        await billService.createBill(data);
      }
      const countBillNew = await Bill.countDocuments({ status: 'new' });
      console.log("123: ", countBillNew);
      io.emit("server-notification-new-bill", countBillNew);
    });

    io.on("disconnect", (reason) => {
      console.log("disconnected", reason);
    });
  });
};

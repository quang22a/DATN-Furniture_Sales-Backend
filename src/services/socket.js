import { verifyToken } from "../utils";
import { NotificationService, BillService } from "../services";
import { Bill } from "../models";

const notificationService = new NotificationService();
const billService = new BillService();

export const socketServer = (io) => {
  io.on("connection", (socket) => {
    socket.on("client-create-bill", async (data) => {
      if (data) {
        await billService.createBill(data);
      }
      const countBillNew = await Bill.countDocuments({ status: 'new' });
      io.emit("server-notification-new-bill", countBillNew);
    });

    // io.on("disconnect", (reason) => {
    //   console.log("disconnected: ", reason);
    // });
  });
};

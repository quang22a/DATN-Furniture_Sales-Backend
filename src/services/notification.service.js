import { Notification } from "../models";
import { pagination } from "../utils";

export default class NotificationService {
  async getNotifications() {
    return await Notification.findOne().sort({ createdAt: -1 }).limit(1);
  }

  async getListNotifications(page, take) {
    // if (search) {
    //   condition["title"] = new RegExp(search, "i");
    // }
    return await pagination(Notification, {}, page, take, {});
  }

  async getNotification(_id) {
    return await Notification.findOne({ _id });
  }

  async createNotification(notification) {
    return Notification.create(notification);
  }

  async createManyNotifications(notifications) {
    return Notification.create(notifications);
  }

  async update(_id, data) {
    return Notification.findByIdAndUpdate({ _id }, data);
  }

  async delete(_id) {
    return Notification.findByIdAndDelete({ _id });
  }
  // async getNumberOfNotifications(userId) {
  // 	const account = await Account.findById(userId);
  // 	if (!account) return 0;
  // 	if (account.role == 'iter') {
  // 		const iter = await ITer.findOne({ accountId: userId });
  // 		return iter.numberOfNotifications;
  // 	}
  // 	if (account.role == 'company') {
  // 		const company = await Company.findOne({ accountId: userId });
  // 		return company.numberOfNotifications;
  // 	}
  // }
}

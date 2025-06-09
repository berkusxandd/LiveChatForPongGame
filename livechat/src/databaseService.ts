import { Op } from "sequelize";
import BlockedUser from "./models/blockedUsers.models";

export async function isBlocked(sender_id: string, receiver_id: string): Promise<boolean> {
  const blocked = await BlockedUser.findOne({
    where: {
      [Op.or]: [
        { blocked_id: sender_id, blocker_id: receiver_id }
      ],
    },
    attributes: ['id'],
  });

  return !!blocked;
}

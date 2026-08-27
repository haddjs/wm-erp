import { db, delay, paged } from "@/lib/mock-db";
import { ActivityLogListResponse } from "@/types/activity-log";

export async function getActivityLogs(
  page = 1,
  limit = 10,
): Promise<ActivityLogListResponse> {
  await delay();
  const { data, paging } = paged(db.activityLogs, page, limit);
  return { success: true, message: "OK", data, paging, code: 200 };
}

type Notifications = {
  message: string;
  is_viewed: boolean;
  created_at: string;
};

type NotificationsResponse = {
  data: Notifications[];
  has_new: boolean;
};

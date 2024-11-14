type RoutePermissions = {
  [key: string]: Permission;
};

export enum Permission {
  USERS_VIEW = 'users view',
  TRANSACTIONS_VIEW = 'transactions view',
  CATEGORIES_VIEW = 'categories view',
  ACCOUNTS_VIEW = 'accounts view',
  TAGS_VIEW = 'tags view',
  LOANS_VIEW = 'loans view',
  CATEGORY_POINTERS_VIEW = 'category pointers view',
  // DASHBOARD_VIEW = 'dashboard view',
}

export const routePermissions: RoutePermissions = {
  'users': Permission.USERS_VIEW,
  'users-id-mode': Permission.USERS_VIEW,
  'users-create': Permission.USERS_VIEW,

  'transactions': Permission.TRANSACTIONS_VIEW,
  'transactions-id-mode': Permission.TRANSACTIONS_VIEW,
  'transactions-create': Permission.TRANSACTIONS_VIEW,

  'categories': Permission.CATEGORIES_VIEW,
  'categories-id-mode': Permission.CATEGORIES_VIEW,
  'categories-create': Permission.CATEGORIES_VIEW,

  'accounts': Permission.ACCOUNTS_VIEW,
  'accounts-id-mode': Permission.ACCOUNTS_VIEW,
  'accounts-create': Permission.ACCOUNTS_VIEW,

  'tags': Permission.TAGS_VIEW,
  'tags-id-mode': Permission.TAGS_VIEW,
  'tags-create': Permission.TAGS_VIEW,

  'loans': Permission.LOANS_VIEW,
  'loans-id-mode': Permission.LOANS_VIEW,
  'loans-create': Permission.LOANS_VIEW,

  'category-pointers': Permission.CATEGORY_POINTERS_VIEW,

  // 'dashboard': Permission.DASHBOARD_VIEW,
};

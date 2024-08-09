export enum pageMode {
  VIEW = 'view',
  EDIT = 'edit'
}
export type UpsertMode = pageMode.EDIT | pageMode.VIEW;

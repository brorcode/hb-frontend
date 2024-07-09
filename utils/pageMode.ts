export enum pageMode {
  VIEW = 'view',
  EDIT = 'edit'
}
export type UpsertMode = 'create' | pageMode.EDIT | pageMode.VIEW;

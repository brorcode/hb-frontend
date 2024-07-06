export const deepCopy = (obj: unknown): unknown => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const copy: { items?: unknown[]; [key: string]: unknown } = {};

  if (Array.isArray(obj)) {
    copy.items = [];
  }

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy((obj as { [key: string]: unknown })[key]);
    }
  }

  return copy;
};

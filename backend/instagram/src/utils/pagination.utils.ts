import { exception } from "console";

export interface Page<T> {
  page: number;
  pageSize: number;
  pageCount: number;
  data: T[];
}

export function paginate<T>(data: T[], page: number, pageSize: number): Page<T> {
  if (!Array.isArray(data) || !page || !pageSize) {
    throw new exception("Invalid pagination params");
  }
  const result = {
    page,
    pageSize,
    pageCount: Math.ceil(data.length / pageSize),
    data: data.slice(pageSize * (page - 1), pageSize * page),
  };
  return result;
}

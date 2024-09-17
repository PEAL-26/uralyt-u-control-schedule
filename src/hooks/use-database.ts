import { count, eq, SQL } from "drizzle-orm";
import { db } from "@/database/connection";
import { SQLiteColumn, SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";

export function useDatabase(schema: SQLiteTableWithColumns<any>) {
  const create = async <T extends { [x: string]: any }>(data: T) => {
    const result = await db.insert(schema).values(data);
    return result;
  };

  const update = async <T extends { [x: string]: any }>(
    id: string,
    data: T
  ) => {
    console.log(data);
    const result = await db.update(schema).set(data).where(eq(schema.id, id));

    return result;
  };

  const deleteDb = async (id: string) => {
    const result = await db.delete(schema).where(eq(schema.id, id));
    return result;
  };

  const list = async <T>(
    page = 1,
    pageSize = 10,
    ...orderBy: (SQLiteColumn | SQL)[]
  ) => {
    const totalItems = await db.select({ count: count() }).from(schema);
    const totalCount = totalItems[0].count;
    const data = await db
      .select()
      .from(schema)
      .orderBy(...orderBy)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: data as T[],
      totalItems: totalCount,
      currentPage: page,
      hasNextPage,
      hasPreviousPage,
      totalPages,
    };
  };

  const getById = async <T>(id: string) => {
    const result = await db.select().from(schema).where(eq(schema.id, id));
    return result.length > 0 ? (result[0] as T) : null;
  };

  return { create, update, delete: deleteDb, list, getById };
}

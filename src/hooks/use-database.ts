import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { count, eq } from "drizzle-orm";

export function useDatabase(schema: any) {
  const database = useSQLiteContext();
  const db = drizzle(database, { schema });

  const create = async <T extends { [x: string]: any }>(data: T) => {
    const result = await db.insert(schema).values(data);
    return result;
  };

  const update = async <T extends { [x: string]: any }>(
    id: string,
    data: T
  ) => {
    const result = await db.update(schema).set(data).where(eq(schema.id, id));

    return result;
  };

  const deleteDb = async (id: string) => {
    const result = await db.delete(schema).where(eq(schema.id, id));
    return result;
  };

  const list = async <T>(page = 1, pageSize = 10) => {
    // Obtenha o total de itens
    const totalItems = await db.select({ count: count() }).from(schema);
    const totalCount = totalItems[0].count;

    // Obtenha os registros com base em paginação
    const data = await db
      .select()
      .from(schema)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    // Calcule o total de páginas
    const totalPages = Math.ceil(totalCount / pageSize);

    // Verifique se há próxima página e página anterior
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

  const getById = async (id: string) => {
    const result = await db.select().from(schema).where(eq(schema.id, id));
    return result.length > 0 ? result[0] : null;
  };

  return { create, update, delete: deleteDb, list, getById };
}

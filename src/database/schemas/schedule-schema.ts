import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const schedule = sqliteTable("schedules", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  date: text("date").notNull(),
  spoons: real("spoons").notNull(),
  pH: real("pH").notNull(),
});

export const mysqlConfig = {
  host: process.env.EXPO_PUBLIC_MYSQL_HOST || "localhost",
  port: parseInt(process.env.EXPO_PUBLIC_MYSQL_PORT || "3306"),
  user: process.env.EXPO_PUBLIC_MYSQL_USER || "root",
  password: process.env.EXPO_PUBLIC_MYSQL_PASSWORD,
  database: process.env.EXPO_PUBLIC_MYSQL_DATABASE,
};

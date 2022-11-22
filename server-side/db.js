import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "Salihu",
  password: "123456",
  database: "blog",
});

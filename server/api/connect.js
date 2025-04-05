import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQ@1234L",
    database: "tutoring-platform"
})
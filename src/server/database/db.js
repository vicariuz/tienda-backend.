import pkg from "pg";
const { Pool } = pkg;

const config= {
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
};

const pool = new Pool(config);

const db= (query,values) =>
pool
  .query(query, values)
  .then(({rows})=>rows)
  .catch(({code, message})=>{
    const error = {status: "[ERROR}", code, message};
    throw error;
  });

  export default db;
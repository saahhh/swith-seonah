// lemon.js
//npm i oracledb
//node lemon.js
const fs = require("fs");
const oracledb = require("oracledb");

// 정보 수정해서넣기
const dbConfig = {
  user: "swith",
  password: "swith",
  connectString: "1.221.120.194:1521/XE",
};

const jsonData = fs.readFileSync("lemon.json");
const data = JSON.parse(jsonData);

async function tableExists(connection, tableName) {
  const result = await connection.execute(
    `SELECT table_name FROM user_tables WHERE table_name = :tableName`,
    { tableName }
  );

  return result.rows.length > 0;
}

async function insertDataIntoOracle() {
  let connection;

  try {
    // Oracle DB 연결
    connection = await oracledb.getConnection(dbConfig);

    const tableExistsFlag = await tableExists(connection, "lemons");

    if (!tableExistsFlag) {
      const createTableQuery = `
        CREATE TABLE cafes (
          BPLCNM VARCHAR2(255),
          SITEWHLADDR VARCHAR2(255),
          X NUMBER,
          Y NUMBER
        )`;

      await connection.execute(createTableQuery);
      console.log("테이블생성!");
    } else {
      console.log("테이블존재");
    }

    for (const record of data.DATA) {
      const insertQuery = `
          INSERT INTO cafes (BPLCNM, SITEWHLADDR, X, Y)
          VALUES (:BPLCNM, :SITEWHLADDR, :X, :Y)
        `;

      const bindParams = {
        BPLCNM: record.bplcnm,
        SITEWHLADDR: record.sitewhladdr,
        X: record.x,
        Y: record.y,
      };

      // 실행
      const result = await connection.execute(insertQuery, bindParams, {
        autoCommit: true,
      });
      console.log("데이터 삽입 완료:", result);
    }

    console.log("모든 데이터 삽입이 완료되었습니다.");
  } catch (error) {
    console.error("오류 발생:", error);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
insertDataIntoOracle();

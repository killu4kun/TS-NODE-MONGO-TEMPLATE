import { connection, connections, connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo: string = process.env.MONGO || "";

export function mongoConnect() {
  connection
    .on("error", (err) => {

      console.error("Conexão falhou : ", err);
    })
    .on("close", () => {
      console.log("Conexão fechada");
      process.exit(1);
    })
    .once("open", () => {
      const infos = connections;
      infos.map((info) => {
        console.log(
          `MongoDB conectado em: ${info.host}:${info.port}/${info.name}`
        );
      });
    });
  connect(mongo);
}

export function mongoDisconnect() {
  connection.close();
}

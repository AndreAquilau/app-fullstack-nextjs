import 'reflect-metadata';
import {
  createConnection,
  getConnectionManager,
  ConnectionOptions,
} from 'typeorm';
import ConnectionTest from '../models/ConnectionTest';

const connect = async (
  database: ConnectionOptions,
  stayConnected = false,
): Promise<boolean> => {
  let canConnect = false;

  const conMan = getConnectionManager();

  try {
    let con;
    if (conMan.has(database.name)) {
      // If database already exists, get it
      con = conMan.get(database.name);
    } else {
      // If connection doesnst exist, add it
      con = conMan.create(database);
    }
    // Try to connect
    if (!con.isConnected) await con.connect();
    // Store connection result
    canConnect = con.isConnected;
    if (!canConnect) return false;

    // If TypeORM claims a connection, test it on the test table
    try {
      const conTest =
        (await con.getRepository(ConnectionTest).findOne()) ||
        new ConnectionTest(0);
      conTest.i++;
      conTest.save();
    } catch (e) {
      canConnect = false;
    }

    // Disconnect if it was only a test. Is default
    if (!stayConnected) await con.close();
  } catch (e) {
    console.error(e);
  }

  return canConnect;
};

export default connect;

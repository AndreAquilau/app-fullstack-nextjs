## APP FullStack in NextJS
#### Deploy in Vercel
[Vercel - Deploy](https://vercel.com/new)

#### Cloud DataBase in ElephantSQL(Postgresql)
[ElephantSQL - Postgresql](https://customer.elephantsql.com/)

#### NextAuth.js Authentication for Next.js
[NextAuth.js](https://next-auth.js.org/)

#### Createing API Routes
[API - Routes NextJS](https://nextjs.org/learn/basics/api-routes)

##### Step One - Create EndPoint
Na pasta pages crias uma pasta chamada API.
> /src/pages/api

##### Step Two - Create Function Start Server.
Criar uma função dentro da pasta api, muito similar ao express.<br>
A função recebi dois parâmetro um request e response.

```ts
import { NextApiRequest, NextApiResponse } from 'next';

// req = HTTP incoming message, res = HTTP server response
export default function handler(req: NextApiRequest, res: NextApiResponse ) {
  // ...
}
```
> src/pages/api/user.tsx
```ts
import { NextApiRequest, NextApiResponse } from 'next';
// http://localhost:3000/api/user
// req = HTTP incoming message, res = HTTP server response

export interface ResponseType {
  message?: string;
  errors?: ErrorConstructor[];
}

export default (
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>,
) => {
  try {
    return response.status(200).json({
      message: 'OK',
    });
  } catch (err) {
    return response.status(500).json({
      errors: [err],
    });
  }
};

```

#### Integration TypeORM in NextJS

##### Install typeorm and postgresql
```bash
yarn add typeorm pg reflect-metadata uuidv4 dotenv && yarn add -D @types/dotenv
```

##### Create environment variable
>env.example
```.env
DATABASE_URL =
TYPEORM_ENTITIES =
TYPEORM_MIGRATIONS =
TYPEORM_SUBESCRIBERS =
TYPEORM_ENTITIES_DIR =
TYPEORM_MIGRATIONS_DIR =
TYPEORM_SUBESCRIBERS_DIR =
```

##### Setting typeorm
>ormconfig.js
```js
module.exports = {
  type: process.env.TYPEORM_CONNECTION,
  url: process.env.DATABASE_URL,
  schema: process.env.TYPEORM_SCHEMA,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: process.env.TYPEORM_LOGGING,
  entities: [process.env.TYPEORM_ENTITIES || 'dist/models/**/*.js'],
  migrations: [
    process.env.TYPEORM_MIGRATIONS || 'dist/database/migrations/**/*.js',
  ],
  subscribers: [process.env.TYPEORM_SUBSCRIBERS || 'dist/subscriber/**/*.js'],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    subscribersDir: process.env.TYPEORM_SUBSCRIBERS_DIR,
  },
};
```

##### Add script run in package.json
```json
{
   "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js --config ./ormconfig.js"
}
```

#### Create connection and check status of existing connection
##### Create model Connections
```
yarn typeorm entity:create -n ConnectionTest
```
> ConnectionTest.ts
```ts
import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm'

@Entity()
export class ConnectionTest extends BaseEntity {
  constructor(i: number) {
    super()
    this.i = i
  }

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: number

  @Column({
    type: 'bigint',
  })
  i!: number
}
```
#### Create Instance of DataBase
> index.ts
```ts
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
```


#### References
[Tutorial NextJS Fullstack #1](https://www.youtube.com/watch?v=MeYibJFi7p0)

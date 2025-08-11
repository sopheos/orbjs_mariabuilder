# orbjs_mariabuilder

A simple mariadb query builder for [Node.js](https://nodejs.org/)  

## Quick Start

### Installation

Installation is done by using npm :  

```text
npm install mariabuilder
```

### Example

Here is an example in TypeScript to select username with an id inferior to 15 :  

```typescript
import { QB, QBFrag } from 'mariabuilder'
import { createPool, Pool } from "mariadb/*";

const pool: Pool = createPool({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "SuperSecret",
    database: "my_db"
});

const query: QBFrag = QB
.from("users")
.select()
.column("username")
.getParent()
.where()
.andInf("id", 15)
.getParent()
.read();

try {
    const users await pool.query(query.getStatment(), query.getData());
} catch (e) {
    console.log(e);
}
```

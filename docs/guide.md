# Guide  

This guide cover the basic to know on how the module is thinked to be used. It will not go on the detail of all the class method but you can find them in the API folder  

## Table of Contents

- [Guide](#guide)
  - [Table of Contents](#table-of-contents)
  - [How is it supposed to be used](#how-is-it-supposed-to-be-used)
  - [Main components](#main-components)
    - [QueryBuilder](#querybuilder)
    - [DBForge](#dbforge)
      - [Key naming](#key-naming)

## How is it supposed to be used  

The main goal of this module is to help the developper forming his SQL request by adding an abstraction layer.
It does not do the request to your database but only create the statment and the list of data to be given.  

## Main components

### QueryBuilder

This component is used to create SQL statment to interact with existing table in your database, such as `SELECT * FROM db` or `DELETE FROM db WHERE id = 0`.  

For more information about the query builders functionality, go check the [API doc about it.](./api/QB.md)

### DBForge

This component is different and should be used to :

- create or delete database
- create, delete or alter table

An example of its usage could be for versions of your database to be stored with query.

For more information about the DBForge functionality, go check the [API doc about it.](./api/DBForge.md)

#### Key naming

The DBForge key creation has a key naming convention which is as follow :  

**\[prefix\]\_\[keyname\]\_\[suffix\]**

The **prefix** is the name of the table from where it is.  
The **keyname** is, well, the name of your key.  
And the **suffix** is to determine if your key is an index, an unique key or an foreing key : **idx**, **unq** or **fk**

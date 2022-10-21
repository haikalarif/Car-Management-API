# Car Management API
Challenge Chapter 06 Binar
by M. Haikal Arif Khairil
### Getting Started
## Installation
Setelah di download atau clone, lalu buka di Visual Studio Code (Text Editor). Kemudian buka terminal (Powershell) dan ketik perintah berikut:
```
npm install
```
## Running Project
Untuk menjalankan project tanpa nodemon bisa ketikkan perintah berikut:
```
npm run start
```
Kemudian, untuk menjalankan project dengan **nodemon** bisa ketikkan perintah berikut:
```
npm run develop
```
## Database Management
Untuk memanagement database didalam repository ini sudah terdapat beberapa script, yaitu:
- `npm db:create` => untuk membuat database
- `npm db:drop` => untuk menghapus database
- `npm db:migrate` => untuk menjalankan database migration
- `npm db:rollback` => untuk membatalkan migrasi terakhir
- `npm db:seed` => untuk melakukan seeding
## Endpoint Open API Document
Untuk membuka Open API Document dalam bentuk JSON, jalankan URl berikut:
```
http://localhost:3000/api/v1/docs/swagger.json
```
Kemudian untuk membuka Open API Document dalam Swagger Editor dapat dijalankan pada URl berikut:
```
http://localhost:3000/api/v1/docs
```
## Email & Password Super Admin
```
Email    : superadmin@gmail.com
Password : superadmin123
```
## Entity Relationship Diagram (ERD)
![This is an image](/ERD-ch6.png)

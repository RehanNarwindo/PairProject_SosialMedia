//npx sequelize model:generate --name User --attributes username:string,email:integer,password:string,phone_number:string

//npx sequelize model:generate --name Tag --attributes name:string

//npx sequelize model:generate --name Profile --attributes first_name:string,last_name:string,profile_picture:string,private_account:boolean

//npx sequelize model:generate --name Post --attributes title:string,content:text,imgUrl:string,UserId:integer

//npx sequelize model:generate --name PostTag --attributes PostId:integer,TagId:integer

//npx sequelize model:generate --name PostTag --attributes PostId:integer,TagId:integer

//npx sequelize migration:generate --name add-column-UserId-to-profiles-table
//npx sequelize migration:generate --name add-column-role-to-users-table

[
    {
        "username": "faishal",
        "email": "faishal@gmail.com",
        "password": "Inipassword",
        "phone_number": "08764345787"
    },
    {
        "username": "admin",
        "email": "admin@gmail.com",
        "password": "Inipassword1",
        "phone_number": "08764345787"
    }
]
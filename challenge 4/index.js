const query = require("./db/index.js");
const express = require("express");
const bodyParser = require("body-parser");
const props = require("./add.js");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    info: "Hello",
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

// add users

const createusers = async (req, res) => {
  const {
    first_name,
    last_name,
    gender,
    email_id,
    phone_number,
    password,
    role_name,
  } = req.body;

  let inserted_users = await query(
    `insert into users (first_name, last_name, gender, email_id, phone_number, password) values ($1,$2,$3,$4,$5,$6) returning *`,
    [first_name, last_name, gender, email_id, phone_number, password]
  );

  let userid = inserted_users.rows[0].user_id;

  let inserted_role = await query(
    `insert into user_role (user_id , role_name) values ($1 , $2)`,
    [userid, role_name]
  );
  req.body.user_id = userid;

  let response = props(200, null, "User Created");

  response.data = req.body;

  res.status(201).setHeader("Content-Type", "application/json").send(response);
};

app.post("/users", createusers);

//Get Users

const getUsers = (req, res) => {
  query(
    `select * 
  from users
  inner join user_role
  on users.user_id = user_role.user_id 
;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      let response = props(200, null, "Users Fetched");
      response.data = results.rows;
      res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .json(response);
    }
  );
};

app.get("/users/", getUsers);

// Get User By Id

const getUserById = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  let user = await query(
    `select * 
    from users
    inner join user_role
    on users.user_id = user_role.user_id 
    where users.user_id = $1`,
    [user_id]
  );

  let response = props(200, null, "User Fetched");
  response.data = user.rows;

  res.status(200).setHeader("Content-Type", "application/json").json(response);
};

app.get("/users/:user_id", getUserById);

//Update User

const updateuser = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const {
    first_name,
    last_name,
    gender,
    email_id,
    phone_number,
    password,
    role_name,
  } = req.body;

  let update_user = await query(
    `update users set first_name = $1, last_name = $2, gender = $3, email_id = $4, phone_number = $5 , password = $6 where user_id = $7`,
    [first_name, last_name, gender, email_id, phone_number, password, user_id]
  );

  let update_user2 = await query(
    `update user_role set role_name = $2 WHERE user_id = $1 `,
    [user_id, role_name]
  );

  req.body.user_id = req.params.user_id;
  let response = props(200, null, "User Updated");
  response.data = req.body;

  res.status(200).setHeader("Content-Type", "application/json").send(response);
};

app.put("/users/:user_id", updateuser);

//Add business

const createbusiness = async (req, res) => {
  const { business_name, business_email_id, contact_number, city } = req.body;
  let add_business = await query(
    `insert into business (business_name,business_email_id,contact_number,city) values ($1,$2,$3,$4) returning *`,
    [business_name, business_email_id, contact_number, city]
  );

  let businessid = add_business.rows[0].business_id;

  req.body.business_id = businessid;
  let response = props(200, null, "Business Added");
  response.data = req.body;
  res.status(201).setHeader("Content-Type", "application/json").send(response);
};

app.post("/business", createbusiness);

// update business

const updatebusiness = async (req, res) => {
  const business_id = parseInt(req.params.business_id);
  const { business_name, business_email_id, contact_number, city } = req.body;
  let update_business = await query(
    `update business set business_name = $1,business_email_id = $2,contact_number = $3 ,city = $4 where business_id = $5`,
    [business_name, business_email_id, contact_number, city, business_id]
  );

  req.body.business_id = req.params.business_id;
  let response = props(200, null, "Business Updated");
  response.data = req.body;

  res.status(200).setHeader("Content-Type", "application/json").send(response);
};

app.put("/business/:business_id", updatebusiness);

// get business by id

const getBusinessById = async (req, res) => {
  const business_id = parseInt(req.params.business_id);
  let business = await query(`select * from business where business_id = $1`, [
    business_id,
  ]);

  let response = props(200, null, "Business Fetched");
  response.data = business.rows;

  res.status(200).setHeader("Content-Type", "application/json").json(response);
};

app.get("/business/:business_id", getBusinessById);

//Get Users business

const getUsersbusiness = async (req, res) => {
  let business = await query(`select * from business`);
  let response = props(200, null, "Business List Fetched");
  response.data = business.rows;
  res.status(200).setHeader("Content-Type", "application/json").json(response);
};
app.get("/business", getUsersbusiness);

// add sales

const createsales = async (req, res) => {
  const { invoice_number, amount } = req.body;
  let sales = await query(
    `insert into sales (invoice_number, amount) values ($1,$2) returning *`,
    [invoice_number, amount]
  );

  let salesid = sales.rows[0].sales_id;

  req.body.sales_id = salesid;

  let response = props(200, null, "Sales Added");
  response.data = req.body;

  res.status(201).setHeader("Content-Type", "application/json").send(response);
};

app.post("/sales", createsales);

//Get Sales By Id

const getsalesById = async (req, res) => {
  const sales_id = parseInt(req.params.sales_id);
  let sales = await query(`select * from sales where sales_id = $1`, [
    sales_id,
  ]);

  let response = props(200, null, "Sales Fetched");
  response.data = sales.rows;

  res.status(200).setHeader("Content-Type", "application/json").json(response);
};

app.get("/sales/:sales_id", getsalesById);

// Get Sales

const getsales = async (req, res) => {
  let sales = await query(`select * from sales`);

  let response = props(200, null, "Sales Fetched");
  response.data = sales.rows;
  res.status(200).setHeader("Content-Type", "application/json").json(response);
};

app.get("/sales", getsales);

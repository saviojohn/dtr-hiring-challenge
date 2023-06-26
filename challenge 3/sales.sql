create table sales(
sales_id serial primary key,
invoice_number varchar(100) unique,
amount int,
created_time timestamp default current_timestamp,
business_id int,
foreign key(business_id) references business(business_id)
);
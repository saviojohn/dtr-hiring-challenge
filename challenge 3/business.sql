create table business(
business_id serial primary key,
business_name varchar(100) not null,
business_email_id varchar(100) not null,
contact_number varchar(100) not null,
city varchar(100) not null,
created_time timestamp default current_timestamp,
last_modified timestamp default current_timestamp,
user_id int,
foreign key(user_id) references users(user_id)
);
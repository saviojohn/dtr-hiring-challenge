create table users (
user_id serial primary key,
first_name varchar(100) NOT NULL,
last_name varchar(100) NOT NULL,
gender varchar(20) check (gender in('Female','Male')) NOT NULL,
email_id varchar(100) unique NOT NULL,
phone_number varchar(100) NOT NULL,
password varchar(100) NOT NULL,
created_time timestamp default current_timestamp NOT NULL,
last_modified_time timestamp default current_timestamp NOT NULL
);
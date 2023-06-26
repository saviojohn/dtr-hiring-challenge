create table user_role(
user_id int,
foreign key(user_id) references users(user_id),
role_name varchar(100) unique
);
create schema huiguan;

create table users
(
	id int auto_increment,
	username nvarchar(36) not null,
	password nvarchar(36) not null,
	constraint users_pk
		primary key (id)
);

create table resources
(
	id int auto_increment,
	url nvarchar(36) null,
	type int not null,
	constraint resources_pk
		primary key (id)
);




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

create table articles
(
	id int auto_increment,
	content text null,
	creation_time datetime null,
	constraint articles_pk
		primary key (id)
);

create table articles_resources
(
	resources_id int not null,
	articles_id int not null,
	constraint PK_articles_resources
		primary key (resources_id, articles_id),
	constraint FK_articles
		foreign key (articles_id) references articles (id),
	constraint FK_resources
		foreign key (resources_id) references resources (id)
);

alter table articles
	add title varchar(36) null;

alter table articles
	add url varchar(36) null;

alter table articles
	add description varchar(36) null;

alter table resources
	add content text null;

alter table resources
	add creation_time datetime null;

alter table resources
	add title nvarchar(36) null;

alter table resources
	add description nvarchar(36) null;

create table sections
(
	id int auto_increment,
	title nvarchar(36) null,
	url nvarchar(36) null
);

create index sections_id_uindex
	on section (id);

alter table sections
	add constraint sections_pk
		primary key (id);

alter table resources
	add time datetime null;

alter table articles
	add time datetime null;

alter table articles
	add sections_id int null;

alter table articles
	add constraint articles_sections_id_fk
		foreign key (sections_id) references sections (id);












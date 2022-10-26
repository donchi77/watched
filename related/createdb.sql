create table users
(
    ID       int auto_increment
        primary key,
    email    varchar(128) not null,
    passwd   varchar(64)  not null,
    salt     varchar(64)  not null,
    username varchar(16)  not null,
    constraint email
        unique (email)
);

create table film
(
    ID      int auto_increment,
    id_api  varchar(20)  not null,
    id_user int          not null,
    status  bit          null,
    title   varchar(128) not null,
    poster  varchar(512) not null,
    primary key (ID, id_api, id_user),
    constraint film_ibfk_1
        foreign key (id_user) references users (ID)
);

create index id_user
    on film (id_user);

grant insert, select on table users to temp@localhost;



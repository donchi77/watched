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

grant insert, select on table users to temp@localhost;

INSERT INTO pwmdb.users (ID, email, passwd, salt, username) VALUES (1, 'prova@prova.it', '698cd7528570ea0c92741af736b6595e6704ef4eb26f787fc817287fb3e291d0', 'prova', 'donchi');
INSERT INTO pwmdb.users (ID, email, passwd, salt, username) VALUES (15, 'donchi@donchi.it', '6b5e4ea3052cf4a9f689b0de63d71a9b0df507df4292f9381b445e076320eb34', 'fd8ed26c75af9004b73242d8dad53e6a8a0f8f5757d8696822000628674e4b76', 'donchi');
INSERT INTO pwmdb.users (ID, email, passwd, salt, username) VALUES (16, 'oke@oke.it', 'de07b7734ad55289a4bfffecf2913d2219c567b17e9b90b400c13e927ae01605', 'eab9ef15236df15c00c7438fcf5c38cb057cbb44367ab8c27b08043ecfa33d4e', 'andrea');
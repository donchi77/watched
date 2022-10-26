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

INSERT INTO pwmdb.film (ID, id_api, id_user, status, title, poster) VALUES (39, 'tt1375666', 1, true, 'Inception', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg');
INSERT INTO pwmdb.film (ID, id_api, id_user, status, title, poster) VALUES (43, 'tt0076759', 1, true, 'Star Wars: Episode IV - A New Hope', 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg');
INSERT INTO pwmdb.film (ID, id_api, id_user, status, title, poster) VALUES (44, 'tt0086190', 1, true, 'Star Wars: Episode VI - Return of the Jedi', 'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg');
INSERT INTO pwmdb.film (ID, id_api, id_user, status, title, poster) VALUES (45, 'tt0758758', 1, false, 'Into the Wild', 'https://m.media-amazon.com/images/M/MV5BMTAwNDEyODU1MjheQTJeQWpwZ15BbWU2MDc3NDQwNw@@._V1_SX300.jpg');
INSERT INTO pwmdb.film (ID, id_api, id_user, status, title, poster) VALUES (46, 'tt8235236', 1, false, 'Paradise PD', 'https://m.media-amazon.com/images/M/MV5BZGRhOTBkMTktMDkwMS00M2JmLTgwOTctMDhjZWE0M2RhYTE3XkEyXkFqcGdeQXVyNjM4NTAzMDA@._V1_SX300.jpg');
INSERT INTO pwmdb.film (ID, id_api, id_user, status, title, poster) VALUES (47, 'tt6723592', 1, true, 'Tenet', 'https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg');
INSERT INTO pwmdb.film (ID, id_api, id_user, status, title, poster) VALUES (48, 'tt3778644', 1, false, 'Solo: A Star Wars Story', 'https://m.media-amazon.com/images/M/MV5BOTM2NTI3NTc3Nl5BMl5BanBnXkFtZTgwNzM1OTQyNTM@._V1_SX300.jpg');
INSERT INTO pwmdb.film (ID, id_api, id_user, status, title, poster) VALUES (49, 'tt0118799', 1, true, 'La vita è bella', 'https://m.media-amazon.com/images/M/MV5BYmJmM2Q4NmMtYThmNC00ZjRlLWEyZmItZTIwOTBlZDQ3NTQ1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg');
INSERT INTO pwmdb.film (ID, id_api, id_user, status, title, poster) VALUES (50, 'tt0087182', 1, false, 'Dune', 'https://m.media-amazon.com/images/M/MV5BYTAzYzNlMDMtMGRjYS00M2UxLTk0MmEtYmE4YWZiYmEwOTIwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_SX300.jpg');
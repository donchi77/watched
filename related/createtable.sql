/*
CREATE TABLE `pwmdb`.`users`(
	ID int NOT NULL auto_increment,
    email varchar(128) unique not null,
    passwd varchar(64) not null,
    salt varchar(64) not null,
    username varchar(16) not null,
    PRIMARY KEY (ID)
);
*/

/*
CREATE TABLE `pwmdb`.`film` (
	ID INT NOT NULL AUTO_INCREMENT,
    id_api varchar(20) NOT NULL,
    id_user INT NOT NULL,
    status BIT, -- 0 to watch 1 watched
    CONSTRAINT pk_film PRIMARY KEY (ID, id_api, id_user),
    FOREIGN KEY (id_user) REFERENCES users(ID)
);
ALTER TABLE film ADD COLUMN title varchar(128) NOT NULL;
*/



DROP DATABASE IF EXISTS wordAssociation;
CREATE DATABASE wordAssociation;

USE wordAssociation;

CREATE TABLE users (
	id VARCHAR(20) PRIMARY KEY,
    dateCreated TIMESTAMP NOT NULL);
    
CREATE TABLE games (
	id INT AUTO_INCREMENT PRIMARY KEY, 
    playerCount INT NOT NULL,
    dateCreated TIMESTAMP NOT NULL
    );
    
CREATE TABLE guess (
	id INT AUTO_INCREMENT PRIMARY KEY,
    round INT,
    word VARCHAR(50),
    gameId INT,
    userId INT,
    CONSTRAINT fk_gameId
		FOREIGN KEY (gameId)
        REFERENCES games(id),
	CONSTRAINT fk_userId
		FOREIGN KEY (userId)
        REFERENCES `user`(id)
);


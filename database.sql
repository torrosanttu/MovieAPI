-- Active: 1734377746702@@127.0.0.1@5432@postgres
CREATE TABLE Genres (
    GenreName VARCHAR(255) PRIMARY KEY
)

CREATE TABLE Movies (
    MovieName VARCHAR(255) PRIMARY KEY NOT NULL,
    GenreName VARCHAR(255) REFERENCES Genres(GenreName),
    Review INT
)

CREATE TABLE Users (
    Username VARCHAR(100) UNIQUE NOT NULL PRIMARY KEY,
    Password VARCHAR(100) NOT NULL,
    UserAge INT,
    UserCountry INT
)

CREATE TABLE Reviews (
    ReviewID INT PRIMARY KEY,
    MovieName VARCHAR(255) REFERENCES Movies(MovieName),
    Username VARCHAR(100) REFERENCES Users(Username),
    Stars DECIMAL(3, 2) CHECK (Stars >= 0 AND Stars <= 5)
)
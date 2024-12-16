CREATE TABLE Genres (
    GenreID INT PRIMARY KEY,
    Comedy VARCHAR(50),
    Horror VARCHAR(50),
    Drama VARCHAR(50),
    Romance VARCHAR(50),
    Other VARCHAR(50) 
)

CREATE TABLE Movies (
    MovieID INT PRIMARY KEY,
    MovieName VARCHAR(255) NOT NULL,
    Genre INT,
    Review INT
)

CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Username VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    UserAge INT,
    UserCountry INT
)

CREATE TABLE Reviews (
    ReviewID INT PRIMARY KEY,
    MovieID INT,
    Stars INT
)
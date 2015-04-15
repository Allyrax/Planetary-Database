CREATE SCHEMA `space`;

CREATE TABLE `space`.user
(
userId		INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
username	VARCHAR(30),
password	VARCHAR(30),
birthday	DATE
);
 
CREATE TABLE `space`.galaxy
(
galaxyId		INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
name			VARCHAR(60),
type			VARCHAR(30),
diameter		INT,
thickness		INT,
numberOfStars	INT,
mass			INT,
spiralPeriod	INT,
barPeriod		INT
);
 
CREATE TABLE `space`.star
(
starId			INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
galaxyId		INT NOT NULL,
name			VARCHAR(30),
mass			DECIMAL(6,5),
temperature		INT,
gravity			DECIMAL(6,5),
ageOfStar		INT,
FOREIGN KEY		(galaxyId)	REFERENCES `space`.galaxy(galaxyId)  on delete cascade
);
 
CREATE TABLE `space`.constellation
(
constellationId		INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
latinName			VARCHAR(30),
englishName			VARCHAR(30),
principalStar		INT NOT NULL,
rightAscensionHour	INT,
FOREIGN KEY     	(principalStar)	REFERENCES `space`.star(starId)
);
 
CREATE TABLE `space`.constellationStar
(
constStarId			INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
constellationId		INT NOT NULL,
starId				INT NOT NULL,
FOREIGN KEY	(constellationId)	REFERENCES `space`.constellation(constellationId)  on delete cascade,
FOREIGN KEY	(starId)			REFERENCES `space`.star(starId) on delete cascade
);
 
CREATE TABLE `space`.planet
(
planetId				INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
name					VARCHAR(50),
orbitalPeriod			DECIMAL(15, 9),
orbitalEccentricity		DECIMAL(6, 5),
argumentOfPeriastron	DECIMAL(5, 2),
velocity				DECIMAL(7, 3),
mass					DECIMAL(10, 6)
);
 
CREATE TABLE `space`.asteroid
(
asteroidId				INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
epoch					INT,
name					VARCHAR(50),
semiMajorAxis			DOUBLE(8,7),
inclination				DOUBLE(9,5),
argumentOfPerihelion	DOUBLE(9,5),
longitudeAscendingNode	DOUBLE(9,5),
meanAnomoly				DOUBLE(10,7),
magnitudeSlopePerameter	DOUBLE(3,2),
orbitSolutionReference	VARCHAR(30)
);
 
CREATE TABLE `space`.comet
(
cometId					INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
epoch					INT,
name					VARCHAR(50),
periheliodDistance		DOUBLE(9,8),
eccentricityOrbit		DOUBLE(9,8),
inclination				DOUBLE(9,5),
argumentOfPerihelion	DOUBLE(9,5),
longitudeAscendingNode	DOUBLE(9,5),
timePerihelionPassage	DOUBLE(13,5),
orbitReference			VARCHAR(30)
);
 
CREATE TABLE `space`.starOrbiter
(
orbiterId		INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
starId			INT NOT NULL,
planetId		INT,
asteroidId		INT,
cometId			INT,
FOREIGN KEY		(starId)		REFERENCES `space`.star(starId)  on delete cascade,
FOREIGN KEY		(planetId)		REFERENCES `space`.planet(planetId)  on delete cascade,
FOREIGN KEY		(asteroidId)	REFERENCES `space`.asteroid(asteroidId)  on delete cascade,
FOREIGN KEY		(cometId)		REFERENCES `space`.comet(cometId) on delete cascade
);

CREATE TABLE `space`.favourite
(
favId				INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
userId				INT NOT NULL,
galaxyId			INT,
starId				INT,
constellationId		INT,
orbiterId			INT,
FOREIGN KEY	(userId)			REFERENCES `space`.user(userId) on delete cascade,
FOREIGN KEY	(galaxyId)			REFERENCES `space`.galaxy(galaxyId) on delete cascade,
FOREIGN KEY	(starId)			REFERENCES `space`.star(starId) on delete cascade,
FOREIGN KEY	(constellationId)	REFERENCES `space`.constellation(constellationId)  on delete cascade,
FOREIGN KEY	(orbiterId)			REFERENCES `space`.starOrbiter(orbiterId) on delete cascade
);

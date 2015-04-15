SELECT name, ageOfStar - (SELECT AVG(ageOfStar) FROM `space`.star) AS NumYearsOlder
FROM `space`.star
WHERE ageOfStar = (SELECT MAX(ageOfStar)
FROM `space`.star);

SELECT DISTINCT asteroidId, orbitSolutionReference, cometId
FROM `space`.asteroid
INNER JOIN `space`.comet on orbitSolutionReference = orbitReference;

SELECT name, COUNT(so.starId) AS NumStarsThisPlanetOrbits
FROM `space`.starorbiter AS so
JOIN `space`.planet AS p on p.planetId = so.planetId
WHERE so.planetId is not null
GROUP BY so.planetId
HAVING COUNT(so.starId) > 1
ORDER BY so.planetId;

SELECT g.name, COUNT(so.orbiterId) AS NumOrbiters
FROM `space`.galaxy AS g
JOIN `space`.star AS s on g.galaxyId = s.galaxyId
JOIN `space`.starorbiter AS so on s.starId = so.starId
GROUP BY g.galaxyId
ORDER BY NumOrbiters DESC;

SELECT name, mass
FROM `space`.planet
WHERE mass > 1
ORDER by mass DESC;

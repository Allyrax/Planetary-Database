CREATE VIEW `space`.planets AS SELECT name, orbitalPeriod, orbitalEccentricity
FROM `space`.planet;

SELECT *
FROM `space`.planets
limit 20;

INSERT INTO `space`.planets (name, orbitalPeriod, orbitalEccentricity)
VALUES ('test', 2, 3);

CREATE VIEW `space`.orbiters AS
SELECT so.starId, name, COUNT(planetId) AS planetNum
FROM `space`.starorbiter AS so
JOIN `space`.star AS s on s.starID = so.starID
GROUP BY starId
ORDER BY planetNum DESC;

SELECT *
FROM `space`.orbiters;

INSERT INTO `space`.orbiters (starId, name)
VALUES (161, 'test');
UPDATE `space`.star AS s
SET name = concat(name, 'from', (SELECT g.name
FROM `space`.galaxy AS g
WHERE g.galaxyId = s.starId));

UPDATE `space`.planet
SET temperature = 6475
WHERE galaxyId = 40;

DELETE FROM `space`.asteroid
WHERE magnitudeSlopePerameter = 0.32 and epoch = 57000;
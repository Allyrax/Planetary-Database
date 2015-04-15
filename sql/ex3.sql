INSERT INTO `space`.favourite (userId, galaxyId)
SELECT
	1 as userId,
	galaxyId
    from `space`.galaxy
    WHERE name = 'Milky Way';

insert into `space`.favourite (userID, galaxyId)
SELECT
	1 as userId,
    galaxyId
    from `space`.galaxy
    Where type = 'barred spiral galaxy';

INSERT INTO `space`.favourite (userId, starId)
SELECT 
	1 as userId,
    starId
    from `space`.star
    Where ageOfStar = 7;

CREATE DATABASE top5000_db;

USE top5000_db;

CREATE TABLE top5000_songs (
	position INTEGER(10) NOT NULL,
	artist VARCHAR(100),
	song VARCHAR(100),
	year INTEGER,
	raw_total DECIMAL(10,4) NULL,
	raw_usa DECIMAL(10,4) NULL,
	raw_uk DECIMAL(10,4) NULL,
	raw_eur DECIMAL(10,4) NULL,
	raw_row DECIMAL(10,4) NULL,
	PRIMARY KEY (position)
);

SELECT * FROM top5000_songs WHERE position > 4900;

-- A query which returns all data for songs sung by a specific artist --
SELECT *
FROM top5000_songs 
WHERE artist="Madonna";

SELECT * 
FROM top5000_songs 
WHERE artist="Ace Of Base";

SELECT * 
FROM top5000_songs 
WHERE artist="Abba";

-- A query which returns all artists who appear within the top 5000 more than once -- 
SELECT artist 
FROM top5000_songs 
GROUP BY artist HAVING COUNT(*) > 1;

-- A query which returns all data contained within a specific range --
SELECT *
FROM top5000_songs
WHERE year BETWEEN 1980 AND 1990;

SELECT *
FROM top5000_songs
WHERE year BETWEEN 1990 AND 2000;

-- A query which searches for a specific song in the top 5000 and returns the data for it --
SELECT *
FROM top5000_songs
WHERE song="Toxic";

SELECT *
FROM top5000_songs
WHERE song="Vogue";

SELECT *
FROM top5000_songs
WHERE song="Frozen";

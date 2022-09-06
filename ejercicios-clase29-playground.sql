-- Micro desafío - Paso 1
SELECT * FROM genres;
INSERT INTO genres (created_at,name,ranking,active) VALUES (now(),'Investigación',13,1);
UPDATE genres SET name = 'Investigación Científica' WHERE NAME = 'Investigación';
DELETE FROM genres WHERE id = (SELECT id FROM genres WHERE NAME = 'Investigación Científica');

-- 4. Mostrar todos los registros de la tabla “movies”.
SELECT * from movies;
-- 5. Mostrar el nombre, apellido y rating de todos los actores.
SELECT first_name,last_name,rating from actors;
-- Mostrar el título de todas las series. Tomar en cuenta que tanto el nombre de la tabla como el campo estén en español.
SELECT title as título from series as peliculas;

-- Micro desafío - Paso 2
-- 1. Mostrar el nombre y apellido de los actores cuyo rating sea mayor a 7.5.
SELECT * from actors WHERE rating > 7.5;
-- 2. Mostrar el título de las películas, el rating y los premios de las películas con un rating mayor a 7.5 y con más de dos premios.
SELECT * FROM movies WHERE rating > 7.5 AND awards > 2;
-- 3. Mostrar el título de las películas y el rating ordenadas por rating en forma ascendente.
SELECT title,rating FROM movies ORDER BY rating;

-- Micro desafío - Paso 3:
-- 1. Mostrar los títulos de las primeras tres películas en la base de datos.
SELECT * FROM movies LIMIT 3;
-- 2. Mostrar el top 5 de las películas con mayor rating.
SELECT * FROM movies ORDER BY rating DESC LIMIT 5;
-- 3. Mostrar las top 5 a 10 de las películas con mayor rating.
SELECT * FROM movies ORDER BY rating DESC LIMIT 5 OFFSET 5;
-- 4. Listar los primeros 10 actores (sería la página 1).
SELECT * FROM actors LIMIT 10;
-- 4a. Luego, usar offset para traer la página 3.
SELECT * FROM actors LIMIT 10 OFFSET 30;

-- Micro desafío - Paso 4:
-- 1. Mostrar el título y rating de todas las películas cuyo título contenga Harry Potter.
SELECT title, rating FROM movies WHERE title = 'Harry Potter';
SELECT title, rating FROM movies WHERE title LIKE '%Harry Potter%';

-- 2. Mostrar a todos los actores cuyos nombres empiecen con Sam.
SELECT * FROM actors  WHERE first_name LIKE 'Sam%';
-- 3. Mostrar el título de las películas que salieron entre el 2004 y 2008.
SELECT * FROM movies WHERE YEAR(release_date) BETWEEN 2004 AND 2008 ; 
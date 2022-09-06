/* Utilizando la base de datos de películas queremos conocer, por un lado, los títulos y el
nombre del género de todas las series de la base de datos. */

SELECT s.title títulos, g.name género
FROM series s
INNER JOIN genres g ON s.genre_id = g.id;

/* Por otro, necesitamos listar los
títulos de los episodios junto con el nombre y apellido de los actores que trabajan en cada
uno de ellos. */ 

-- OJO que group_concat funciona únicamente en MySQL workbench, por lo que usar esta función y luego migrar a otro motor, traería problemas
SELECT e.title "títulos episodios", group_concat(concat(a.first_name, " ", a.last_name) SEPARATOR ", ") actores
FROM actors a
INNER JOIN actor_episode ae ON a.id = ae.actor_id
INNER JOIN episodes e ON ae.episode_id = e.id
GROUP BY e.title;

/* Para nuestro próximo desafío necesitamos obtener a todos los actores o actrices (mostrar
nombre y apellido) que han trabajado en cualquier película de la saga de la Guerra de las
galaxias, pero ¡cuidado!: debemos asegurarnos de que solo se muestre una sola vez cada
actor/actriz. */

-- si quisiera ver tmb las películas (m.title Películas) los nombres aparecerían 1 vez por cada película, aunque tenga el Distinct
SELECT DISTINCT concat(a.first_name, " ", a.last_name) "Nombre completo"
FROM actors a
INNER JOIN actor_movie am ON a.id = am.actor_id
INNER JOIN movies m ON am.movie_id = m.id
WHERE m.title like "%Guerra de las galaxias%";

/* Debemos listar los títulos de cada película con su género correspondiente. En el caso de
que no tenga género, mostraremos una leyenda que diga "no tiene género". Como ayuda
podemos usar la función COALESCE() que retorna el primer valor no nulo de una lista.*/

SELECT m.title Película, coalesce(g.name, "no tiene género") as Género
FROM movies m
LEFT JOIN genres g ON m.genre_id = g.id;

/* Necesitamos mostrar, de cada serie, la cantidad de días desde su estreno hasta su fin, con
la particularidad de que a la columna que mostrará dicha cantidad la renombraremos:
“Duración”. Por ejemplo:
Título Duración
Supernatural 130 */

SELECT s.title Título, DATEDIFF(s.end_date, s.release_date) AS Duración
FROM series s;

/* Listar los actores ordenados alfabéticamente cuyo nombre sea mayor a 6 caracteres. */

SELECT a.first_name Nombres
FROM actors a
where length(a.first_name) > 6
ORDER BY a.first_name ASC;

/* Debemos mostrar la cantidad total de los episodios guardados en la base de datos. */

SELECT COUNT(*)
FROM episodes;

/* Para el siguiente desafío nos piden que obtengamos el título de todas las series y el total
de temporadas que tiene cada una de ellas. */

SELECT series.title, COUNT(*)
FROM series
INNER JOIN seasons ON seasons.serie_id = series.id
GROUP BY series.title;

/* Mostrar, por cada género, la cantidad total de películas que posee, siempre que sea mayor
o igual a 3. */

SELECT g.name, COUNT(*)
FROM genres g
INNER JOIN movies m ON g.id = m.genre_id
GROUP BY g.name
HAVING COUNT(*) >= 3;
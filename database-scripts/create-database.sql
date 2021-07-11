CREATE DATABASE playcamp;
CREATE USER playcampadmin WITH PASSWORD '123';
GRANT ALL ON DATABASE playcamp to playcampadmin;
ALTER DABABASE playcamp OWNER TO playcampadmin;
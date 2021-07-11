CREATE DATABASE playcamp;
CREATE USER playcampadmin WITH PASSWORD '123';
GRANT ALL PRIVILEGES ON DATABASE playcamp to playcampadmin;
ALTER DATABASE playcamp OWNER TO playcampadmin;
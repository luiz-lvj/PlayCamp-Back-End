CREATE TABLE soldgames(
    id SERIAL,
    "userId" INTEGER,
    "gameId" INTEGER,
    "saleId" INTEGER,
    quantity INTEGER,
    date DATE
);
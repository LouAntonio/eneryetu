-- Remover código do país (ISO), latitude e longitude dos eventos
ALTER TABLE "Event" DROP COLUMN "country";
ALTER TABLE "Event" DROP COLUMN "latitude";
ALTER TABLE "Event" DROP COLUMN "longitude";

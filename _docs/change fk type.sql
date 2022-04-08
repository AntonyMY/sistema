--ALTER TABLE articulo DROP CONSTRAINT articulo_marca_fk;
--alter table articulo ALTER COLUMN codmarca SET DATA TYPE integer USING codmarca::integer; 
--alter table marca ALTER COLUMN codmarca SET DATA TYPE integer USING codmarca::integer; 
alter table articulo add CONSTRAINT articulo_marca_fk FOREIGN KEY(codmarca) REFERENCES marca(codmarca)

--ALTER TABLE articulo DROP CONSTRAINT fk_art_line;
--alter table articulo ALTER COLUMN codlinea SET DATA TYPE integer USING codlinea::integer; 
--alter table linea ALTER COLUMN codlinea SET DATA TYPE integer USING codlinea::integer; 
--alter table articulo add CONSTRAINT articulo_linea_fk FOREIGN KEY(codlinea) REFERENCES linea(codlinea)

--***********SECUENCIAL**************
--create sequence linea_codlinea_seq owned by linea.codlinea;
--alter table linea alter column codlinea set default nextval('linea_codlinea_seq');
--select setval('linea_codlinea_seq', 7,true)




--ALTER TABLE articulo DROP CONSTRAINT articulo_marca_fk;
--alter table articulo ALTER COLUMN codmarca SET DATA TYPE integer USING codmarca::integer; 
--alter table marca ALTER COLUMN codmarca SET DATA TYPE integer USING codmarca::integer; 
alter table articulo add CONSTRAINT articulo_marca_fk FOREIGN KEY(codmarca) REFERENCES marca(codmarca)



--ALTER TABLE articulo DROP CONSTRAINT fk_art_line;
--alter table articulo ALTER COLUMN codlinea SET DATA TYPE integer USING codlinea::integer; 
--alter table linea ALTER COLUMN codlinea SET DATA TYPE integer USING codlinea::integer; 
--alter table articulo add CONSTRAINT articulo_linea_fk FOREIGN KEY(codlinea) REFERENCES linea(codlinea)







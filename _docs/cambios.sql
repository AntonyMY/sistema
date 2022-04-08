alter table menu add column icon varchar(20);
alter table menu add column path varchar(30);
alter table menu add column parent varchar(50);
alter table menu add column title varchar(100);


alter table menu add constraint fk_menu_parent 
    foreign key(parent) references menu(cod_men);


-----AGREGAR PADRES de MENU-----------------------
update menu set parent = '03-001-001-007' WHERE cod_men like '03-001-001-007-%' and LENGTH(cod_men)=18    

SELECT cod_men, nom_men, estado, dias, icon, path, substr(cod_men, 0,strrpos(cod_men, '-')) as parent, title
  FROM public.menu;

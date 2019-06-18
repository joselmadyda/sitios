drop table sitios;
drop table categorias; 


CREATE TABLE [sitios](
	[id_sitio] [integer] IDENTITY (1, 1) PRIMARY KEY NOT NULL,
	[id_categoria] [integer] NOT NULL,
	[nombre_sitio] [varchar](250) NOT NULL,
	[barrio] [varchar](250) NOT NULL,
	[latitud] [float] NOT NULL,
	[longitud] [float] NOT NULL,
	[url] [varchar](250) NOT NULL,
	[responsable] [varchar](250) NOT NULL,
	[hora_apertura] [varchar](10) NOT NULL,
	[hora_cierre] [varchar](10) NOT NULL,
	[voucher] BIT NULL DEFAULT 0
	);

INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('1','SUSHI FLORES','parque chacabuco',-34.6314056,-58.4536068,'www.sushiflores.com.ar', 'Fabricio', '08:00', '21:00', 1);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('1','Del Loft Restó','parque chacabuco',-34.6285167,-58.437193,'www.loftresto.com.ar', 'Analía', '08:00', '21:00', 1);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('1','Locos de Asar','parque chacabuco',-34.6683024,-58.4939337,'www.santome.com.ar', 'San Tome', '08:00', '20:00', 0);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('1','Man - Ros','parque chacabuco',-34.632963,-58.428289,'www.manros.com.ar', 'Ros Asociados', '08:00', '21:00', 1);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('1','Coyote','parque chacabuco',-34.6393137,-58.4300333,'www.coyote.com.ar', 'Daniel Ahumada', '10:00', '18:00', 0);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('1','Asamblea Plaza','parque chacabuco',-34.6354104,-58.4389631,'www.asambleaplaza.com.ar', 'Guillermo Bujan', '11:00', '19:00', 1);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('1','COTO','almagro',-34.6085476,-58.4311811,'www.coto.com.ar', 'DON COTO SA', '08:00', '21:00', 1);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('1','ALIANZA','almagro',-34.6112837,-58.4264576,'www.fabrica.com.ar', 'ALIANZA SA', '10:00', '15:00', 0);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('2','CINE ATLAS','parque chacabuco',-34.6291701,-58.4424897,'www.atlas.com.ar', 'ATLAS SA', '08:00', '21:00', 1);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('3','DOS CARAS','almagro',-34.6093855,-58.4343329,'www.caras.com.ar', 'DON CARAS SA', '08:00', '21:00', 1);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('3','RISAS','almagro',-34.608776,-58.425912,'www.risas.com.ar', 'DON RISAS SA', '08:00', '21:00', 1);
INSERT into sitios (id_categoria, nombre_sitio, barrio, latitud, longitud, url, responsable, hora_apertura, hora_cierre, voucher)
values ('3','EL CHACAL','almagro',-34.6088385,-58.4286357,'www.chacal.com.ar', 'TEATROS SA', '10:00', '15:00', 0);

CREATE TABLE [categorias](
	[id_cat] [integer] IDENTITY (1, 1) PRIMARY KEY NOT NULL,
	[nombre_cat] [varchar](250) NOT NULL
	);
INSERT INTO categorias (nombre_cat) VALUES ('RESTAURANTES');
INSERT INTO categorias (nombre_cat) VALUES ('BARES');
INSERT INTO categorias (nombre_cat) VALUES ('TEATROS');


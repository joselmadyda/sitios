USE [Sitios]
GO
/****** Object:  StoredProcedure [dbo].[sitiosWeb]    Script Date: 10/06/2019 1:40:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[sitiosWeb] 
@Tarea nvarchar (100) = '',
@NuevaCategoria nvarchar(250) = '',
@IdCategoria int = 0,
@IdSitio int = 0,
@NombreSitio nvarchar (250)= '',
@Latitud float= 0,
@Longitud float = 0,
@Responsable nvarchar (250)= '',
@HoraApertura nvarchar (10) = '',
@HoraCierre nvarchar (10)= '',
@Voucher bit= 0,
@Url nvarchar (250)= '',
@Barrio nvarchar (250)= ''


as

/***************************TAREAS CATEGORIAS*********************************/
if @Tarea = 'ALLCATEGORIAS'
begin
	select *
		from categorias
end

if @Tarea= 'CATEGORIAPORID'
begin
	select *	
		from categorias 
			where id_cat= @IdCategoria
end


if @Tarea= 'ALTACATEGORIA'
begin
	insert into categorias (nombre_cat)
		values (@NuevaCategoria)
		
end


if @Tarea= 'DELETECATEGORIA'
begin
	delete 
		from categorias 
			WHERE id_cat=@IdCategoria
end


/****************************TAREAS SITIOS*********************************/
if @Tarea = 'ALLSITIOS'
begin
	select * 
		from sitios
end

if @Tarea = 'SITIOPORCATEGORIA'
begin
	select *
		from sitios WHERE id_categoria= @Idcategoria
end


if @Tarea= 'SITIOPORID'
begin
	select * 
		from sitios 
			where id_sitio= @IdSitio
end


if @Tarea= 'SITIOPORCATYBARRIO'
begin
	select * 
		from sitios 
			where id_categoria= @IdCategoria
				and barrio= @Barrio
end


if @Tarea= 'UPDATESITIO'
begin
	  UPDATE sitios 
            SET url =@Url
				WHERE id_sitio=@IdSitio
end


if @Tarea= 'ALTASITIO'
begin
	insert into sitios (id_categoria,nombre_sitio,barrio,latitud,longitud,url,responsable,hora_apertura,hora_cierre,voucher)
				values(@IdCategoria,@NombreSitio,@Barrio,@Latitud,@Longitud,@Url,@Responsable,@HoraApertura,@HoraCierre,@Voucher)
	   
end


if @Tarea= 'DELETESITIO'
begin 
	delete	
		from sitios 
			where id_sitio=@IdSitio

end

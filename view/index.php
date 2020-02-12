<div class="contenedor">
	<div class="fila">
		<div class="col-xl-12">
			<h1>Fetch Api peticiones a MYSQL</h1>
		</div>
	</div>

	<div class="fila">
		<div class="col-xl-6 col-l-6 col-m-6 col-s-12 col-xs-12">
			<div class="box_container">
				<div class="box_container--header">
					<h2>Formulario envío información.</h2>
				</div>

				<form id="enviar_form">
					<div class="box_container--body">
							<div class="box_body--input">
								<input type="text" name="nombres" id="nombres" placeholder="Tus nombres"/>
							</div>

							<div class="box_body--input">
								<input type="text" name="apellidos" id="apellidos" placeholder="Tus apellidos">
							</div>

							<div class="box_body--input">
								<input type="text" name="alias" id="alias" placeholder="Tu alias">
							</div>

							<div class="box_body--input">
								<input type="text" name="nacimiento" id="nacimiento" placeholder="Tu fecha nacimiento">
							</div>

							<div class="box_body--input">
								<input type="text" name="direccion" id="direccion" placeholder="Tu direccion">
							</div>

							<div class="box_body--input">
								<input type="text" name="pais" id="pais" placeholder="Tu pais">
							</div>

							<div class="box_body--input">
								<input type="text" name="telefono" id="telefono" placeholder="Tu telefono">
							</div>

							<div class="box_body--input">
								<input type="text" name="correo" id="correo" placeholder="Tu correo">
							</div>

							<div class="box_body--input">
								<input type="text" name="avatar" id="avatar" placeholder="Tu avatar">
							</div>
					</div> <!--End box_body-->

					<div class="box_container--footer">
						<button type="submit">Enviar al servidor</button>
					</div>
				</form>
			</div> <!--End box-->
		</div> <!--End col-xl-6 -->

		<div class="col-xl-6 col-l-6 col-m-6 col-s-12 col-xs-12">
			<div class="box_container">
				<div class="box_container--header">
					<h2>Obtener la información.</h2>
				</div>

				<div class="box_container--body">
					<ul id="load_usuarios"></ul>
				</div> <!--End box-body-->
			</div> <!--End box-->
		</div> <!--End col-xl-6 -->
	</div> <!--End fila -->
</div> <!--End contenedor -->
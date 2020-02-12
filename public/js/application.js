//VARIABLES
const inputNombres    = document.querySelector('#nombres');
const inputApellidos  = document.querySelector('#apellidos');
const inputAlias      = document.querySelector('#alias');
const inputNacimiento = document.querySelector('#nacimiento');
const inputDireccion  = document.querySelector('#direccion');
const inputPais       = document.querySelector('#pais');
const inputTelefono   = document.querySelector('#telefono');
const inputCorreo     = document.querySelector('#correo');
const inputAvatar     = document.querySelector('#avatar');
const formEnviar      = document.querySelector('#enviar_form');
const userLoadDOM     = document.querySelector('#load_usuarios');



//CLASE DE LA INTERFAZ
class UI {

	cargarInformacionFaker() {
			inputNombres.value    = faker.name.findName();
			inputApellidos.value  = faker.name.lastName();
			inputAlias.value      = faker.internet.userName(inputNombres.value);
			let fechaNacimiento   = faker.date.past(50, new Date());
			inputNacimiento.value = fechaNacimiento.getFullYear() + '-' + (fechaNacimiento.getMonth()+1) + '-' + fechaNacimiento.getDate();
			inputDireccion.value  = faker.address.streetAddress();
			inputPais.value       = faker.address.country();
			inputTelefono.value   = faker.phone.phoneNumberFormat();
			inputCorreo.value     = faker.internet.email(inputNombres.value);
			inputAvatar.value     = faker.image.avatar();
	} // End cargarInformacion


	cargarUsers(users) {

		if (users.respuesta == 0) {
				let div = document.createElement('div');
				div.style.color = '#FFB236';
				userLoadDOM.appendChild(div);
				div.textContent = 'No hay usuarios registrados!';
		}
		else if(users.respuesta == 1){
				//SE CREA LA CLASE
				userLoadDOM.setAttribute('class', 'scroll-ul');
				let listado = '';
				let datos = users.data;

				//RECORRE LA INFORMACION
				datos.forEach(dato => {
					listado += `
					<li>
							<div class= "usuarios-body">
								<img src="${dato.avatar_usuario}">
								<div class="usuarios-content">
									<p>${dato.nombres_usuario}</p>
									<span>${dato.correo_usuario}</span>
								</div>
							</div>
					</li>`;
				});

				//MUESTRA LA INFORMACION
				return userLoadDOM.innerHTML = listado;
		}
	} // ENd metodo cargarInformacionUser


	swAlerta(icon, title, text) {
			let alert = Swal.fire({
											icon :`${icon}`,
											title: `${title}`,
											text: `${text}!`
										});
			return alert;
	}


} //End class UI



//CLASE DE LA INFORMACION USUARIO
class Usuario {

	//OBTENER LA INFORMACION POR GET AL SERVIDOR
	async obtenerUsuarios() {

			try {
					let response = await Ajax.fetchData('AjaxRequest/obtenerUsuarios/');
					return response;
			} catch(e) {
					console.error('Error => ', e);
			}
	} //End metodo obtenerUsuarios

	//ENVIAR LA INFORMACION POR POST AL SERVIDOR
	async enviarUsuario(form) {
				try {
						let peticion = await Ajax.fetchData('AjaxRequest/postearUsuarios/', form, 'POST');
						return peticion;
				} catch(e) {
						console.error('Error => ', e);
				}

	} // enviarInformacion
} //End class Usuario



//CLASE DE LLAMADAS ASYNCRONAS CON FETCH API
class Ajax {

	static async fetchData(controlador, parametros, metodo = 'GET') {

			//OPCIONES A LA SOLICITUD DE LA BUSQUEDA
			let opciones = {
							method : metodo,
							headers: {
									'Accept': 'text/plain'
								}
					};

			//SI EXISTEN PARAMETROS Y EL METODO ES DIFERENTE DE GET AGREGUE AL CUERPO DE LA SOLICITUD LOS PARAMETROS
			if (parametros) {
					if (metodo !== 'GET') {
							//AGRERAR AL CUERPO DEL OBJETO DE OPCIONES LOS PARAMETROS
							opciones.body = parametros;


							//RESPUESTA DEL SERVIDOR
							let respuesta = await fetch(url_javascript + controlador, opciones);

							//MUESTRA UN ERROR SI EL CODIGO DE ESTADO NO ES 200
							if (respuesta.status !== 200) {
									return {
										status: 'error',
										'mensaje' : 'El servidor respondió con un estado inesperado.'
									}
							}
							//DEVOLVEMOS LA RESPUESTA
							let data = await respuesta.json();
							return data;

					}
			} else{
					//FETCH DEVUELVE UNA PROMESA, POR LO QUE AGREGAMOS LA PALABRA CLAVE AWAIT PARA ESPERAR HASTA QUE SE CUMPLA LA PROMESA
					let respuesta = await fetch(url_javascript + controlador, opciones);

					//MUESTRA UN ERROR SI EL CODIGO DE ESTADO NO ES 200
					if (respuesta.status !== 200) {
							return{
								status: 'error',
								'mensaje' : 'El servidor respondió con un estado inesperado.'
							}
					}
					//DEVUELVE LA RESPUESTA DE LA INFORMACION
					let datos = await respuesta.json();
					return datos;
			}

	}// End metodo getData
}// End class Ajax

//INSTANCIA DE LAS CLASES
const ui   = new UI();
const user = new Usuario();

//CUANDO EL DOM ESTECARGADO
document.addEventListener('DOMContentLoaded', () =>{

		//CARGA LA INFORMACION EN EL FORMULARIO CON VALORES DE FAKER
		ui.cargarInformacionFaker();

		//CARGA LA INFORMACION DE LOS USUARIOS Y EJECUTA LA DATA PARA MOSTRARLA EN EL UI
		user.obtenerUsuarios()
		.then(users =>{
			ui.cargarUsers(users);
		});
});

//ENVIAMOS DATOS CON EL EVENTO DEL SUBMIT
formEnviar.addEventListener('submit', (e) =>{
		e.preventDefault();
		let form = new FormData(formEnviar);
		user.enviarUsuario(form)
		.then((data) =>{
				if (data.respuesta == 1) {
					ui.swAlerta('success', 'Genial!', data.mensaje)
					.then(() =>{
							user.obtenerUsuarios()
							.then(users =>{
									ui.cargarUsers(users);
							}) //End then (users)
					}) //End then ()
				} //End if
		}); // End then (data)

}); // End eventListener (submit)
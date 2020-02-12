<?php


namespace Mini\Controller;

use Mini\Model\Usuario;

class AjaxRequestController
{
	private $_usuarios;

	public function __construct()
	{
			$this->_usuarios = new Usuario();
	}


	public function obtenerUsuarios()
	{
			$usuarios = $this->_usuarios->getAllUser();
			if (!empty($usuarios)) {
					$resultado = array('respuesta' => 1, 'data' => $usuarios);
					echo json_encode($resultado);
			} else{
					echo json_encode(array('respuesta' => 0));
			}
	}// End function obtenerUsuarios


	public function postearUsuarios()
	{
			$request = $this->_usuarios->postUser($_POST);
			if ($request) {
					$resultado = array('respuesta' => 1, 'mensaje' => 'Los datos fueron guardados');
					echo json_encode($resultado);
			} else{
					echo json_encode($request);
			}
	}


} //End class AjaxRequestController

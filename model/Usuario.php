<?php

namespace Mini\Model;

use Mini\Core\Model;

class Usuario extends Model
{
	public function getAllUser()
	{
			try {
				$sql = "SELECT * FROM usuarios";
				$stmt = $this->db->prepare($sql);
				$stmt->execute();
				return $stmt->fetchAll();
			} catch (Exception $e) {
				return $e->getMessage();
			}
	}// ENd function getAllUser


	public function postUser($data)
	{
			try {
					$sql = "INSERT INTO usuarios (
					nombres_usuario, apellidos_usuario,
					nickName_usuario, fechaNacimiento_usuario,
					direccion_usuario, pais_usuario,
					telefono_usuario, correo_usuario,
					avatar_usuario, fechaCreado_usuario) VALUES(
					:nombres, :apellidos, :nickName, :nacimiento, :direccion,
					:pais, :telefono, :correo, :avatar, :fecha)";
					$stmt = $this->db->prepare($sql);
					$parametros = array(
						':nombres'    => $data['nombres'],
						':apellidos'  => $data['apellidos'],
						':nickName'   => $data['alias'],
						':nacimiento' => $data['nacimiento'],
						':direccion'  => $data['direccion'],
						':pais'       => $data['pais'],
						':telefono'   => $data['telefono'],
						':correo'     => $data['correo'],
						':avatar'     => $data['avatar'],
						':fecha'      => date("Y-m-d H:i:s")
					);
					$stmt->execute($parametros);

					//SI AFECTA LA COLUMNA
					if ($stmt->rowCount() == 1) {
							return true;
					} else{
							trigger_error("Ocurrio un error", E_USER_ERROR);
					}

			} catch (Exception $e) {
					return $e->getMessage();
			}
	}// End function postUser


}// End class Usuario
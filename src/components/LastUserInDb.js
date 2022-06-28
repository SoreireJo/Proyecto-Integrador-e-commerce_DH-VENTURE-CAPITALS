import React from "react";
import { useState, useEffect } from "react"
//import ImagenProducto from "../assets/img/product_dummy.svg";
// import ImagenProducto from "../assets/img/fotoPerfil.png";


function LastUserInDb() {
    const [Usuario, setUltimoUser] = useState([])

    useEffect(() => {
                fetch("/api/users")
            .then((respuestaApi) => {
                return respuestaApi.json()
            })
            .then((usuariosApi) => {
                let users = usuariosApi.datos
                let idUsuarios = users.map((user) => {
                    return user.id

                })
                let idMayor = Math.max(...idUsuarios)
                let ultimoUsuario = users.find(elemento => elemento.id === idMayor)
             console.log(ultimoUsuario);
                setUltimoUser(ultimoUsuario)
            })
    }, []);

      
    
    return (
        <div className="col-lg-6 mb-4 ">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Ultimo Usuario Creado</h6>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" height="300" width="300" align="left" src={Usuario.imagen} alt="ImagenProducto" />
                    </div>
                    <p></p>
                    <p>Usuario: {Usuario.nombre} </p>
                   
                    <p>e-Mail: {Usuario.email}</p>
                </div>
            </div>
        </div>


    );
}

export default LastUserInDb;
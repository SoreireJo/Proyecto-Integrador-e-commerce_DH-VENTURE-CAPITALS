import React from "react";
import { useState, useEffect } from "react"


function LastProductInDb() {
    const [Producto, setUltimoProducto] = useState([])

    useEffect(() => {
        fetch("/api/products/")
            .then((respuestaApi) => {
                
               return respuestaApi.json()
            })
            .then((productosApi) => {
                
                let products = productosApi.datos
                console.log("Este es el primero", products)
                let idProductos = products.map((prod) => {
                    return prod.id
                })
                let idMayor = Math.max(...idProductos)
                let ultimoproducto = products.find(elemento => elemento.id === idMayor)

                setUltimoProducto(ultimoproducto)
            })
    }, [])

  


    return (
        <div className="col-lg-6 mb-4 ">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Ultimo Producto Cargado a la BD</h6>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" height="300" width="300" align="left" src={Producto.imagen} alt="ImagenProducto" />
                    </div>
                    <p></p>
                    <p>Nombre del Producto : {Producto.nombre} {""}  </p>
                    <p>Descripcion: {Producto.descripcion}</p>
                    <p>Nombre del Artista  : {Producto.categoriaId}</p>
                    <p>Precio del Producto  : ${Producto.precio}</p>
                </div>
            </div>
        </div>


    );
}
export default LastProductInDb;
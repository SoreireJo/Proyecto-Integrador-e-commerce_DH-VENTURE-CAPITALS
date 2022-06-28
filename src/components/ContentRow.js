import React from "react";
import { useState, useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { faDollarSign } from "@fortawesome/free-solid-svg-icons"
import { faUserCheck } from	"@fortawesome/free-solid-svg-icons"

function ContentRow(){

	const [cantidadProd, setCatantidadProd] = useState([])
	useEffect(() => {
		fetch("/api/products/") // endPoint Api me trae productos
			.then((respuestaApi) => {
				return respuestaApi.json() // la respuesta que viene en el primer then es un json la transformo en un objeto con el .josn()
			})
			.then((productosApi) => {   // productosApi ya es la respuesta de la api pero convertida a objeto el nombre lo pongo yo
				setCatantidadProd(productosApi.total) // actualizo el estado de productos pasandole el resultado a la variable productos
			})
	}, []) // estos dos corchetes son para que no se produzca un bucle infinito

	const [cantidadusuarios, setUsuarios] = useState([])

	useEffect(() => {
		fetch("api/users")
			.then((usuariosApi) => {
				return usuariosApi.json()
			})
			.then((usuarios) => {
				let cantidadusuarios = usuarios.total
				setUsuarios(cantidadusuarios)
			})
	}, [])

	// console.log(cantidadusuarios)

	const [sumaPrecios, setSumaPrecios] = useState([])

	useEffect(() => {
		fetch("/api/products/")
			.then((respuestaApi) => {
				return respuestaApi.json()
			})
			.then((productosApi) => {
				let products = productosApi.datos
				let preciosProd = products.map((prod) => {
					return prod.precio
				})
				let preciosProdNumeros = preciosProd.map((precio) => {
					return Number(precio)
				})
				let sumaPrecios = preciosProdNumeros.reduce((a, b) => a + b, 0)
				setSumaPrecios(sumaPrecios)
			})

	}, [])
    return(

        <div class="container-fluid">

					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0" style={{fontSize: 20, fontFamily: "Lobster", display: "block",margin: "auto", color: "blue"}}  >  TECNOCOM"</h1>
					</div>

                    <div className="row">

						<div className="col-md-4 mb-4">
							<div className="card border-left-primary shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-primary text-uppercase mb-1"> Cantidad Total de productos </div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">{cantidadProd}</div>
										</div>
										<div className="col-auto" style={{fontSize: 20}}>
											<FontAwesomeIcon icon={faClipboardList} />
										</div>
									</div>
								</div>
							</div>
						</div>


						<div className="col-md-4 mb-4">
							<div className="card border-left-success shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-success text-uppercase mb-1"> Costo Total de Productos </div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">$ {sumaPrecios} </div>
										</div>
										<div className="col-auto" style={{fontSize: 20}}>
											<FontAwesomeIcon icon={faDollarSign} />
										</div>
									</div>
								</div>
							</div>
						</div>


						<div className="col-md-4 mb-4">
							<div className="card border-left-warning shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Cantidad de Usuarios Registrados
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">{cantidadusuarios}</div>
										</div>
										<div className="col-auto" style={{fontSize: 20}}>
											<FontAwesomeIcon icon={faUserCheck} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
             </div>


    );
}
export default ContentRow;


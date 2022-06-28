import React from "react";
import { useState, useEffect } from "react"

function ProductList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/products/");
            const json = await res.json();
            setData(json.datos);
        };
        fetchData();
    }, [setData]);

    return (
        <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="tituloBloques">Lista de Productos</h6>
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.categoria.nombre}</td>
                            <td>{item.precio}</td>
                            <td>{item.descripcion}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>



    );
}

export default ProductList;

window.addEventListener('load', function () {
    let createProduct = document.getElementById('seleccion');
    let productCreatePrevisualizacion = document.querySelector("#productCreate");
    createProduct.addEventListener('change', function () {
        let archivos = createProduct.files;
        // Si no hay archivos salimos de la función y quitamos la imagen
        if (!archivos || !archivos.length) {
            productCreatePrevisualizacion.src = "/desing/iconos/default-placeholder.png";
            return;
        }
        // Ahora tomamos el primer archivo, el cual vamos a previsualizar
        let productCreate = archivos[0];
        // Lo convertimos a un objeto de tipo objectURL
        let objectURL = URL.createObjectURL(productCreate);
        // Y a la fuente de la imagen le ponemos el objectURL
        productCreatePrevisualizacion.src = objectURL;
    });
})

window.addEventListener('load', function () {
    let createUser = document.getElementById('seleccionCuser');
    let userCreatePrevisualizacion = document.getElementById("userCreate");
    createUser.addEventListener('change', function () {

        let archivos = createUser.files;
        // Si no hay archivos salimos de la función y quitamos la imagen
        if (!archivos || !archivos.length) {
            userCreatePrevisualizacion.src = "/desing/iconos/default-placeholder.png";
            return;
        }
        // Ahora tomamos el primer archivo, el cual vamos a previsualizar
        let userCreate = archivos[0];
        // Lo convertimos a un objeto de tipo objectURL
        let objectURL = URL.createObjectURL(userCreate);
        // Y a la fuente de la imagen le ponemos el objectURL
        userCreatePrevisualizacion.src = objectURL;
    })
})
window.addEventListener('load', function () {
    let editPoduct = document.getElementById('seleccionEp');
    let productEditPrevisualizacion = document.getElementById("editProduct");
    
    editPoduct.addEventListener('change', function () {

        let archivos = editPoduct.files;
        // Si no hay archivos salimos de la función y quitamos la imagen
        if (!archivos || !archivos.length) {
          productEditPrevisualizacion.src = "/images/products/default.png";
            return location.reload();
        }
        // Ahora tomamos el primer archivo, el cual vamos a previsualizar
        let productEdit = archivos[0];
        console.log(productEdit);
        // Lo convertimos a un objeto de tipo objectURL
        let objectURL = URL.createObjectURL(productEdit);
        // Y a la fuente de la imagen le ponemos el objectURL
        productEditPrevisualizacion.src = objectURL;
    })
})
window.addEventListener('load', function () {
    let editUser = document.getElementById('seleccionEuser');
    let userEditPrevisualizacion = document.getElementById("userEdit");
    editUser.addEventListener('change', function () {

        let archivos = editUser.files;
        // Si no hay archivos salimos de la función y quitamos la imagen
        if (!archivos || !archivos.length) {
            userEditPrevisualizacion.src = "/desing/iconos/default-placeholder.png";
            return location.reload();
        }
        // Ahora tomamos el primer archivo, el cual vamos a previsualizar
        let userEdit = archivos[0];
        // Lo convertimos a un objeto de tipo objectURL
        let objectURL = URL.createObjectURL(userEdit);
        // Y a la fuente de la imagen le ponemos el objectURL
        userEditPrevisualizacion.src = objectURL;
    })
})
















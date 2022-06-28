window.addEventListener("load", function(){
    let inpNombre = document.querySelector("#name");
    let textNombreError = this.document.querySelector("#nameError")
    let inpDescripcion = document.querySelector("#description");
    let textDescripcionError = this.document.querySelector("#descriptionError")
    let inpImage = this.document.querySelector("#seleccion")
    let textImageError = this.document.querySelector("#imageError")

    //VALIDATIONS
    inpNombre.addEventListener("change", function(){
        if(!inpNombre.value == ""){
            countCaractersMinimos(5, inpNombre, textNombreError)
        }else{
            textNombreError.innerHTML = 'El campo nombre no puede estar vacio'; 

        }
    })

    inpDescripcion.addEventListener("change", function(){
        if(!inpDescripcion.value == ""){
            countCaractersMinimos(20,inpDescripcion,textDescripcionError)
        }else{
            textDescripcionError.innerHTML ='El campo descripcion no puede estar vacio'; 

        }
    })

    inpImage.addEventListener("change", function(){
        let file = inpImage.value;
        if(!validar_extension(file)) {
            textImageError.innerHTML ='Extension del archivo invalida.';
        }
    })

    //FUNTIONS ---------------------------------------------------------------
    function validaEmail(expresion, campo, msgError){
        if(expresion.test(campo.value)){
            console.log("Email valido");
            return true;
        }else{
            msgError.innerHTML ='El campo email debe tener un formato valido'; 
            return false;
        }
    }

    function countCaractersMinimos(minimo, campo, msgError){
        let count = 0; 
        for(dato in campo.value){count++};  
        if(count < minimo){
            msgError.innerHTML ='El campo nombre debe tener mas de '+minimo+' digitos'; 
        }  
    }

    function countCaractersMaximos(maximo, campo, msgError){
        let count = 0; 
        for(dato in campo.value){count++};  
        if(count > maximo){
            msgError.innerHTML = 'El campo nombre debe tener menos de '+maximo+' digitos'; 
        }  
    }

    // CHECK FILE EXTENSION
    function validar_extension(file) {
        var valid_extensions = ['jpeg', 'jpg','png', 'gif'];
        file_extension = file.split('.').pop();

        return valid_extensions.includes(file_extension);
    }
})
window.addEventListener("load", function(){
    let inpNombre = document.querySelector("#nombre");
    let textNombreError = this.document.querySelector("#nombreError")
    let inpApellido = document.querySelector("#apellido");
    let textApellidoError = this.document.querySelector("#apellidoError")
    let inpEmail = document.querySelector("#email");
    let textEmailError = this.document.querySelector("#emailError")
    let inpDni= document.querySelector("#dni");
    let textDniError = this.document.querySelector("#dniError")
    let inpContra = document.querySelector("#contrasenia");
    let textContraseniaError = this.document.querySelector("#contraseniaError")
    let inpImage = this.document.querySelector("#seleccionArchivos")
    let textImageError = this.document.querySelector("#avatarError")

    //VALIDATIONS
    inpNombre.addEventListener("change", function(){
        if(!inpNombre.value == ""){
            countCaractersMinimos(2, inpNombre, textNombreError)
        }else{
            textNombreError.innerHTML = 'El campo nombre no puede estar vacio'; 

        }
    })

    inpApellido.addEventListener("change", function(){
        if(!inpApellido.value == ""){
            countCaractersMinimos(2,inpApellido,textApellidoError)
        }else{
            textApellidoError.innerHTML ='El campo apellido no puede estar vacio'; 

        }
    })

    inpEmail.addEventListener("change", function(){
        if(!inpEmail.value == ""){
            var expEmail = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}');
            validaEmail(expEmail,inpEmail, textEmailError);
        }else{
            textEmailError.innerHTML ='El campo email no puede estar vacio'; 
        }
    })

    inpDni.addEventListener("change", function(){
        if(!inpDni.value == ""){
            countCaractersMinimos(7,inpDni,textDniError)
            countCaractersMaximos(8,inpDni, textDniError)
        }else{
            textDniError.innerHTML ='El campo DNI no puede estar vacio'; 

        }
    })

    inpContra.addEventListener("change", function(){
        if(!inpContra.value == ""){
            countCaractersMinimos(8,inpContra,textContraseniaError)
        }else{
            textContraseniaError.innerHTML ='El campo Contraseña no puede estar vacio'; 

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
        var valid_extensions = ['jpeg', 'jpg', 'png', 'gif'];
        file_extension = file.split('.').pop();

        return valid_extensions.includes(file_extension);
    }
})
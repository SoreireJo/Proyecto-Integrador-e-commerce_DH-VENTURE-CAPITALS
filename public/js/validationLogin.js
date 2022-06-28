window.addEventListener("load", function(){
    let inpUser = document.querySelector("#user");
    let textUserError = this.document.querySelector("#userError")
    let inpContra = document.querySelector("#password");
    let textContraError = this.document.querySelector("#passwordError")

    inpUser.addEventListener("change", function(){
        console.log(inpUser.value);
        if(inpUser.value == ""){
            textUserError.innerHTML = 'El campo user no puede estar vacio'; 
        }
    })

    inpContra.addEventListener("change", function(){
        console.log(inpContra.value);
        if(inpContra.value == ""){
            textContraError.innerHTML ='El campo contraseña no puede estar vacio'; 
        }
    })

})
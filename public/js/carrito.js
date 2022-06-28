const Item = db.Items;

window.addEventListener("load", function(){
    let btnCarrito = document.querySelector(".users-dropdown-opener")
    btnCarrito.addEventListener("click", function(){
        Item.findAll({
            where:{
                userId: req.session.usuario.id
            }
        }).then((items)=>{
            console.log(items)    
        })
    })
})
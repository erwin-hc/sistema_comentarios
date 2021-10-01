var inputNome = document.getElementById('inputNome');
var inputComen = document.getElementById('inputComen');
var listarDados = document.getElementById('box-lista');
const liList = document.querySelector('.lista');
conta_comentarios();


/// DATA FORMATADA
function timeStamp() {
    var data = new Date();
    var dia     = data.getDate();           // 1-31
    var dia_sem = data.getDay();            // 0-6 (zero=domingo)
    var mes     = data.getMonth();          // 0-11 (zero=janeiro)
    var ano2    = data.getYear();           // 2 dígitos
    var ano4    = data.getFullYear();       // 4 dígitos
    var hora    = data.getHours();          // 0-23
    var min     = data.getMinutes();        // 0-59
    var seg     = data.getSeconds();        // 0-59
    var mseg    = data.getMilliseconds();   // 0-999
    var tz      = data.getTimezoneOffset(); // em minutos
    var str_data = dia + '/' + (mes+1) + '/' + ano4;
    var str_hora = hora + ':' + min + ':' + seg;
    var data_hora = str_hora + ', ' + str_data;
    return(data_hora);
}

// INPUTS VERDES
function OK() {
    inputNome.style.backgroundColor = "#b7e4c7";
    inputComen.style.backgroundColor = "#b7e4c7";
    inputNome.style.border = "2px solid #b7e4c7";
    inputComen.style.border = "2px solid #b7e4c7";
   
    window.setTimeout(function() {
                inputNome.style.backgroundColor = "#cecece";
                inputComen.style.backgroundColor = "#cecece";
                inputNome.style.border = "2px solid #cecece";
                inputComen.style.border = "2px solid #cecece";        
        }, 300);
}

    // SALVAR ON CLICK 
    document.getElementById("btn-salvar").addEventListener('click',function (e){
    e.preventDefault();
    
    if (inputNome.value === ''){
         inputNome.focus();
         inputNome.style.border ="2px solid #C15322";
         window.setTimeout(function() { inputNome.style.border = "2px solid #cecece"; }, 1000);
        return;
    }
    if (inputComen.value === ''){
        inputComen.focus();
        inputComen.style.border ="2px solid #C15322";
        window.setTimeout(function() { inputComen.style.border = "2px solid #cecece"; }, 1000);
       return;
   }
    
    salvar();
    OK();
    conta_comentarios()

    inputNome.focus();

    });

    /// FUNCAO GRAVAR NO FIREBASE    
    function salvar() {
        var nome = document.getElementById("inputNome").value,
            comentario = document.getElementById("inputComen").value,
            data = timeStamp();             
        
            db.collection("comments").add({
            Nome: nome,
            Comentario: comentario,
            Data: data,
            });                
        
        document.getElementById("inputNome").value = '';
        document.getElementById("inputComen").value = '';
    }

    // // LER DADOS
    const renderUser = doc => {
        const ul = `      
        <div class="card-coments" id="cardId">
        <ul style="list-style:none;"  data-id='${doc.id}'></ul>
        <li class="li-nome" style="text-transform: uppercase;">${doc.data().Nome}</li>
        <li class="li-data">${doc.data().Data}</li>
        <li class="li-coment" style="text-transform: Capitalize;">${doc.data().Comentario}</li>
        </div> 
        `;

        liList.insertAdjacentHTML('afterbegin', ul);
    }
    db.collection('comments').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
                if(change.type === 'added') {
                renderUser(change.doc);
                conta_comentarios();
                }
                if(change.type === 'removed') {
                    let ul = document.querySelector(`[data-id='${change.doc.id}']`);
                    let liBody = ul.parentElement;
                    liList.removeChild(liBody);
                    conta_comentarios();
                }
                if(change.type === 'modified') {
                    let ul = document.querySelector(`[data-id='${change.doc.id}']`);
                    let liBody = ul.parentElement;
                    liList.removeChild(liBody);
                    renderUser(change.doc);
                    conta_comentarios();
               }
               
        });
    }); 

    /// SHOW MORE
    document.getElementById("btn-showmore").addEventListener('click',function (e){
    e.preventDefault(); 
    myFunction();
    conta_comentarios()
    });    

    // function myFunction() {
    //     var x = listarDados;
    //     var y = x.getElementsByTagName("div");
    //     var i;
    //     for (i = 0; i < y.length; i++) {
    //         y[i].style.display="block";
    //     }
    //     db.collection('comments').get().then(function(querySnapshot) {      
    //         document.getElementById('count').value = querySnapshot.size;
    //     });
    // }

    function conta_comentarios(){
        let contador = document.getElementById('count');
            db.collection('comments').get().then(function(querySnapshot) {
                    if (querySnapshot.size === 0) {
                        contador.value = '';
                    } else {
                        document.getElementById('count').value = querySnapshot.size;
                    }     
                    
                    });
    }




    // let contador = document.getElementById('count');
    // if (contador.value == 0) { contador.value = 'aaa';  }






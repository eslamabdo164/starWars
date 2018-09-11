//--main Globals const
 const pplUrl = 'https://swapi.co/api/people';
 const rowItem = document.getElementById('rowItem');
  

 function createNodeElement(el){
    return document.createElement(el)
}

function append(parent , element) {
    return parent.appendChild(element);
}
 //--fetch URL

 fetch(pplUrl)
  .then(res => res.json())
  .then(function(data){
     let heros = data.results ; 
     console.log(heros)
     return heros.map(hero => {
         //-- create the Required Nodes
        let name = createNodeElement('p') ,
           height = createNodeElement('p'),
           gender = createNodeElement('p'),
           totalApp = createNodeElement('span'),
           chFilms = createNodeElement('span'),
           info = createNodeElement('div');

        // ========= Adding Character Properties =====   
         name.innerHTML = `${hero.name}`; 
          
        if(hero.gender =="n/a") {   // Fix property Gender : n/a 
            gender.innerHTML = `gender: Not Human`;
        }else{
            gender.innerHTML = `gender : ${hero.gender}`;
        }
        height.innerHTML =  ` Height : ${hero.height} cm`;

        //--  NO of Apprearcnce --- 
        let films = hero.films ;
        totalApp.innerHTML = 'Appreances : '+ films.length ; 

      //--  add character Films Optional  --- 
      /* Promise.all(films.map(film => {
            return fetch(film).then(res => res.json())
        })).then(result => {
            let resultz = result.map(arrEl => {
            return arrEl.title   
            })
          for(var i =0 ; i <resultz.length ; i ++){
                        let spanz = createNodeElement('p'); 
                        spanz.innerText = resultz[i] ; 
                        append (info , spanz) ;
           }
        })
 */
         //--  Get Home land  ---
       let hmWorld = hero.homeworld ;
       fetch(hmWorld).then(res => res.json()).then(json => {
           let town = json.name ;
           townP =  createNodeElement('p'); 
           townP.innerText = `Home World : ${town}` ;
           append(info , townP)
       } ) 


      // ========= styling the Blocks ========
        name.classList.add('name');
        totalApp.classList.add('totalapp')
        info.classList.add('done');

     // ========= Append All    ===============
        append(info,name);
        append(info,height);
        append(info ,gender);
        append(info , totalApp) ; 
        append(rowItem ,info);
     })
 
  })


  //===== Card 
$(function() {
        $('.material-card > .mc-btn-action').click(function () {
            var card = $(this).parent('.material-card');
            var icon = $(this).children('i');
            icon.addClass('fa-spin-fast');

            if (card.hasClass('mc-active')) {
                card.removeClass('mc-active');

                window.setTimeout(function() {
                    icon
                        .removeClass('fa-arrow-left')
                        .removeClass('fa-spin-fast')
                        .addClass('fa-bars');

                }, 800);
            } else {
                card.addClass('mc-active');

                window.setTimeout(function() {
                    icon
                        .removeClass('fa-bars')
                        .removeClass('fa-spin-fast')
                        .addClass('fa-arrow-left');

                }, 800);
            }
        });
    });
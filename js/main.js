 AOS.init();
 
 const elForm = document.querySelector(".form");
 const elSearch = elForm.querySelector(".input-search");
 const elSelect = elForm.querySelector(".input-select");
 const elSort = elForm.querySelector(".input-sort");
 const elList = document.querySelector(".pokemon__list");
 
 // const pokeSlice = pokemons.slice(0 , 10)

 function renderPokimons(item){

    elList.innerHTML = ""

     for (const pokemon of item) {
    
        
        // CreateElement yaratish 
        
        const newItem = document.createElement("li");
        newItem.classList.add("item-js");
        newItem.setAttribute("data-aos" , "fade-up");
        newItem.setAttribute("data-aos-duration" , "2000")
        const newNum = document.createElement("span");
        newNum.classList.add("num-js")
        const newImg = document.createElement("img");
        newImg.classList.add("mx-auto"  , "mb-3")
        newImg.style.width = "130px";
        newImg.style.height = "130px";
        const newDivBadge = document.createElement("div");
        newDivBadge.classList.add("badge-js");
        const newBadge = document.createElement("span");
        newBadge.classList.add("badge" , "text-bg-warning" , "mb-3")
        const newTitle = document.createElement("h3");
        newTitle.classList.add("text-white" , "text-center" , "fs-4" , "mb-4")
        const newText = document.createElement("p");
        newText.classList.add("text-js")
        
        // Domga Pokemonni Chizish
        
        newNum.textContent = pokemon.num;
        newImg.src = pokemon.img;
        newBadge.textContent = pokemon.weight;
        newTitle.textContent = pokemon.name;
        newText.textContent = pokemon.weaknesses.join(" ");
        
        // Pokemonni Append qilish
        
        newDivBadge.appendChild(newBadge)
        newItem.append(newNum , newImg , newDivBadge , newTitle , newText);
        
        elList.appendChild(newItem);
        
    }
 }
 

// Form addEventListener 

elForm.addEventListener("submit" , evt => {
    evt.preventDefault();

    const searchValue = elSearch.value.trim();


    const elRegTitle = new RegExp(searchValue , "gi");

    const searchPokimon = pokemons.filter((element) => element.name.match(elRegTitle));

    if(searchPokimon.length > 0){
        renderPokimons(searchPokimon);
    }else {
        alert("Bunday Ism yuq!!!!!!!!!!!!!")
    }

});

renderPokimons(pokemons)



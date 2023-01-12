 AOS.init();
 
 const elForm = document.querySelector(".form");
 const elSearch = elForm.querySelector(".input-search");
 const elSelect = elForm.querySelector(".input-select");
 const elSort = elForm.querySelector(".input-sort");
 const elList = document.querySelector(".pokemon__list");
 const elTemplate = document.querySelector(".poke-template").content;
 const elFragment = document.createDocumentFragment();
 
 // const pokeSlice = pokemons.slice(0 , 10)
 
 //  Pokemon DOMga render qilish
 
 function renderPokimons(item) {
    
    // elList.textContent = "";
    
    item.forEach(poke => {
        
        const elClone = elTemplate.cloneNode(true);

        elClone.querySelector(".poke-num").textContent = poke.num;
        elClone.querySelector(".poke-img").src = poke.img;
        elClone.querySelector(".poke-img").alt = poke.name
        elClone.querySelector(".poke-badje").textContent = poke.weight;
        elClone.querySelector(".poke-name").textContent = poke.name;
        elClone.querySelector(".poke-text").textContent = poke.weaknesses.join(" ");

        elFragment.appendChild(elClone);

    });

    elList.appendChild(elFragment)
    
}

renderPokimons(pokemons);


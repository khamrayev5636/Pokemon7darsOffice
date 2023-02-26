 AOS.init();
 
 //  Elform start
 const elForm = document.querySelector(".form");
 const elSearch = elForm.querySelector(".input-search");
 const elSelect = elForm.querySelector(".input-select");
 const elInputMin = elForm.querySelector(".input-min");
 const elInputMax = elForm.querySelector(".input-max");
 const elSort = elForm.querySelector(".input-sort");
 
 //  Render List
 const elList = document.querySelector(".pokemon__list");
 
 //  Bookmark
 const elBookmark = document.querySelector(".poke-star");
 const elBookmarkList = document.querySelector(".bookmark__list");
 const elDeleteBookmark = document.querySelector(".delete__bookmark");
 
 
 // const pokeSlice = pokemons.slice(0 , 10)
 
 //  Pokemon DOMga render qilish
 
 function renderPokimons(item , regex = "") {
    
    
    const elTemplate = document.querySelector(".poke-template").content;
    const elFragment = document.createDocumentFragment();
    
    elList.innerHTML = "";
    
    item.forEach(poke => {
        
        const elClone = elTemplate.cloneNode(true);
        
        elClone.querySelector(".poke-num").textContent = poke.num;
        elClone.querySelector(".poke-img").src = poke.img;
        elClone.querySelector(".poke-img").alt = poke.name
        elClone.querySelector(".poke-badje").textContent = poke.weight;
        elClone.querySelector(".poke-count").textContent = `candyCount: ${poke.candy_count}`;
        
        if(regex.source = "(?:)" && regex){
            elClone.querySelector(".poke-name").innerHTML = poke.name.replace(regex , `<mark class="bg-warning rounded">${regex.source.toLowerCase()}</mark>`);
            
        } else {
            
            elClone.querySelector(".poke-name").textContent = poke.name;
        }
        elClone.querySelector(".poke-text").textContent = poke.weaknesses.join(" ");
        elClone.querySelector(".poke-star").dataset.id = poke.id;
        
        elFragment.appendChild(elClone);
        
    });
    
    elList.appendChild(elFragment)
}

// Categoriya Pokemon start

const ganreNewArr = [];

function categoriaPokemon(poke){
    
    poke.forEach(item => {
        item.weaknesses.forEach(list => {
            if(!ganreNewArr.includes(list)){
                ganreNewArr.push(list)
                // console.log(ganreNewArr);
            }
            
            ganreNewArr.sort()
        })
    })
    
};

// function Option start

function optionPokemon(item){
    
    const newOptionFragment = document.createDocumentFragment();
    
    item.forEach(option => {
        
        const newOption = document.createElement("option");
        
        newOption.value = option;
        newOption.textContent = option;
        
        newOptionFragment.appendChild(newOption)
        
    });
    
    elSelect.appendChild(newOptionFragment)
    
}

categoriaPokemon(pokemons);
optionPokemon(ganreNewArr);


// A-Z,Z-A,From thin to fat,From fat to thin, function sort

function renderSort(pokeSort , value){
    
    // Sort A-Z
    
    if(value === "a-z"){
        pokeSort.sort((a , b) =>{
            if(a.name > b.name){
                return 1
            }else if(a.name < b.name){
                return -1
            }else {
                return 0
            }
        })
    }
    
    // Sort Z-A
    
    if(value === "z-a"){
        pokeSort.sort((a , b) =>{
            if(a.name > b.name){
                return -1
            }else if(a.name < b.name){
                return 1
            }else {
                return 0
            }
        })
    }
    
    // Sort From thin to fat
    
    if(value === "thin"){
        pokeSort.sort((a , b) => parseFloat(a.weight) - parseFloat(b.weight))
    }
    
    // Sort From fat to thin
    
    if(value === "weight"){
        pokeSort.sort((a , b) => parseFloat(b.weight) - parseFloat(a.weight))
    }
    
}

// Bookmark start

const newBookmarkArr = [];



elList.addEventListener("click" , (evt)=> {
    
    if(evt.target.matches(".poke-star")){
        
        const elbook = evt.target.dataset.id;
        const findBookmark = pokemons.find(element => element.id == elbook);
        
        if(!newBookmarkArr.includes(findBookmark)){

            newBookmarkArr.push(findBookmark);
            renderBookmark(newBookmarkArr , elBookmarkList) 
        }
    }
    
    
});

elBookmarkList.addEventListener("click" , evt =>{
    
    if(evt.target.matches(".delete__bookmark")) {
        
        const deleteBookmark = evt.target.dataset.bookmarkId;
        
        const deleteFind = newBookmarkArr.findIndex(item => item.id == deleteBookmark);
        
        newBookmarkArr.splice(deleteFind , 1);
        
        renderBookmark(newBookmarkArr , elBookmarkList)
    }
})


function renderBookmark (arr , node){
    
    elBookmarkList.innerHTML = ""
    
    const elTemplate = document.querySelector(".poke-template").content;
    const elFragment = document.createDocumentFragment();
    
    
    arr.forEach(poke => {
        const elClone = elTemplate.cloneNode(true);
        
        elClone.querySelector(".poke-num").textContent = poke.num;
        elClone.querySelector(".poke-img").src = poke.img;
        elClone.querySelector(".poke-img").alt = poke.name
        elClone.querySelector(".poke-name").textContent = poke.name;
        elClone.querySelector(".poke-badje").textContent = poke.weight;
        elClone.querySelector(".poke-count").classList.add("d-none")
        elClone.querySelector(".poke-name").textContent = poke.name;
        elClone.querySelector(".poke-text").classList.add("d-none");
        elClone.querySelector(".poke-star").classList.add("d-none");
        elClone.querySelector(".delete__bookmark").dataset.bookmarkId = poke.id;
        elClone.querySelector(".delete__bookmark").classList.remove("visually-hidden");
        
        elFragment.appendChild(elClone);
        
    });
    
    node.appendChild(elFragment)   
};



// Bookmark end



// Elform start 

elForm.addEventListener("submit" , (evt)=> {
    evt.preventDefault();
    
    const inputSearch = elSearch.value.trim();
    const inputSelect = elSelect.value.trim();
    const inputSort = elSort.value.trim();
    
    const newRegex = new RegExp(inputSearch , "gi");
    
    const fullFilter = pokemons.filter(element => element.name.match(newRegex) && (inputSelect === "all" || element.weaknesses.includes(inputSelect)) && ((elInputMin.value == "" || element.candy_count >= Number(elInputMin.value)) && (elInputMax.value == "" || element.candy_count <= Number(elInputMax.value))));
    
    if(fullFilter.length > 0){
        renderSort(fullFilter,inputSort)
        renderPokimons(fullFilter , newRegex);
    }else {
        elList.textContent = "Not Found 404"
    }
    
})

renderPokimons(pokemons);


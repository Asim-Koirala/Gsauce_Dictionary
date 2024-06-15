let searchBar = document.querySelector('#search'),
searchIcon = document.querySelector('.fa-magnifying-glass'),
crossIcon = document.querySelector('.fa-xmark'),
info = document.querySelector('.info'),
Meaningspan = info.querySelector('ul li:nth-child(2) span'),
wordh3 = info.querySelector('ul li:first-child h3'),
wordPronounciation = info.querySelector('ul li:first-child span'),
exampleSpan = info.querySelector('ul li:nth-child(3) span'),
synonymsList = info.querySelector('ul li:last-child .li'),
infoSPAN = document.querySelector('.wrapper > span'), 
synonymsExist = false;

crossIcon.onclick = ()=>{
    searchBar.value = '';
    info.classList.remove('active');
    infoSPAN.style.display = 'block';
    infoSPAN.innerHTML = 'Search a word and get its meaning, example, pronounciation and synonyms.'
    infoSPAN.style.color = 'rgb(131, 131, 131)'
}


function data(information, word){
    let noDefnFound = information.title
    if(noDefnFound === 'No Definitions Found'){
        infoSPAN.style.display = 'block';
        infoSPAN.innerHTML = `Sorry, We could not find your searched word.`
    }
    infoSPAN.style.display = 'none';
    let searchWord = information[0].word,
    definition = information[0].meanings[0].definitions[0].definition,
    example = information[0].meanings[0].definitions[0].example,
    synonyms = [],
    partOfSpeech = information[0].meanings[0].partOfSpeech,
    pronounciation = information[0].phonetic;

    console.log(information[0])
    for(var i = 0; i<5; i++){
        if(information[0].meanings[0].synonyms[i] !== undefined){
            synonyms.push(information[0].meanings[0].synonyms[i]);
        }else{
            synonyms.push('');
        }
        
    }

    Meaningspan.textContent = definition;
    wordPronounciation.textContent = `${partOfSpeech}/${pronounciation}`;
    wordh3.textContent = searchWord;
    Meaningspan.textContent = definition;
    exampleSpan.textContent = example;
    synonymsList.innerHTML = '';
    for(var i = 0; i<5; i++){
        if(synonyms[i] != ''){
            synonymsExist = true;
            synonymsList.innerHTML+= `<span onclick="search(this)">${synonyms[i]}</span>`
        }else{
            if(!synonymsExist){
                synonymsList.innerHTML = `<span>Sorry, no synonyms found.</span>`
            }
        }
        
    }
    info.classList.add('active');
}

function fetchData(word){
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url).then(res=>res.json()).then(info =>{
        data(info, word);
    } );
}

searchBar.addEventListener('keyup', (e)=>{
    
    if(e.key == 'Enter' && searchBar.value != 0){
        info.classList.remove('active');
        let word = searchBar.value;
        infoSPAN.style.display = 'block';
        infoSPAN.style.color = '#000';
        infoSPAN.textContent = `Searching for ${searchBar.value}...`
        fetchData(word);
    }
})
searchIcon.onclick = ()=>{
    info.classList.remove('active');
    
        let word = searchBar.value;
        infoSPAN.style.display = 'block';
        infoSPAN.style.color = '#000';
        infoSPAN.textContent = `Searching for ${searchBar.value}...`
        fetchData(word);
}
function search(e){
    let synonymWord = e.textContent;
    searchBar.value = synonymWord;
    searchIcon.click();
}
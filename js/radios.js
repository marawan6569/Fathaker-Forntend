
// start render radios //
const radiosContainer = document.getElementById("radios-container");
let radios = [
    {name: "ياسر الدوسري", src: "https://Qurango.net/radio/yasser_aldosari", img:"img/img_1.png", tags: ["حفص عن عاصم", "تجويد"]},
    {name: "هاني الرفاعي", src: "https://qurango.net/radio/hani_arrifai", img:"img/img_2.png", tags: ["حفص عن عاصم", "تجويد"]},
    {name: "نبيل الرفاعي", src: "https://qurango.net/radio/nabil_al_rifay", img:"img/img_3.png", tags: ["حفص عن عاصم", "تجويد"]},
    {name: "ناصر القطامي", src: "https://qurango.net/radio/nasser_alqatami", img:"img/img_5.png", tags: ["حفص عن عاصم", "تجويد"]},
]

function tag(tag){ return `<li class="tag">${tag}</li>` }

function renderTags(tags) {
    return `${tags.map( tag => { return `<li class="tag">${tag}</li>` }).join(" ")}`
}

function renderRadio(radio) {

    return `
           <div class="col-12 p-3 my-2 radio-card">
        
                <div class="radio-info">
                    <img class="radio-img" src="${radio.img}" alt="radio image">
                    <div class="info mx-3">
                        <p class="name">${radio.name}</p>
                        <ul class="tags">
                            ${renderTags(radio.tags)}
                        </ul>
                    </div>
                </div>
        
                <div class="play-btn play" data-src="${radio.src}"></div>
           </div>

    `

}

function renderRadiosList(radiosList) {
    return radiosList.map(renderRadio).join("\n")
}

radiosContainer.innerHTML = renderRadiosList(radios)

// end render radios //


// start audio controls //
const audio = new Audio();
let playButtons = document.querySelectorAll('.play-btn');
let isPlaying = false;
let activeCard = document.querySelector('.radio-card.active') || document.createElement('div');


function playAudio() {
    audio.play();
    isPlaying = true;
}

function pauseAudio() {
    audio.pause();
    isPlaying = false;
}

function togglePlay() {
    isPlaying ? pauseAudio() : playAudio();
}

function setAudioSource(src) {
    audio.src = src
}

function setTopToParentOffset(element) {
    // Get the parent element
    const parent = element.parentElement.parentElement;
    element.style.width = parent.offsetWidth + 'px';

    // Get the parent's y-offset
    const parentY = parent.getBoundingClientRect().y;

    if (parentY < 0)
    {
        element.style.top = window.scrollY + 'px';
    }
    else
    {
        element.style.top = parentY + 'px';

        const emptyDiv = document.createElement('div');
        if (!parent.firstElementChild.classList.contains("emptyDiv") )
        {
            emptyDiv.style.height = activeCard.offsetHeight + 14 + 'px';
            emptyDiv.classList.add('emptyDiv')
            parent.insertBefore(emptyDiv, parent.firstChild);
        }
    }
}


window.addEventListener('scroll', () => setTopToParentOffset(activeCard));

playButtons.forEach(btn => {
    btn.addEventListener('click', ev => {
        if (btn.classList.contains('play')){
            playButtons.forEach(btn => {btn.classList.remove('pause'); btn.classList.add('play');})
            ev.target.classList.remove('play')
            ev.target.classList.add('pause')

            activeCard.classList.remove('active')
            ev.target.parentElement.classList.add('active')
            activeCard = document.querySelector('.radio-card.active');
            setTopToParentOffset(activeCard)
        } else{
            playButtons.forEach(btn => {btn.classList.remove('pause'); btn.classList.add('play');})
            ev.target.classList.remove('pause')
            ev.target.classList.add('play')
        }

        if (audio.src.toLowerCase() === btn.dataset.src.toLowerCase()){
            togglePlay()
        } else {
            setAudioSource(btn.dataset.src)
            playAudio()
        }
    })
})

// end audio controls //

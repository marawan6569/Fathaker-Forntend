
const audio = new Audio();
const footer = document.querySelector('footer');
const playButtons = document.querySelectorAll('.play-btn');
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
let game = {
    
    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id) [0];
        console.log(card)
        if (card.flipped || this.lockMode){
            return false;
        }
        if(!this.firstCard){
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver(){
       return this.cards.filter(card => !card.flipped).length == 0;

    },

    
    animes : ['BYAKUYA',
    'EDWARD',
    'ERZA',
    'HINATA',
    'HISOKA',
    'KIRA',
    'SAO',
    'SIMBAD',
    'VEGETA',
    'ZORO'],

    cards: null,
     

    createCardFromAnimes: function (){
        this.cards = []
        this.animes.forEach((anime) =>{
            this.cards.push(this.createPairFromAnimes(anime));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards


    },

    createPairFromAnimes: function(anime){
        return [{
            id: this.createIdWithAnimes(anime),
            icon: anime,
            flipped: false
        },{
            id: this.createIdWithAnimes(anime),
            icon: anime,
            flipped: false
        }]
    
    },

    createIdWithAnimes: function(anime){
        return anime + parseInt(Math.random()*1000)
    },

    

    shuffleCards: function(cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
window.onload = function () {
    var duration = 60 * 120; // Converter para segundos
        display = document.querySelector('#timer'); // selecionando o timer
    startTimer(duration, display); // iniciando o timer
};
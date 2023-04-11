function* generater(questions) {
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        yield question

    }

}

class Game {
    questionText = document.getElementById('question')
    answers = document.getElementsByClassName('patasxan')
    time = 0
    money = 0
    untouchMoney1 = 8000
    untouchMoney2 = 64000
    currentQuestion
    correctAnswer
    fin = document.getElementById('finish')
    finDiv = document.createElement('div');



    constructor(playername) {
        this.playername = playername
        this.audioSpasel = document.getElementById('audioSpasel')
        this.halfElem = document.getElementById('half')
        this.callElem = document.getElementById('call')
        this.playElem = document.getElementById('play')
        this.hallElem = document.getElementById('hall')



        const quest = [
            new Question("հարց ֊1 ո՞ր թվականին է քրիստոնեությունը ընդունվել որպես պետական կրոն", (new Answer(["301", "401", "411", "311"], 0, 1000))),
            new Question("հարց ֊2 ո՞վ է ստեղծել հայոց այբուբենը ", new Answer(["Կոմիտաս", "Այվազովսկի", "Մեսրոպ Մաշտոց", "Չարենց"], 2, 2000)),
            new Question("հարց ֊3 ո՞վ է գրել «Սասունցի Դավիթ»պոեմը", new Answer(["Եղիշե Չարենց", "Պարույր Սևակ", "Եզնիկ Կողբացի ", "Հ․ Թումանյան"], 3, 3000)),
            new Question("հարց ֊4 քանի մոլորակ կա արեգակնային համակարգում", new Answer(["5", "9", "8", "10"], 1, 5000)),
            new Question("հարց ֊5 որնէ հայաստանի մայրաքաղաքը", new Answer(["գյումրի", "սպիտակ", "երևան", "էրեբունի"], 2, 8000)),
            new Question("հարց ֊6 Բացի թվային ինդեքսից, ինչպիսի՞ անվանում ունի Android օպերացիոն համակարգի յուրաքանչյուր տարբերակը ", new Answer(["ծովային", "հնդկացիական", "գարնանային", "քաղցր"], 3, 16000)),
            new Question("հարց ֊7 100 տարուն այլ կերպ ասում են", new Answer(["դար", "ամյակ", "հարյուրյակ", "ակ"], 0, 32000)),
            new Question("հարց ֊8 Ի՞նչ մակնիշի ավտոմեքենա էր շահել Գառնիկը «Խոշոր շահում» ֆիլմում․", new Answer(["վոլգա", "երազ", "մեսկվիչ", "զոպորոժեց"], 3, 64000)),
            new Question("հարց ֊9 Մեկ օրվա ընթացքում քան՞ի լրիվ պտույտ է կատարում ժամացույցի ժամը ցույց տվող սլաքը․", new Answer(["1", "2", "24", "12"], 1, 125000)),
            new Question("հարց ֊10 Ու՞մ արձանն է դրված Մեսրոպ Մաշտոցի արձանի առջև՝ Մատենադարանի դիմաց․", new Answer(["իր", "կորյունի", "մովսես խորենացու", "եղիշեի"], 1, 250000)),
            new Question("հարց ֊11 Ըստ ժողովրդական ասացվածքի Խելոքին մինն ասա, անխելքին ․․․։", new Answer(["անընդհատ", "մի ասա", "հազար ու մի", "երկուսն"], 2, 500000)),
            new Question("հարց ֊12 Ըստ ավանդազրույցի, ո՞ր լեռան վրա էին ապրում հունական աստվածները", new Answer(["օլիմպոս", "պառնաս", "կազբեկ", "ջոմոլունգմա"], 0, 1000000)),

        ]
        this.questions = generater(quest)
        this.handListener()

    }

    handListener() {
        this.playElem.addEventListener('click', () => {
            this.start()
            this.playElem.style.display = 'none'

        })

        this.hallElem.addEventListener('click', () => {
            let cor = this.currentQuestion.value.answer.options[this.currentQuestion.value.answer.current]

            Help.hall(cor)
            this.hallElem.style.display = 'none'

        })



        for (const item of this.answers) {
            item.addEventListener('click', () => {
                this.checkAnswer(item.innerHTML)
            })
        }
        this.halfElem.addEventListener('click', () => {
            let half = Help.half(this.currentQuestion.value.answer)
            for (const item of this.answers) {
                if (half.indexOf(item.innerHTML) === -1) {
                    item.innerHTML = ""
                }
            }
            this.halfElem.style.display = 'none'

        })
        this.callElem.addEventListener('click', () => {
            Help.call(this.currentQuestion.value.answer)
            this.callElem.style.display = 'none'

        })
        this.fin.addEventListener('click', () => {
            this.finish()
        })

    }

    checkAnswer(answer) {
        let correct = document.getElementById(`${this.currentQuestion.value.answer.current}`)
        if (answer === this.correctAnswer) {
            setTimeout(() => {
                let audioRaight = document.getElementById('audioRight')
                audioRaight.autoplay = true
                audioRaight.load()
                correct.classList.add('correctStyle')
                this.makeMoney()

            }, 3000);

            setTimeout(() => {
                correct.classList.remove('correctStyle')
                this.nextQuestion()
            }, 6000);

        } else {
            setTimeout(() => {
                this.gameOver()
                let audioLose = document.getElementById('audioLose')
                audioLose.autoplay = true
                audioLose.load()
            }, 3000);
        }
    }
    makeMoney() {
        this.money = this.currentQuestion.value.answer.point
        let gumar = document.getElementById('gumar')
        gumar.innerHTML = this.money
    }
    finish() {
        let d = document.getElementById('xaxiDiv')
        d.remove()
        let finMony = this.money
        this.finDiv.classList.add('finStyle')
        document.body.append(this.finDiv);
        this.money = finMony
        let div1 = document.createElement('div');
        div1.innerHTML = `ԴՈՒՔ ՆԱԽԸՆՏՐԵՑԻՔ ՎԵՐՑՆԵԼ ${this.money} ԴՐԱՄ`
        div1.className = "finStyle2";
        document.body.append(div1);

    }

    gameOver() {
        let d = document.getElementById('xaxiDiv')
        d.remove()
        this.finDiv.className = "finStyle";
        document.body.append(this.finDiv);
        if (this.money >= this.untouchMoney1 && this.money <= this.untouchMoney2) {
            this.money = this.untouchMoney1
            this.finDiv.innerHTML = `ԴՈՒՔ ՊԱՐՏՎԵՑԻՔ ԲԱՅՑ ՈՒՆԵՔ ԱՆՁԵՌՆՄԽԵԼԻ ԳՈՒՄԱՐ ${this.money} ԴՐԱՄ`

        } else if (this.money >= this.untouchMoney2) {
            this.money = this.untouchMoney2
            this.finDiv.innerHTML = `ԴՈՒՔ ՊԱՐՏՎԵՑԻՔ ԲԱՅՑ ՈՒՆԵՔ ԱՆՁԵՌՆՄԽԵԼԻ ԳՈՒՄԱՐ ${this.money} ԴՐԱՄ`
        } else {
            this.money = 0
            this.finDiv.innerHTML = `ԴՈՒՔ ՊԱՐՏՎԵՑԻՔ`
        }


    }


    start() {
        this.nextQuestion()

    }
    nextQuestion() {

        this.currentQuestion = this.questions.next()
        this.questionText.innerHTML = this.currentQuestion.value.question
        for (let i = 0; i < 4; i++) {
            this.answers[i].innerHTML = this.currentQuestion.value.answer.options[i]

        }
        this.correctAnswer = this.currentQuestion.value.answer.options[this.currentQuestion.value.answer.current]

        this.audioSpasel.autoplay = true
        this.audioSpasel.load()
        this.timeer()


    }
    timeer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        let time = 60
        let t = document.getElementById('time')
        this.interval = setInterval(() => {
            time -= 1
            t.innerHTML = time
        }, 1000);
        if (time === 0) {
            this.gameOver()
        }


    }


}


class Question {
    constructor(question, answer) {
        this.question = question
        this.answer = answer

    }
}
class Answer {
    options = []
    current
    point
    constructor(options, current, point) {
        this.options = options
        this.current = current
        this.point = point

    }
}
class Help {
    static half(answer) {
        let result = []
        result.push(answer.options[answer.current])
        answer.options.splice(answer.current)
        let randIndex = Math.floor(Math.random() * answer.options.length)
        result.push(answer.options[randIndex])

        return result
    }

    static call(answer) {
        let zang = document.createElement('div')
        zang.classList.add('callDiv')
        zang.innerHTML = '...'
        let question = document.getElementById('question')
        setTimeout(() => {
            zang.innerHTML = `բարեվ ախպերս միլիոնատեր խաղին եմ մասնակցում
             կարող ես պատասխանել այս հարցին
              <<${this.questionText}>>`
        }, 3000);
        setTimeout(() => {
            zang.innerHTML = `հարցն հետևյալն է՝
              <<${question.innerHTML}>>`
        }, 6000);
        setTimeout(() => {
            zang.innerHTML = `ախպերս ինչ միլիոնատեր խաղ էլ չզանգես ես համարին`
        }, 9000);
        setTimeout(() => {
            zang.classList.remove('callDiv')
            zang.html = ''
        }, 12000);


        let div = document.getElementById('div')
        div.append(zang)


    }

    static hall(correct) {
        let y = 20
        let p = document.createElement('p')

        let hallTable = document.createElement('div')
        hallTable.classList.add('hallDiv')
        for (let i = 1; i < 5; i++) {
            p.innerHTML = `${y}`
            hallTable.append(p)
            y += 20

            if (y === 80) {
                y = `80%---${correct}`
            }
        }
        setTimeout(() => {
            hallTable.classList.remove('hallDiv')
            hallTable.html = ''
        }, 3000);


        let div = document.getElementById('div')
        div.append(hallTable)



    }
}

let milionater = new Game("Melo")
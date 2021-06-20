/* const refs = {
    // timerEl: document.querySelector('#timer-1'),
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
} */

class CountdownTimer {
    constructor({onTick}) {
        this.intervalId = null;
        this.onTick = onTick;
        this.targetDate = targetDate;
    }

    start() { 
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const time = this.targetDate - currentTime;
            const { days, hours, mins, secs } = getTimeComponents(time);
            
            this.onTick(time);
        }, 1000);
    }

    /* Для подсчета значений используй следующие готовые формулы, где time - разница между targetDate и текущей датой. */
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
        return { days, hours, mins, secs };
    }

    /* Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков */
    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const countdownTimer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
    onTick: updateClockFace(),
});

function updateClockFace({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
}

countdownTimer.start();

/* Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы) */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/* Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды) */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/* Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды) */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/* Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000) */
// const secs = Math.floor((time % (1000 * 60)) / 1000);
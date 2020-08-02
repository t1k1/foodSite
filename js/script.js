//функция открытия окон
//функция закрытия окон

window.addEventListener('DOMContentLoaded', () =>{
    //Tabs
    //=====================================================================================

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent(){
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) =>{
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer
    //=====================================================================================
    const deadline = '2020-08-02';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()), //разница между датами в количестве милисекунд
              days = Math.floor( (t/(1000*60*60*24)) ),
              seconds = Math.floor( (t/1000) % 60 ),
              minutes = Math.floor( (t/1000/60) % 60 ),
              hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'toral': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime){

        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if(t.total <= 0 ){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal
    //=====================================================================================
    
    const modal = document.querySelector('.modal'),
          modalTrigger = document.querySelectorAll('[data-modal]'),
          modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn =>{
        btn.addEventListener('click', () =>{
        modal.classList.toggle('show');
            document.body.style.overflow = 'hidden';
        });
    });

    
    function closeModal(){
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }
    
    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) =>{
        if (event.target === modal){
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) =>{
        if(event.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

});
//CLOCK
//wall-Clock
const deg = 6;
const hr = document.getElementById("hr")
const mns = document.getElementById("mns")
const sec = document.getElementById("sec")

setInterval(()=>{
    const day = new Date();
    let hh = day.getHours()*30 // 360deg/12hours
    let mm = day.getMinutes()*deg  //360deg/60mins
    let ss = day.getSeconds()*deg  //360deg/60sec
    hr.style.transform = `rotateZ(${(hh)+(mm/12)}deg)`;
    mns.style.transform = `rotateZ(${mm}deg)`;
    sec.style.transform = `rotateZ(${ss}deg)`;
},1000)


//Number-Clock
let is24Hour = false;  //Default is 12-hour clock
function Clock(){
    const CurrentTime = new Date();
    let Hours = CurrentTime.getHours();
    const Minutes = CurrentTime.getMinutes();
    const Seconds = CurrentTime.getSeconds();

    const nowHours = document.getElementById('span1');
    const nowMinutes = document.getElementById('span2');
    const nowSeconds = document.getElementById('span3');
    let nowPeriod = document.getElementById('period')

    nowHours.style.fontSize = '74px';
    nowMinutes.style.fontSize = '74px';
    nowSeconds.style.fontSize = '74px';
    nowPeriod.style.fontSize = '32px'

    if(is24Hour){
        nowHours.innerHTML = String(Hours).padStart(2,'0');
        nowMinutes.innerHTML = String(Minutes).padStart(2,'0');
        nowSeconds.innerHTML = String(Seconds).padStart(2,'0');
        nowPeriod.innerHTML = ''
    }
    else{
       const  Periods = Hours >= 12 ? 'PM' : 'AM';
        Hours = Hours % 12 || 12;
        nowHours.innerHTML = Hours
        nowMinutes.innerHTML = String(Minutes).padStart(2,'0');
        nowSeconds.innerHTML = String(Seconds).padStart(2,'0');
        nowPeriod.innerHTML = Periods;
    }
}
   let button = document.getElementById('change24H')
        button.addEventListener('click',()=>{
        is24Hour = !is24Hour; // Toggle formet 
                                          //!is24Hour : used for click button change before expression true,false
        button.innerHTML = is24Hour ? '12-Hours' : '24-Hours'
    })

Clock()
setInterval(Clock, 1000);

//STOPWATCH
let time = 0;
let timer = null;
let running = false;

let timeDisplay = document.getElementById("runTimer");
let starts = document.getElementById('start');
let laps = document.getElementById('lap');
let stops = document.getElementById('stop');
let resets = document.getElementById('reset');
let resumes = document.getElementById('resume')

function buttonsStyle({Start,Stop,Reset,Resume,Lap}){
        //pass parameters in object formet, parameter
        //parameter represent booliean datas 
    starts.style.display = Start ? 'block' : 'none';
    stops.style.display = Stop ? 'block' : 'none';
    resets.style.display = Reset ? 'block' : 'none';
    resumes.style.display = Resume ? 'block' : 'none';
    laps.style.display = Lap ? 'block' : 'none';
}

// timeDisplay.style.fontSize = '20px'

function stopWatch(times){
    const S_totalSec = Math.floor(times/100);  //increse seconds

    const S_hours = String(Math.floor(S_totalSec / 3600)).padStart(2, "0");  //1hours = 3600 sec
   
    const S_mins = String(Math.floor((S_totalSec % 3600) / 60)).padStart(2, "0"); //secs/60 = 0 reace 60sec add 1mins

    const S_sec = String(S_totalSec % 60).padStart(2,'0'); //add secs
    
    const S_millSec = String(times % 100).padStart(2, "0"); //add milliseconds, times is running every 10milliseconds 

    return `${S_hours}:${S_mins}:${S_sec}:${S_millSec}`
}
starts.addEventListener('click',()=>{
    if(!running){
        running = true
        timer = setInterval(()=>{
            time++;
            timeDisplay.textContent = stopWatch(time);
        },10); //run every 10 millisecond
        buttonsStyle({Start:false, Stop:true, Lap:true, Resume:false, Reset:false});
    }
});
stops.addEventListener('click',()=>{
    if(running){
        running = false;
        clearInterval(timer);
    };
    buttonsStyle({ Stop:false, Lap:false, Resume:true, Reset:true, Start:false});
});
resets.addEventListener('click',()=>{
    if(!running){
        // running = true;
        lapTimes = []; // Clear the lap times array
        timeLapMain.style.display = 'none';

        // Clear the lap table body
         const LapTimeBody = document.querySelector('tbody');

          //The while (LapTimeBody.firstChild) loop iterates over and removes all child rows from the table body.
         while (LapTimeBody.firstChild) {
            LapTimeBody.removeChild(LapTimeBody.firstChild);
        };

        clearInterval(timer);
        time = 0;
        timeDisplay.textContent = stopWatch(time)

    }
    buttonsStyle({Start:true, Stop:false, Lap:false, Resume:false, Reset:false});
});
resumes.addEventListener('click',()=>{
    if(!running){
        running = true
        timer = setInterval(()=>{
            time++;
            timeDisplay.textContent = stopWatch(time);
        },10); //run every 10 millisecond
        buttonsStyle({Start:false, Stop:true, Lap:true, Resume:false, Reset:false});
    }
});

let lapTimes = []; //for store time laps in array.array used for take their length using lap counts
const timeLapMain = document.getElementById('timeLap-main') 
laps.addEventListener("click", () => {
    
    timeLapMain.style.display = 'block'

    if (running) {
            timeLapMain.style.display = 'flex'; //for table  visible only click lap button

        const currentLap = time;
        const previousLap = lapTimes.length > 0 ? lapTimes[lapTimes.length - 1] : 0;
        const balanceLapTime = currentLap - previousLap;
        lapTimes.push(currentLap) //store the currentLap value

        const LapTimeBody = document.querySelector('tbody');
        LapTimeBody.style.overFlow = 'scroll';

        const bodyRow = document.createElement('tr'); //create a new row
        
        
          
            let td1 = document.createElement('td');
            td1.textContent = lapTimes.length;
            // td1.style.color = 'black';

            let td2 = document.createElement('td');
            td2.textContent = `${stopWatch(balanceLapTime)}`;
            td2.style.fontSize = '12px';

            let td3 = document.createElement('td');
            td3.textContent = `${stopWatch(currentLap)}`;
            // td3.style.color = 'black';
            td3.style.fontSize = '16px';
            td3.style.fontWeight = '1000';

            bodyRow.appendChild(td1);
            bodyRow.appendChild(td2);
            bodyRow.appendChild(td3);

            LapTimeBody.appendChild(bodyRow);

    }
   
});
    //Dark mode , Light mode
function applyTimeBasedTheme() {
    const bgHour = new Date().getHours();

    // const t_Time =`${bgHour}:${bgMins}`

    const theme = (bgHour >= 18  || bgHour < 5 ) ? 'dark' : 'light'; // Dark mode from 6 PM to 5 AM

    document.documentElement.setAttribute('data-theme', theme); //documentElement : is refer html element,(dark-theme : is attribute name , theme : is their value)
  }
//   console.log('CSS Background Variable:', getComputedStyle(document.documentElement).getPropertyValue('--background'));

  // Apply the theme on load
  applyTimeBasedTheme();

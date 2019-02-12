
function Timer(timerIndex, startingSeconds, element) {
   this.timerIndex = timerIndex;
   this.remaining = startingSeconds;
   this._isActive = true;
   this.eleTimerText = element.getElementsByClassName("timerText")[0];
   element.getElementsByClassName("icon")[0].getElementsByTagName("p")[0].innerText = timerIndex + 1;

   this.tick = function () {
      if (this._isActive) {
         this.remaining -= 1;
         
         if (this.remaining <= 0) {
            _isActive = false;
            this.remaining = 0;
            this.complete();
         }

         var secondsRemaining = this.remaining % 60;
         var minutesRemaining = (this.remaining - secondsRemaining) / 60;

         var secStr = padLeft(secondsRemaining.toString(), "0", 2);
         var minuteStr = padLeft(minutesRemaining.toString(), "0", 2);
         
         console.log(this.remaining);
         this.eleTimerText.getElementsByTagName("p")[0].innerText = minuteStr + ":" + secStr;
      }
   }

   this.complete = function () {
      this.eleTimerText.classList.add("timerExpired");
   }
}

function padLeft(str, padStr, len) {   
   var newStr = str;
   while (newStr.length < len) {
      newStr = padStr + newStr;
   }
   return newStr;
}

var timerObjs = [];
var newTimerRowTemplate = document.getElementById("timerRowTemplate");
var timerRowParent = document.getElementById("timerRowParent");

function tick()
{
   console.log("tick");

   for (var i = 0, len = timerObjs.length; i < len; i++) {
      var timerObj = timerObjs[i];
      timerObj.tick();
   }
}

function setUpAddTimerBtn() {
   eleAddTimerBtn = document.getElementById("addTimerBtn");
   eleAddTimerBtn.addEventListener('click', function (event) {
      var newRowEle = newTimerRowTemplate.cloneNode(true);
      timerIndex = timerObjs.length;
      timerRowParent.appendChild(newRowEle);
      timerObjs.push(new Timer(timerIndex, 90, newRowEle));      

      newRowEle.getElementsByClassName("btn-delete")[0].addEventListener("click", function (event) {
         newRowEle.parentElement.removeChild(newRowEle);
      });

      timerIndex++;
   });
}

function start()
{
   // Set up the add timer button event
   setUpAddTimerBtn();

   // Remove the template node from the DOM
   newTimerRowTemplate.parentNode.removeChild(newTimerRowTemplate);

   // Tick each second
   setInterval(tick, 1000);
}

start();

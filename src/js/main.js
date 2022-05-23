const openAlert = document.querySelector("#openAlertBtn");
const alertWindow = document.querySelector("#alertWindow");
const clickCountDisplay = document.querySelector("#clickCount");
const resetBtn = document.querySelector("#resetCountBtn");
const closeBtn = document.querySelector("#closeButton");

openAlert.onclick =() =>{
    alertWindow.style.display = "block";
    if(localStorage.hasOwnProperty("clickCount")){
        localStorage.clickCount = Number(localStorage.clickCount)+1;
        if(localStorage.clickCount >= 5){
            resetBtn.style.display = "block"; 
        }
    }else{
        localStorage.clickCount = 1;
    }
    refreshDisplay();
};
closeBtn.onclick =()=>{closeAlert()};
window.onclick = (event)=>{if(event.target == alertWindow)closeAlert()};
resetBtn.onclick =()=>{
    localStorage.removeItem("clickCount");
    resetBtn.style.display = "none";
    refreshDisplay();
}
function refreshDisplay(){
    if(localStorage.hasOwnProperty("clickCount")){
        clickCountDisplay.innerHTML = localStorage.clickCount;
    }else{
        clickCountDisplay.innerHTML = 0;
    }
}
function closeAlert(){
    alertWindow.style.display = "none";
}

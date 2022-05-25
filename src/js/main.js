const openAlert = document.querySelector("#openAlertBtn");
const alertWindow = document.querySelector("#alertWindow");
const clickCountDisplay = document.querySelector("#clickCount");
const resetBtn = document.querySelector("#resetCountBtn");
const closeBtn = document.querySelector("#closeButton");
const table = document.querySelector("#table");
const tableData = document.querySelector("#tableData");
const loadBar = document.querySelector("#loadBar");
const alertContent = document.querySelector("#alertContent");

const importDataURL = "https://jsonplaceholder.typicode.com/users";

const closeAlert=()=>{
    alertWindow.style.display = "none";
}
const refreshDisplay=()=>{
    if(localStorage.hasOwnProperty("clickCount")){
        clickCountDisplay.innerHTML = localStorage.clickCount;
    }else{
        clickCountDisplay.innerHTML = 0;
    }
}



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
const fetchData = async () =>{
    try {
        const response = await fetch(importDataURL);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data;
      }
      catch(error) {
        console.error(`Could not get data: ${error}`);
      }
};
const fillTableWithContent = async () =>{
    let errored=false;
    try{
        loadBar.style.display = "block";
       const data = await fetchData();
       data.forEach(user => {
           let row = document.createElement('tr');

           let name = document.createElement('td');
           let email = document.createElement('td');
           let address = document.createElement('td');
           let phone = document.createElement('td');
           let company = document.createElement('td');

           name.innerHTML = user.name;
           email.innerHTML = user.email;
           address.innerHTML = user.address.city + " " + user.address.street + " " + user.address.suite;
           phone.innerHTML = user.phone;
           company.innerHTML = user.company.name;
           row.appendChild(name);
           row.appendChild(email);
           row.appendChild(address);
           row.appendChild(phone);
           row.appendChild(company);

           tableData.appendChild(row);
       });
    }
    catch(error){
        console.error(`An error occured: ${error.message}`)
        errored = true;
        let errorMsg = document.createElement('p');
        errorMsg.style.color = "#F00";
        errorMsg.style.fontWeight = "700";
        errorMsg.innerHTML = "Something went wrong. Check console for errors.";
        alertContent.appendChild(errorMsg);
    }finally{
        loadBar.style.display = "none";
        if(!errored){
            table.style.display = "block";
        }
    }
};
window.addEventListener("load",fillTableWithContent);
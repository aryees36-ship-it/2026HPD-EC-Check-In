const BASE_URL =
"https://script.google.com/macros/s/AKfycbxFblsCiOPgHBd7bs_n9Jjo6EV25nVwfL3WNWShaGL6ZQpUVTcHnifRasD6Ss90xZT_xA/exec";


// Numbers only
document.getElementById("code")
.addEventListener("input", function(){

    this.value = this.value.replace(/[^0-9]/g,"");

});


// Manual Check-In

function checkInManual(){

    let shortCode =
    document.getElementById("code").value.trim();


    if(!shortCode){

        alert("Enter last 5 digits of code");

        return;

    }


    if(shortCode.length !== 5){

        alert("Code must be exactly 5 digits");

        return;

    }


    // Match Apps Script Registration Code
    const fullCode =
    "HPD-ES-2026-" + shortCode;


    processCheckIn(fullCode);

}



// Process Check-In

async function processCheckIn(code){

try{


const response =
await fetch(
BASE_URL + "?code=" + encodeURIComponent(code)
);



const data =
await response.json();



console.log(data);



if(data.status === "success"){


document.getElementById("result").innerHTML = `

<div class="alert alert-success">

<h4>✔ Check-In Successful</h4>

<hr>

<p><b>Name:</b> ${data.name}</p>

<p><b>Position:</b> ${data.position}</p>

<p><b>Region:</b> ${data.region}</p>

<p><b>District:</b> ${data.district}</p>

<p><b>Code:</b> ${data.regCode}</p>

</div>

`;

}



else{


document.getElementById("result").innerHTML = `

<div class="alert alert-danger">

<h5>❌ ${data.message}</h5>

</div>

`;

}


}

catch(error){


document.getElementById("result").innerHTML = `

<div class="alert alert-danger">

<h5>Network Error</h5>

</div>

`;


}



}
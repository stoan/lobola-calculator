//Calculations

function calculateResults() {
  var totalScore = parseInt(getEducationScore1()) + parseInt(getVirginScore2()) + parseInt(getKidScore3()) + parseInt(getBFScore4()) + parseInt(getMarriageScore5())
  + parseInt(getEmploymentScore6()) + parseInt(getCarScore7()) + parseInt(getHouseScore8())  + parseInt(getCookScore9()) + parseInt(getBedroomScore10())
  + parseInt(getSocialiteScore11()) + parseInt(getRoyalityScore12()) + parseInt(getHousewiveScore13()) + parseInt(getIncomeScore14()) + parseInt(getHairScore15())
  + parseInt(getDrinkScore16());
 
  var randValue = 0;
  
if(totalScore > 60){
 randValue = 100000;
 showCowImages(20);
}

else if(totalScore >= 50 && totalScore <= 60){
  randValue = 80000;
  showCowImages(11);
}

else if(totalScore >= 40 && totalScore <= 49){
  
   if(totalScore == 40){
     randValue = 42000;
     showCowImages(11);
   }
   
    if(totalScore == 41){
     randValue = 45000;
     showCowImages(11);
   }
   
    if(totalScore == 42){
     randValue = 48000;
     showCowImages(11);
   }
   
    if(totalScore == 43){
     randValue = 50000;
     showCowImages(11);
   }
   
    if(totalScore == 44){
     randValue = 55000;
     showCowImages(11);
   }
   
     if(totalScore == 45){
     randValue = 57000;
     showCowImages(11);
   }
   
     if(totalScore == 46){
     randValue = 60000;
     showCowImages(11);
   }
   
     if(totalScore == 47){
     randValue = 62000;
     showCowImages(11);
   }
   
     if(totalScore == 48){
     randValue = 64000;
     showCowImages(11);
   }
   
     if(totalScore == 49){
     randValue = 67000;
     showCowImages(11);
   }
}

else if(totalScore >= 20 && totalScore <= 29){
  randValue = 10000;
  showCowImages(8);
}

else if(totalScore < 20){
  randValue = 5000;
  showCowImages(5);
}

else if(totalScore >= 30 && totalScore <= 39){
  
   if(totalScore == 30){
       randValue = 15000;
       showCowImages(8);
   }
   
   if(totalScore == 31){
     randValue = 20000;
     showCowImages(8);
   }
   
   if(totalScore == 32){
       randValue = 23000;
       showCowImages(8);
   }
   
   if(totalScore == 33){
       randValue = 25000;
       showCowImages(8);
   }
   
   if(totalScore == 34){
       randValue = 27000;
       showCowImages(8);
   }
   
   if(totalScore == 35){
       randValue = 28000;
       showCowImages(11);
   }
   
   if(totalScore == 36){
       randValue = 30000;
       showCowImages(11);
   }
   
   if(totalScore == 37){
       randValue = 33000;
       showCowImages(11);
   }
   
   if(totalScore == 38){
       randValue = 35000;
       showCowImages(11);
   }
   
   if(totalScore == 39){
     randValue = 40000;
     showCowImages(11);
   }
   
   
  
}

document.getElementById("qoute").innerHTML ='Please inform your boyfriend to start budgeting '  + 'R ' + randValue + ' if he wants to put a ring on that finger.';
document.getElementById("messageInfoDialog").innerHTML ='Congratulations &#9786; your Lobola negotiations should start from ' + ' R ' + randValue;
document.getElementById("points").innerHTML ='You scored ' + totalScore +' points.';

};

function showCowImages(noOfImages) {
  for(let i = 0 ; i < noOfImages; i++) {
    document.getElementById("cowImages").innerHTML +=  '<img src=\'cow-icon-48.png\'>';
  }
};

function getEducationScore1() {
return $('#eduGroup label.active input').val();
};


function getVirginScore2() {
return  $('#virGroup label.active input').val();
};


function getKidScore3() {
return $('#kidGroup label.active input').val();
};



function getBFScore4() {
return $('#boyGroup label.active input').val();
};


function getMarriageScore5() {
return $('#marriageGroup label.active input').val();
};



function getEmploymentScore6() {
return $('#employmentGroup label.active input').val();
};



function getCarScore7() {
return $('#carGroup label.active input').val();
};



function getHouseScore8() {
return $('#houseGroup label.active input').val();
};



function getCookScore9() {
return $('#cookGroup label.active input').val();
};




function getBedroomScore10() {
return $('#bedroomGroup label.active input').val();
};



function getSocialiteScore11() {
return $('#socialGroup label.active input').val();
};



function getRoyalityScore12() {
return $('#royalGroup label.active input').val();
};




function getHousewiveScore13() {
return $('#housewiveGroup label.active input').val();
};




function getIncomeScore14() {
return $('#incomeGroup label.active input').val();
};




function getHairScore15() {
return $('#hairGroup label.active input').val();
};




function getDrinkScore16() {
return $('#drinkGroup label.active input').val();
};
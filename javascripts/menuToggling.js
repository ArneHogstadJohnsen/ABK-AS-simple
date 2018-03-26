$(document).ready(function() {


var pos = 0;
var homeText = 'G&aring til "Hjem" eller "veileder" for &aring finne rett verkt&oslashy';
var homePic = "home.png";
var regulationText = 'Fyll inn informasjon om byggtype, klima og areal. </br>Slik finner du energiramme fra forskirfter' ;
var regulationPic = "forskrifter.png";
var historicalText ='Fyll inn informasjon om bygg&aringr, klima og areal. </br>Slik finner du energibehovet' ;
var historicalPic = "normtall.png";
var effectAreaText = 'Fyll inn DUT, innetemp, areal og U-verdier. </br>Slik finner du effektbehovet ved DUT' ;
var effectAreaPic = "plantegning.png";
var effectFromEnergyText = 'Fyll inn energibehovet og balansetemperatur for &aring beregne effektbehov ved DUT. </br>Dersom du ikke har balansetemperatur bruker du bygg&aringr';
var effectFromEnergyPic = "forbruk.png" ;
var simulationText = 'Bruk effektbehov ved DUT for &aring finne en passende varmepumpe';
var simulationPic = "varighetskurve.png";
var offerText = '';
var offerPic ="none.png" ;

var titleText = ["<strong>Forrige steg</strong></br>","<strong>Dette steget</strong></br>" ,"<strong>Neste steg</strong></br>"];
var globalPreviousPicture = [homePic,homePic,homePic,simulationPic,offerPic];
var globalPreviousText = [homeText,homeText,homeText,simulationText,offerText ];


  //----------------------Visibility buttons------------------------------------
var hideMenusFunction = function () {
  //spacer
  $('#current').html("");
  $('#previous').html("");
  $('#next').html("");
  $('#menuDescriptionPrevious').html("");
  $('#menuDescriptionCurrent').html("");
  $('#menuDescriptionNext').html("");
  if($('#wizard').is(":visible") ) {
    $('#wizard').slideUp("slow", function(){
      $('#hideShowButtonDiV').hide();
    });
  }else{
    $('#hideShowButtonDiV').hide()
  }
};

var showMenusFunction = function () {
  $('#current').html("");
  $('#previous').html("");
  $('#next').html("");
  $('#menuDescriptionPrevious').html("");
  $('#menuDescriptionCurrent').html("");
  $('#menuDescriptionNext').html("");
  $('#prevNextNav').hide();
  showInfoDiv("");
  if($('#wizard').is(":visible") ) {
    $('#wizard').slideUp("slow", function(){
      $('#hideShowButtonDiV').slideDown("slow");
    });
  }else{
    $('#hideShowButtonDiV').slideDown("slow");
  }
};

var showInfoDiv = function (dataArea) {
  var itemArray = ['historicalEnergyUse','regulationEnergyLimit','selectedTabDiv','uValueEffect','effectFromEnergyNeed','offerSection','myOfferSection','inputSection'];
  for (i=0;i<itemArray.length;i++){
    var tempVal = itemArray[i];
    if( tempVal == dataArea){
      $(document.getElementById(dataArea)).slideDown("slow");
    }
    else{$(document.getElementById(tempVal)).hide();}
  }
  $('#selectedTabDiv').slideDown("slow");
};

var focusOnTab = function (tabID) {
  var itemArray = ['navItem1','navItem2','navItem3','navItem4','navItem5','navItem6','navItem7','navItem8','navItem9'];
  for (i=0;i<itemArray.length;i++){
    var tempVal =itemArray[i];
    if (tabID == tempVal){
      $(document.getElementById(tempVal)).addClass('navButtonActive');
      $(document.getElementById(tempVal)).removeClass('navButton');
    }else if( $(document.getElementById(tempVal)).hasClass('navButtonActive') ){
        $(document.getElementById(tempVal)).removeClass('navButtonActive');
        $(document.getElementById(tempVal)).addClass('navButton');
      }
    }
};

var insertPictures = function (previousPic, currentPic, nextPic, previousText, currentText, nextText){
  $('#previous').html('<span><img src="/Pictures/' + previousPic + '" height="200px" width="330px"/></span>');
  $('#current').html('<span><img src="/Pictures/'+ currentPic + '" height="200px" width="330px"/></span>');
  $('#next').html('<span><img src="/Pictures/'+ nextPic + '" height="200px" width="330px"/></span>');
  $('#menuDescriptionPrevious').html(previousText);
  $('#menuDescriptionCurrent').html(currentText);
  $('#menuDescriptionNext').html(nextText);
  $('#prevNextNav').show();
};

jQuery('.effectEnergyInfoEmpirical').on('click',function(event){
  focusOnTab('navItem2');

  hideMenusFunction();
  var prevText = titleText[0] + globalPreviousText[0];
  var curText = titleText[1] + historicalText;
  var nextText = titleText[2] + effectFromEnergyText;
  pos = 0;
  globalPreviousPicture[1] = historicalPic ;
  globalPreviousText[1] = historicalText ;

  insertPictures(homePic,historicalPic,effectFromEnergyPic,prevText,curText,nextText);
  showInfoDiv('historicalEnergyUse');
});

jQuery('.effectEnergyInfoRegulation').on('click', function(event) {
  focusOnTab('navItem3');

  hideMenusFunction();
  var prevText = titleText[0] + globalPreviousText[0];
  var curText = titleText[1] + regulationText;
  var nextText = titleText[2] + effectFromEnergyText;
  pos=0;
  globalPreviousPicture[1] = regulationPic ;
  globalPreviousText[1] = regulationText ;

  insertPictures(homePic,regulationPic,effectFromEnergyPic,prevText,curText,nextText);
  showInfoDiv('regulationEnergyLimit');
});

jQuery('.effectEnergyInfoArea').on('click',function(event){
  focusOnTab('navItem4');

  hideMenusFunction();
  var prevText = titleText[0] + globalPreviousText[1];
  var curText = titleText[1] + effectAreaText;
  var nextText = titleText[2] + simulationText;
  pos=1;
  globalPreviousPicture[2] = effectAreaPic ;
  globalPreviousText[2] = effectAreaText ;
  insertPictures(globalPreviousPicture[1],effectAreaPic,simulationPic,prevText,curText,nextText);
  showInfoDiv('uValueEffect');
});

jQuery('.effectFromEnergy').on('click', function(event) {
  focusOnTab('navItem5');

  hideMenusFunction();
  var prevText = titleText[0] + globalPreviousText[1];
  var curText = titleText[1] + effectFromEnergyText;
  var nextText = titleText[2] + simulationText;
  pos=1;
  globalPreviousPicture[2] = effectFromEnergyPic ;
  globalPreviousText[2] = effectFromEnergyText ;
  insertPictures(globalPreviousPicture[1],effectFromEnergyPic,simulationPic,prevText,curText,nextText);

  showInfoDiv('effectFromEnergyNeed');
});

jQuery('.energyCalculation').on('click', function(event) {
  focusOnTab('navItem6');
  hideMenusFunction();

  var prevText = titleText[0] + globalPreviousText[2];
  var curText = titleText[1] + simulationText;
  var nextText = titleText[2] + offerText;
  $('#menuDescriptionNext').html("")
  pos=2;

  insertPictures(globalPreviousPicture[2],simulationPic,offerPic,prevText,curText,nextText);
  showInfoDiv('inputSection');
});

jQuery('.generateOffer').on('click', function(event) {
  focusOnTab('navItem7');

  hideMenusFunction();
  var prevText = titleText[0] + globalPreviousText[3];
  var curText = titleText[1] + offerText;
  var nextText = "";
  pos=3;

  insertPictures(globalPreviousPicture[3],offerPic,"none.png",prevText,curText,nextText);
  showInfoDiv('offerSection');
});

jQuery('.navButton8').on('click',function(event){
  $('.wizardStart').html("Start veileder");
  focusOnTab('navItem8');
  $('#prevNextNav').hide();
  hideMenusFunction();
  showInfoDiv('myOfferSection');
});

jQuery('.navButton1').on('click',function(event){
  $('.wizardStart').html("Start veileder");
  showMenusFunction();
  focusOnTab('navItem1');
});

  jQuery('.navButton2').on('click', function(event) {
    $('.wizardStart').html("Start veileder");
        $( ".effectEnergyInfoEmpirical" ).trigger( "click" );
  });
  jQuery('.navButton3').on('click', function(event) {
    $('.wizardStart').html("Start veileder");
        $( ".effectEnergyInfoRegulation" ).trigger( "click" );
  });
  jQuery('.navButton4').on('click', function(event) {
    $('.wizardStart').html("Start veileder");
        $( ".effectEnergyInfoArea" ).trigger( "click" );
  });
  jQuery('.navButton5').on('click', function(event) {
    $('.wizardStart').html("Start veileder");
        $( ".effectFromEnergy" ).trigger( "click" );
  });
  jQuery('.navButton6').on('click', function(event) {
    $('.wizardStart').html("Start veileder");
        $( ".energyCalculation" ).trigger( "click" );
        $('#menuDescriptionNext').html("");
  });
  jQuery('.navButton7').on('click', function(event) {
    $('.wizardStart').html("Start veileder");
        $( ".generateOffer" ).trigger( "click" );
  });
jQuery('.navButton9').on('click',function(event){
  $('.wizardStart').html("Start veileder");
      showInfoDiv('');
      hideMenusFunction();
      focusOnTab('navItem9');
      $('#menuImageCurrent').html('');
      $('#hideShowButtonDiV').hide();
      $(".wizardVetPumpe").show();
      $(".wizardHarEffekt").show();
      $(".wizardHarArealUverdi").show();
      $(".wizardHarForbruk").show();
      $('#wizardStep2').hide();
      $('#wizardStep1').hide();
      $('#wizardStep3').hide();
      $(".wizardHarArealUverdi").show();
      $(".wizardHarForbruk").show();
      $('#wizard').slideDown();

});

jQuery('.wizardStart').on('click',function(event){
    if($('#wizardStep3').is(":visible") ) {
      $(".wizardHarArealUverdi").slideDown();
      $(".wizardHarForbruk").slideDown();
      $('#wizardStep3').slideUp();
      $(".wizardHarArealUverdi").slideDown();
      $(".wizardHarForbruk").slideDown();
      $('#wizardStep2').slideUp();
      $(".wizardVetPumpe").slideDown();
      $(".wizardHarEffekt").slideDown();
      $('#wizardStep1').slideUp();
      $('.wizardStart').html("Start veileder");
    }else if($('#wizardStep2').is(":visible") ) {
      $('#wizardStep2').slideUp();
      $(".wizardVetPumpe").slideDown();
      $(".wizardHarEffekt").slideDown();
      $('#wizardStep1').slideUp();
      $('.wizardStart').html("Start veileder");
    }else if ($('#wizardStep1').is(":visible") ) {
      $('#wizardStep1').slideUp();
      $('.wizardStart').html("Start veileder");
    }else {
      $('#wizardStep1').slideDown();
      $('.wizardStart').html("Stans veileder");
    }
});

jQuery('.wizardHarIkkeEffekt').on('click',function(event){
    //  $(".wizardVetPumpe").animate({width:'toggle'},350);
    //  $(".wizardHarEffekt").animate({width:'toggle'},350);
      $(".wizardVetPumpe").slideUp();
      $(".wizardHarEffekt").slideUp();
      if($('#wizardStep2').is(":visible") ) {
        $(".wizardVetPumpe").slideDown();
        $(".wizardHarEffekt").slideDown();
        $(".wizardHarArealUverdi").slideDown();
        $(".wizardHarForbruk").slideDown();
        $('#wizardStep2').slideUp();
      }else {$('#wizardStep2').slideDown();}
      if($('#wizardStep3').is(":visible") ) {
        $('#wizardStep3').slideUp();
      }

});

jQuery('.wizardHarIkkeInfo').on('click',function(event){
    //  $(".wizardHarArealUverdi").animate({width:'toggle'},350);
    //  $(".wizardHarForbruk").animate({width:'toggle'},350);
      $(".wizardHarArealUverdi").slideUp();
      $(".wizardHarForbruk").slideUp();
      if($('#wizardStep3').is(":visible") ) {
        $('#wizardStep3').slideUp();
        $(".wizardHarArealUverdi").slideDown();
        $(".wizardHarForbruk").slideDown();
      }else {$('#wizardStep3').slideDown();}
});


jQuery('.wizardVetPumpe').on('click',function(event){
      $('.wizardStart').html("Start veileder");
      $("#wizard").slideUp();
      hideMenusFunction();
      $( ".generateOffer" ).trigger( "click" );
});

jQuery('.wizardHarEffekt').on('click',function(event){
      $('.wizardStart').html("Start veileder");
      $("#wizard").slideUp();
      hideMenusFunction();
      $( ".energyCalculation" ).trigger( "click" );

});

jQuery('.wizardHarArealUverdi').on('click',function(event){
      $('.wizardStart').html("Start veileder");
      $("#wizard").slideUp();
      hideMenusFunction();
      $( ".effectEnergyInfoArea" ).trigger( "click" );

});

jQuery('.wizardHarForbruk').on('click',function(event){
      $('.wizardStart').html("Start veileder");
      $("#wizard").slideUp();
      hideMenusFunction();
      $( ".effectFromEnergy" ).trigger( "click" );

});

jQuery('.wizardNybygg').on('click',function(event){
      $('.wizardStart').html("Start veileder");
      $("#wizard").slideUp();
      hideMenusFunction();
      $( ".effectEnergyInfoRegulation" ).trigger( "click" );

});

jQuery('.wizardEksisterende').on('click',function(event){
      $('.wizardStart').html("Start veileder");
      $("#wizard").slideUp();
      hideMenusFunction();
      $( ".effectEnergyInfoEmpirical" ).trigger( "click" );

});

$('#prevNextNav').on("mouseenter", ".menuButtonsPrev, .menuButtonsNext", function(event){
    $(this).animate(
      {"opacity":0.4},{duration:500}
  );
});

$('#prevNextNav').on("mouseleave", ".menuButtonsPrev,.menuButtonsNext", function(event){
    $(this).stop();
    $(this).animate(
      {"opacity":1},{duration:0}
  );
});

$('#prevNextNav').on("click", ".menuButtonsPrev,.menuButtonsNext", function(event){
    $(this).animate(
      {"opacity":1},{duration:0}
  );
});

$('#prevNextNav').on("click", ".menuButtonsPrev", function(event){
  if (pos == 0){$(".navButton1").trigger( "click" );}
  else if (pos == 1){
    if(globalPreviousPicture[1] == homePic){$( ".navButton1" ).trigger( "click" );}
    else if(globalPreviousPicture[1] == regulationPic){$( ".navButton3" ).trigger( "click" );}
    else{$( ".navButton2" ).trigger( "click" );}
  } else if (pos == 2){
    if(globalPreviousPicture[2] == homePic){$( ".navButton1" ).trigger( "click" );}
    else if(globalPreviousPicture[2] == effectFromEnergyPic){$( ".navButton5" ).trigger( "click" );}
    else{$( ".navButton4" ).trigger( "click" );}
  }else if (pos == 3){$( ".navButton6" ).trigger( "click" );}
});

$('#prevNextNav').on("click", ".menuButtonsNext", function(event){
  if (pos == 0){$( ".navButton5" ).trigger( "click" );}
  else if (pos == 1){$( ".navButton6" ).trigger( "click" );}
  else if (pos == 2){$( ".navButton7" ).trigger( "click" );$('#menuDescriptionNext').html("");}
});






});

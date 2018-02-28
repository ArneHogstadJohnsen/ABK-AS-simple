$(document).ready(function() {

  var globalArticleArray = [];
  var globalPackageArray = [];
  var globalLinesAdded = 0;
  var globalKundeinfo = 0;

    //Pull All Climatedata and makke mattrix for the three different zones in ascending durationorder, also defines a globall durationarray
    $.ajax({
      url: 'index.html',
      success: function() {

        globalArticleArray = [];
        globalKundeinfo = [];

            var machineId = "DI-RAV-SM564ATP-E";
            var unsortedIndoorOption = new Firebase('https://sizzling-fire-1319.firebaseio.com/pakker' );
            var childcounter = 0;

            unsortedIndoorOption.orderByKey().on("child_added", function(snapshot) {
              $('#offerMachineInside').html("");
              var interMedObject = snapshot.exportVal();
              if(childcounter >0){
                for (var key in interMedObject) {
                  if (interMedObject.hasOwnProperty(key) && key == machineId ) {
                      tempValue = interMedObject[key];
                      for (var key in tempValue) {
                      $('#offerMachineInside').append($('<option >' + key + '</option>'));
                    }
                  }
                }
              }
              childcounter++;
            });

        var lengde = 0;
        var unsortedKundeinfo = new Firebase('https://sizzling-fire-1319.firebaseio.com/kunder');
        unsortedKundeinfo.orderByChild("rabatt").on("value", function(snapshot) {
          var interMedObject = snapshot.exportVal();
          globalKundeinfo = interMedObject;
        });

      }
    });



var formatNumberWithThousandSpace = function (energyValue) {
  var millions = "";
  var hundredThousands = "";
  var tenThousands ="";
  if(energyValue >= 1000000){
    var millions = Math.floor(energyValue/1000000);
    energyValue = energyValue - millions*1000000;
    if(energyValue < 100000){
      hundredThousands = 0;
      if(energyValue < 10000){
        tenThousands = 0;
      }
    }
  }

  if (energyValue >= 1000){
  var thousands = Math.floor(energyValue/1000);
  var hundreds = Math.floor((energyValue - thousands*1000)/100);
  var tens =  Math.floor((energyValue - thousands*1000 - hundreds*100)/10);
  var ones = Math.ceil(energyValue - thousands*1000 - hundreds*100 - tens*10);
  if (ones == 10) {ones = 9;}
  return millions + ' ' + hundredThousands + tenThousands + thousands + ' ' + hundreds + tens + ones
  } else {
  return energyValue;
  }
};


  var nettopris = function (pris,antall,rabatt){
    var verdi = formatNumberWithThousandSpace(parseFloat(pris)*parseFloat(antall)*(100-parseFloat(rabatt))/100);
    return verdi;
  };

  var totalPrice = function (){
    var nettoSum = 0;
    for (i=0; i < globalLinesAdded; i++){
      var nettoSumLine = 'R6line' + i;
      var tempValNetto = parseFloat($(document.getElementById ( nettoSumLine )).text().replace(/\s+/g, ''));
      nettoSum = nettoSum + tempValNetto;
    }
    $(document.getElementById ( 'sumTilbud' )).html(formatNumberWithThousandSpace(nettoSum));
    $(document.getElementById ( 'sumMVA' )).html(formatNumberWithThousandSpace(nettoSum * 0.25));
    $(document.getElementById ( 'sumAvgift' )).html(formatNumberWithThousandSpace(1000));
    $(document.getElementById ( 'sumTotal' )).html(formatNumberWithThousandSpace(nettoSum * 1.25 + 1000));
  };


jQuery('.resetOffer').on('click', function(event) {
    $('.generateAndPrintOffer').hide();
    $('.addItemsToOffer').show();
    $('.resetOffer').hide();
      $('#offerList').slideUp("slow", function() {
        $('#generateAndPrintOffer').hide();
        $('#resetOffer').hide();
              $('#offerListArticles').html("");
              $('#offerList').hide();
              $('#confirmationMessage').html("");
      });

      globalLinesAdded = 0;
});

jQuery('#offerMachine').on('change', function(event) {

    var machineId = $('option:selected', '#offerMachine').val();
    var unsortedIndoorOption = new Firebase('https://sizzling-fire-1319.firebaseio.com/pakker' );
    var childcounter = 0;
    $('#offerMachineInside').html("");
    unsortedIndoorOption.orderByKey().on("child_added", function(snapshot) {
      var interMedObject = snapshot.exportVal();
      if(childcounter >0){
        for (var key in interMedObject) {
          if (interMedObject.hasOwnProperty(key) && key == machineId ) {
              tempValue = interMedObject[key];
              for (var key in tempValue) {
              $('#offerMachineInside').append($('<option >' + key + '</option>'));
            }
          }
        }
      }
      childcounter++;
    });
});

  jQuery('.addItemsToOffer').on('click', function(event) {

    $('#confirmationMessage').slideUp("slow", function() {
      $('.generateAndPrintOffer').show();
      $('.resetOffer').show();
      $('.addItemsToOffer').hide();
      $('#confirmationMessage').html("");
    });
    $('.generateAndPrintOffer').show();
    $('.resetOffer').show();

    var kunde = $("#userID").val();
    var rabatt = globalKundeinfo[kunde].rabatt;
    var lengde = 0;
    globalArticleArray = [];
    globalPackageArray = [];
    var machineId = $('option:selected', '#offerMachine').val();
    var machineIndoorId =$('option:selected', '#offerMachineInside').val();
    var unsortedList = new Firebase('https://sizzling-fire-1319.firebaseio.com/pakker' );
    var childcounter = 0;
    unsortedList.orderByKey().on("child_added", function(snapshot) {
      var interMedObject = snapshot.exportVal();
      if(childcounter == 0){
        globalArticleArray = interMedObject;
      }
      if(childcounter >0){
        for (var key in interMedObject) {
          if (interMedObject.hasOwnProperty(key) && key == machineId ) {
              var tempValue = interMedObject[key];
                  globalPackageArray = tempValue[machineIndoorId];
            }
          }
        }
      childcounter++;
    });
    var lengde = 0;
    var articleInQuestion = 0;
    var allArticles =
    $('#offerList').slideDown();
    for (var key in globalPackageArray['antall']) {
      lengde = lengde + 1;
      }

    for (i=0;i< lengde;i++){
      for (var key in globalArticleArray) {
        if (globalArticleArray.hasOwnProperty(key) && key == globalPackageArray.artikler[i] ) {
          var pris = globalArticleArray[key].pris;
          var beskrivelse = globalArticleArray[key].navn;
          var artnr = key;
        }
      }
      idNUmber = globalLinesAdded +i;
      $("#offerListArticles").append(
            '<p class="inputP">'+
              '<p class="inputR1" id="R1line'+idNUmber+'">'+artnr+'</p>'+
              '<p class="inputR2" id="R2line'+idNUmber+'">'+beskrivelse+'</p>'+
              '<p class="inputR3" id="R3line'+idNUmber+'">'+formatNumberWithThousandSpace(pris)+'</p>'+
              '<p class="inputR4" id="R4line'+idNUmber+'">'+ rabatt + '</p>'+
              '<p class="inputButton incrementOfferDown" id="'+idNUmber+'"><button type="button" class="incrementDown ">-</button></p>'+
              '<p class="inputR5" id="R5line'+idNUmber+'">'+globalPackageArray.antall[i] * $('#offerNumberOfMachine').val() +'</p>'+
              '<p class="inputButton incrementOfferUp" id="'+idNUmber+'"><button type="button" class="incrementUp " >+</button></p>'+
              '<p class="inputR6" id="R6line'+idNUmber+'">'+nettopris(pris,globalPackageArray.antall[i] * $('#offerNumberOfMachine').val(),rabatt)+'</p>'+
              '<p class="fillerRight"></p>'+
            '</p>')
    }
    globalLinesAdded = globalLinesAdded + lengde;
    totalPrice();
    $("#offerListArticles").slideDown();
  });


  $('#offerListArticles').on("click", "p.incrementOfferDown", function(event){
          var kunde = $("#userID").val();
          var rabatt = globalKundeinfo[kunde].rabatt;
          var antall = 'R5line' + this.id;
          var pris = 'R3line' + this.id;
          var currentNettopris = 'R6line' + this.id;
          var tempValAntall = parseFloat($(document.getElementById ( antall )).text()) - 1;
          var tempValPris = parseFloat($(document.getElementById ( pris )).text().replace(/\s+/g, ''));
          var tempValnettopris = nettopris(tempValPris,tempValAntall,rabatt);
          if (tempValAntall >= 0) {
            $(document.getElementById ( antall )).html(tempValAntall);
            $(document.getElementById ( currentNettopris )).html(tempValnettopris);
          }
          totalPrice();
  });

  $('#offerListArticles').on("click", "p.incrementOfferUp", function(event){
          var kunde = $("#userID").val();
          var rabatt = globalKundeinfo[kunde].rabatt;
          var antall = 'R5line' + this.id;
          var pris = 'R3line' + this.id;
          var currentNettopris = 'R6line' + this.id;
          var tempValAntall = parseFloat($(document.getElementById ( antall )).text()) + 1;
          var tempValPris = parseFloat($(document.getElementById ( pris )).text().replace(/\s+/g, ''));
          var tempValnettopris = nettopris(tempValPris,tempValAntall,rabatt);
          $(document.getElementById ( antall )).html(tempValAntall);
          $(document.getElementById ( currentNettopris )).html(tempValnettopris);
          totalPrice();
  });

  jQuery('.generateAndPrintOffer').on('click', function(event) {

      $('#confirmationMessage').html("");
    if( globalLinesAdded != 0 && $("#tilbudsnavn").val() != "" ){
      $('.generateAndPrintOffer').hide();
      $('.resetOffer').hide();
      var kunde = $("#userID").val();
      var numberOfOffers = 0;
      var myDataRef = new Firebase('https://sizzling-fire-1319.firebaseio.com/kunder/' + kunde +  '/tilbud');
      var myOfferRef = new Firebase('https://sizzling-fire-1319.firebaseio.com/tilbud/tilbudsteller');
      var myOfferList = new Firebase('https://sizzling-fire-1319.firebaseio.com/tilbud/tilbudsliste');

      myOfferRef.orderByKey().on("child_added", function(snapshot) {
        var tempVal = snapshot.val();
        numberOfOffers = tempVal + 1;
        var tilbudsummer = "Tilbudsnr: " + numberOfOffers
        var antallMatrise = [];
        var artikkelMatrise = [];
        var stykkPrisMatrise = [];
        var navnMatrise = [];

        for (i=0;i< globalLinesAdded;i++){
          var linjeAntall ='R5line' + i;
          var linkeArtikkel ='R1line' + i;
          var linjeStykkpris = 'R3line' + i;
          var linjeNavn = 'R2line' + i;
          if ( parseFloat($(document.getElementById ( linjeAntall )).text().replace(/\s+/g, '')) != 0 ) {
          antallMatrise.push(parseFloat($(document.getElementById ( linjeAntall )).text().replace(/\s+/g, '')));
          artikkelMatrise.push($(document.getElementById ( linkeArtikkel )).text());
          stykkPrisMatrise.push(parseFloat($(document.getElementById ( linjeStykkpris )).text().replace(/\s+/g, '')));
          navnMatrise.push($(document.getElementById ( linjeNavn )).text());
          }
        }

        var kundeRabatt = globalKundeinfo[kunde].rabatt;
        var totalTilbudsSum = parseFloat($(document.getElementById ( 'sumTilbud' )).text().replace(/\s+/g, ''));
        var totalMva = parseFloat($(document.getElementById ( 'sumMVA' )).text().replace(/\s+/g, ''));
        var totalAvgift = parseFloat($(document.getElementById ( 'sumAvgift' )).text().replace(/\s+/g, ''));
        var turnover = totalTilbudsSum + totalMva + totalAvgift;
        var dato = new Date();
        var idag = dato.getDate() +'.' + (parseFloat(dato.getMonth()) + 1) + '.' + dato.getFullYear();
        var offerName = $("#tilbudsnavn").val();

        myOfferList.child(tilbudsummer).set({antall: antallMatrise, navn: navnMatrise, artikkel: artikkelMatrise, stykkpris: stykkPrisMatrise, rabatt: kundeRabatt, sum: totalTilbudsSum, avgift:totalAvgift , mva:totalMva, omsetning:turnover, dato: idag, tilbudsnavn: offerName, pos: 10000 - numberOfOffers, kundeID: kunde });
        myDataRef.child(tilbudsummer).set({omsetning:turnover});
        myOfferRef.update({ tilbudsantall: numberOfOffers});
        $('#offerList').slideUp("slow", function() {

                $('#offerListArticles').html("");
                $('#offerList').hide();
                $('#confirmationMessage').html('</br></br>'+tilbudsummer + ' generert og lagret til <button class="myOfferRef">Mine tilbud '+ '</button>');
                $('#confirmationMessage').slideDown();
                globalLinesAdded = 0;
        });
      });
    }else if($("#tilbudsnavn").val() == ""){
      $("#tilbudsnavn").css("background-color", "yellow");
      alert("Vennligst legg inn tilbudsnavn!");
    }else{alert("Vennligst legg til varer!");}
});

$('#tilbudsnavn').on('input', function() {
  $("#tilbudsnavn").css("background-color", "white");
});

  $('#confirmationMessage').on("click", ".myOfferRef", function(event){
      $( ".resetOffer" ).trigger( "click" );
      $( ".navButton8" ).trigger( "click" );

  });

});

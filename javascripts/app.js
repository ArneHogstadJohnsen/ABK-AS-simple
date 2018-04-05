$(document).ready(function() {


  //Global definition of chart
  Chart.defaults.global = {
      // Boolean - Whether to animate the chart
      animation: true,

      // Number - Number of animation steps
      animationSteps: 100,

      // String - Animation easing effect
      // Possible effects are:
      // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
      //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
      //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
      //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
      //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
      //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
      //  easeOutElastic, easeInCubic]
      animationEasing: "easeOutQuart",

      // Boolean - If we should show the scale at all
      showScale: true,
      //Boolean - If we should show points or not
      pointDot: false,
      //Number - Radius of each point dot in pixels
      pointDotRadius : 0,

      // Boolean - If we want to override with a hard coded scale
      scaleOverride: false,

      // ** Required if scaleOverride is true **
      // Number - The number of steps in a hard coded scale
      scaleSteps: null,
      // Number - The value jump in the hard coded scale
      scaleStepWidth: null,
      // Number - The scale starting value
      scaleStartValue: null,

      // String - Colour of the scale line
      scaleLineColor: "rgba(0,0,0,.1)",

      // Number - Pixel width of the scale line
      scaleLineWidth: 1,

      // Boolean - Whether to show labels on the scale
      scaleShowLabels: true,

      // Interpolated JS string - can access value
      scaleLabel: "<%=value%>",

      // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
      scaleIntegersOnly: true,

      // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero: true,

      // String - Scale label font declaration for the scale label
      scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

      // Number - Scale label font size in pixels
      scaleFontSize: 12,

      // String - Scale label font weight style
      scaleFontStyle: "normal",

      // String - Scale label font colour
      scaleFontColor: "#666",

      // Boolean - whether or not the chart should be responsive and resize when the browser does.
      responsive: true,

      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,

      // Boolean - Determines whether to draw tooltips on the canvas or not
      showTooltips: false,

      // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
      customTooltips: false,

      // Array - Array of string names to attach tooltip events
      tooltipEvents: ["mousemove", "touchstart", "touchmove"],

      // String - Tooltip background colour
      tooltipFillColor: "rgba(0,0,0,0.8)",

      // String - Tooltip label font declaration for the scale label
      tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

      // Number - Tooltip label font size in pixels
      tooltipFontSize: 10,

      // String - Tooltip font weight style
      tooltipFontStyle: "normal",

      // String - Tooltip label font colour
      tooltipFontColor: "#fff",

      // String - Tooltip title font declaration for the scale label
      tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

      // Number - Tooltip title font size in pixels
      tooltipTitleFontSize: 14,

      // String - Tooltip title font weight style
      tooltipTitleFontStyle: "bold",

      // String - Tooltip title font colour
      tooltipTitleFontColor: "#fff",

      // Number - pixel width of padding around tooltip text
      tooltipYPadding: 6,

      // Number - pixel width of padding around tooltip text
      tooltipXPadding: 6,

      // Number - Size of the caret on the tooltip
      tooltipCaretSize: 8,

      // Number - Pixel radius of the tooltip border
      tooltipCornerRadius: 6,

      // Number - Pixel offset from point x to tooltip edge
      tooltipXOffset: 10,

      // String - Template string for single tooltips
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

      // String - Template string for multiple tooltips
      multiTooltipTemplate: "<%= value %>",

      // Function - Will fire on animation progression.
      onAnimationProgress: function(){},

      // Function - Will fire on animation completion.
      onAnimationComplete: function(){}
  }

  // Global variables, arrays, objects
  var globalDurationArray = [];
  var globalTemperatureArray = [];
  var globalInlandTempArray = [];
  var globalCoastTempArray = [];
  var globalMixTempArray = [];
  var globalMachineArray = [];
  var globalMunicipalityArray = [];
  var globalTempMean = 6;
  var globalTempDOT= -20;
  var climateZoneIndex = 1;
  var globalEffectDelivered = [];
  var globalEffectNeed = [];
  var globalEffectUsed = [];
  var globalEnergyUsed =0;
  var globalEnergyDelivered = 0;
  var globalEnergyNeed = 0;
  var globalEnergiRamme = [];
  var globalTEKramme = [];
  var globalUverdier = [];
  var globalBelysning = [];
  var globalKategorier = [];
  var globalKjoling = [];
  var globalUtstyr = [];
  var globalVarmtvann = [];
  var globalVentilasjon = [];
  var globalDegreeDays = 0;

  var globalNomrtall = [];
  var globalMachineDeliverDOT = 0;
  var globalAdditionFrom = 0;
  var globalMachineNomEffect = 0;
  var globalDHW = 30;

  var globalSelectedMunicipality ="";

  var energyChart;
  var graphArray = [];




  //defines new chart type - including the label of y-axis
  Chart.types.Line.extend({
      name: "LineAlt",
      draw: function () {
          Chart.types.Line.prototype.draw.apply(this, arguments);

          var ctx = this.chart.ctx;
          ctx.save();
          // text alignment and color
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillStyle = this.options.scaleFontColor;
          // position
          var x = this.scale.xScalePaddingLeft * 0.4;
          var y = this.chart.height/10;
          // change origin
          ctx.translate(x, y)
          // rotate text
          //ctx.rotate(-90 * Math.PI / 180);
          ctx.fillText(this.datasets[0].label, 0, 0);
          ctx.restore();
      }
  });


var createChart = function() {
  var newXaxisArray = [];
  for(var i =0; i<37;i++){
    var tall = i*10;
    if(Math.floor(tall/50) == tall/50){
      if(i == 35){
        newXaxisArray.push("")
      }else{
      newXaxisArray.push(tall);
      }
    }else{newXaxisArray.push("");}
  };
  newXaxisArray.push(365);
  var data = {
    labels: newXaxisArray, // Push the machine names here
    datasets: [
      {
        label: "[kW]",
        fillColor: "rgba(0, 0, 100,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: graphArray[1] // Push energy numbers here
      },
      {
        label: "Energy Delivery",
        fillColor: "rgba(100, 255, 0, 0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: graphArray[2] // Push energy numbers here
      },
      {
        label: "Energy Use",
        fillColor: "rgba(255, 0, 100, 0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: graphArray[3] // Push energy numbers here
      }
    ]
  };
  // Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#chart").get(0).getContext("2d");

  // This will get the first returned node in the jQuery collection.
  var energyChart = new Chart(ctx).LineAlt(data, {
    scaleShowGridLines : false,
    pointDot: false,
    scaleOverride: true,
    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: 4.5,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: globalEffectNeed[0]/4,
    // Number - The scale starting value
    scaleStartValue: 0,
    scaleLabel: "              <%=value%>"
  });

};

  //Pull All Climatedata and makke mattrix for the three different zones in ascending durationorder, also defines a globall durationarray
  $.ajax({
    url: 'index.html',
    success: function() {
      globalDurationArray = [];
      globalInlandTempArray = [];
      globalCoastTempArray = [];
      globalMixTempArray = [];
      //retrieving unsorted matrix with all durantions and temperatures for inland climate from database
      var localUnsortedInlandTempArray = new Firebase('https://sizzling-fire-1319.firebaseio.com/Klimasoner/climateInland');
      //retrieving unsorted matrix with all durantions and temperatures for inland climate from database
      var localUnsortedCoastTempArray = new Firebase('https://sizzling-fire-1319.firebaseio.com/Klimasoner/climateCoast');
      //retrieving unsorted matrix with all durantions and temperatures for inland climate from database
      var localUnsortedMixTempArray = new Firebase('https://sizzling-fire-1319.firebaseio.com/Klimasoner/climateMix')

      //Ordering localUnsortedInlandTempArray by it's first value, duration
      localUnsortedInlandTempArray.orderByChild("0").on("child_added", function(snapshot) {
      globalDurationArray.push(snapshot.val()[0]);
      globalInlandTempArray.push(snapshot.val());
      });

      //Ordering localUnsortedCoastTempArray by it's first value, duration
      localUnsortedCoastTempArray.orderByChild("0").on("child_added", function(snapshot) {
        globalCoastTempArray.push(snapshot.val());
      });

      //Ordering localUnsortedMixTempArray by it's first value, duration
      localUnsortedMixTempArray.orderByChild("0").on("child_added", function(snapshot) {
      globalMixTempArray.push(snapshot.val());
    });

    }
  });



  //Pull All Macihnedata and makke mattrix - sort by nominal capacity - populate dropdown meny
  $.ajax({
    url: 'index.html',
    success: function() {
      // clear current matirux
      globalMachineArray = [];
      //retrieving unsorted matrix with all machines
      var localUnsortedMachineArray = new Firebase('https://sizzling-fire-1319.firebaseio.com/Maskiner');

      localUnsortedMachineArray.orderByChild("nomEffect").on("value", function(snapshot) {
      //resets LoopCounter to 0 so we get ordered list in dropdpwn meny
      var loopCounter=0;
      var index = 0;
      globalMachineArray = [];

      //Ordering localUnsortedMachineArray by nominal effect
      localUnsortedMachineArray.orderByChild("nomEffect").on("child_added", function(snapshot) {

      //Add machine to gloval objectArray
      globalMachineArray.push(snapshot.val());
      index++;
      loopCounter++;
      });
      });
    }
  });

  //Pull All Municipaldata and makke array of object
  $.ajax({
    url: 'index.html',
    success: function() {
      //clears the current municipalityarray
      globalMunicipalityArray = [];
      //retrieving alfabetically sorten matrix with all nam, YearMean-and DOTtemperatures, as well as zone and county and municipality from database
      var localAlfabeticallySortedMunicipalityArray = new Firebase('https://sizzling-fire-1319.firebaseio.com/municipalities');

      localAlfabeticallySortedMunicipalityArray.orderByChild("municipality").on("value", function(snapshot) {
      //resets LoopCounter to 0 so we get ordered list in matrix
      globalMunicipalityArray = [];

      //Ordering localUnsortedInlandTempArray by it's first value, municipality, in case some have been added
      localAlfabeticallySortedMunicipalityArray.orderByChild("municipality").on("child_added", function(snapshot) {
      var interMedObject = snapshot.exportVal();
      interMedObject["label"] = snapshot.val().municipality + '  -  ' + snapshot.val().county;
      interMedObject["value"] = snapshot.val().municipality;
      globalMunicipalityArray.push(interMedObject);

      //autocompletes search with values from placeArray
      $("#municipality").autocomplete({
        source: globalMunicipalityArray,
        minLength: 2,
        select: function(event, ui) {
          globalTempMean = ui.item.tempMean;
          globalTempDOT = ui.item.tempDUT;
          globalDegreeDays = ui.item.gradtall;
          currentPlace = ui.item.municipality;
          climateZoneIndex = ui.item.zone;
          globalSelectedMunicipality = currentPlace;
          $("#yearMeanForCalculation").val(globalTempMean);
          $("#dOTForCalculation").val(globalTempDOT);
          $("#resultTextMunicipality").html(currentPlace);
          $("#aarsmiddelVerdi").val(globalTempMean);
          $("#DUTverdi").val(globalTempDOT);
          $("#aarsmiddelTempUtdata").html(globalTempMean + " &degC");
          $("#DUTutdata").html(globalTempDOT + " &degC");
          $("#resultTextFylke").html(ui.item.county);
          $("#municipality").css("background-color", "white");
          $("#municipalityUtdata").html(currentPlace);
          updateEffectValues();
          if ($('#buildingYear').val() <2010){updateHistoricalvalues();}
          else{updateRegulationFormValues();}
        }
      })
      .data("ui-autocomplete")._renderItem = function(ul, item) {
        return $("<li></li>").data("ui-autocomplete-item", item).append("<a>"+ item.municipality + " - " + item.county + " | " + item.tempMean + " , " + item.tempDUT + "</a>").appendTo(ul);
      };



    });
    });
    }
  });

  //Pull All Energydata and makke mattrix for all categories and standards
  $.ajax({
    url: 'index.html',
    success: function() {
      //empty the current array of objects
      globalTEK10Ramme = [];
      globalTEK15Ramme = [];
      globalTEKramme = [];
      globalUverdier = [];
      globalBelysning = [];
      globalKategorier = [];
      globalKjoling = [];
      globalUtstyr = [];
      globalVarmtvann = [];
      globalVentilasjon = [];

      var localStandardArray = [];
      var localCategorydArray = [];
      var tempValue;

      //retrieving unsorted matrix with all energirammeinformastion from database
      var localEnergiRamme = new Firebase('https://sizzling-fire-1319.firebaseio.com/energiramme');

      localEnergiRamme.orderByValue().on("value", function(snapshot) {

      //Ordering localUnsortedInlandTempArray by it's first value, municipality, in case some have been added
      localEnergiRamme.orderByValue().on("child_added", function(snapshot) {
      var interMedObject = snapshot.exportVal();
      if( interMedObject["name"] == "TEKramme"){
      globalTEKramme = interMedObject;
      };
      if( interMedObject["name"] == "Uverdier"){
      globalUverdier = interMedObject;

      for (var key in interMedObject) {
        if (interMedObject.hasOwnProperty(key) && key != "name" ) {
            tempValue = interMedObject[key];
            tempValue['label'] = key + tempValue.range;
            tempValue['value'] = key ;
            localStandardArray.push(tempValue);
          }
      }
      };
      if( interMedObject["name"] == "belysning"){
      globalBelysning = interMedObject;
      };
      if( interMedObject["name"] == "kategorier"){
      globalKategorier = interMedObject;

      for (var key in interMedObject) {
        if (interMedObject.hasOwnProperty(key) && key != "name" ) {
            tempValue = interMedObject[key];
            tempValue['label'] = key;
            localCategorydArray.push(tempValue);
        }
      }

      };
      if( interMedObject["name"] == "kjoling"){
      globalKjoling = interMedObject;
      };
      if( interMedObject["name"] == "utstyr"){
      globalUtstyr = interMedObject;
      };
      if( interMedObject["name"] == "varmtvann"){
      globalVarmtvann = interMedObject;
      };
      if( interMedObject["name"] == "ventilasjon"){
      globalVentilasjon = interMedObject;
      };
      if( interMedObject["name"] == "historiskenormtall"){
      globalNomrtall = interMedObject;
      };
    });
    });
  }
});

//Pull All Macihnedata and makke mattrix - sort by nominal capacity - populate dropdown meny
$.ajax({
  url: 'index.html',
  success: function() {
    // clear current matirux
    globalMachineArray = [];
    //retrieving unsorted matrix with all machines
    var localUnsortedMachineArray = new Firebase('https://sizzling-fire-1319.firebaseio.com/Maskiner');

    localUnsortedMachineArray.orderByChild("nomEffect").on("value", function(snapshot) {
    //resets LoopCounter to 0 so we get ordered list in dropdpwn meny
    globalMachineArray = [];

    //Ordering localUnsortedMachineArray by nominal effect
    localUnsortedMachineArray.orderByChild("nomEffect").on("child_added", function(snapshot) {

    //Add machine to gloval objectArray
    globalMachineArray.push(snapshot.val());
    });
    });
  }
});

//function calculating hot water consumption
var updateHotWater = function () {
  if ($("#area").val() != ""){
    var area = parseFloat($('#area').val());
  }else{
    var area = 0;
  }
  var forbruk = Math.floor(globalDHW * area);
  $("#tappevannEnergy").html(formatNumberWithThousandSpace(forbruk) + ' kWh');

};

//function to get the correct climateZone, A, B or C.
var getGlobalTemperatureArray = function (yearMeanInput,tempDOTinput){
  var localMunicipalspecificZoneTempArray = [];
  //getYearMeanIndex is function retrieving the position of the rounded down year mean temperature
  var yearMeanIndex = getYearMeanIndex (yearMeanInput);
  //empty current specific temperatureArray
  globalTemperatureArray = [];
  //define relevant climateZonearray
  if (climateZoneIndex == 1 || climateZoneIndex == 3 || climateZoneIndex == 5){
    localMunicipalspecificZoneTempArray = globalInlandTempArray;
  }
  if (climateZoneIndex == 2 || climateZoneIndex == 4 || climateZoneIndex == 6){
    localMunicipalspecificZoneTempArray = globalCoastTempArray;
  }
  if (climateZoneIndex == 7){
    localMunicipalspecificZoneTempArray = globalMixTempArray;
  }
  //defining positions for interpolation
  var i = yearMeanIndex;
  var j = yearMeanIndex +1;
  //defining number of datapoints
  var n = globalDurationArray.length;
  globalTemperatureArray.push(tempDOTinput);
  if (i == j){
    for (m=1; m < n; m++){
      globalTemperatureArray.push(localMunicipalspecificZoneTempArray[m][yearMeanIndex]);
     }
   }else {
   for (m=1; m < n; m++){
     globalTemperatureArray.push(( yearMeanInput - localMunicipalspecificZoneTempArray[0][i]) * (localMunicipalspecificZoneTempArray[m][j] - localMunicipalspecificZoneTempArray[m][i]) + localMunicipalspecificZoneTempArray[m][i]);
   }
 }
};


//Function calculating energy use, deilvered energy and energy need - populates GraphArray
var getEffectAndEnergyDeliveredAndEnergyNeed = function () {

  //set global arrays to zero
  globalEffectDelivered = [];
  globalEffectNeed = [];
  globalEffectUsed = [];
  globalEnergyDelivered = 0;
  globalEnergyNeed =0;
  globalEnergyUsed =0;
  //define relevant variables for calcualtion
  //var effectDOT = parseFloat($('#buildingEffectNeed').val().replace(',','.'));
  //var heatingFrom = parseFloat($('#buildingHeatingFrom').val().replace(',','.'));
  var numberMachines = 1;//parseFloat($('#numberOfMachines').val());
  var effectNow = 0;
  var heatingFrom = 12;
  var effectDOT = 12;
  //var area = parseFloat($('#buildingBRA').val().replace(',','.'));
  var effectLast = 0;
  var temperature = 0;
  var durationNow = 0;
  var durationLast = 0;
  var corrFactor = 1;
  var temperatureLast= globalTempDOT;
  globalAdditionFrom = globalTempDOT;
  var machineTempArray = [];
  var machineMaxUseArray = [];
  var machineMaxDeliverArray = [];

  //defines new durationarray and the array for grahing
  var localDurationArray = [];
  for (var i = 0; i < 366 ; i++){
      localDurationArray.push(i)
  }

  //defines new outdoor temperatureArray
  var localTemperatureArray = [];
  localTemperatureArray.push(globalTempDOT);
  var n = 0;
  for (var i = 1; i < localDurationArray.length; i++){
    while (n < globalDurationArray.length && localDurationArray[i] > globalDurationArray[n]) {
      n++;
    }
    localTemperatureArray.push(Math.round(((localDurationArray[i] - globalDurationArray[n-1]) * (globalTemperatureArray[n] - globalTemperatureArray[n-1])/(globalDurationArray[n] - globalDurationArray[n-1]) + globalTemperatureArray[n-1])*10)/10);
  }

  // get relevant machinedata
  var machineIndex = 3;
  var machine = globalMachineArray[machineIndex];

  //getting number of children in machine object
  var machineChildren = 0;
  for (var key in machine){
    machineChildren++;
  }
  globalMachineNomEffect = machine.nomEffect;

  //exporting the relevant data for the machine
  for (var n = 1; n < machineChildren-1; n++){
    if (n/2 == Math.floor(n/2) ){
      machineTempArray.push(machine[n][0]);
      machineMaxUseArray.push(machine[n][1] * numberMachines/1000);
    }else{
      machineMaxDeliverArray.push(machine[n][1] * numberMachines/1000);
  }
  };

  //variables for calculation
  var counter = 0;
  var localMachineDeliverCurrentTemp = 0;
  var localMachineUseCurrentTemp = 0;
  var localMachineDeliverLastTemp = 0;
  var localMachineUseLastTemp = 0;
  var localMachineUseLow = 0;
  var localMachineUseHigh = 0;
  var localMachineDeliverLow = 0;
  var localMachineDeliverHigh = 0;

  //calculate the effectNeed and energyNeed
  for (var i=0; i < localDurationArray.length; i++){


    temperature = localTemperatureArray[i];
    durationNow = localDurationArray[i];
    corrFactor = getDefrostCorrect(temperature);
    //checks if outdoor temperature is such that there is no need for heating
    if(temperature < heatingFrom) {
      var m =0;
      //checks if current termperature is outside defined operational area

      if (temperature < machineTempArray[machineTempArray.length-1]) {
        localMachineDeliverCurrentTemp = (machineMaxDeliverArray[machineMaxDeliverArray.length-1] - (machineTempArray[machineTempArray.length-1] - temperature ) * (machineMaxDeliverArray[machineMaxDeliverArray.length-2] - machineMaxDeliverArray[machineMaxDeliverArray.length-1]) / (machineTempArray[machineTempArray.length-2] - machineTempArray[machineTempArray.length-1]));
        localMachineUseCurrentTemp = (machineMaxUseArray[machineMaxUseArray.length-1] - (machineTempArray[machineTempArray.length-1] - temperature ) * (machineMaxUseArray[machineMaxUseArray.length-2] - machineMaxUseArray[machineMaxUseArray.length-1]) / (machineTempArray[machineTempArray.length-2] - machineTempArray[machineTempArray.length-1]));
      }else {
        //get machineTempArrayIndex, m

        while (m < (machineTempArray.length-1) && machineTempArray[m] > temperature) {
          m++;
        }
        localMachineUseLow = machineMaxUseArray[m];
        localMachineUseHigh = machineMaxUseArray[m-1];
        localMachineDeliverLow = corrFactor * machineMaxDeliverArray[m];
        localMachineDeliverHigh = corrFactor * machineMaxDeliverArray[m-1];
        localMachineUseCurrentTemp = ((temperature -machineTempArray[m])/(machineTempArray[m-1] -machineTempArray[m])*(localMachineUseHigh - localMachineUseLow) + localMachineUseLow);
        localMachineDeliverCurrentTemp = corrFactor * ((temperature -machineTempArray[m])/(machineTempArray[m-1] -machineTempArray[m])*(localMachineDeliverHigh - localMachineDeliverLow) + localMachineDeliverLow);
      }
      effectNow = effectDOT * ((temperature - heatingFrom) / ( globalTempDOT - heatingFrom ));
      if (localMachineDeliverCurrentTemp >= effectNow){
          if(temperature < machineTempArray[machineTempArray.length-1]){
              localMachineUseCurrentTemp = effectNow * localMachineUseCurrentTemp / localMachineDeliverCurrentTemp;
          }else{
          localMachineUseCurrentTemp = effectNow / getEffectAndEnergyUsedPartialLoad(m, (effectNow / numberMachines), machine, localMachineDeliverCurrentTemp, localMachineUseCurrentTemp,temperature, corrFactor);
          }
          localMachineDeliverCurrentTemp = effectNow;
      }else{
        globalAdditionFrom = temperature;
      }
    }else {
      effectNow = 0;
      localMachineUseCurrentTemp = 0;
      localMachineDeliverCurrentTemp = 0;

    }
    if (counter > 0){
      durationLast = localDurationArray[i-1];
      globalEnergyDelivered = globalEnergyDelivered + ((durationNow - durationLast ) * (localMachineDeliverCurrentTemp + localMachineDeliverLastTemp)*24/2);
      globalEnergyUsed = globalEnergyUsed + ((durationNow - durationLast ) * (localMachineUseCurrentTemp + localMachineUseLastTemp)*24/2);
      globalEnergyNeed= globalEnergyNeed + ((durationNow - durationLast ) * (effectNow + effectLast)*24/2 );
    }
    if (counter == 0){
      globalMachineDeliverDOT = localMachineDeliverCurrentTemp;
    }

    globalEnergyDelivered = Math.round(globalEnergyDelivered);
    globalEnergyUsed = Math.round(globalEnergyUsed);
    globalEnergyNeed = Math.round(globalEnergyNeed);
    globalEffectDelivered.push(Math.round(localMachineDeliverCurrentTemp*100)/100);
    globalEffectUsed.push(Math.round(localMachineUseCurrentTemp*100)/100);
    globalEffectNeed.push(Math.round(effectNow*100)/100);
    effectLast = effectNow;
    counter++;
    localMachineDeliverLastTemp = localMachineDeliverCurrentTemp;
    localMachineUseLastTemp = localMachineUseCurrentTemp;
  }
  //Now that we have all numbers, we define the graph
  var graphTime = [];
  var graphEffectNeed = [];
  var graphEffectDeliver = [];
  var graphEffectUse = [];
  graphArray = [];
  for ( i = 0; i < 37 ; i++){
    graphTime.push(i*10);
    graphEffectNeed.push(globalEffectNeed[i*10]);
    graphEffectDeliver.push(globalEffectDelivered[i*10]);
    graphEffectUse.push(globalEffectUsed[i*10]);
  }
  graphTime.push(365);
  graphEffectNeed.push(0);
  graphEffectDeliver.push(0);
  graphEffectUse.push(0);

  //Push all arrays to an Array og arrays
  graphArray.push(graphTime);
  graphArray.push(graphEffectNeed);
  graphArray.push(graphEffectDeliver);
  graphArray.push(graphEffectUse);
};


//Function calculating energy use, deilvered energy and energy need - populates GraphArray
var getEffectFromEnergy = function (energiforbruk, balansetemperatur, areal) {
  //defining necessary variables
  var localEnergyNeed = 0;

  //retrieving relevant variables for calcualtion
  var effectDOT = energiforbruk/2000;
  var heatingFrom = balansetemperatur;
  var reportedEnergyNeed = energiforbruk;
  var tappevannForbruk = Math.floor(globalDHW * areal);
  var tappevannEffekt = Math.round(tappevannForbruk *10/(365*24))/10;
  var effectNow = 0;
  var effectLast = 0;
  var temperature = 0;
  var durationNow = 0;
  var durationLast = 0;
  var temperatureLast = globalTempDOT;

  reportedEnergyNeed = reportedEnergyNeed - tappevannForbruk;
  if (reportedEnergyNeed > 0) {
  //defines new durationarray and the array for grahing
  var localDurationArray = [];
  for (var i = 0; i < 366 ; i++){
      localDurationArray.push(i)
  }

  //defines new outdoor temperatureArray
  var localTemperatureArray = [];
  localTemperatureArray.push(globalTempDOT);
  var n = 0;
  for (var i = 1; i < localDurationArray.length; i++){
    while (n < globalDurationArray.length && localDurationArray[i] > globalDurationArray[n]) {
      n++;
    }
    localTemperatureArray.push(Math.round(((localDurationArray[i] - globalDurationArray[n-1]) * (globalTemperatureArray[n] - globalTemperatureArray[n-1])/(globalDurationArray[n] - globalDurationArray[n-1]) + globalTemperatureArray[n-1])*10)/10);
  }
  var counterWhile = 0;

  while ( Math.abs(localEnergyNeed - reportedEnergyNeed) > 250){

    //variables for calculation

    if (counterWhile > 0) {
      if (localEnergyNeed > reportedEnergyNeed){
        effectDOT = effectDOT - 0.1;
      }
      if (localEnergyNeed < reportedEnergyNeed){
        effectDOT = effectDOT + 0.1;
      }
    }
    localEnergyNeed = 0;
    var counterLoop = 0;
    //calculate the effectNeed and energyNeed
    for (var i=0; i < localDurationArray.length; i++){

      temperature = localTemperatureArray[i];
      durationNow = localDurationArray[i];
      //checks if outdoor temperature is such that there is no need for heating
      if(temperature < heatingFrom) {
        effectNow = effectDOT * ((temperature - heatingFrom) / ( globalTempDOT - heatingFrom ));
      }else {
        effectNow = 0;
      }
      if (counterLoop > 0){
        durationLast = localDurationArray[i-1];
        localEnergyNeed= localEnergyNeed + ((durationNow - durationLast ) * (effectNow + effectLast)*24/2 );
      }
      localEnergyNeed = Math.round(localEnergyNeed);
      effectLast = effectNow;
      counterLoop++;
    }
    counterWhile++
  }

  return (Math.round(10 * (effectDOT +tappevannEffekt))/10);

  }
  return 0;
};

//Function identifying the relevant partial load and returns the cop at this poitn
var getEffectAndEnergyUsedPartialLoad = function (m, effectNeed, chosenMachine, deliveredEffect, usedeffect, temperature, corrFactor) {
  if (m == 0){
    m=1;
  }
  //defining variables for calculation
  var deliverHighLine = chosenMachine[(m*2-1)];
  var deliverLowLine = chosenMachine[(m*2+1)];
  var useHighLine = chosenMachine[(m*2)];
  var useLowLine = chosenMachine[(m*2+2)];
  var tempHigh = deliverHighLine[0];
  var tempLow = deliverLowLine[0];
  var effectsDeliverHigh = [];
  var effectsDeliverLow = [];
  var effectsUseHigh = [];
  var effectsUseLow = [];
  //getting all effectdata at the line above and below the current temperature
  for (var i = 1; i < 11; i++){
    effectsDeliverHigh.push(deliverHighLine[i]/1000);
    effectsDeliverLow.push(deliverLowLine[i]/1000);
    effectsUseHigh.push(useHighLine[i]/1000);
    effectsUseLow.push(useLowLine[i]/1000);
  }
  loadIndex = 0;
  //defining startingpoint for parLoadcalculation
  partLoadDeliverHigh = deliveredEffect;
  partLoadUseHigh = usedeffect;

  //checking which partload we are at
  while (partLoadDeliverHigh > effectNeed && loadIndex < 9 ){
    partLoadDeliverHigh = corrFactor * ((effectsDeliverHigh[loadIndex] - effectsDeliverLow[loadIndex])/(tempHigh - tempLow)*(temperature - tempLow) + effectsDeliverLow[loadIndex]);
    partLoadUseHigh = (effectsUseHigh[loadIndex] - effectsUseLow[loadIndex])/(tempHigh - tempLow)*(temperature - tempLow) + effectsUseLow[loadIndex];
    loadIndex++;
  }
  if (loadIndex == 9){
    partLoadDeliverHigh = corrFactor * ((effectsDeliverHigh[loadIndex] - effectsDeliverLow[loadIndex])/(tempHigh - tempLow)*(temperature - tempLow) + effectsDeliverLow[loadIndex]);
    partLoadUseHigh = (effectsUseHigh[loadIndex] - effectsUseLow[loadIndex])/(tempHigh - tempLow)*(temperature - tempLow) + effectsUseLow[loadIndex];
    return partLoadDeliverHigh/partLoadUseHigh;
  }else{
    var partLoadUseLow = partLoadUseHigh;
    partLoadUseHigh = (effectsUseHigh[loadIndex-2] - effectsUseLow[loadIndex-2])/(tempHigh - tempLow)*(temperature - tempLow) + effectsUseLow[loadIndex-2];
    var partLoadDeliverLow = partLoadDeliverHigh;
    partLoadDeliverHigh = (effectsDeliverHigh[loadIndex-2] - effectsDeliverLow[loadIndex-2])/(tempHigh - tempLow)*(temperature - tempLow) + effectsDeliverLow[loadIndex-2];
    var useNow = (partLoadUseHigh - partLoadUseLow)/(partLoadDeliverHigh - partLoadDeliverLow)*(effectNeed - partLoadDeliverLow) + partLoadUseLow;
  return effectNeed/useNow;
  }
};

//function to append legend to chart
var legendAppend = function(result,machineDeliverEnergy,machineUseEnergy) {

    var canvas = document.getElementById('chart');
    var auxiliary = $(document.getElementById('printLineText26')).text();
    var delivered = $(document.getElementById('printLineText20')).text();
    var used = $(document.getElementById('printLineText22')).text();
    $('.legend').html($('<section class="color-sample" style="font-size: 9px; border-color: rgba(95, 104, 255, 1); background-color: rgba(0, 0, 100,0.5);"></section><span id= "legendLabelText1">' + auxiliary +'</span></br><br><section class="color-sample" style="font-size: 9px; border-color: rgba(112, 190, 72, 1); background-color: rgba(100, 230, 100, 0.5);"></section><span id= "legendLabelText2">' + delivered + '</span></br><br><section class="color-sample" style="font-size: 9px; border-color: rgba(202, 49, 0, 1); background-color: rgba(255, 155, 100, 0.5);"></section><span id= "legendLabelText3">' + used + '</span></br><br>'
    ))
};

// FUnction defining the defrost correction factor
var getDefrostCorrect = function (temperature){
  if (temperature >= -5 && temperature <= 5){
    return (2 *(temperature * temperature)/500 + 0.9);
  }else{
    return 1;
  }
};

//Function adding information about newly added machine to database
var displayMachineKeyValues = function (name, effect, cop) {
  $('#messagesDiv').append($('<br>' + name + '</br>'));
  $('#messagesDiv').append($('<br> Effect :' + effect + '  COP :' + cop + '</br>'));
};

//Function returning the yearminIndex - used for interpolation
var getYearMeanIndex = function(tempMeanInput){
  if (Math.floor(tempMeanInput) == -3 || Math.floor(tempMeanInput) <= -3 ){
    return 1;
  }else if(Math.floor(tempMeanInput) == -2){
    return 2;
  }else if(Math.floor(tempMeanInput) == -1){
    return 3;
  }else if(Math.floor(tempMeanInput) == 0){
    return 4;
  }else if(Math.floor(tempMeanInput) == 1){
    return 5;
  }else if(Math.floor(tempMeanInput) == 2){
    return 6;
  }else if(Math.floor(tempMeanInput) == 3){
    return 7;
  }else if(Math.floor(tempMeanInput) == 4){
    return 8;
  }else if(Math.floor(tempMeanInput) == 5){
    return 9;
  }else if(Math.floor(tempMeanInput) == 6){
    return 10;
  }else if(Math.floor(tempMeanInput) == 7){
    return 11;
  }else if(Math.floor(tempMeanInput) == 8 || Math.floor(tempMeanInput) >= 8){
    return 12;
  }
};

var getVentilationEnergyNeed = function(localVentilationAmountInOperation,localVentilationAmountOutsideOperation,localVentilationDuration){

    getGlobalTemperatureArray(globalTempMean,globalTempDOT);

  //get efficiency of thermal wheel
  var localVentilationHeatRecovery = globalVentilasjon.gjenvinner[$('#standardEffectEnergyInfoRegulation').val()]/100;

  //define relevant variables for calcualtion
  var localArea = parseFloat($('#area').val().replace(',','.'));
  var effectNow = 0;
  var effectLast = 0;
  var temperature = 0;
  var durationNow = 0;
  var durationLast = 0;
  var temperatureLast= (localVentilationHeatRecovery) * (21 - globalTempDOT) + globalTempDOT;
  var counter = 0;
  var localVentEnergyNeed = 0;

  //defines new durationarray
  var localDurationArray = [];
  for (var i = 0; i < 366 ; i++){
      localDurationArray.push(i)
  }
  //defines new outdoor temperatureArray
  var localTemperatureArray = [];
  localTemperatureArray.push(globalTempDOT);
  var n = 0;
  for (var i = 1; i < localDurationArray.length; i++){
    while (n < globalDurationArray.length && localDurationArray[i] > globalDurationArray[n]) {
      n++;
    }
    localTemperatureArray.push(Math.round(((localDurationArray[i] - globalDurationArray[n-1]) * (globalTemperatureArray[n] - globalTemperatureArray[n-1])/(globalDurationArray[n] - globalDurationArray[n-1]) + globalTemperatureArray[n-1])*10)/10);
  }

  //calculate the effectNeed and energyNeed
  for (var i=0; i < localDurationArray.length; i++){

    temperature = (localVentilationHeatRecovery) * (21 - localTemperatureArray[i]) + localTemperatureArray[i];
    durationNow = localDurationArray[i];
    //checks if outdoor temperature is such that there is no need for heating
    if(temperature < 19) {
      effectNow = localArea * localVentilationAmountInOperation * 1.005 * 1.2 * (19 - temperature)/3600;
    }else {
      effectNow = 0;
    }
    if (counter > 0){
      durationLast = localDurationArray[i-1];
      localVentEnergyNeed = localVentEnergyNeed + ((durationNow - durationLast ) * (effectNow + effectLast)*24/2 )*localVentilationDuration + ((durationNow - durationLast ) * (effectNow + effectLast)*24/2 )* (1-localVentilationDuration) * localVentilationAmountOutsideOperation / localVentilationAmountInOperation;
    }
    effectLast = effectNow;
    counter++;
  }
  localVentEnergyNeed = Math.round(localVentEnergyNeed);
  return localVentEnergyNeed;

};

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

var updateRegulationFormValues = function () {

  var localCategory = $('#localCategory').val();
  if ($('#buildingYear').val() >= 2015 ){
    var localRamme = globalTEKramme["TEK15"];
    var localVentilationSFP = globalVentilasjon.sfp["TEK15"];
    var localVentilationHeatRecovery = globalVentilasjon.gjenvinner["TEK15"]/100;

  }
  if ($('#buildingYear').val() >= 2010 && $('#buildingYear').val() < 2015){
    var localRamme = globalTEKramme["TEK10"];
    var localVentilationSFP = globalVentilasjon.sfp["TEK10"];
    var localVentilationHeatRecovery = globalVentilasjon.gjenvinner["TEK10"]/100;
  }

  var localArea = parseFloat($('#area').val().replace(',','.'));
  var localDegreeDays = globalDegreeDays;

    //addition to energyRegulation if we have Småhus or Boligblokk
    var additionEnergyRegulation = 1600 / localArea;
    var additionSFP = 0.5;

      //defining necessary variables to calculate effect and energy need for ventilation
    var localVentilationAmountInOperation = globalVentilasjon.mengde[localCategory].drift;
    var localVentilationAmountOutsideOperation = globalVentilasjon.mengde[localCategory].utendrift;
    var localVentilationDuration = globalVentilasjon.mengde[localCategory].andel;
    var localTempAfterRecovery = (localVentilationHeatRecovery) * (21 - globalTempDOT) + globalTempDOT;
     localVentilationSFP = localVentilationSFP + additionSFP;

    //retrieving standard values
    //ONLY VALID FOR TEK10, TEK15, Lavenergi and Passivhus --> Need to add functionality for Lavenergi og Passivhus
    var localCooling = globalKjoling[localCategory];
    var localCoolingTotal = Math.round(localCooling*localArea);
    var localTechnicalEquipment = globalUtstyr[localCategory];
    var localTechnicalEquipmentTotal = Math.round(localTechnicalEquipment*localArea);
    var localLigthing = globalBelysning[localCategory];
    var localLigthingTotal = Math.round(localLigthing*localArea);
    var localHotWater = globalVarmtvann[localCategory];

    //calculating the energyneed
    var localFansAndPumps = Math.round(10*(localVentilationSFP*(localVentilationAmountInOperation*localVentilationDuration + localVentilationAmountOutsideOperation*(1-localVentilationDuration))*365*24/3600))/10;
    var localFansAndPumpsTotal = Math.round(localFansAndPumps*localArea);
    var localHotWaterEnergy = Math.round(localHotWater * localArea);
    var localVentilationEnergy = getVentilationEnergyNeed(localVentilationAmountInOperation,localVentilationAmountOutsideOperation,localVentilationDuration);
    var localEnergyRegulation = Math.round(10*(localFansAndPumps + localLigthing + localCooling + localHotWater + localTechnicalEquipment + (localRamme[localCategory] + additionEnergyRegulation - localFansAndPumps - localLigthing - localCooling - localHotWater - localTechnicalEquipment )*localDegreeDays/4005))/10;
    var localEnergyRegulationTotal = Math.round(localEnergyRegulation*localArea);
    //calculating the energy left over for room heating
    var localHeating = Math.round(10*(localEnergyRegulation - (localCooling + localTechnicalEquipment + localLigthing + localHotWater + localFansAndPumps + localVentilationEnergy/localArea)))/10;
    var localHeatingEnergy = Math.round(localHeating*localArea);
    //Calculating the effect needs
    var localHotWaterEffect = Math.round(10 *localHotWaterEnergy/(365 * 24))/10;
    var localVentilationEffect = Math.round(10*(localArea * localVentilationAmountInOperation * 1.005 * 1.2 * (19 - localTempAfterRecovery)/3600))/10;
    var localHeatingEffect =  Math.round(10*(0.035*localArea / (21 + 20) * (21 - globalTempDOT) - localVentilationEffect))/10;

    //ventilation specific and total
    var localVentilationSpecific = Math.round(10*localVentilationEnergy/localArea)/10;
    localVentilationEnergy = Math.round(localVentilationSpecific * localArea);
    //SUM heatingSpecific, totalt and effect
    var localSumHeatingSpecific = Math.round(10*(localHeating + localHotWater + localVentilationSpecific))/10;
    var localSumHeatingTotal = Math.round(localHeating*localArea) + localVentilationEnergy + localHotWaterEnergy;
    var localSUmHeatingEffect = Math.round(10*(localHeatingEffect + localVentilationEffect + localHotWaterEffect))/10;

    //updates the table
    $('#normtallEnergy').html(formatNumberWithThousandSpace(localHeatingEnergy + localVentilationEnergy) + " kWh");
    $('#normtallEnergyTotalt').html(formatNumberWithThousandSpace(localHeatingEnergy + localVentilationEnergy + localArea*globalDHW) + " kWh");

};


var updateHistoricalvalues = function (){
  var temp = globalTempMean;
  var area = parseFloat($('#area').val());
  var year = parseFloat($('#buildingYear').val());
  if(area == ""){area=0;}
  if( !$('#buildingYear').val()){year=0;}

  //define the temperatureinterval
  if (temp <=0){
  var localEnergyUse = globalNomrtall['arsmiddel0'];
  }
  if (temp >0 && temp <3){
  var localEnergyUse = globalNomrtall['arsmiddel0'];
  }
  if (temp >=3 && temp <5){
  var localEnergyUse = globalNomrtall['arsmiddel3'];
  }
  if (temp >=5 && temp <7){
  var localEnergyUse = globalNomrtall['arsmiddel5'];
  }
  if (temp >=7){
  var localEnergyUse = globalNomrtall['arsmiddel7'];
  }

  //define buildingYearinterval
  //define the temperatureinterval
  if (year <=1949){
  var yearPeriodLookUp = "1900";
  var intervalYear = " - 1949";
  }
  if (year >1949 && year <1966){
  var yearPeriodLookUp = "1950";
  var intervalYear = " 1950 - 1965";
  }
  if (year >=1966 && year <1976){
  var yearPeriodLookUp = "1966";
  var intervalYear = " 1966 - 1975";
  }
  if (year >=1976 && year <1981){
  var yearPeriodLookUp = "1976";
  var intervalYear = " 1976 - 1980";
  }
  if (year >=1981){
  var yearPeriodLookUp = "1981";
  var intervalYear = " 1980 - ";
  }

  if(  $("#municipality").val() != "" && $("#area").val() != "" ){
    var tempForbruk = Math.round(parseFloat(localEnergyUse['1']['villa'][yearPeriodLookUp]) * area) ;
      tempForbruk = tempForbruk + Math.round(parseFloat(localEnergyUse['2']['villa'][yearPeriodLookUp]) * area);
      tempForbruk = tempForbruk + Math.round(parseFloat(localEnergyUse['3']['villa'][yearPeriodLookUp]) * area);
      tempForbruk = tempForbruk + Math.round(parseFloat(localEnergyUse['4']['villa'][yearPeriodLookUp]) * area);
      tempForbruk = tempForbruk + Math.round(parseFloat(localEnergyUse['5']['villa'][yearPeriodLookUp]) * area);
      tempForbruk = tempForbruk + Math.round(parseFloat(localEnergyUse['6']['villa'][yearPeriodLookUp]) * area);
      tempForbruk = tempForbruk + Math.round(parseFloat(localEnergyUse['7']['villa'][yearPeriodLookUp]) * area);
      tempForbruk = tempForbruk + Math.round(parseFloat(localEnergyUse['8']['villa'][yearPeriodLookUp]) * area) ;
      tempforbruk = tempForbruk/8 - area * 15;
  $('#normtallEnergy').html( formatNumberWithThousandSpace(Math.round(tempforbruk)) + ' kWh' );
  $('#normtallEnergyTotalt').html( formatNumberWithThousandSpace(Math.round(tempforbruk) + globalDHW*area) + ' kWh' );
}};

var updateEffectValues = function (){
  var area = parseFloat($('#area').val().replace(',','.'));
  var histForbruk = parseFloat($('#historiskForbruk').val().replace(',','.'));
  var balTemp = parseFloat($('#balanseTempVerdi').val().replace(',','.'));
  var totEffect = getEffectFromEnergy(histForbruk, balTemp, area);
  var dhWEffect = Math.round(globalDHW*area/(365*24)*10)/10;
  $('#effecFromEnergyValue').html(totEffect);
  //inserting the value for effect in calculation step
  $("#effektBehovUtdata").html(totEffect + ' kW');
  $("#effektBehovSpesifikkUtdata").html( Math.round((totEffect - dhWEffect)*1000/area*10)/10 + ' W/m&sup2');
  $("#effektBehovRomUtdata").html(Math.round((totEffect - dhWEffect)*10)/10 + ' kW');
  $("#effektBehovTappevannUtdata").html( dhWEffect + ' kW');


  //$("#buildingEffectNeed").trigger("input");
};

var exampleGraphEffectCalc = function (){

  getGlobalTemperatureArray(globalTempMean,globalTempDOT);

  var energibehov = 20000;
  var heatingFrom = parseFloat($('#sliderRange').val());
  var effectDOT = getEffectFromEnergy(energibehov,heatingFrom, 1);
  exampleEffectNeed = [];
  var effectNow = 0;
  var effectLast = 0;
  var temperature = 0;
  var durationNow = 0;
  var durationLast = 0;
  var temperatureLast= globalTempDOT;
  graphExampleTime = [];
  graphExampleEffectNeed = [];
  graphExampleArray = [];

  //defines new durationarray and the array for grahing
  var localDurationArray = [];
  for (var i = 0; i < 366 ; i++){
      localDurationArray.push(i)
  }

  //defines new outdoor temperatureArray
  var localTemperatureArray = [];
  localTemperatureArray.push(globalTempDOT);
  var n = 0;
  for (var i = 1; i < localDurationArray.length; i++){
    while (n < globalDurationArray.length && localDurationArray[i] > globalDurationArray[n]) {
      n++;
    }
    localTemperatureArray.push(Math.round(((localDurationArray[i] - globalDurationArray[n-1]) * (globalTemperatureArray[n] - globalTemperatureArray[n-1])/(globalDurationArray[n] - globalDurationArray[n-1]) + globalTemperatureArray[n-1])*10)/10);
  }

  //variables for calculation
  var counter = 0;

  //calculate the effectNeed and energyNeed
  for (var i=0; i < localDurationArray.length; i++){


    temperature = localTemperatureArray[i];
    durationNow = localDurationArray[i];

    if( temperature > heatingFrom ){
      effectNow = 0;
    }else{
      effectNow = effectDOT * ((temperature - heatingFrom) / ( globalTempDOT - heatingFrom ));
    }
    exampleEffectNeed.push(Math.round(effectNow*100)/100);
    effectLast = effectNow;
    counter++;
  }
  //Now that we have all numbers, we define the graph
  var graphExampleTime = [];
  var graphExampleEffectNeed = [];

  for ( i = 0; i < 74 ; i++){
    graphExampleTime.push(i*5);
    graphExampleEffectNeed.push(exampleEffectNeed[i*5]);
  }
  graphExampleTime.push(365);
  graphExampleEffectNeed.push(0);

  var grafMax = effectDOT*1.4;

  var options = {
      series: {
          lines: {
            show: true,
            fill: true,
            fillColor: {
              colors: [
                { opacity: 0.3 }, { opacity: 1}
              ]}
            },
          points: { show: false,
            fill: false
          }},
      yaxis: {
        max: 15
      },
      legend: {
        backgroundOpacity: 0,
      },
       colors: ["#0022FF"],
  };
    var data = new Array(74);
    for (var i = 0; i < 74; i++) {
      data[i] = new Array(2);
    }
    for (var j = 0; j < 74; j++) {
      data[j][0] = graphExampleTime[j];
      data[j][1] = graphExampleEffectNeed[j];
    }

var dataset = [
    {
        label: "Effekt- varighetskurve",
        data: data
    }
];

  var plot = $.plot($("#placeholder"), dataset, options);

};

//Functions for when domestic hot water radio buttons is selected
jQuery('input:radio[name="forbruk"]').on('change',function(event){
  $('.outputArea').slideUp();
  if (this.value == 'none') {
    globalDHW = 0;
    updateHotWater();
  };
  if (this.value == 'low') {
    globalDHW = 20;
    updateHotWater();
  };
  if (this.value == 'normal') {
    globalDHW = 30;
    updateHotWater();
  };
  if (this.value == 'high') {
    globalDHW = 40;
    updateHotWater();
  };
  updateEffectValues();
  if ($('#buildingYear').val() <2010){updateHistoricalvalues();}
  else{updateRegulationFormValues();}

});

//----------------------Chart and machines------------------------------------
jQuery('#numberOfMachines').on('change',function(event){
  $('#offerNumberOfMachine').val(this.value);
});
jQuery('#machines').on('change',function(event){
  $('#offerMachine').val(this.value);
  $('#offerMachine').trigger("change");

});



//button emptying all inputcells in form
jQuery('.submitChart2').on('click',function(event){
  var elements = document.getElementById('inputSection').getElementsByTagName('input');

  for (var i = 0; i < elements.length; i++) {
      $(elements[i]).val("");
    }
});

  //Button genrating graph and global temperatureArray + MachineArray
jQuery('.submitChart1').on('click',function(event){
    getGlobalTemperatureArray(globalTempMean,globalTempDOT);
    getEffectAndEnergyDeliveredAndEnergyNeed();

    createChart();
    //legendAppend(globalEnergyNeed, globalEnergyDelivered, globalEnergyUsed);
  }
);


  // Update values live
$('#area').on('input', function() {
  if(!$(this).val()){
    $(this).val(0);
  }
  if($('#buildingYear').val() != "" && $('#municipality').val() != "" && $('#area').val() != ""){
    if ($('#buildingYear').val() <2010){
      updateHistoricalvalues();
    }
    else{
      updateRegulationFormValues();
    }
  }
  //updates dhw values
  updateHotWater();
});


  // Update values live
  $('#buildingYear').on('input', function() {
    $("#buildingYear").css("background-color", "white");
    if ($('#buildingYear').val() <2010){updateHistoricalvalues();}
    else{updateRegulationFormValues();}
  });


  // Update values live
  $('#historiskForbruk').on('input', function() {
      $("#energibehovUtdata").html(formatNumberWithThousandSpace(this.value) + " kWh");
    if ( $("#balanseTempVerdi").val() != "" && $("#municipality").val() != ""){
      getGlobalTemperatureArray(globalTempMean,globalTempDOT);
      updateEffectValues();
    }
  });


  // Update values live
  $('#balanseTempVerdi').on('input', function() {
    $("#balanseTempVerdiUtdata").html(this.value +"&#176;C");
    if ( $("#historiskForbruk").val() != "" && $("#municipality").val() != ""){
      getGlobalTemperatureArray(globalTempMean,globalTempDOT);
      updateEffectValues();
    }
  });


$('#buildingYear').on('input', function() {
  if($("#buildingYear").val() >=2015 ){
    $("#balanseTempVerdi").val(10);
    $("#balanseTempVerdiUtdata").html("10 &#176;C");
   }else if($("#buildingYear").val() >=2010 ){
      $("#balanseTempVerdi").val(12);
      $("#balanseTempVerdiUtdata").html("12 &#176;C");
      }else if($("#buildingYear").val() >=2000 ){
        $("#balanseTempVerdi").val(13);
        $("#balanseTempVerdiUtdata").html("13 &#176;C");
        } else if($("#buildingYear").val() >=1990 ){
          $("#balanseTempVerdi").val(14);
          $("#balanseTempVerdiUtdata").html("14 &#176;C");
          } else if($("#buildingYear").val() >=1980 ){
            $("#balanseTempVerdi").val(15);
            $("#balanseTempVerdiUtdata").html("15 &#176;C");
            }else if($("#buildingYear").val() >=1970 ){
              $("#balanseTempVerdi").val(16);
              $("#balanseTempVerdiUtdata").html("16 &#176;C");
              }else if($("#buildingYear").val() >=1000 ){
                $("#balanseTempVerdi").val(17);
                $("#balanseTempVerdiUtdata").html("17 &#176;C");
                }
                if ( $("#area").val() != "" && $("#municipality").val() != "" ){
                    getGlobalTemperatureArray(globalTempMean,globalTempDOT);
                    updateEffectValues();
                  }
});

$('#yearMeanForCalculation').on('input', function() {
  globalTempMean = parseFloat($('#yearMeanForCalculation').val().replace(',','.'));
});

$('#dOTForCalculation').on('input', function() {
  globalTempDOT = parseFloat($('#dOTForCalculation').val().replace(',','.'));
});

















jQuery('.info').on('click', function(event){



  if($('#infoDiv' + this.id).is(":visible")){
    $('#infoDiv' + this.id).slideUp();
    $('#' + this.id).html("Les mer");
  }else{


    $('#infoDiv' + this.id).slideDown();
    $('#' + this.id).html("Vis mindre");
  }

  if( this.id == 5){
    exampleGraphEffectCalc();
  }

});




//////////////////////////////////// KNAPPPER ///////////////////////////////////////////
var effectCheck = function(){
  if ($('#buildingYear').val() >= 2015){
    if (parseFloat($('#effektBehovSpesifikkUtdata').text()) < 0.8 * (21 - $('#DUTverdi').val()) / 41 * 30){
      $('.blink').blink({
          delay: 400
      });
    }
  }

  if ($('#buildingYear').val() >= 2010 && $('#buildingYear').val() < 2015){
    if (parseFloat($('#effektBehovSpesifikkUtdata').text()) < 0.8 * (21 - $('#DUTverdi').val()) / 41 * 30){
      $('.blink').blink({
          delay: 400
      });
    }
  }
  if ($('#buildingYear').val() >= 1997 && $('#buildingYear').val() < 2010){
    if(parseFloat($('#effektBehovSpesifikkUtdata').text()) < 0.8 * (-1*$('#DUTverdi').val() + 20)) {
      $('.blink').blink({
          delay: 400
      });
    }
  }
  if ($('#buildingYear').val() < 1997){
    if(parseFloat($('#effektBehovSpesifikkUtdata').text()) < 0.8 * (-1.5*$('#DUTverdi').val() + 30)) {
      $('.blink').blink({
          delay: 400
      });
    }
  }
  if ($('#buildingYear').val() < 1987){
    if(parseFloat($('#effektBehovSpesifikkUtdata').text()) < 0.8  * (-1.8*$('#DUTverdi').val() + 37)) {
      $('.blink').blink({
          delay: 400
      });
    }
  }
}


jQuery('.estimer').on('click',function(event){
  if ($('#historiskForbruk').val() != "" && $('#municipality').val() != ""  && $('#buildingYear').val() != "" && $('#area').val() != ""){
  effectCheck();
  $('.outputArea').slideDown("slow");
  }
  else {
    if ($('#historiskForbruk').val() == ""){
      $('#historiskForbruk').css("background-color", "yellow");
    }
    if ($('#municipality').val() == ""){
      $('#municipality').css("background-color", "yellow");
    }
    if ($('#buildingYear').val() == ""){
      $('#buildingYear').css("background-color", "yellow");
    }
    if ($('#area').val() == ""){
      $('#area').css("background-color", "yellow");
    }
  }
});

jQuery('.inndata').on('input',function(event){

  $(this).css("background-color", "white");
  $('.outputArea').slideUp();
  $('.blink').unblink();
});

jQuery('#sliderRange').on('input',function(event){
  var slider = document.getElementById("myRange");
  var output = document.getElementById("sliderVerdi");
  output.innerHTML = this.value;
  exampleGraphEffectCalc();
});





jQuery('.printButton1').on('click',function(event){

  var heightBeforeResize = document.getElementById('chart').height;
  var widthBeforeResize =document.getElementById('chart').width;
  document.getElementById('chart').style.height = "380px";
  document.getElementById('chart').style.width = "700px";
  window.print();
  document.getElementById('chart').style.height = heightBeforeResize + "px";
  document.getElementById('chart').style.width = widthBeforeResize + "px";
});

jQuery('.printButton2').on('click',function(event){
  window.print();
});

});

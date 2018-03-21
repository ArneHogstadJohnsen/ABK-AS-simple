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
  var climateZoneIndex = 0;
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
  var globalCeilingEffect = 0;
  var globalFloorEffect = 0;
  var globalWindowEffect = 0 ;
  var globalFacadeEffect = 0;
  var globalSumTransmissionEffect = 0;
  var globalFormDOT = -20;
  var globalFormIndoor = 21;
  var globalVentilationHPEffect = 0;
  var globalInfiltrationEffect = 0;
  var globalSumEffect = 0;
  var globaltempafterThermalWheel = 8.7;
  var globalNomrtall = [];
  var globalMachineDeliverDOT = 0;
  var globalAdditionFrom = 0;
  var globalMachineNomEffect = 0;


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

      //Add number of machines in dropdown menu
      for (i = 2; i <10 ; i++){
      $('#numberOfMachines').append($('<option>' + i + '</option>'));
      $('#offerNumberOfMachine').append($('<option>' + i + '</option>'));
      }


      //Ordering localUnsortedMachineArray by nominal effect
      localUnsortedMachineArray.orderByChild("nomEffect").on("child_added", function(snapshot) {

      //Add machine to gloval objectArray
      globalMachineArray.push(snapshot.val());
      if ( loopCounter == 0){
        //Clear current values in dropdonmenu
        $('#machines').html("Loading");
        $('#offerMachine').html("Loading");
        $('#offerMachineInside').html("Loading");
        $('#offerMachineInside').append($('<option >BTP-E</option>'));
      }
      // Popluate dropdown menu and giv ID to all machines
      $('#machines').append($('<option id=' + index + '>' + snapshot.val().name + '</option>'));
      // Popluate offermenu and giv ID to all machines
      $('#offerMachine').append($('<option id=' + index + '>' + snapshot.val().name + '</option>'));
      // Increment index and loopCounter values to increase ID nummber and stom texptreplacement
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
      //autocompletes standard with values from Uverdier for
      $("#buildingStandard").autocomplete({
        source: localStandardArray,
        minLength: 1,
        select: function(event, ui) {
          $("#resultTextStandard").html(ui.item.value );
        }
      })
      .data("ui-autocomplete")._renderItem = function(ul, item) {
        return $("<li></li>").data("ui-autocomplete-item", item).append("<a>"+ item.value +' | ' + item.year + "</a>").appendTo(ul);
      };
      //autocompletes standard with values from Uverdier for
      $("#buildingStandard2").autocomplete({
        source: localStandardArray,
        minLength: 1,
        select: function(event, ui) {
          $("#buildingStandard2").val(ui.item.value );
          updateUvalueFormValues();
          updateEffectFormValues();
          updateFacadeEffectFormvalues();
          updateWindowEffectFormvalues();
          updateCeilingEffectFormvalues ();
          updateFloorwEffectFormvalues();
          //inserting the value for building standard and heatingstart in calculation step
          var yearArray = ui.item.range;
          var lastyearinrange = yearArray[yearArray.length -4] + yearArray[yearArray.length -3] + yearArray[yearArray.length -2] + yearArray[yearArray.length -1];
          $("#buildingYear").val(lastyearinrange);
          $("#buildingYear").trigger("input");
          $("#buildingYear").val("");
          $("#buildingStandard").val(ui.item.value);
          $("#resultTextStandard").html(ui.item.value );
        }
      })
      .data("ui-autocomplete")._renderItem = function(ul, item) {
        return $("<li></li>").data("ui-autocomplete-item", item).append("<a>"+ item.value +' | ' + item.year + "</a>").appendTo(ul);
      };
      //autocompletes standard with values from Uverdier for
      $("#standardEffectEnergyInfoRegulation").autocomplete({
        source: [ localStandardArray[0], localStandardArray[1] ],
        minLength: 1,
        select: function(event, ui) {
          if ( $("#municipalityEffectEnergyInfoRegulation").val() != "" && $("#buildingCategoryEffectEnergyInfoRegulation").val() != "" && $("#buildingBRAEffectEnergyInfoRegulation").val() != ""){
            getGlobalTemperatureArray(globalEnergyRegulationTemMean,globalEnergyRegulationTempDOT);
            updateRegulationFormValues();
          }
          //inserting the value for roomHeatingFrom in next step and in calculation step

          $("#effectFromEnergyRoomHeatingFrom").val(12);
          $("#effectFromEnergyBuildYear").val("");
          $("#buildingYear").val(2015);
          $("#buildingYear").trigger("input");
          $("#buildingYear").val("");
          $("#buildingStandard").val(ui.item.value);
          $("#resultTextStandard").html(ui.item.value );
        }
      })
      .data("ui-autocomplete")._renderItem = function(ul, item) {
        return $("<li></li>").data("ui-autocomplete-item", item).append("<a>"+ item.value +' | ' + item.year + "</a>").appendTo(ul);
      };

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
      //autocompletes standard with values from Uverdier for
      $("#buildingCategory").autocomplete({
        source: localCategorydArray,
        minLength: 1,
        select: function(event, ui) {
          $("#resultTextBuildingCategory").html(ui.item.value );
        }
      })
      .data("ui-autocomplete")._renderItem = function(ul, item) {
        return $("<li></li>").data("ui-autocomplete-item", item).append("<a>"+ item.value + "</a>").appendTo(ul);
      };
      //autocompletes standard with values from Uverdier for
      $("#buildingCategoryEffectEnergyInfoRegulation").autocomplete({
        source: localCategorydArray,
        minLength: 1,
        select: function(event, ui) {
          if ( $("#standardEffectEnergyInfoRegulation").val() != "" && $("#municipalityEffectEnergyInfoRegulation").val() != "" && $("#buildingBRAEffectEnergyInfoRegulation").val() != ""){
            getGlobalTemperatureArray(globalEnergyRegulationTemMean,globalEnergyRegulationTempDOT);
            updateRegulationFormValues();
          }
          //inserting the value for building standard and heatingstart in calculation step
          $("#buildingCategory").val(ui.item.value );
          $("#resultTextBuildingCategory").html(ui.item.value );
        }
      })
      .data("ui-autocomplete")._renderItem = function(ul, item) {
        return $("<li></li>").data("ui-autocomplete-item", item).append("<a>"+ item.value + "</a>").appendTo(ul);
      };

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
  var effectDOT = parseFloat($('#buildingEffectNeed').val().replace(',','.'));
  var heatingFrom = parseFloat($('#buildingHeatingFrom').val().replace(',','.'));
  var numberMachines = parseFloat($('#numberOfMachines').val());
  var effectNow = 0;
  var area = parseFloat($('#buildingBRA').val().replace(',','.'));
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
  var machineIndex = $('option:selected', '#machines').attr('id');
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
var getEffectFromEnergy = function () {
  //defining necessary variables
  var localEnergyNeed = 0;

  //retrieving relevant variables for calcualtion
  var effectDOT = Math.round(parseFloat($('#historiskForbruk').val().replace(',','.'))/2000);
  var heatingFrom = parseFloat($('#balanseTempVerdi').val().replace(',','.'));
  var reportedEnergyNeed = parseFloat($('#historiskForbruk').val().replace(',','.'));
  var effectNow = 0;
  var effectLast = 0;
  var temperature = 0;
  var durationNow = 0;
  var durationLast = 0;
  var temperatureLast = globalTempDOT;

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

  return (Math.round(10 * effectDOT)/10);
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

    getGlobalTemperatureArray(globalEnergyRegulationTemMean,globalEnergyRegulationTempDOT);

  //get efficiency of thermal wheel
  var localVentilationHeatRecovery = globalVentilasjon.gjenvinner[$('#standardEffectEnergyInfoRegulation').val()]/100;

  //define relevant variables for calcualtion
  var localArea = parseFloat($('#buildingBRAEffectEnergyInfoRegulation').val().replace(',','.'));
  var effectNow = 0;
  var effectLast = 0;
  var temperature = 0;
  var durationNow = 0;
  var durationLast = 0;
  var temperatureLast= (localVentilationHeatRecovery) * (21 - globalEnergyRegulationTempDOT) + globalEnergyRegulationTempDOT;
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

  var localCategory = "Småhus";
  if ($('#buildingYear').val() >= 2015 ){
    var localRamme = globalTEKramme["TEK15"];
  }
  if ($('#buildingYear').val() >= 2010 && $('#buildingYear').val() < 2015){
    var localRamme = globalTEKramme["TEK10"];
  }
  var localArea = parseFloat($('#area').val().replace(',','.'));
  var localDegreeDays = globalDegreedays;

  if ($('#standardEffectEnergyInfoRegulation').val() == "TEK15" || $('#standardEffectEnergyInfoRegulation').val() == "TEK10"){
    //addition to energyRegulation if we have Småhus or Boligblokk
    var additionEnergyRegulation = 0;
    var additionSFP = 0;
    if(globalBelysning[$('#buildingCategoryEffectEnergyInfoRegulation').val()] == 11.4){
      additionEnergyRegulation = 1600 / localArea;
      additionSFP = 0.5;
    }
      //defining necessary variables to calculate effect and energy need for ventilation
    var localVentilationAmountInOperation = globalVentilasjon.mengde[localCategory].drift;
    var localVentilationAmountOutsideOperation = globalVentilasjon.mengde[localCategory].utendrift;
    var localVentilationDuration = globalVentilasjon.mengde[localCategory].andel;
    var localVentilationSFP = globalVentilasjon.sfp[$('#standardEffectEnergyInfoRegulation').val()] + additionSFP;
    var localVentilationHeatRecovery = globalVentilasjon.gjenvinner[$('#standardEffectEnergyInfoRegulation').val()]/100;
    var localTempAfterRecovery = (localVentilationHeatRecovery) * (21 - globalEnergyRegulationTempDOT) + globalEnergyRegulationTempDOT;

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
    var localHeatingEffect =  Math.round(10*(0.035*localArea / (21 + 20) * (21 - globalEnergyRegulationTempDOT) - localVentilationEffect))/10;

    //ventilation specific and total
    var localVentilationSpecific = Math.round(10*localVentilationEnergy/localArea)/10;
    localVentilationEnergy = Math.round(localVentilationSpecific * localArea);
    //SUM heatingSpecific, totalt and effect
    var localSumHeatingSpecific = Math.round(10*(localHeating + localHotWater + localVentilationSpecific))/10;
    var localSumHeatingTotal = Math.round(localHeating*localArea) + localVentilationEnergy + localHotWaterEnergy;
    var localSUmHeatingEffect = Math.round(10*(localHeatingEffect + localVentilationEffect + localHotWaterEffect))/10;

    //updates the table
    $('#roomHeatSpecific').html(localHeating);
    $('#roomHeatTotal').html(formatNumberWithThousandSpace(localHeatingEnergy));
    $('#roomHeatEffect').html(localHeatingEffect);

    $('#ventilationHeatSpecific').html(localVentilationSpecific);
    $('#ventilationHeatTotal').html(formatNumberWithThousandSpace(localVentilationEnergy));
    $('#ventilationHeatEffect').html(localVentilationEffect);

    //inserting values for hot water production
    $('#hotWaterHeatSpecific').html(localHotWater);
    $('#hotWaterHeatTotal').html(formatNumberWithThousandSpace(localHotWaterEnergy));
    $('#hotWaterHeatEffect').html(localHotWaterEffect);

    $('#sumHeatingPostsSpecific').html(localSumHeatingSpecific);
    $('#sumHeatingPostsTotal').html(formatNumberWithThousandSpace(localSumHeatingTotal));
    $('#sumHeatingPostsEffect').html(localSUmHeatingEffect);

    $('#fansAndPumpsSpecific').html(localFansAndPumps);
    $('#fansAndPumpsTotal').html(formatNumberWithThousandSpace(localFansAndPumpsTotal));

    $('#lightingSpecific').html(localLigthing);
    $('#lightingTotal').html(formatNumberWithThousandSpace(localLigthingTotal));

    $('#technicalEquipmentSpecific').html(localTechnicalEquipment);
    $('#technicalEquipmentTotal').html(formatNumberWithThousandSpace(localTechnicalEquipmentTotal));

    $('#coolingSpecific').html(localCooling);
    $('#coolingTotal').html(formatNumberWithThousandSpace(localCoolingTotal));

    $('#energyRegulationsSpecific').html(localEnergyRegulation);
    $('#energyRegulationsTotal').html(formatNumberWithThousandSpace(localEnergyRegulationTotal));
  }
};


var updateUvalueFormValues = function (){
  //updates the table

  //Updates U-values
  $('#uValueFacade').html(globalUverdier[$('#buildingStandard2').val()].yttervegg);
  $('#uValueFloor').html(globalUverdier[$('#buildingStandard2').val()].gulv);
  $('#uValueCeiling').html(globalUverdier[$('#buildingStandard2').val()].tak);
  $('#uValueWindow').html(globalUverdier[$('#buildingStandard2').val()].vindu);
  $('#infiltrationNumber').html(globalUverdier[$('#buildingStandard2').val()].lekkasjetall);
  $('#airChanges').html(Math.round(100*globalUverdier[$('#buildingStandard2').val()].lekkasjetall*0.07)/100);
}

var updateTempFormValues = function (){
  //Updates Outdoortemperatures
  globalFormDOT = parseFloat($('#outdoorTemp').val());
  $('#outdoorTemp1').html(globalFormDOT);
  $('#outdoorTemp2').html(globalFormDOT);
  $('#outdoorTemp3').html(globalFormDOT);
  $('#groundTemp').html(-5);

  //Updates Indoortemperatures
  globalFormIndoor = parseFloat($('#indoorTemp').val());
  $('#indoorTemp1').html(globalFormIndoor);
  $('#indoorTemp2').html(globalFormIndoor);
  $('#indoorTemp3').html(globalFormIndoor);
  $('#indoorTemp4').html(globalFormIndoor);
  $('#indoorTemp5').html(globalFormIndoor);
  globaltempafterThermalWheel = Math.round(10*((globalFormIndoor - globalFormDOT) * parseFloat($('#thermalWheel').val()) / 100 + globalFormDOT))/10;
  $('#tempEfterThermal').html(globaltempafterThermalWheel);

};

var updateEffectFormValues = function (){
  globalFormIndoor = parseFloat($('#indoorTemp').val());
  globalFacadeEffect = Math.round((parseFloat($('#facadeArea').val()) * parseFloat($(document.getElementById ( "uValueFacade" )).text()) * (globalFormIndoor - parseFloat(globalFormDOT))));
  globalFloorEffect = Math.round((parseFloat($('#floorArea').val()) * parseFloat($(document.getElementById ( "uValueFloor" )).text()) * (globalFormIndoor + 5)));
  globalCeilingEffect = Math.round((parseFloat($('#ceilingArea').val()) * parseFloat($(document.getElementById ( "uValueCeiling" )).text()) * (globalFormIndoor  - parseFloat(globalFormDOT))));
  globalWindowEffect = Math.round((parseFloat($('#windowArea').val()) * parseFloat($(document.getElementById ( "uValueWindow" )).text()) * (globalFormIndoor  - parseFloat(globalFormDOT))));
  globalSumTransmissionEffect = globalFacadeEffect + globalFloorEffect + globalCeilingEffect + globalWindowEffect;
  globaltempafterThermalWheel = Math.round(10*((globalFormIndoor - globalFormDOT) * parseFloat($('#thermalWheel').val()) / 100 + globalFormDOT))/10;
  var ventilationVolume = parseFloat($('#ventilationFlow').val());
  var airchangeVolume = Math.round(100*parseFloat($(document.getElementById ( "infiltrationNumber" )).text())*0.07)/100 * parseFloat($('#infiltration').val());
  globalVentilationHPEffect = Math.round( 10*(ventilationVolume/3600 * 1.2 * 1.005 * ( globalFormIndoor - globaltempafterThermalWheel)))/10;
  globalInfiltrationEffect = Math.round(10*(airchangeVolume/3600 * 1.2 * 1.005 * ( globalFormIndoor - globalFormDOT )))/10;
  globalSumEffect = globalSumTransmissionEffect + globalVentilationHPEffect*1000 + globalInfiltrationEffect*1000;

  //inserting the value for effect in calculation step
  $("#buildingEffectNeed").val(Math.round( globalSumEffect/100 )/10);
  $("#buildingEffectNeed").trigger("input");
  //inserting the value for indoor temperature in calculation step
  $("#tempIndoor").val(globalFormIndoor);
  $("#tempIndoor").trigger("input");
};

var updateCeilingEffectFormvalues = function () {
  $('#estimatedEffectCeiling').html(Math.round( globalCeilingEffect/100 )/10 + ' kW');
  $('#sumEffectsUValueAndArea').html(Math.round( globalSumTransmissionEffect/100 )/10 + ' kW');
  $('#sumHeatingPostsEffect').html(Math.round( globalSumEffect/100 )/10 + ' kW');
};

var updateWindowEffectFormvalues = function () {
  $('#estimatedEffectWindow').html(Math.round( globalWindowEffect/100 )/10 + ' kW');//globalWindowEffect
  $('#sumEffectsUValueAndArea').html(Math.round( globalSumTransmissionEffect/100 )/10 + ' kW');
  $('#sumHeatingPostsEffect').html(Math.round( globalSumEffect/100 )/10 + ' kW');
};

var updateFloorwEffectFormvalues = function () {
  $('#estimatedEffectFloor').html(Math.round( globalFloorEffect/100 )/10 + ' kW');//globalFloorEffect
  $('#sumEffectsUValueAndArea').html(Math.round( globalSumTransmissionEffect/100 )/10 + ' kW');
  $('#sumHeatingPostsEffect').html(Math.round( globalSumEffect/100 )/10 + ' kW');
};

var updateFacadeEffectFormvalues = function () {
  $('#estimatedEffectFacade').html(Math.round( globalFacadeEffect/100 )/10 + ' kW');//globalFacadeEffect
  $('#sumEffectsUValueAndArea').html(Math.round( globalSumTransmissionEffect/100 )/10 + ' kW');
  $('#sumHeatingPostsEffect').html(Math.round( globalSumEffect/100 )/10 + ' kW');
};

var updateVentilationEffectFormvalues = function () {
  $('#ventilationEffectHP').html(formatNumberWithThousandSpace(globalVentilationHPEffect) + ' kW');
  $('#sumHeatingPostsEffect').html(Math.round( globalSumEffect/100 )/10 + ' kW');

};

var updateinfiltrationEffectFormvalues = function () {
  $('#infiltrationEffect').html(formatNumberWithThousandSpace(globalInfiltrationEffect) + ' kW');
  $('#sumHeatingPostsEffect').html(Math.round( globalSumEffect/100 )/10 + ' kW');

};

var getHistoricalYearMeanInterval = function () {
  var temp = globalHistoricalEnergyTempMean;
  //define the temperatureinterval
  if (temp <=0){
  var interval = " 0 - 3 &ordmc";
  }
  if (temp >0 && temp <3){
  var interval = " 0 - 3 &ordmc";
  }
  if (temp >=3 && temp <5){
  var interval = " 3 - 5 &ordmc";
  }
  if (temp >=5 && temp <7){
  var interval = " 5 - 7 &ordmc";
  }
  if (temp >=7){
  var interval = " >= 7 &ordmc";
  }
  $('#arsmiddeltemp').html(interval);
}

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
      tempforbruk = tempForbruk/8;
  $('#normtallEnergy').html( formatNumberWithThousandSpace(Math.round(tempforbruk)) + ' kWh' );
}};

var updateEffectValues = function (){
  $('#effecFromEnergyValue').html( getEffectFromEnergy());
  //inserting the value for effect in calculation step
  $("#effektBehovUtdata").html(getEffectFromEnergy() + ' kW');
  //$("#buildingEffectNeed").trigger("input");
}

//effectCalculation from U values and area

jQuery('.incrementDown1').on('click',function(event){
  var interMedValue = parseFloat($(document.getElementById ( "uValueFacade" )).text());
  interMedValue = Math.round(100*(interMedValue - 0.01))/100;
  $('#uValueFacade').html(interMedValue);
  updateEffectFormValues ();
  updateFacadeEffectFormvalues();
});

jQuery('.incrementUp1').on('click',function(event){
  var interMedValue = parseFloat($(document.getElementById ( "uValueFacade" )).text());
  interMedValue = Math.round(100*(interMedValue + 0.01))/100;
  $('#uValueFacade').html(interMedValue);
  updateEffectFormValues ();
  updateFacadeEffectFormvalues();
});

jQuery('.incrementDown2').on('click',function(event){
  var interMedValue = parseFloat($(document.getElementById ( "uValueFloor" )).text());
  interMedValue = Math.round(100*(interMedValue - 0.01))/100;
  $('#uValueFloor').html(interMedValue);
  updateEffectFormValues ();
  updateFloorwEffectFormvalues();
});

jQuery('.incrementUp2').on('click',function(event){
  var interMedValue = parseFloat($(document.getElementById ( "uValueFloor" )).text());
  interMedValue = Math.round(100*(interMedValue + 0.01))/100;
  $('#uValueFloor').html(interMedValue);
  updateEffectFormValues ();
  updateFloorwEffectFormvalues();
});

jQuery('.incrementDown3').on('click',function(event){
  var interMedValue = parseFloat($(document.getElementById ( "uValueCeiling" )).text());
  interMedValue = Math.round(100*(interMedValue - 0.01))/100;
  $('#uValueCeiling').html(interMedValue);
  updateEffectFormValues ();
  updateCeilingEffectFormvalues();
});

jQuery('.incrementUp3').on('click',function(event){
  var interMedValue = parseFloat($(document.getElementById ( "uValueCeiling" )).text());
  interMedValue = Math.round(100*(interMedValue + 0.01))/100;
  $('#uValueCeiling').html(interMedValue);
  updateEffectFormValues ();
  updateCeilingEffectFormvalues();
});

jQuery('.incrementDown4').on('click',function(event){
  var interMedValue = parseFloat($(document.getElementById ( "uValueWindow" )).text());
  interMedValue = Math.round(10*(interMedValue - 0.1))/10;
  $('#uValueWindow').html(interMedValue);
  updateEffectFormValues ();
  updateWindowEffectFormvalues();
});

jQuery('.incrementUp4').on('click',function(event){
  var interMedValue = parseFloat($(document.getElementById ( "uValueWindow" )).text());
  interMedValue = Math.round(10*(interMedValue + 0.1))/10;
  $('#uValueWindow').html(interMedValue);
  updateEffectFormValues ();
  updateWindowEffectFormvalues();
});

jQuery('.incrementDown5').on('click',function(event){
  var interMedValue = parseFloat($(document.getElementById ( "infiltrationNumber" )).text());
  interMedValue = Math.round(10*(interMedValue - 0.1))/10;
  $('#infiltrationNumber').html(interMedValue);
  updateEffectFormValues ();
  updateinfiltrationEffectFormvalues();
});

jQuery('.incrementUp5').on('click',function(event){
  var interMedValue = parseFloat($(document.getElementById ( "infiltrationNumber" )).text());
  interMedValue = Math.round(10*(interMedValue + 0.1))/10;
  $('#infiltrationNumber').html(interMedValue);
  $('#airChanges').html(Math.round(100 *interMedValue * 0.07 )/100);
  updateEffectFormValues ();
  updateinfiltrationEffectFormvalues();
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

  if($('#municipality').val() == "" || $('#municipality').val() !=globalSelectedMunicipality || $('#buildingEffectNeed').val() == "" || $('#buildingHeatingFrom').val() == ""){

    if($('#municipality').val() == "" || $('#municipality').val() !=globalSelectedMunicipality){
      $("#municipality").css("background-color", "yellow");
    }else{
      $("#municipality").css("background-color", "white");
    }
    if($('#buildingEffectNeed').val() == ""){
       $("#buildingEffectNeed").css("background-color", "yellow");
    }else {
      $("#buildingEffectNeed").css("background-color", "white");
    }
    if($('#buildingHeatingFrom').val() == ""){
      $("#buildingHeatingFrom").css("background-color", "yellow");
    }else {
      $("#buildingHeatingFrom").css("background-color", "white");
    }
  } else{
    $("#resultTextYearMean").html(globalTempMean);
    $("#resultTextYearMeanUnit").html("&ordmC");
    $("#resultTextDOT").html(globalTempDOT);
    $("#resultTextDOTUnit").html("&ordmC");
    $("#municipality").css("background-color", "white");
    $("#buildingEffectNeed").css("background-color", "white");
    $("#buildingHeatingFrom").css("background-color", "white");
    if($('#buildingStandard').val() == ""){
      $('#resultTextStandard').html();
    }
    if($('#buildingCategory').val() == ""){
      $('#resultTextBuildingCategory').html();
    }

    getGlobalTemperatureArray(globalTempMean,globalTempDOT);
    getEffectAndEnergyDeliveredAndEnergyNeed();
    jQuery('#printPart').show();

    createChart();
    legendAppend(globalEnergyNeed, globalEnergyDelivered, globalEnergyUsed);


    $('#resultTextHeatPump').html( $('#numberOfMachines').val() );
    $('#resultTextHeatPump').append(' stk ' + $('#machines').val() );
    $('#resultTextHeatPumpNomEffect').html(globalMachineNomEffect);
    $('#resultTextEnergyNeed').html(formatNumberWithThousandSpace(globalEnergyNeed));
    $('#resultTextEnergyCover').html(Math.round(globalEnergyDelivered/globalEnergyNeed*100));
    $('#resultTextHeatPumpDeliveredEnergy').html(formatNumberWithThousandSpace(globalEnergyDelivered));
    $('#resultTextAdditionEffect').html(formatNumberWithThousandSpace(Math.round( (parseFloat($('#buildingEffectNeed').val().replace(',','.')) - globalMachineDeliverDOT ) * 10 )/10)) ;
    $('#resultTextHeatPumpUsedEnergy').html(formatNumberWithThousandSpace(globalEnergyUsed));
    $('#resultTextAdditionFrom').html(globalAdditionFrom);
    $('#resultTextSavedEnergy').html(formatNumberWithThousandSpace(globalEnergyDelivered - globalEnergyUsed));
    $('#resultTextSCOP').html(Math.round(globalEnergyDelivered/globalEnergyUsed * 100)/100);
    $('#resultTextAdditionalEnergy').html(formatNumberWithThousandSpace(globalEnergyNeed - globalEnergyDelivered));
    $('#resultTextSCOPTot').html(Math.round(globalEnergyNeed/(globalEnergyUsed + globalEnergyNeed - globalEnergyDelivered ) * 100)/100);
  }
});

//////////////////////////////////////////////////////----------------INPUTS---UPDATE------LIVE//////////7
  // Update values live
  $('#facadeArea').on('input', function() {
    if(!$(this).val()){$(this).val(0);}
    updateEffectFormValues ();
    updateFacadeEffectFormvalues();
  });


  // Update values live
  $('#floorArea').on('input', function() {
    if(!$(this).val()){$(this).val(0);}
    updateEffectFormValues();
    updateFloorwEffectFormvalues();
  });

  // Update values live
  $('#ceilingArea').on('input', function() {
    if(!$(this).val()){$(this).val(0);}
    updateEffectFormValues();
    updateCeilingEffectFormvalues ();
  });

  // Update values live
  $('#windowArea').on('input', function() {
    if(!$(this).val()){$(this).val(0);}
    updateEffectFormValues();
    updateWindowEffectFormvalues();
  });

  // Update values live
  $('#indoorTemp').on('input', function() {
    updateTempFormValues();
    updateEffectFormValues();
    updateFacadeEffectFormvalues();
    updateWindowEffectFormvalues();
    updateCeilingEffectFormvalues ();
    updateFloorwEffectFormvalues();
  });

  // Update values live
  $('#outdoorTemp').on('input', function() {
    updateTempFormValues();
    updateEffectFormValues();
    updateFacadeEffectFormvalues();
    updateWindowEffectFormvalues();
    updateCeilingEffectFormvalues ();
    updateFloorwEffectFormvalues();
  });

  // Update values live
  $('#thermalWheel').on('input', function() {
    if(!$(this).val()){$(this).val(0);}
    updateTempFormValues();
    updateEffectFormValues();
    updateVentilationEffectFormvalues();
  });

  // Update values live
  $('#ventilationFlow').on('input', function() {
    if(!$(this).val()){$(this).val(0);}
    updateEffectFormValues();
    updateVentilationEffectFormvalues();
  });

  // Update values live
  $('#infiltration').on('input', function() {
    if(!$(this).val()){$(this).val(0);}
    updateEffectFormValues();
    updateinfiltrationEffectFormvalues();
  });

  // Update values live
  $('#area').on('input', function() {
    if(!$(this).val()){$(this).val(0);}
  //  $('#buildingHotWaterHistoricalEnergy').html(formatNumberWithThousandSpace( 29.8 * $('#buildingBRAHistoricalEnergy').val() ));
  //  $('#buildingHotWaterHistoricalEnergy').append(' kWh');
  if($('#buildingYear').val() == "" || $('#municipality').val() == "" || $('#area').val() == ""){
    if($('#buildingYear').val() == ""){
      $("#buildingYear").css("background-color", "yellow");
    }else{
      $("#buildingYear").css("background-color", "white");
    }
    if($('#municipality').val() == ""){
       $("#municipality").css("background-color", "yellow");
    }else {
      $("#municipality").css("background-color", "white");
    }
  }else{
    updateHistoricalvalues();
  }

  //inserting the value for BRA in calculation step
//  $("#buildingBRA").val(this.value);
//  $("#buildingBRA").trigger("input");

  });


  // Update values live
  $('#buildingYear').on('input', function() {
    $("#buildingYear").css("background-color", "white");
    updateHistoricalvalues();
  });

  // Update values live
  $('#area').on('input', function() {
    if(!$(this).val()){$(this).val(0);}
    if ( $("#standardEffectEnergyInfoRegulation").val() != "" && $("#municipalityEffectEnergyInfoRegulation").val() != "" && $("#buildingCategoryEffectEnergyInfoRegulation").val() != ""){
      getGlobalTemperatureArray(globalTempMean,globalTempDOT);
      updateRegulationFormValues();
      updateHistoricalvalues();
    }
    //inserting the value for BRA in calculation step
    $("#buildingBRA").val(this.value);
    $("#buildingBRA").trigger("input");
  });

  // Update values live
  $('#historiskForbruk').on('input', function() {
      $("#energibehovUtdata").html(formatNumberWithThousandSpace(this.value) + " kWh");
    if ( $("#balanseTempVerdi").val() != "" && $("#municipality").val() != ""){
      getGlobalTemperatureArray(globalTempMean,globalTempDOT);
      updateEffectValues();
    }else{
       if ( $("#balanseTempVerdi").val() == "" ){
        $("#balanseTempVerdi").css("background-color", "yellow");
        }
        if ( $("#municipality").val() == "" ){
          $("#municipality").css("background-color", "yellow");
        }
      }
  });

  // Update values live
  $('#effectFromEnergyBuildYear').on('input', function() {
    $("#buildingYear").val(this.value);
    $("#buildingYear").trigger("input");
    var tempVal = 0;
    if($("#effectFromEnergyBuildYear").val() >=2010 ){
        $("#effectFromEnergyRoomHeatingFrom").val(12);
        $("#effectFromEnergyRoomHeatingFrom").css("background-color", "white");
        tempVal = 12;
    } else if($("#effectFromEnergyBuildYear").val() >=2000 ){
        $("#effectFromEnergyRoomHeatingFrom").val(13);
        $("#effectFromEnergyRoomHeatingFrom").css("background-color", "white");
        tempVal = 13;
      } else if($("#effectFromEnergyBuildYear").val() >=1990 ){
          $("#effectFromEnergyRoomHeatingFrom").val(14);
          $("#effectFromEnergyRoomHeatingFrom").css("background-color", "white");
          tempVal = 14;
        } else if($("#effectFromEnergyBuildYear").val() >=1980 ){
            $("#effectFromEnergyRoomHeatingFrom").val(15);
            $("#effectFromEnergyRoomHeatingFrom").css("background-color", "white");
            tempVal = 15;
          }else if($("#effectFromEnergyBuildYear").val() >=1970 ){
              $("#effectFromEnergyRoomHeatingFrom").val(16);
              $("#effectFromEnergyRoomHeatingFrom").css("background-color", "white");
              tempVal = 16;
            }else{
                $("#effectFromEnergyRoomHeatingFrom").val(17);
                $("#effectFromEnergyRoomHeatingFrom").css("background-color", "white");
                tempVal = 17;
              }
              $("#buildingHeatingFrom").val(tempVal);
              $("#buildingHeatingFrom").trigger("input");
      if ( $("#effectFromEnergyYearlyEnergyNeed").val() != "" && $("#effectFromEnergyMunicipality").val() != "" ){
          getGlobalTemperatureArray(globalEffectFromEnergyTemMean,globalEffectFromEnergyTempDOT);
          updateEffectValues();
        }
  });

  // Update values live
  $('#balanseTempVerdi').on('input', function() {
    if ( $("#historiskForbruk").val() != "" && $("#municipality").val() != ""){
      getGlobalTemperatureArray(globalEffectFromEnergyTemMean,globalEffectFromEnergyTempDOT);
      updateEffectValues();
    }
  });

$('#buildingEffectNeed').on('input', function() {
  $("#buildingEffectNeed").css("background-color", "white");
});

$('#buildingHeatingFrom').on('input', function() {
  $("#buildingHeatingFrom").css("background-color", "white");
});

$('#buildingYear').on('input', function() {
 if($("#buildingYear").val() >=2010 ){
      $("#balanseTempVerdi").val(12);
      $("#balanseTempVerdiUtdata").html("12 &#176;C");
      $("#balanseTempVerdi").css("background-color", "white");
  }else if($("#buildingYear").val() >=2000 ){
      $("#balanseTempVerdi").val(13);
      $("#balanseTempVerdiUtdata").html("13 &#176;C");
      $("#balanseTempVerdi").css("background-color", "white");
    } else if($("#buildingYear").val() >=1990 ){
        $("#balanseTempVerdi").val(14);
        $("#balanseTempVerdiUtdata").html("14 &#176;C");
        $("#balanseTempVerdi").css("background-color", "white");
      } else if($("#buildingYear").val() >=1980 ){
          $("#balanseTempVerdi").val(15);
          $("#balanseTempVerdiUtdata").html("15 &#176;C");
          $("#balanseTempVerdi").css("background-color", "white");
        }else if($("#buildingYear").val() >=1970 ){
            $("#balanseTempVerdi").val(16);
            $("#balanseTempVerdiUtdata").html("16 &#176;C");
            $("#balanseTempVerdi").css("background-color", "white");
          }else if($("#buildingYear").val() >=1000 ){
              $("#balanseTempVerdi").val(17);
              $("#balanseTempVerdiUtdata").html("17 &#176;C");
              $("#balanseTempVerdi").css("background-color", "white");
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

$('#municipality').on('input', function() {
    jQuery('#printPart').hide();
});

$('#numberOfMachines').on('change', function() {
  $('.submitChart1').trigger("click");
});

$('#machines').on('change', function() {
    $('.submitChart1').trigger("click");
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

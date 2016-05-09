var $round = $("#round")
var viewTypes = ["Percentage", "Decimal", "Fraction"];
var viewType = "Percentage";
var typeCount = 0;

function displayCycle() {
  typeCount += 1;
  if (typeCount > viewTypes.length -1){
    typeCount = 0
  }
  viewType = viewTypes[typeCount];
  $("button").text("Display type: ".concat(viewType));
  processResults();
}

$(document).keypress(function(e) {
  processResults();
});

var options = {
    callback: function (value) {
        processResults();
     },
    wait: 750,
    highlight: true,
    allowSubmit: false,
    captureLength: 2
}

$("#round").typeWatch( options );

function resizeInput() {
    var content =
        $(this).val().length > 0 ? $(this).val() : $(this).prop("placeholder");
    var widthTester = $("<span>"+content+"</span>").hide();
    widthTester.insertAfter($(this));
    $(this).css("width",widthTester.width()+"px");
    widthTester.remove();
 }

$('input[type="text"]')
    .keyup(resizeInput)
    .each(resizeInput);


function processResults() {
  var fCards = 11;
  var lCards = 6;
  var data = $round.val();
  if (data.match("(?:[fl]{3})")) {
    $(answer).text("calculating");
    for (var i = 0, len = data.length; i < len; i++) {
      if (data[i] == "f"){
        switch (i) {
          case 0:
            firstProb = fCards / (fCards + lCards);
            break;
          case 1:
            secondProb = fCards / (fCards + lCards);
            break;
          case 2:
            thirdProb = fCards / (fCards + lCards);
            break;
          default:
            console.log("Oops")
            break;
          }
        fCards -= 1;
      }
      if (data[i] == "l"){
        switch (i) {
          case 0:
            firstProb = lCards / (fCards + lCards);
            break;
          case 1:
            secondProb = lCards / (fCards + lCards);
            break;
          case 2:
            thirdProb = lCards / (fCards + lCards);
            break;
          default:
            console.log("Oops")
            break;
          }
        lCards -= 1;
      }
    }
    var decimalProb = (firstProb*secondProb*thirdProb).toFixed(2);
    var percentProb = (firstProb*secondProb*thirdProb*100).toFixed(2);
    var fractionProb = new Fraction(decimalProb);
    switch (viewType) {
      case "Percentage":
        $(answer).text(percentProb.concat("%"));
        break;
      case "Decimal":
        $(answer).text(decimalProb);
        break;
      case "Fraction":
        $(answer).text(fractionProb.numerator.toString().concat("/")
        .concat(fractionProb.denominator.toString()));
        break;
      default:
        console.log("Oops")
        break;
    };
    $(answer).text("~".concat($(answer).text()))
  } else{
    $(answer).text("N/A");
  }
}

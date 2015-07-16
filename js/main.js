
var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0Ao3Ts9D8bHHpdDlXWVlhSl9UelVmSjV0NHJBUGxQbFE&output=html';
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1fv-XHYGddsiirJaXMIP8A-TK36xfssjCnifWEzcJltc/pubhtml';
var dist;
var freeze;
var MDSenateDistricts = {};
console.log('MDSenateDistricts', MDSenateDistricts);
var app = {};
var senateLayer;
var latitude = 38.9;
var longitude = -77.28;
var latLng = new L.LatLng(latitude, longitude);
var sidebar = $('#sidebar');
var map = L.map('map').setView(latLng, 8);



function clearInfobox() {
  sidebar.html(' ');
}

$(document).ready(function() {
  Tabletop.init({
    key: public_spreadsheet_url,
    callback: showInfo,
    parseNumbers: true
  });
});

function showInfo(data, tabletop) {
  var scoreColor;
  var source = $("#senate-template").html();
  var template = Handlebars.compile(source);
  var sourcebox = $("#senate-template-infobox").html();
  app.infoboxTemplate = Handlebars.compile(sourcebox);
  $.each(tabletop.sheets("Senate2015").all(), function(i, member) {
    scoreColor = getColor(member.score2015);
    member['scoreColor'] = scoreColor;

    MDSenateDistricts[member.district] = member;
    console.log(member);
    MDSenateDistricts[member.district].partyAbbrev = MDSenateDistricts[member.district].party.charAt(0).toUpperCase();
    var html = template(member);
    $("#content").append(html);
    //    console.log(MDSenateDistricts[member.district].partyAbbrev);

  });
  loadGeo();
  //          processJSON(tabletop.sheets("Sheet1").all());
}
function getColor(score) {
  return score > 99 ? '#4EAB07' :
    score > 74 ? '#82e0c3' :
      score > 49 ? '#FEF200' :
        score > 24 ? '#FDC300' :
          score > 0 ? '#FC8400' :
            'rgb(255,0,0)';
}

var geoStyle = function(data) {
  var sldust = Number(data.properties.SLDUST);
  // Sort out how to get at the SLDUST data.
  // console.log("geoStyle: ", Number(data.properties.SLDUST));

  var score = MDSenateDistricts[sldust].score2015;
  var scoreToColor = getColor(score);

  return {
    radius: 6,
    fillColor: scoreToColor,
    weight: 2,
    opacity: 0.51,
    color: '#fff',
    dashArray: '0',
    fillOpacity: 1
  }
};


function loadGeo(district) {
  var Hydda_Full = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 9,
    attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  senateBoundaryLayer = L.geoJson(mdSenateBoundary, {
  }).addTo(map).setStyle({
      stroke: true,
      fillColor:'#ffffff',
      color: '#3f3f3f',
      weight: 1,
      fillOpacity:.85
    });

  senateLayer = L.geoJson(geosenate, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, geoStyle(feature));
    }
  }).addTo(map);
}


function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: mapMemberDetailClick
  });
}


function highlightFeature(e) {
  var layer = e.target;
  var memberNumber = Number(layer.feature.properties.SLDUST);
  var memberDetail = MDSenateDistricts[memberNumber];

  // This fills in the sidebar as you mouse around.
  // NO STICKY CLICK

  if (!freeze) {
    html = app.infoboxTemplate(memberDetail);
    $('#sidebar').html(html);

    layer.setStyle({
      weight: 2,
      color: '#fff',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }
  }
}

function resetHighlight(e) {
  var layer = e.target;
  senateLayer.resetStyle(e.target);

  if (!freeze) {
    clearInfobox();
    layer.setStyle({
      fillOpacity: 1
    });
  }
}

function mapMemberDetailClick(e) {
  freeze = 1;
  var boundary = e.target;
  var memberNumber = Number(boundary.feature.properties.SLDUST);
  console.log("mapMemberDetailClick: ", memberNumber);
  var member = memberDetailFunction(memberNumber);
}


function memberDetailFunction(memberNumber) {
  var districtDetail = MDSenateDistricts[memberNumber];
  console.log("party", MDSenateDistricts[memberNumber].party);
//  districtDetail['partyAbbrev'] = MDSenateDistricts[memberNumber].party.charAt(0).toUpperCase();
  var html = app.infoboxTemplate(districtDetail);
  $('#sidebar').html(html);
  // $('#sidebar').html(JSON.stringify(districtDetail));
}




$(document).on("click", "button", function(event) {
  event.preventDefault();
  clearInfobox();
  freeze = 0;
});
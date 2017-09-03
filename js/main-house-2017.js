
//var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0Ao3Ts9D8bHHpdDlXWVlhSl9UelVmSjV0NHJBUGxQbFE&output=html';
//var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1fv-XHYGddsiirJaXMIP8A-TK36xfssjCnifWEzcJltc/pubhtml';
// var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Lw7EXXdXWfWKSSJFpoZYX3YFtpiWI7burJgaqqaE2jc/pubhtml';
// var public_spreadsheet_url = '1fv6M6R9Ogo2TGAlxOKKgOouVBW7NilkCwppc4tpEFm8';
var public_spreadsheet_url = '1wxCAStsUg_tiQcZGICkReZLWS9-4lSC5QWQ2v4Szvsg';
var dist;
var freeze;
var MDSenateDistricts = {};
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
  $.each(tabletop.sheets("House2017").all(), function(i, member) {
    scoreColor = getColor(member.score2017);

    member['scoreColor'] = scoreColor;
    member['partyAbbrev'] = member['party'].charAt(0);
    var html = template(member);
    $("#content").append(html);
    MDSenateDistricts[member.rownum] = member;
      // console.log(MDSenateDistricts);
      MDSenateDistricts[member.rownum].partyAbbrev = MDSenateDistricts[member.rownum].party.charAt(0).toUpperCase();

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
  var rownum = Number(data.properties.rownum);
  // console.log("data", data);
  // Sort out how to get at the SLDUST data.
  // console.log("geoStyle: ", Number(data.properties.SLDUST));
  var score = MDSenateDistricts[rownum].score2017;
  var scoreToColor = getColor(score);

  return {
    radius: 5.5,
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
    minZoom: 7,
    maxZoom: 10,
    attribution: 'Tiles courtesy of <a href="http://openstreetmap.org/" target="_blank">OpenStreetMap </a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
  var memberNumber = Number(layer.feature.properties.rownum);
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
  var memberNumber = Number(boundary.feature.properties.rownum);
  var member = memberDetailFunction(memberNumber);
}


function memberDetailFunction(memberNumber) {
  var districtDetail = MDSenateDistricts[memberNumber]
  var html = app.infoboxTemplate(districtDetail);
  $('#sidebar').html(html);
  // $('#sidebar').html(JSON.stringify(districtDetail));
}




$(document).on("click", "button", function(event) {
  event.preventDefault();
  clearInfobox();
  freeze = 0;
});
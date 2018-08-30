var freeze;
var MDSenateDistricts = {};
var app = {};
var senateLayer;
var latitude = 38.9;
var longitude = -77.28;
var latLng = new L.LatLng(latitude, longitude);
var sidebar = $('#sidebar');
var map = L.map('map', {scrollWheelZoom:false}).setView(latLng, 8);
data = [{"score2018":80,"lifetimescore":38,"full_name":"George C. Edwards","district":1,"party":"R","email":"george.edwards@senate.state.md.us","leg_id":"MDL000199","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=edwards&stab=01","twitter":""},{"score2018":80,"lifetimescore":28,"full_name":"Andrew A. Serafini","district":2,"party":"R","email":"ndrew.serafini@senate.state.md.us","leg_id":"MDL000709","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=serafini01&stab=01","twitter":""},{"score2018":100,"lifetimescore":91,"full_name":"Ronald N. Young","district":3,"party":"D","email":"ronald.young@senate.state.md.us","leg_id":"MDL000387","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=young&stab=01","twitter":"SenRonYoung"},{"score2018":80,"lifetimescore":26,"full_name":"Michael J. Hough","district":4,"party":"R","email":"chael.hough@senate.state.md.us","leg_id":"MDL000702","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=hough&stab=01","twitter":"houghdelegate"},{"score2018":80,"lifetimescore":30,"full_name":"Justin Ready","district":5,"party":"R","email":"justin.ready@senate.state.md.us","leg_id":"MDL000710","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=ready01&stab=01","twitter":"JustinReady"},{"score2018":17,"lifetimescore":30,"full_name":"Johnny Ray Salling","district":6,"party":"R","email":"JohnnyRay.Salling@senate.state.md.us","leg_id":"MDL000680","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=salling01&stab=01","twitter":""},{"score2018":86,"lifetimescore":25,"full_name":"J. B. Jennings","district":7,"party":"R","email":"jb.jennings@senate.state.md.us","leg_id":"MDL000303","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=jennings&stab=01","twitter":"SenatorJennings"},{"score2018":100,"lifetimescore":77,"full_name":"Katherine Klausmeier","district":8,"party":"D","email":"katherine.klausmeier@senate.state.md.us","leg_id":"MDL000215","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=klausmeier&stab=01","twitter":""},{"score2018":44,"lifetimescore":16,"full_name":"Gail H. Bates","district":9,"party":"R","email":"gail.bates@senate.state.md.us","leg_id":"MDL000633","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=bates&stab=01","twitter":"GailHBates"},{"score2018":100,"lifetimescore":75,"full_name":"Delores G. Kelley","district":10,"party":"D","email":"delores.kelley@senate.state.md.us","leg_id":"MDL000212","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=kelley&stab=01","twitter":"DeloresGKelley"},{"score2018":100,"lifetimescore":87,"full_name":"Robert A. Zirkin","district":11,"party":"D","email":"bobby.zirkin@senate.state.md.us","leg_id":"MDL000236","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=zirkin&stab=01","twitter":"ShirleyNPulliam"},{"score2018":100,"lifetimescore":76,"full_name":"Edward J. Kasemeyer","district":12,"party":"D","email":"edward.kasemeyer@senate.state.md.us","leg_id":"MDL000211","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=kasemeyer&stab=01","twitter":""},{"score2018":100,"lifetimescore":95,"full_name":"Guy Guzzone","district":13,"party":"D","email":"guy.guzzone@senate.state.md.us","leg_id":"MDL000639","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=guzzone&stab=01","twitter":""},{"score2018":100,"lifetimescore":98,"full_name":"Craig J. Zucker","district":14,"party":"D","email":"craig.zucker@senate.state.md.us","leg_id":"MDL000331","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=zucker01&stab=01","twitter":"GuyGuzzone"},{"score2018":100,"lifetimescore":87,"full_name":"Brian J. Feldman","district":15,"party":"D","email":"brian.feldman@senate.state.md.us","leg_id":"MDL000275","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=feldman&stab=01","twitter":"BrianJFeldman"},{"score2018":100,"lifetimescore":96,"full_name":"Susan C. Lee","district":16,"party":"D","email":"susan.lee@senate.state.md.us","leg_id":"MDL000701","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=lee&stab=01","twitter":""},{"score2018":89,"lifetimescore":97,"full_name":"Cheryl C. Kagan","district":17,"party":"D","email":"","leg_id":"MDL000624","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=kagan01&stab=01","twitter":"CherylKagan"},{"score2018":100,"lifetimescore":93,"full_name":"Richard S. Madaleno Jr.","district":18,"party":"D","email":"richard.madaleno@senate.state.md.us","leg_id":"MDL000218","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=madaleno&stab=01","twitter":"RichMadaleno"},{"score2018":100,"lifetimescore":100,"full_name":"Roger Manno","district":19,"party":"D","email":"roger.manno@senate.state.md.us","leg_id":"MDL000321","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=manno&stab=01","twitter":"RogerManno"},{"score2018":100,"lifetimescore":100,"full_name":"William C. Smith","district":20,"party":"D","email":"will.smith@senate.state.md.us","leg_id":"MDL000229","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=raskin&stab=01","twitter":"willcsmithjr"},{"score2018":100,"lifetimescore":98,"full_name":"Jim Rosapepe","district":21,"party":"D","email":"jim.rosapepe@senate.state.md.us","leg_id":"MDL000232","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=rosapepe&stab=01","twitter":""},{"score2018":100,"lifetimescore":99,"full_name":"Paul G. Pinsky","district":22,"party":"D","email":"paul.pinsky@senate.state.md.us","leg_id":"MDL000226","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=pinsky&stab=01","twitter":"paulpinsky"},{"score2018":100,"lifetimescore":88,"full_name":"Douglas J.J. Peters","district":23,"party":"D","email":"douglas.peters@senate.state.md.us","leg_id":"MDL000225","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=peters&stab=01","twitter":"SenatorPeters"},{"score2018":86,"lifetimescore":90,"full_name":"Joanne C. Benson","district":24,"party":"D","email":"joanne.benson@senate.state.md.us","leg_id":"MDL000248","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=benson&stab=01","twitter":"bensonteam24"},{"score2018":100,"lifetimescore":79,"full_name":"Ulysses Currie","district":25,"party":"D","email":"ulysses.currie@senate.state.md.us","leg_id":"MDL000195","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=currie&stab=01","twitter":""},{"score2018":100,"lifetimescore":70,"full_name":"C. Anthony Muse","district":26,"party":"D","email":"anthony.muse@senate.state.md.us","leg_id":"MDL000224","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=muse&stab=01","twitter":"SenatorMuse"},{"score2018":100,"lifetimescore":82,"full_name":"Thomas V. Mike Miller, Jr.","district":27,"party":"D","email":"thomas.v.mike.miller@senate.state.md.us","leg_id":"MDL000221","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=miller20t&stab=01","twitter":""},{"score2018":86,"lifetimescore":77,"full_name":"Thomas M. Middleton","district":28,"party":"D","email":"thomas.mcclain.middleton@senate.state.md.us","leg_id":"MDL000220","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=middleton&stab=01","twitter":""},{"score2018":44,"lifetimescore":43,"full_name":"Steve Waugh","district":29,"party":"R","email":"Steve.Waugh@senate.state.md.us","leg_id":"MDL000682","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=waugh01&stab=01","twitter":"senatorwaugh"},{"score2018":71,"lifetimescore":75,"full_name":"John C. Astle","district":30,"party":"D","email":"john.astle@senate.state.md.us","leg_id":"MDL000190","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=astle&stab=01","twitter":"votejohnastle"},{"score2018":56,"lifetimescore":44,"full_name":"Bryan W. Simonaire","district":31,"party":"R","email":"bryan.simonaire@senate.state.md.us","leg_id":"MDL000233","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=simonaire&stab=01","twitter":""},{"score2018":80,"lifetimescore":62,"full_name":"James DeGrange Sr.","district":32,"party":"D","email":"james.degrange@senate.state.md.us","leg_id":"MDL000196","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=degrange&stab=01","twitter":""},{"score2018":100,"lifetimescore":39,"full_name":"Edward R. Reilly","district":33,"party":"R","email":"edward.reilly@senate.state.md.us","leg_id":"MDL000230","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=reilly&stab=01","twitter":"senatorreilly"},{"score2018":80,"lifetimescore":50,"full_name":"Robert Cassilly","district":34,"party":"R","email":"Bob.Cassilly@senate.state.md.us","leg_id":"MDL000646","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=cassilly02&stab=01","twitter":"cassillyformd34"},{"score2018":"60","lifetimescore":"28/60","full_name":"Wayne and Linda Norman","district":35,"party":"R","email":"linda.norman@senate.state.md.us","leg_id":"MDL000627","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=norman&stab=01","twitter":"delegatenorman"},{"score2018":71,"lifetimescore":31,"full_name":"Stephen S. Hershey Jr.","district":36,"party":"R","email":"steve.hershey@senate.state.md.us","leg_id":"MDL000396","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=hershey&stab=01","twitter":"senatorhershey"},{"score2018":60,"lifetimescore":39,"full_name":"Adelaide C. Eckardt","district":37,"party":"R","email":"delaide.eckardt@senate.state.md.us","leg_id":"MDL000698","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=eckardt&stab=01","twitter":""},{"score2018":86,"lifetimescore":75,"full_name":"James N. Mathias Jr.","district":38,"party":"D","email":"james.mathias@senate.state.md.us","leg_id":"MDL000322","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=mathias&stab=01","twitter":"senjimmathias"},{"score2018":100,"lifetimescore":87,"full_name":"Nancy J. King","district":39,"party":"D","email":"nancy.king@senate.state.md.us","leg_id":"MDL000213","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=king&stab=01","twitter":"senatornjk"},{"score2018":100,"lifetimescore":95,"full_name":"Barbara Robinson","district":40,"party":"D","email":"barbara.robinson@senate.state.md.us","leg_id":"MDL000228","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=pugh&stab=01","twitter":"senatorbar"},{"score2018":"","lifetimescore":82,"full_name":"Nathaniel T. Oaks &ndash; RESIGNED","district":41,"party":"D","email":"nathaniel.oaks@senate.state.md.us","leg_id":"MDL000204","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=gladden&stab=01","twitter":""},{"score2018":100,"lifetimescore":90,"full_name":"James Brochin","district":42,"party":"D","email":"jim.brochin@senate.state.md.us","leg_id":"MDL000192","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=brochin&stab=01","twitter":"jimbrochin"},{"score2018":100,"lifetimescore":91,"full_name":"Joan Carter Conway","district":43,"party":"D","email":"joan.carter.conway@senate.state.md.us","leg_id":"MDL000194","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=conway20j&stab=01","twitter":"conway_joanEHE"},{"score2018":100,"lifetimescore":93,"full_name":"Shirley Nathan-Pulliam","district":44,"party":"D","email":"shirley.nathan.pulliam@senate.state.md.us","leg_id":"MDL000678","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=nathan&stab=01","twitter":""},{"score2018":100,"lifetimescore":79,"full_name":"Nathaniel J. McFadden","district":45,"party":"D","email":"nathaniel.mcfadden@senate.state.md.us","leg_id":"MDL000219","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=mcfadden&stab=01","twitter":""},{"score2018":100,"lifetimescore":95,"full_name":"Bill Ferguson","district":46,"party":"D","email":"bill.ferguson@senate.state.md.us","leg_id":"MDL000379","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=ferguson&stab=01","twitter":"SenBillFerg"},{"score2018":100,"lifetimescore":97,"full_name":"Victor R. Ramirez","district":47,"party":"D","email":"victor.ramirez@senate.state.md.us","leg_id":"MDL000344","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=ramirez&stab=01","twitter":"VoteForRamirez"}];


$(document).ready(function() {
    showInfo(data);
    loadGeo();
});

function showInfo(data) {
    var scoreColor;
    var source = $("#senate-template").html();
    var template = Handlebars.compile(source);
    var sourcebox = $("#senate-template-infobox").html();
    app.infoboxTemplate = Handlebars.compile(sourcebox);

    for(i=0;i<data.length;i++){
        scoreColor = getColor(data[i].score2018);
        data[i].scoreColor = scoreColor;
        MDSenateDistricts[data[i].district] = data[i];
        var html = template(data[i]);
        $("#content").append(html);
    }
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
  var score = MDSenateDistricts[sldust].score2018;
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
    L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
        minZoom:8,
        maxZoom: 12,
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
  // console.log("mapMemberDetailClick: ", memberNumber);
  var member = memberDetailFunction(memberNumber);
}


function memberDetailFunction(memberNumber) {
  var districtDetail = MDSenateDistricts[memberNumber];
  var html = app.infoboxTemplate(districtDetail);
  $('#sidebar').html(html);
}



$(document).on("click", "button", function(event) {
  event.preventDefault();
  clearInfobox();
  freeze = 0;
});


function clearInfobox() {
    sidebar.html(' ');
}

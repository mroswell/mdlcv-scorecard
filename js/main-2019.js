var freeze;
var MDSenateDistricts = {};
var app = {};
var senateLayer;
var latitude = 38.9;
var longitude = -77.28;
var latLng = new L.LatLng(latitude, longitude);
var sidebar = $('#sidebar');
var map = L.map('map', {scrollWheelZoom:false}).setView(latLng, 8);
data = [{"score2019":33,"lifetimescore":38,"fullname":"George C. Edwards","district":1,"party":"R","email":"george.edwards@senate.state.md.us","legid":"MDL000199","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=edwards&stab=01","twitter":0},{"score2019":22,"lifetimescore":27,"fullname":" Andrew A. Serafini","district":2,"party":"R","email":"ndrew.serafini@senate.state.md.us","legid":"MDL000709","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=serafini01&stab=01","twitter":0},{"score2019":100,"lifetimescore":92,"fullname":"Ronald N. Young","district":3,"party":"D","email":"ronald.young@senate.state.md.us","legid":"MDL000387","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=young&stab=01","twitter":"SenRonYoung"},{"score2019":44,"lifetimescore":30,"fullname":"Michael J. Hough ","district":4,"party":"R","email":"chael.hough@senate.state.md.us","legid":"MDL000702","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=hough&stab=01","twitter":"houghdelegate"},{"score2019":22,"lifetimescore":28,"fullname":"Justin Ready","district":5,"party":"R","email":"justin.ready@senate.state.md.us","legid":"MDL000710","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=ready01&stab=01","twitter":"JustinReady"},{"score2019":33,"lifetimescore":31,"fullname":"Johnny Ray Salling","district":6,"party":"R","email":"JohnnyRay.Salling@senate.state.md.us","legid":"MDL000680","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=salling01&stab=01","twitter":0},{"score2019":40,"lifetimescore":26,"fullname":"J. B. Jennings","district":7,"party":"R","email":"jb.jennings@senate.state.md.us","legid":"MDL000303","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=jennings&stab=01","twitter":"SenatorJennings"},{"score2019":90,"lifetimescore":78,"fullname":"Katherine Klausmeier","district":8,"party":"D","email":"katherine.klausmeier@senate.state.md.us","legid":"MDL000215","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=klausmeier&stab=01","twitter":0},{"score2019":100,"lifetimescore":100,"fullname":"Katie Fry Hester","district":9,"party":"D","email":0,"legid":"MDL000633","url":0,"twitter":"katiefryhester"},{"score2019":100,"lifetimescore":77,"fullname":"Delores G. Kelley","district":10,"party":"D","email":"delores.kelley@senate.state.md.us","legid":"MDL000212","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=kelley&stab=01","twitter":"DeloresGKelley"},{"score2019":100,"lifetimescore":88,"fullname":"Bobby A. Zirkin","district":11,"party":"D","email":"bobby.zirkin@senate.state.md.us","legid":"MDL000236","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=zirkin&stab=01","twitter":"ShirleyNPulliam"},{"score2019":100,"lifetimescore":100,"fullname":"Clarence K. Lam","district":12,"party":"D","email":0,"legid":"MDL000211","url":0,"twitter":"ClarenceLamMD"},{"score2019":100,"lifetimescore":96,"fullname":"Guy Guzzone","district":13,"party":"D","email":"guy.guzzone@senate.state.md.us","legid":"MDL000639","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=guzzone&stab=01","twitter":0},{"score2019":100,"lifetimescore":98,"fullname":"Craig J. Zucker","district":14,"party":"D","email":"craig.zucker@senate.state.md.us","legid":"MDL000331","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=zucker01&stab=01","twitter":"GuyGuzzone"},{"score2019":100,"lifetimescore":88,"fullname":"Brian J. Feldman","district":15,"party":"D","email":"brian.feldman@senate.state.md.us","legid":"MDL000275","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=feldman&stab=01","twitter":"BrianJFeldman"},{"score2019":100,"lifetimescore":97,"fullname":"Susan C. Lee","district":16,"party":"D","email":"susan.lee@senate.state.md.us","legid":"MDL000701","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=lee&stab=01","twitter":0},{"score2019":100,"lifetimescore":98,"fullname":"Cheryl C. Kagan ","district":17,"party":"D","email":0,"legid":"MDL000624","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=kagan01&stab=01","twitter":"CherylKagan"},{"score2019":100,"lifetimescore":97,"fullname":"Jeff Waldstreicher","district":18,"party":"D","email":0,"legid":"MDL000218","url":0,"twitter":"Jeff Waldstreicher"},{"score2019":100,"lifetimescore":93,"fullname":"Benjamin F. Kramer","district":19,"party":"D","email":0,"legid":"MDL000321","url":0,"twitter":0},{"score2019":100,"lifetimescore":100,"fullname":"William C. Smith, Jr. ","district":20,"party":"D","email":"will.smith@senate.state.md.us","legid":"MDL000229","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=raskin&stab=01","twitter":"willcsmithjr"},{"score2019":100,"lifetimescore":98,"fullname":"Jim Rosapepe","district":21,"party":"D","email":"jim.rosapepe@senate.state.md.us","legid":"MDL000232","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=rosapepe&stab=01","twitter":0},{"score2019":100,"lifetimescore":99,"fullname":"Paul G. Pinsky","district":22,"party":"D","email":"paul.pinsky@senate.state.md.us","legid":"MDL000226","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=pinsky&stab=01","twitter":"paulpinsky"},{"score2019":100,"lifetimescore":90,"fullname":"Douglas J.J. Peters","district":23,"party":"D","email":"douglas.peters@senate.state.md.us","legid":"MDL000225","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=peters&stab=01","twitter":"SenatorPeters"},{"score2019":100,"lifetimescore":91,"fullname":"Joanne C. Benson","district":24,"party":"D","email":"joanne.benson@senate.state.md.us","legid":"MDL000248","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=benson&stab=01","twitter":"bensonteam24"},{"score2019":100,"lifetimescore":93,"fullname":"Melony Griffith","district":25,"party":"D","email":0,"legid":"MDL000195","url":0,"twitter":0},{"score2019":100,"lifetimescore":96,"fullname":"Obie Patterson","district":26,"party":"D","email":0,"legid":"MDL000224","url":0,"twitter":"ObiePatterson"},{"score2019":100,"lifetimescore":84,"fullname":"Thomas V. Mike Miller, Jr.","district":27,"party":"D","email":"thomas.v.mike.miller@senate.state.md.us","legid":"MDL000221","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=miller20t&stab=01","twitter":0},{"score2019":100,"lifetimescore":100,"fullname":"Arthur Ellis","district":28,"party":"D","email":0,"legid":"MDL000220","url":0,"twitter":"VoteArthurEllis"},{"score2019":20,"lifetimescore":20,"fullname":"Jack Bailey","district":29,"party":"R","email":0,"legid":"MDL000682","url":0,"twitter":"senatorjbailey"},{"score2019":100,"lifetimescore":100,"fullname":"Sarah K. Elfreth","district":30,"party":"D","email":0,"legid":"MDL000190","url":0,"twitter":"SenatorSarah"},{"score2019":50,"lifetimescore":45,"fullname":"Bryan W. Simonaire","district":31,"party":"R","email":"bryan.simonaire@senate.state.md.us","legid":"MDL000233","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=simonaire&stab=01","twitter":0},{"score2019":100,"lifetimescore":90,"fullname":"Pamela Beidle","district":32,"party":"D","email":0,"legid":"MDL000196","url":0,"twitter":"PamelaBeidle"},{"score2019":50,"lifetimescore":40,"fullname":"Edward R. Reilly","district":33,"party":"R","email":"edward.reilly@senate.state.md.us","legid":"MDL000230","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=reilly&stab=01","twitter":"senatorreilly"},{"score2019":33,"lifetimescore":45,"fullname":"Robert Cassilly","district":34,"party":"R","email":"Bob.Cassilly@senate.state.md.us","legid":"MDL000646","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=cassilly02&stab=01","twitter":"cassillyformd34"},{"score2019":20,"lifetimescore":20,"fullname":"Jason C. Gallion","district":35,"party":"R","email":0,"legid":"MDL000627","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?stab=01&pid=sponpage&id=norman01&tab=subject6&ys=2018RS","twitter":0},{"score2019":40,"lifetimescore":33,"fullname":"Stephen S. Hershey, Jr.","district":36,"party":"R","email":"steve.hershey@senate.state.md.us","legid":"MDL000396","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=hershey&stab=01","twitter":"senatorhershey"},{"score2019":33,"lifetimescore":38,"fullname":"Adelaide C. Eckardt","district":37,"party":"R","email":"delaide.eckardt@senate.state.md.us","legid":"MDL000698","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=eckardt&stab=01","twitter":0},{"score2019":30,"lifetimescore":43,"fullname":"Mary Beth Carozza","district":38,"party":"D","email":0,"legid":"MDL000322","url":0,"twitter":"MBCarozzaSenate"},{"score2019":100,"lifetimescore":88,"fullname":"Nancy J. King","district":39,"party":"D","email":"nancy.king@senate.state.md.us","legid":"MDL000213","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=king&stab=01","twitter":"senatornjk"},{"score2019":100,"lifetimescore":100,"fullname":"Antonio Hayes","district":40,"party":"D","email":0,"legid":"MDL000228","url":0,"twitter":"AntonioHayes40"},{"score2019":100,"lifetimescore":84,"fullname":"Jill P. Carter","district":41,"party":"D","email":0,"legid":"MDL000204","url":0,"twitter":0},{"score2019":89,"lifetimescore":81,"fullname":"Chris West","district":42,"party":"R","email":0,"legid":"MDL000192","url":0,"twitter":0},{"score2019":100,"lifetimescore":100,"fullname":"Mary Washington","district":43,"party":"D","email":0,"legid":"MDL000194","url":0,"twitter":"SenMaryW43"},{"score2019":100,"lifetimescore":93,"fullname":"Shirley Nathan-Pulliam ","district":44,"party":"D","email":"shirley.nathan.pulliam@senate.state.md.us","legid":"MDL000678","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=nathan&stab=01","twitter":0},{"score2019":100,"lifetimescore":97,"fullname":"Cory V. McCray","district":45,"party":"D","email":0,"legid":"MDL000219","url":0,"twitter":"corymccray"},{"score2019":100,"lifetimescore":96,"fullname":"Bill Ferguson","district":46,"party":"D","email":"bill.ferguson@senate.state.md.us","legid":"MDL000379","url":"http://mgaleg.maryland.gov/webmga/frmMain.aspx?pid=sponpage&tab=subject6&id=ferguson&stab=01","twitter":"SenBillFerg"},{"score2019":100,"lifetimescore":100,"fullname":"Malcolm Augustine","district":47,"party":"D","email":0,"legid":"MDL000344","url":0,"twitter":"AugustineMLA"}];


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
        scoreColor = getColor(data[i].score2019);
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
  var score = MDSenateDistricts[sldust].score2019;
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

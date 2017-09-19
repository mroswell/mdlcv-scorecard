var freeze;
var MDSenateDistricts = {};
var app = {};
var senateLayer;
var latitude = 38.9;
var longitude = -77.28;
var latLng = new L.LatLng(latitude, longitude);
var sidebar = $('#sidebar');
var map = L.map('map', {scrollWheelZoom:false}).setView(latLng, 8);
data = [{"indexmatch":"1A","score2017":33,"lifetimescore":47,"rownum":46,"full_name":"Wendell R. Beitzel","id":"MDL000247","district":"1A","district_padded":"01A","sort1":1,"party":"R","email":"wendell.beitzel@house.state.md.us","twitter":"bietzelw"},
    {"indexmatch":"1B","score2017":17,"lifetimescore":17,"rownum":47,"full_name":"Jason C. Buckel","id":"MDL000637","district":"1B","district_padded":"01B","sort1":1,"party":"R","email":"Jason.Buckel@house.state.md.us","twitter":""},
    {"indexmatch":"1C","score2017":17,"lifetimescore":27,"rownum":48,"full_name":"Mike McKay","id":"MDL000628","district":"1C","district_padded":"01C","sort1":1,"party":"R","email":"Mike.McKay@house.state.md.us","twitter":"lavaledryclean"},
    {"indexmatch":"2A","score2017":33,"lifetimescore":17,"rownum":71,"full_name":"Neil Parrott","id":"MDL000648","district":"2A","district_padded":"02A","sort1":2,"party":"R","email":"neil.parrott@house.state.md.us","twitter":"neilparrott"},
    {"indexmatch":"2A","score2017":25,"lifetimescore":30,"rownum":70,"full_name":"William J. Wivell","id":"MDL000719","district":"2A","district_padded":"02A","sort1":2,"party":"R","email":"william.wivell@house.state.md.us","twitter":""},
    {"indexmatch":"2B","score2017":17,"lifetimescore":17,"rownum":72,"full_name":"Brett Wilson","id":"MDL000696","district":"2B","district_padded":"02B","sort1":2,"party":"R","email":"brett.wilson@house.state.md.us","twitter":""},
    {"indexmatch":"3A","score2017":100,"lifetimescore":100,"rownum":85,"full_name":"Karen Lewis Young","id":"MDL000675","district":"3A","district_padded":"03A","sort1":3,"party":"D","email":"Karen.Young@house.state.md.us","twitter":"KarenLewisYoung"},
    {"indexmatch":"3A","score2017":100,"lifetimescore":100,"rownum":86,"full_name":"Carol L. Krimm","id":"MDL000672","district":"3A","district_padded":"03A","sort1":3,"party":"D","email":"Carol.Krimm@house.state.md.us","twitter":""},
    {"indexmatch":"3B","score2017":0,"lifetimescore":19,"rownum":87,"full_name":"William Folden","id":"MDL000699","district":"3B","district_padded":"03B","sort1":3,"party":"R","email":"William.Folden@house.state.md.us","twitter":""},
    {"indexmatch":"4","score2017":17,"lifetimescore":26,"rownum":1,"full_name":"Kathy Afzali","id":"MDL000676","district":"4","district_padded":"004","sort1":4,"party":"R","email":"kathy.afzali@house.state.md.us","twitter":"Kathy_Afzali"},
    {"indexmatch":"4","score2017":17,"lifetimescore":36,"rownum":2,"full_name":"Barrie S. Ciliberti","id":"MDL000716","district":"4","district_padded":"004","sort1":4,"party":"R","email":"Barrie.Ciliberti@house.state.md.us","twitter":""},
    {"indexmatch":"4","score2017":50,"lifetimescore":45,"rownum":3,"full_name":"David E. Vogt, III","id":"MDL000687","district":"4","district_padded":"004","sort1":4,"party":"R","email":"David.Vogt@house.state.md.us","twitter":"DavidVogt_MD"},
    {"indexmatch":"5","score2017":33,"lifetimescore":36,"rownum":5,"full_name":"Susan W. Krebs","id":"MDL000653","district":"5","district_padded":"005","sort1":5,"party":"R","email":"susan.krebs@house.state.md.us","twitter":""},
    {"indexmatch":"5","score2017":33,"lifetimescore":22,"rownum":4,"full_name":"April Rose","id":"MDL000718","district":"5","district_padded":"005","sort1":5,"party":"R","email":"April.Rose@house.state.md.us","twitter":""},
    {"indexmatch":"5","score2017":33,"lifetimescore":33,"rownum":6,"full_name":"Haven Shoemaker","id":"MDL000655","district":"5","district_padded":"005","sort1":5,"party":"R","email":"Haven.Shoemaker@house.state.md.us","twitter":"Commshoemaker"},
    {"indexmatch":"6","score2017":17,"lifetimescore":22,"rownum":9,"full_name":"Robin L. Grammer, Jr.","id":"MDL000681","district":"6","district_padded":"006","sort1":6,"party":"R","email":"Robin.Grammer@house.state.md.us","twitter":"RobinGrammer"},
    {"indexmatch":"6","score2017":33,"lifetimescore":22,"rownum":7,"full_name":"Robert B. Long","id":"MDL000658","district":"6","district_padded":"006","sort1":6,"party":"R","email":"Bob.Long@house.state.md.us","twitter":"DelegateLong"},
    {"indexmatch":"6","score2017":17,"lifetimescore":17,"rownum":8,"full_name":"Ric Metzgar","id":"MDL000685","district":"6","district_padded":"006","sort1":6,"party":"R","email":"Ric.Metzgar@house.state.md.us","twitter":""},
    {"indexmatch":"7","score2017":29,"lifetimescore":17,"rownum":12,"full_name":"Richard K. Impallaria","id":"MDL000298","district":"7","district_padded":"007","sort1":7,"party":"R","email":"rick.impallaria@house.state.md.us","twitter":""},
    {"indexmatch":"7","score2017":17,"lifetimescore":23,"rownum":10,"full_name":"Patrick L. McDonough","id":"MDL000325","district":"7","district_padded":"007","sort1":7,"party":"R","email":"pat.mcdonough@house.state.md.us","twitter":"Pat_McDonough"},
    {"indexmatch":"7","score2017":33,"lifetimescore":21,"rownum":11,"full_name":"Kathy J. Szeliga","id":"MDL000412","district":"7","district_padded":"007","sort1":7,"party":"R","email":"kathy.szeliga@house.state.md.us","twitter":"MarylandKathy"},
    {"indexmatch":"8","score2017":100,"lifetimescore":77,"rownum":13,"full_name":"Eric M. Bromwell","id":"MDL000255","district":"8","district_padded":"008","sort1":8,"party":"D","email":"eric.bromwell@house.state.md.us","twitter":"EricBromwell"},
    {"indexmatch":"8","score2017":50,"lifetimescore":50,"rownum":15,"full_name":"Joe Cluster","id":"MDL000392","district":"8","district_padded":"008","sort1":8,"party":"R","email":"john.cluster@house.state.md.us","twitter":""},
    {"indexmatch":"8","score2017":67,"lifetimescore":81,"rownum":14,"full_name":"Christian Miele","id":"MDL000673","district":"8","district_padded":"008","sort1":8,"party":"R","email":"Christian.Miele@house.state.md.us","twitter":"Christian_Miele"},
    {"indexmatch":"9A","score2017":17,"lifetimescore":17,"rownum":103,"full_name":"Trent Kittleman","id":"MDL000671","district":"9A","district_padded":"09A","sort1":9,"party":"R","email":"Trent.Kittleman@house.state.md.us","twitter":"TrentKittleman"},
    {"indexmatch":"9A","score2017":0,"lifetimescore":8,"rownum":104,"full_name":"Warren E. Miller","id":"MDL000328","district":"9A","district_padded":"09A","sort1":9,"party":"R","email":"warren.miller@house.state.md.us","twitter":"delwarmill"},
    {"indexmatch":"9B","score2017":63,"lifetimescore":60,"rownum":105,"full_name":"Robert L. Flanagan","id":"MDL000631","district":"9B","district_padded":"09B","sort1":9,"party":"R","email":"Bob.Flanagan@house.state.md.us","twitter":"FlanaganForEC"},
    {"indexmatch":"10","score2017":100,"lifetimescore":100,"rownum":16,"full_name":"Benjamin Brooks","id":"MDL000625","district":"10","district_padded":"010","sort1":10,"party":"D","email":"Benjamin.Brooks@house.state.md.us","twitter":"BenBrooksSr"},
    {"indexmatch":"10","score2017":71,"lifetimescore":85,"rownum":17,"full_name":"Jay Jalisi","id":"MDL000638","district":"10","district_padded":"010","sort1":10,"party":"D","email":"Jay.Jalisi@house.state.md.us","twitter":"FriendsofJalisi"},
    {"indexmatch":"10","score2017":100,"lifetimescore":94,"rownum":18,"full_name":"Adrienne A. Jones","id":"MDL000304","district":"10","district_padded":"010","sort1":10,"party":"D","email":"drienne.jones@house.state.md.us","twitter":""},
    {"indexmatch":"11","score2017":100,"lifetimescore":100,"rownum":21,"full_name":"Shelly Hettleman","id":"MDL000667","district":"11","district_padded":"011","sort1":11,"party":"D","email":"Shelly.Hettleman@house.state.md.us","twitter":"shellyhettleman"},
    {"indexmatch":"11","score2017":100,"lifetimescore":98,"rownum":19,"full_name":"Dan K. Morhaim","id":"MDL000332","district":"11","district_padded":"011","sort1":11,"party":"D","email":"dan.morhaim@house.state.md.us","twitter":"DanMorhaim"},
    {"indexmatch":"11","score2017":100,"lifetimescore":92,"rownum":20,"full_name":"Dana M. Stein","id":"MDL000361","district":"11","district_padded":"011","sort1":11,"party":"D","email":"dana.stein@house.state.md.us","twitter":""},
    {"indexmatch":"12","score2017":100,"lifetimescore":100,"rownum":23,"full_name":"Eric Ebersole","id":"MDL000691","district":"12","district_padded":"012","sort1":12,"party":"D","email":"Eric.Ebersole@house.state.md.us","twitter":"ericebersole"},
    {"indexmatch":"12","score2017":100,"lifetimescore":100,"rownum":24,"full_name":"Terri L. Hill","id":"MDL000647","district":"12","district_padded":"012","sort1":12,"party":"D","email":"Terri.Hill@house.state.md.us","twitter":"FriendsofTerri"},
    {"indexmatch":"12","score2017":100,"lifetimescore":100,"rownum":22,"full_name":"Clarence K. Lam","id":"MDL000643","district":"12","district_padded":"012","sort1":12,"party":"D","email":"Clarence.Lam@house.state.md.us","twitter":"ClarenceLamMD"},
    {"indexmatch":"13","score2017":100,"lifetimescore":100,"rownum":26,"full_name":"Vanessa E. Atterbeary","id":"MDL000620","district":"13","district_padded":"013","sort1":13,"party":"D","email":"Vanessa.Atterbeary@house.state.md.us","twitter":"VAtterbeary"},
    {"indexmatch":"13","score2017":100,"lifetimescore":94,"rownum":27,"full_name":"Shane E. Pendergrass","id":"MDL000342","district":"13","district_padded":"013","sort1":13,"party":"D","email":"shane.pendergrass@house.state.md.us","twitter":""},
    {"indexmatch":"13","score2017":100,"lifetimescore":94,"rownum":25,"full_name":"Frank S. Turner","id":"MDL000368","district":"13","district_padded":"013","sort1":13,"party":"D","email":"frank.turner@house.state.md.us","twitter":""},
    {"indexmatch":"14","score2017":100,"lifetimescore":93,"rownum":29,"full_name":"Anne R. Kaiser","id":"MDL000306","district":"14","district_padded":"014","sort1":14,"party":"D","email":"nne.kaiser@house.state.md.us","twitter":"DelegateKaiser"},
    {"indexmatch":"14","score2017":100,"lifetimescore":94,"rownum":28,"full_name":"Eric G. Luedtke","id":"MDL000401","district":"14","district_padded":"014","sort1":14,"party":"D","email":"eric.luedtke@house.state.md.us","twitter":"EricLuedtke"},
    {"indexmatch":"14","score2017":100,"lifetimescore":100,"rownum":30,"full_name":"Pam Queen","id":"MDL000417","district":"14","district_padded":"014","sort1":14,"party":"D","email":"craig.zucker@house.state.md.us","twitter":""},
    {"indexmatch":"15","score2017":100,"lifetimescore":95,"rownum":32,"full_name":"Kathleen M. Dumais","id":"MDL000270","district":"15","district_padded":"015","sort1":15,"party":"D","email":"kathleen.dumais@house.state.md.us","twitter":"KathleenDumais1"},
    {"indexmatch":"15","score2017":100,"lifetimescore":100,"rownum":33,"full_name":"David Fraser-Hidalgo","id":"MDL000617","district":"15","district_padded":"015","sort1":15,"party":"D","email":"david.fraser.hidalgo@house.state.md.us","twitter":"fraserfor15"},
    {"indexmatch":"15","score2017":100,"lifetimescore":94,"rownum":31,"full_name":"Aruna Miller","id":"MDL000404","district":"15","district_padded":"015","sort1":15,"party":"D","email":"runa.miller@house.state.md.us","twitter":"arunamiller"},
    {"indexmatch":"16","score2017":100,"lifetimescore":97,"rownum":36,"full_name":"C. William Frick","id":"MDL000277","district":"16","district_padded":"016","sort1":16,"party":"D","email":"bill.frick@house.state.md.us","twitter":"billfrick"},
    {"indexmatch":"16","score2017":100,"lifetimescore":100,"rownum":34,"full_name":"Ariana B. Kelly","id":"MDL000400","district":"16","district_padded":"016","sort1":16,"party":"D","email":"riana.kelly@house.state.md.us","twitter":"DelArianaKelly"},
    {"indexmatch":"16","score2017":100,"lifetimescore":100,"rownum":35,"full_name":"Marc Korman","id":"MDL000657","district":"16","district_padded":"016","sort1":16,"party":"D","email":"Marc.Korman@house.state.md.us","twitter":"mkorman"},
    {"indexmatch":"17","score2017":100,"lifetimescore":91,"rownum":39,"full_name":"Kumar P. Barve","id":"MDL000244","district":"17","district_padded":"017","sort1":17,"party":"D","email":"kumar.barve@house.state.md.us","twitter":"KumarBarve"},
    {"indexmatch":"17","score2017":100,"lifetimescore":93,"rownum":37,"full_name":"James W. Gilchrist","id":"MDL000281","district":"17","district_padded":"017","sort1":17,"party":"D","email":"jim.gilchrist@house.state.md.us","twitter":""},
    {"indexmatch":"17","score2017":100,"lifetimescore":100,"rownum":38,"full_name":"Andrew Platt","id":"MDL000644","district":"17","district_padded":"017","sort1":17,"party":"D","email":"Andrew.Platt@house.state.md.us","twitter":"PlattforMD"},
    {"indexmatch":"18","score2017":100,"lifetimescore":97,"rownum":40,"full_name":"Alfred C. Carr Jr.","id":"MDL000260","district":"18","district_padded":"018","sort1":18,"party":"D","email":"fred.carr@house.state.md.us","twitter":"alfredcarr"},
    {"indexmatch":"18","score2017":100,"lifetimescore":99,"rownum":41,"full_name":"Ana Sol Gutierrez","id":"MDL000284","district":"18","district_padded":"018","sort1":18,"party":"D","email":"na.gutierrez@house.state.md.us","twitter":"asolg"},
    {"indexmatch":"18","score2017":100,"lifetimescore":98,"rownum":42,"full_name":"Jeffrey D. Waldstreicher","id":"MDL000373","district":"18","district_padded":"018","sort1":18,"party":"D","email":"jeff.waldstreicher@house.state.md.us","twitter":"jwaldstreicher"},
    {"indexmatch":"19","score2017":100,"lifetimescore":100,"rownum":43,"full_name":"Bonnie L. Cullison","id":"MDL000393","district":"19","district_padded":"019","sort1":19,"party":"D","email":"bonnie.cullison@house.state.md.us","twitter":"Del_Cullison"},
    {"indexmatch":"19","score2017":100,"lifetimescore":93,"rownum":44,"full_name":"Benjamin F. Kramer","id":"MDL000311","district":"19","district_padded":"019","sort1":19,"party":"D","email":"benjamin.kramer@house.state.md.us","twitter":""},
    {"indexmatch":"19","score2017":100,"lifetimescore":100,"rownum":45,"full_name":"Marice Morales","id":"MDL000635","district":"19","district_padded":"019","sort1":19,"party":"D","email":"Marice.Morales@house.state.md.us","twitter":"Marice_Morales"},
    {"indexmatch":"20","score2017":100,"lifetimescore":93,"rownum":51,"full_name":"Sheila E. Hixson","id":"MDL000293","district":"20","district_padded":"020","sort1":20,"party":"D","email":"sheila.hixson@house.state.md.us","twitter":"delsheilahixson"},
    {"indexmatch":"20","score2017":100,"lifetimescore":100,"rownum":50,"full_name":"David Moon","id":"MDL000645","district":"20","district_padded":"020","sort1":20,"party":"D","email":"David.Moon@house.state.md.us","twitter":"DavidMoon2014"},
    {"indexmatch":"20","score2017":100,"lifetimescore":100,"rownum":49,"full_name":"Jheanelle Wilkins","id":"MDL000623","district":"20","district_padded":"020","sort1":20,"party":"D","email":"jheanelle.wilkins@house.state.md.us","twitter":"Willcsmithjr"},
    {"indexmatch":"21","score2017":100,"lifetimescore":95,"rownum":54,"full_name":"Benjamin S. Barnes","id":"MDL000241","district":"21","district_padded":"021","sort1":21,"party":"D","email":"ben.barnes@house.state.md.us","twitter":""},
    {"indexmatch":"21","score2017":100,"lifetimescore":91,"rownum":53,"full_name":"Barbara A. Frush","id":"MDL000278","district":"21","district_padded":"021","sort1":21,"party":"D","email":"barbara.frush@house.state.md.us","twitter":"delegate61hotma"},
    {"indexmatch":"21","score2017":100,"lifetimescore":97,"rownum":52,"full_name":"Joseline A. Pena-Melnyk","id":"MDL000341","district":"21","district_padded":"021","sort1":21,"party":"D","email":"joseline.pena.melnyk@house.state.md.us","twitter":"penamelnykformd"},
    {"indexmatch":"22","score2017":100,"lifetimescore":95,"rownum":57,"full_name":"Tawanna P. Gaines","id":"MDL000279","district":"22","district_padded":"022","sort1":22,"party":"D","email":"wanna.gaines@house.state.md.us","twitter":""},
    {"indexmatch":"22","score2017":100,"lifetimescore":94,"rownum":56,"full_name":"Anne Healey","id":"MDL000290","district":"22","district_padded":"022","sort1":22,"party":"D","email":"nne.healey@house.state.md.us","twitter":""},
    {"indexmatch":"22","score2017":100,"lifetimescore":96,"rownum":55,"full_name":"Alonzo T. Washington","id":"MDL000605","district":"22","district_padded":"022","sort1":22,"party":"D","email":"nzo.washington@house.state.md.us","twitter":"DelegateATW"},
    {"indexmatch":"23A","score2017":100,"lifetimescore":96,"rownum":106,"full_name":"Geraldine Valentino-Smith","id":"MDL000413","district":"23A","district_padded":"23A","sort1":23,"party":"D","email":"geraldine.valentino.smith@house.state.md.us","twitter":""},
    {"indexmatch":"23B","score2017":100,"lifetimescore":90,"rownum":107,"full_name":"Marvin E. Holmes Jr.","id":"MDL000294","district":"23B","district_padded":"23B","sort1":23,"party":"D","email":"rvin.holmes@house.state.md.us","twitter":"MarvinEHolmesJr"},
    {"indexmatch":"23B","score2017":100,"lifetimescore":89,"rownum":108,"full_name":"Joseph F. Vallario, Jr.","id":"MDL000659","district":"23B","district_padded":"23B","sort1":23,"party":"D","email":"joseph.vallario@house.state.md.us","twitter":""},
    {"indexmatch":"24","score2017":100,"lifetimescore":95,"rownum":58,"full_name":"Carolyn J.B. Howard","id":"MDL000295","district":"24","district_padded":"024","sort1":24,"party":"D","email":"carolyn.howard@house.state.md.us","twitter":"carolynjbhoward"},
    {"indexmatch":"24","score2017":100,"lifetimescore":100,"rownum":59,"full_name":"Jazz Lewis","id":"MDL000372","district":"24","district_padded":"024","sort1":24,"party":"D","email":"jazz.lewis@house.state.md.us","twitter":""},
    {"indexmatch":"24","score2017":100,"lifetimescore":100,"rownum":60,"full_name":"Barron, Erek L.","id":"MDL000668","district":"24","district_padded":"024","sort1":24,"party":"D","email":"Erek.Barron@house.state.md.us","twitter":"erekbarron"},
    {"indexmatch":"25","score2017":100,"lifetimescore":100,"rownum":62,"full_name":"Angel, Angela","id":"MDL000663","district":"25","district_padded":"025","sort1":25,"party":"D","email":"Angela.Angel@house.state.md.us","twitter":"Angel4Dist25"},
    {"indexmatch":"25","score2017":100,"lifetimescore":100,"rownum":63,"full_name":"Darryl Barnes","id":"MDL000664","district":"25","district_padded":"025","sort1":25,"party":"D","email":"Darryl.Barnes@house.state.md.us","twitter":""},
    {"indexmatch":"25","score2017":100,"lifetimescore":95,"rownum":61,"full_name":"Dereck E Davis","id":"MDL000267","district":"25","district_padded":"025","sort1":25,"party":"D","email":"dereck.davis@house.state.md.us","twitter":""},
    {"indexmatch":"26","score2017":100,"lifetimescore":89,"rownum":66,"full_name":"Tony Knotts","id":"MDL000619","district":"26","district_padded":"026","sort1":26,"party":"D","email":"Tony.Knotts@house.state.md.us","twitter":"VoteKnotts"},
    {"indexmatch":"26","score2017":100,"lifetimescore":92,"rownum":65,"full_name":"Kriselda Valderrama","id":"MDL000370","district":"26","district_padded":"026","sort1":26,"party":"D","email":"kris.valderrama@house.state.md.us","twitter":""},
    {"indexmatch":"26","score2017":100,"lifetimescore":89,"rownum":64,"full_name":"Jay Walker","id":"MDL000374","district":"26","district_padded":"026","sort1":26,"party":"D","email":"jay.walker@house.state.md.us","twitter":""},
    {"indexmatch":"27A","score2017":100,"lifetimescore":88,"rownum":109,"full_name":"Susie Proctor","id":"MDL000343","district":"27A","district_padded":"27A","sort1":27,"party":"D","email":"susie.proctor@house.state.md.us","twitter":""},
    {"indexmatch":"27B","score2017":100,"lifetimescore":92,"rownum":110,"full_name":"Michael A. Jackson","id":"MDL000621","district":"27B","district_padded":"27B","sort1":27,"party":"D","email":"Michael.Jackson@house.state.md.us","twitter":"Michaelfor27B"},
    {"indexmatch":"27C","score2017":0,"lifetimescore":9,"rownum":111,"full_name":"Mark N. Fisher","id":"MDL000654","district":"27C","district_padded":"27C","sort1":27,"party":"R","email":"rk.fisher@house.state.md.us","twitter":"fisher4maryland"},
    {"indexmatch":"28","score2017":100,"lifetimescore":73,"rownum":68,"full_name":"Sally Y. Jameson","id":"MDL000301","district":"28","district_padded":"028","sort1":28,"party":"D","email":"sally.jameson@house.state.md.us","twitter":"SallyYJameson"},
    {"indexmatch":"28","score2017":100,"lifetimescore":100,"rownum":69,"full_name":"Edith J. Patterson","id":"MDL000689","district":"28","district_padded":"028","sort1":28,"party":"D","email":"Edith.Patterson@house.state.md.us","twitter":"EdithPatterson"},
    {"indexmatch":"28","score2017":100,"lifetimescore":83,"rownum":67,"full_name":"C. T. Wilson","id":"MDL000416","district":"28","district_padded":"028","sort1":28,"party":"D","email":"ct.wilson@house.state.md.us","twitter":"votectwilson"},
    {"indexmatch":"29A","score2017":17,"lifetimescore":17,"rownum":112,"full_name":"Matthew Morgan","id":"MDL000674","district":"29A","district_padded":"29A","sort1":29,"party":"R","email":"Matt.Morgan@house.state.md.us","twitter":"MattMorgan29A"},
    {"indexmatch":"29B","score2017":17,"lifetimescore":17,"rownum":113,"full_name":"Deborah C. Rey","id":"MDL000693","district":"29B","district_padded":"29B","sort1":29,"party":"R","email":"Deborah.Rey@house.state.md.us","twitter":""},
    {"indexmatch":"29C","score2017":25,"lifetimescore":25,"rownum":114,"full_name":"Gerald W. Clark","id":"MDL000339","district":"29C","district_padded":"29C","sort1":29,"party":"R","email":"jerry.clark@house.state.md.us","twitter":""},
    {"indexmatch":"30A","score2017":71,"lifetimescore":55,"rownum":115,"full_name":"Herb McMillan","id":"MDL000642","district":"30A","district_padded":"30A","sort1":30,"party":"R","email":"herb.mcmillan@house.state.md.us","twitter":"herbmcmillan"},
    {"indexmatch":"30A","score2017":100,"lifetimescore":94,"rownum":116,"full_name":"Michael E. Busch","id":"MDL000636","district":"30A","district_padded":"30A","sort1":30,"party":"D","email":"chael.busch@house.state.md.us","twitter":"SpeakerBusch"},
    {"indexmatch":"30B","score2017":29,"lifetimescore":26,"rownum":117,"full_name":"Seth A. Howard","id":"MDL000630","district":"30B","district_padded":"30B","sort1":30,"party":"R","email":"Seth.Howard@house.state.md.us","twitter":"sethfordelegate"},
    {"indexmatch":"31A","score2017":86,"lifetimescore":82,"rownum":118,"full_name":"Ned Carey","id":"MDL000665","district":"31A","district_padded":"31A","sort1":31,"party":"D","email":"Ned.Carey@house.state.md.us","twitter":""},
    {"indexmatch":"31B","score2017":50,"lifetimescore":50,"rownum":119,"full_name":"Meagan C. Simonaire","id":"MDL000690","district":"31B","district_padded":"31B","sort1":31,"party":"R","email":"Meagan.Simonaire@house.state.md.us","twitter":""},
    {"indexmatch":"31B","score2017":50,"lifetimescore":46,"rownum":120,"full_name":"Nicholaus R. Kipke","id":"MDL000626","district":"31B","district_padded":"31B","sort1":31,"party":"R","email":"nicholaus.kipke@house.state.md.us","twitter":"Kipke"},
    {"indexmatch":"32","score2017":100,"lifetimescore":89,"rownum":73,"full_name":"Pamela G. Beidle","id":"MDL000246","district":"32","district_padded":"032","sort1":32,"party":"D","email":"pamela.beidle@house.state.md.us","twitter":"beidlep1"},
    {"indexmatch":"32","score2017":100,"lifetimescore":100,"rownum":74,"full_name":"Mark S. Chang","id":"MDL000634","district":"32","district_padded":"032","sort1":32,"party":"D","email":"Mark.Chang@house.state.md.us","twitter":"marksoochang"},
    {"indexmatch":"32","score2017":100,"lifetimescore":94,"rownum":75,"full_name":"Theodore J. Sophocleus","id":"MDL000359","district":"32","district_padded":"032","sort1":32,"party":"D","email":"ted.sophocleus@house.state.md.us","twitter":""},
    {"indexmatch":"33","score2017":33,"lifetimescore":33,"rownum":77,"full_name":"Michael E. Malone","id":"MDL000720","district":"33","district_padded":"033","sort1":33,"party":"R","email":"Michael.Malone@house.state.md.us","twitter":""},
    {"indexmatch":"33","score2017":33,"lifetimescore":28,"rownum":78,"full_name":"Tony McConkey","id":"MDL000677","district":"33","district_padded":"033","sort1":33,"party":"R","email":"ny.mcconkey@house.state.md.us","twitter":"McConkey"},
    {"indexmatch":"33","score2017":33,"lifetimescore":22,"rownum":76,"full_name":"Sid Saab","id":"MDL000700","district":"33","district_padded":"033","sort1":33,"party":"R","email":"Sid.Saab@house.state.md.us","twitter":"SidSaab"},
    {"indexmatch":"34A","score2017":33,"lifetimescore":15,"rownum":121,"full_name":"Glen Glass","id":"MDL000395","district":"34A","district_padded":"34A","sort1":34,"party":"R","email":"glen.glass@house.state.md.us","twitter":""},
    {"indexmatch":"34A","score2017":100,"lifetimescore":100,"rownum":122,"full_name":"Mary Ann Lisanti","id":"MDL000703","district":"34A","district_padded":"34A","sort1":34,"party":"D","email":"MaryAnn.Lisanti@house.state.md.us","twitter":"maryannlisanti"},
    {"indexmatch":"34B","score2017":33,"lifetimescore":27,"rownum":123,"full_name":"Susan K. McComas","id":"MDL000641","district":"34B","district_padded":"34B","sort1":34,"party":"R","email":"susan.mccomas@house.state.md.us","twitter":""},
    {"indexmatch":"35A","score2017":50,"lifetimescore":56,"rownum":124,"full_name":"Kevin Bailey Hornberger","id":"MDL000692","district":"35A","district_padded":"35A","sort1":35,"party":"R","email":"Kevin.Hornberger@house.state.md.us","twitter":""},
    {"indexmatch":"35B","score2017":75,"lifetimescore":58,"rownum":125,"full_name":"Andrew Cassilly","id":"MDL000622","district":"35B","district_padded":"35B","sort1":35,"party":"R","email":"Andrew.Cassilly@house.state.md.us","twitter":""},
    {"indexmatch":"35B","score2017":33,"lifetimescore":47,"rownum":126,"full_name":"Teresa E. Reilly","id":"MDL000650","district":"35B","district_padded":"35B","sort1":35,"party":"R","email":"Teresa.Reilly@house.state.md.us","twitter":""},
    {"indexmatch":"36","score2017":0,"lifetimescore":6,"rownum":79,"full_name":"Steven J. Arentz","id":"MDL000618","district":"36","district_padded":"036","sort1":36,"party":"R","email":"steven.arentz@house.state.md.us","twitter":"Steve_Arentz"},
    {"indexmatch":"36","score2017":17,"lifetimescore":21,"rownum":80,"full_name":"Jefferson L. Ghrist","id":"MDL000686","district":"36","district_padded":"036","sort1":36,"party":"R","email":"Jeff.Ghrist@house.state.md.us","twitter":"jeffghrist"},
    {"indexmatch":"36","score2017":25,"lifetimescore":26,"rownum":81,"full_name":"Jay A. Jacobs","id":"MDL000399","district":"36","district_padded":"036","sort1":36,"party":"R","email":"jay.jacobs@house.state.md.us","twitter":""},
    {"indexmatch":"37A","score2017":60,"lifetimescore":70,"rownum":127,"full_name":"Sheree Sample-Hughes","id":"MDL000683","district":"37A","district_padded":"37A","sort1":37,"party":"D","email":"Sheree.Sample.Hughes@house.state.md.us","twitter":""},
    {"indexmatch":"37B","score2017":14,"lifetimescore":13,"rownum":129,"full_name":"Christopher T. Adams","id":"MDL000697","district":"37B","district_padded":"37B","sort1":37,"party":"R","email":"Christopher.Adams@house.state.md.us","twitter":"Adams4Maryland"},
    {"indexmatch":"37B","score2017":50,"lifetimescore":25,"rownum":128,"full_name":"Johnny Mautz","id":"MDL000660","district":"37B","district_padded":"37B","sort1":37,"party":"R","email":"Johnny.Mautz@house.state.md.us","twitter":"Mautz4Delegate"},
    {"indexmatch":"38A","score2017":25,"lifetimescore":20,"rownum":130,"full_name":"Charles J. Otto","id":"MDL000406","district":"38A","district_padded":"38A","sort1":38,"party":"R","email":"charles.otto@house.state.md.us","twitter":""},
    {"indexmatch":"38B","score2017":50,"lifetimescore":50,"rownum":131,"full_name":"Carl  Anderton, Jr.","id":"MDL000684","district":"38B","district_padded":"38B","sort1":38,"party":"R","email":"Carl.Anderton@house.state.md.us","twitter":"carlandertonjr"},
    {"indexmatch":"38C","score2017":17,"lifetimescore":44,"rownum":132,"full_name":"Mary Beth Carozza","id":"MDL000695","district":"38C","district_padded":"38C","sort1":38,"party":"R","email":"MaryBeth.Carozza@house.state.md.us","twitter":"DelMBCarozza"},
    {"indexmatch":"39","score2017":100,"lifetimescore":87,"rownum":82,"full_name":"Charles E. Barkley","id":"MDL000240","district":"39","district_padded":"039","sort1":39,"party":"D","email":"charles.barkley@house.state.md.us","twitter":""},
    {"indexmatch":"39","score2017":100,"lifetimescore":98,"rownum":84,"full_name":"Kirill Reznik","id":"MDL000345","district":"39","district_padded":"039","sort1":39,"party":"D","email":"kirill.reznik@house.state.md.us","twitter":"DelegateReznik"},
    {"indexmatch":"39","score2017":100,"lifetimescore":98,"rownum":83,"full_name":"Shane D. Robinson","id":"MDL000409","district":"39","district_padded":"039","sort1":39,"party":"D","email":"shane.robinson@house.state.md.us","twitter":"DelSRobinson"},
    {"indexmatch":"40","score2017":100,"lifetimescore":87,"rownum":89,"full_name":"Frank M. Conaway Jr.","id":"MDL000264","district":"40","district_padded":"040","sort1":40,"party":"D","email":"frank.conaway@house.state.md.us","twitter":""},
    {"indexmatch":"40","score2017":100,"lifetimescore":100,"rownum":90,"full_name":"Antonio L. Hayes","id":"MDL000632","district":"40","district_padded":"040","sort1":40,"party":"D","email":"Antonio.Hayes@house.state.md.us","twitter":"CFAntonioHayes"},
    {"indexmatch":"40","score2017":100,"lifetimescore":100,"rownum":88,"full_name":"Nick J. Mosby","id":"MDL000348","district":"40","district_padded":"040","sort1":40,"party":"D","email":"nick.mosby@house.state.md.us","twitter":""},
    {"indexmatch":"41","score2017":100,"lifetimescore":100,"rownum":91,"full_name":"Bilal Ali","id":"MDL000261","district":"41","district_padded":"041","sort1":41,"party":"D","email":"bilal.ali@house.state.md.us","twitter":"jillpcarter"},
    {"indexmatch":"41","score2017":100,"lifetimescore":100,"rownum":92,"full_name":"Angela C. Gibson","id":"MDL000338","district":"41","district_padded":"041","sort1":41,"party":"D","email":"angela.gibson@house.state.md.us","twitter":""},
    {"indexmatch":"41","score2017":100,"lifetimescore":93,"rownum":93,"full_name":"Samuel I. Rosenberg","id":"MDL000349","district":"41","district_padded":"041","sort1":41,"party":"D","email":"samuel.rosenberg@house.state.md.us","twitter":"delsandy"},
    {"indexmatch":"42A","score2017":100,"lifetimescore":95,"rownum":133,"full_name":"Stephen W. Lafferty","id":"MDL000679","district":"42A","district_padded":"42A","sort1":42,"party":"D","email":"stephen.lafferty@house.state.md.us","twitter":"delsteve42"},
    {"indexmatch":"42B","score2017":71,"lifetimescore":41,"rownum":134,"full_name":"Susan L. M. Aumann","id":"MDL000656","district":"42B","district_padded":"42B","sort1":42,"party":"R","email":"susan.aumann@house.state.md.us","twitter":"Susanaumann"},
    {"indexmatch":"42B","score2017":83,"lifetimescore":86,"rownum":135,"full_name":"Chris West","id":"MDL000666","district":"42B","district_padded":"42B","sort1":42,"party":"R","email":"Chris.West@house.state.md.us","twitter":""},
    {"indexmatch":"43","score2017":100,"lifetimescore":94,"rownum":95,"full_name":"Curt Anderson","id":"MDL000238","district":"43","district_padded":"043","sort1":43,"party":"D","email":"curt.anderson@house.state.md.us","twitter":"DelegateHaynes"},
    {"indexmatch":"43","score2017":100,"lifetimescore":90,"rownum":96,"full_name":"Maggie D. McIntosh","id":"MDL000327","district":"43","district_padded":"043","sort1":43,"party":"D","email":"ggie.mcintosh@house.state.md.us","twitter":"DelMaggie43"},
    {"indexmatch":"43","score2017":100,"lifetimescore":100,"rownum":94,"full_name":"Mary L. Washington","id":"MDL000415","district":"43","district_padded":"043","sort1":43,"party":"D","email":"ry.washington@house.state.md.us","twitter":"DelMaryW"},
    {"indexmatch":"44A","score2017":100,"lifetimescore":94,"rownum":136,"full_name":"Keith E. Haynes","id":"MDL000669","district":"44A","district_padded":"44A","sort1":44,"party":"D","email":"keith.haynes@house.state.md.us","twitter":"DelegateHaynes"},
    {"indexmatch":"44B","score2017":100,"lifetimescore":100,"rownum":137,"full_name":"Charles E. Sydnor III","id":"MDL000652","district":"44B","district_padded":"44B","sort1":44,"party":"D","email":"Charles.Sydnor@house.state.md.us","twitter":"CharlesSydnor3d"},
    {"indexmatch":"44B","score2017":100,"lifetimescore":100,"rownum":138,"full_name":"Pat D. Young","id":"MDL000670","district":"44B","district_padded":"44B","sort1":44,"party":"D","email":"pat.young@house.state.md.us","twitter":""},
    {"indexmatch":"45","score2017":100,"lifetimescore":90,"rownum":99,"full_name":"Talmadge Branch","id":"MDL000252","district":"45","district_padded":"045","sort1":45,"party":"D","email":"dge.branch@house.state.md.us","twitter":"WhipTBranch"},
    {"indexmatch":"45","score2017":100,"lifetimescore":87,"rownum":97,"full_name":"Cheryl D. Glenn","id":"MDL000282","district":"45","district_padded":"045","sort1":45,"party":"D","email":"cheryl.glenn@house.state.md.us","twitter":""},
    {"indexmatch":"45","score2017":100,"lifetimescore":94,"rownum":98,"full_name":"Cory. V. McCray","id":"MDL000640","district":"45","district_padded":"045","sort1":45,"party":"D","email":"Cory.McCray@house.state.md.us","twitter":"electcorymccray"},
    {"indexmatch":"46","score2017":100,"lifetimescore":96,"rownum":100,"full_name":"Luke H. Clippinger","id":"MDL000391","district":"46","district_padded":"046","sort1":46,"party":"D","email":"uke.clippinger@house.state.md.us","twitter":"lukeclippinger"},
    {"indexmatch":"46","score2017":100,"lifetimescore":100,"rownum":101,"full_name":"Robbyn T. Lewis","id":"MDL000287","district":"46","district_padded":"046","sort1":46,"party":"D","email":"robbyn.lewis@house.state.md.us","twitter":""},
    {"indexmatch":"46","score2017":100,"lifetimescore":100,"rownum":102,"full_name":"Brooke E. Lierman","id":"MDL000688","district":"46","district_padded":"046","sort1":46,"party":"D","email":"Brooke.Lierman@house.state.md.us","twitter":"BELBaltimore"},
    {"indexmatch":"47A","score2017":100,"lifetimescore":100,"rownum":140,"full_name":"Diana M. Fennell","id":"MDL000651","district":"47A","district_padded":"47A","sort1":47,"party":"D","email":"Diana.Fennell@house.state.md.us","twitter":"DianaMFennell"},
    {"indexmatch":"47A","score2017":100,"lifetimescore":100,"rownum":139,"full_name":"Jimmy D. Tarlau","id":"MDL000661","district":"47A","district_padded":"47A","sort1":47,"party":"D","email":"Jimmy.Tarlau@house.state.md.us","twitter":"JimmyTarlau"},
    {"indexmatch":"47B","score2017":100,"lifetimescore":100,"rownum":141,"full_name":"Carlo Sanchez","id":"MDL000649","district":"47B","district_padded":"47B","sort1":47,"party":"D","email":"Will.Campos@house.state.md.us","twitter":""}];


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

    for (i = 0; i < data.length; i++) {
        scoreColor = getColor(data[i].score2017);
        data[i]['scoreColor'] = scoreColor;
        MDSenateDistricts[data[i].rownum] = data[i];
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
  var rownum = Number(data.properties.rownum);
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


function loadGeo() {
  L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
      minZoom: 8,
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
  var memberNumber = Number(layer.feature.properties.rownum);
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
  var memberNumber = Number(boundary.feature.properties.rownum);
  var member = memberDetailFunction(memberNumber);
}

function memberDetailFunction(memberNumber) {
  var districtDetail = MDSenateDistricts[memberNumber];
  var html = app.infoboxTemplate(districtDetail);
  $('#sidebar').html(html);
  // $('#sidebar').html(JSON.stringify(districtDetail));
}


$(document).on("click", "button", function(event) {
  event.preventDefault();
  clearInfobox();
  freeze = 0;
});

function clearInfobox() {
    sidebar.html(' ');
}
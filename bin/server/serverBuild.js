//Server-Build Version: BETA => 0.2.2360
console.log("pragm-Websocket-Server => BUILD 0.2.2360 BETA");/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 21.01.2014
#       Filename......................: date.js
#       Version/Release...............: 0.6xx
#
******************************************************************************************/

var date_typ = function date_typ(){

	this.day = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	this.month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    
    this.fileDate = function(){
	    var now = new Date(); // Muster: Sunday 4.December 2013<br>22:42
        var Std = now.getHours();
        var Min = now.getMinutes();
        var StdAusgabe = ((Std < 10) ? "0" + Std : Std);
        var MinAusgabe = ((Min < 10) ? "0" + Min : Min);
        return this.day[now.getDay()]+" "+now.getDate()+"."+this.month[now.getMonth()]+" "+now.getFullYear()+"<br>"+StdAusgabe+":"+MinAusgabe; 
	};
    
    this.showDate = function(timestamp){
	    var now = new Date();
	    var fil = new Date(timestamp);
        var Std = fil.getHours();
        Std = Std.toString();
        while(Std.length < 2){Std="0"+Std;}
        var Min = fil.getMinutes();
        Min = Min.toString();
        while(Min.length < 2){Min="0"+Min;}
        var day = fil.getDate();
        var mon = fil.getMonth();
        mon++;
        var yea = fil.getFullYear();
        return mon+"/"+day+"/"+yea+" - "+Std+":"+Min; 
	};

};

var date = new date_typ();


/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: dif.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var dif_typ = function dif_typ() {
	
    this.abrundenTeil = function (zahl) {
	   zahl = (zahl - (zahl % 2)) / 2;
	   return zahl;
    };
    
	/*this.generateHuge = function (T1, T2, s1, S2) { // TODO: OLD VERSION UPDATED
		var work = 0, t1 = T1, t2 = T2, S1 = s1, mid, loop = true, t1sub = "", t2sub = "", pos = 0, P1, difa, add = "", t, len, pos2, erg, outarray;
		while (loop) {
			mid = this.abrundenTeil(s1);
			t1sub = t1.substr(0, mid);
			t2sub = t2.substr(0, mid);
			if (t1sub === t2sub) {
				t1 = t1.substr(mid);
				t2 = t2.substr(mid);
				pos += mid;
			} else {
				t1 = t1sub;
				t2 = t2sub;
			}
			s1 = t1.length;
			if (s1 < 2) {loop = false; }
		}
		P1 = pos;
		if (S1 > S2) {
			difa = S1 - S2;
			while (difa > 0) {
				add += "<";
				difa--;
			}
			t2 = add + T2.substr(pos);
			work = 1;
		} else {
			t2 = T2.substr(pos);
		}
		if (S2 > S1) {
			difa = S2 - S1;
			while (difa > 0) {
				add += "<";
				difa--;
			}
			if (P1 >= S1) {
                P1++;
                pos++;
            }
			t1 = add + T1.substr(pos);
			work = 1;
		} else {
			t1 = T1.substr(pos);
		}
		s1 = t1.length;
		loop = true;
		pos = 0;
		t = t1;
		while (loop) {
			mid = this.abrundenTeil(s1);
			t1sub = t1.substr(mid);
			t2sub = t2.substr(mid);
			if (t1sub !== t2sub) {
				t1 = t1sub;
				t2 = t2sub;
				pos += mid;
			} else {
				t1 = t1.substr(0, mid);
				t2 = t2.substr(0, mid);
			}
			s1 = t1.length;
			if (s1 < 2) {
                loop = false;
            }
		}
		len = pos + 1;
		pos2 = 0;
		if (work === 0) {
            erg = t.substr(0, len);
            pos2 = len + P1;
        }
		if (S1 > S2) {
            erg = t.substr(0, len);
            pos2 = P1 + (len - (S1 - S2));
        }
		if (S2 > S1) {
            difa = (S2 - S1);
            erg = T1.substr(P1, len - (S2 - S1));
            pos2 = P1 + len;
        }
		outarray = {
			pos1: P1, 
			pos2: pos2, 
			edit: erg
		};
		return outarray;
	}; */	
    
    this.generateNextGen = function(T1, T2, S1, S2) {
		var di = 0, loop = true, work = 0, t1 = T1, t2 = T2, s1 = S1, s2 = S2, p1 = 0, p2 = 0, e, len = 0;
		if(s1>s2){
            di = s2;
        }
        if(s2>s1){
            di = s1;
        }
        if(di > 0 && t1.substr(0, di) == t2.substr(0, di)){
            loop = false;
        }
        if(loop){
			for(var i=0; i<s1 && i<s2 && t1.charAt(i)==t2.charAt(i); i++){
			}
        	t2 = t2.substr(i);
        	t1 = t1.substr(i);
        	p1 = i;
		} else {
       		t2 = t2.substr(di);
        	t1 = t1.substr(di);
        	p1 = di;
		}
        var d = 0;
		if (s1 > s2) {
            d = s1 - s2;
            var c = t1.substr(0, d);
            t1 = t1.substr(d);
			work = 1;
		}
		if (s2 > s1) {
            d = s2 - s1;
            t2 = t2.substr(d);
			work = 1; 
		}
		s1 = t1.length;
		s2 = t2.length;
        if(t1!=t2){
			for(var i=-1; i>=-s1 && t1.charAt(s1+i)==t2.charAt(s2+i); i--){
			}
			len = s1+i + 1 + d;
        } else {
            len = d;
        }
        pos2 = 0;
		if (work == 0) {
            e = t1.substr(0, len);
            p2 = len + p1;
        }
		if (S1 > S2) {
            e = (c+t1).substr(0, len);
            p2 = p1 + (len - d);
        }
		if (S2 > S1) {
            e = T1.substr(p1, len - d);
            p2 = p1 + len;
        }
		outarray = {
			pos1: p1, 
			pos2: p2,
			edit: e
		};
		return outarray;
    }
    
    this.generateHuge = function (T1, T2, s1, S2) {  // TODO: New Version
        var startHuge = new Date();
		var work = 0, t1 = T1, t2 = T2, S1 = s1, mid, loop = true, t1sub = "", t2sub = "", pos = 0, P1, difa, add = "", t, len, pos2, erg, outarray, di;
        if(S1>S2){
            di = S2;
        }
        if(S2>S1){
            di = S1;
        }
        if(t1.substr(0, di) == t2.substr(0, di)){
            loop = false;
            pos = di;
        }
		while (loop) {
			mid = this.abrundenTeil(s1);
			t1sub = t1.substr(0, mid);
			t2sub = t2.substr(0, mid);
			if (t1sub === t2sub) {
				t1 = t1.substr(mid);
				t2 = t2.substr(mid);
				pos += mid;
			} else {
				t1 = t1sub;
				t2 = t2sub;
			}
			s1 = t1.length;
			if (s1 < 2) {loop = false; }
		}
        t2 = T2.substr(pos);
        t1 = T1.substr(pos);
		P1 = pos;
		t = t1;
        var d = 0;
		if (S1 > S2) {
            d = S1 - S2;
            var c = t1.substr(0, d);
            t1 = t1.substr(d);
			work = 1;
		}
		if (S2 > S1) {
            d = S2 - S1;
            t2 = t2.substr(d);
			work = 1; 
		}
		s1 = t1.length;
		loop = true;
		pos = 0;
        if(t1!=t2){
            while (loop) {
                mid = this.abrundenTeil(s1);
                t1sub = t1.substr(mid);
                t2sub = t2.substr(mid);
                if (t1sub !== t2sub) {
                    t1 = t1sub;
                    t2 = t2sub;
                    pos += mid;
                } else {
                    t1 = t1.substr(0, mid);
                    t2 = t2.substr(0, mid);
                }
                s1 = t1.length;
                if (s1 < 2) {
                    loop = false;
                }
            }
            len = pos + 1 + d;
        } else {
            len = d;
        }
		pos2 = 0;
		if (work === 0) {
            erg = t.substr(0, len);
            pos2 = len + P1;
        }
		if (S1 > S2) {
            erg = t.substr(0, len);
            pos2 = P1 + (len - (S1 - S2));
        }
		if (S2 > S1) {
            difa = (S2 - S1);
            erg = T1.substr(P1, len - (S2 - S1));
            pos2 = P1 + len;
        }
		outarray = {
			pos1: P1, 
			pos2: pos2, 
			edit: erg
		};
		return outarray;
	};

	this.generate = function (tNeu, tAlt, sNeu, sAlt) {
		var countbegin = 0, countend = -1, edit = "", pos = 0, pos2 = 0, a, b, work = 0, vNeu, vAlt, sub, outarray;
		//var countend = -1;
		//var edit="";
		//var pos = 0;
		//var pos2 = 0; 
		//var a;
		//var b;
		//var sNeu = tNeu.length;    //Lade Länge des Neuen Strings in sNeu
		//var sAlt = tAlt.length;    //Lade Länge des Alten Strings in sAlt
		//var work = 0;
		if (sNeu === sAlt) {  //Prüfe ob Stringlänge gleich ist.   FALL 1 (einfachster Fall) #########################################################
			if (tNeu === tAlt) {return false; }
			a = tNeu[countbegin];        //Lade erstes Zeichen des neuen Strings in a
			b = tAlt[countbegin];        //Lade erstes Zeichen des alten Strings in b
			
			while (a === b && (a !== "" || b !== "")) {       //Geht die Strings von Vorne nach hinten durch und stoppt sobald etwas anders ist
				countbegin++;                      //Zähle die Zeichen hoch
				a = tNeu[countbegin];    //Lade aktuelles Zeichen des neuen Strings in a
				b = tAlt[countbegin];    //Lade aktuelles Zeichen des alten Strings in b
            }
		
			tNeu = tNeu.substr(countbegin);        //Kürze die von Beginn des Strings an gleiche Zeichenfolge weg
			tAlt = tAlt.substr(countbegin);        //Kürze die von Beginn des Strings an gleiche Zeichenfolge weg
			
			vNeu = tNeu.length;				   //Lade Aktuelle verkürzte Länge des Strings in vNeu
			vAlt = tAlt.length;				   //Lade Aktuelle verkürzte Länge des Strings in vAlt

			a = tNeu[vNeu + countend];          //Lade erstes Zeichen des neuen Strings in a
			b = tAlt[vAlt + countend];          //Lade erstes Zeichen des alten Strings in b
			                
			while (a === b && (a !== "" || b !== "")) {       //Geht die Strings von Vorne nach hinten durch und stoppt sobald etwas anders ist
				countend--;                        //Zähle die Zeichen runter
				a = tNeu[vNeu + countend];      //Lade aktuelles Zeichen des neuen Strings in a
				b = tAlt[vAlt + countend];      //Lade aktuelles Zeichen des alten Strings in b
            }
			sub = vNeu + countend + 1;           //Errechne Länge des veränderten Stringabschnittes
			edit = tNeu.substr(0, sub);           //Schneide veränderten Stringabschnitt aus.
			work = 0;                              //Definiere, dass der Stringabschnitt ersetzt wird.
			pos = countbegin;                      //Definiere Anfangsposition des zu überschreibenden Strings
        }
		if (sNeu > sAlt) {  //Prüfe ob der Neue String länger als der Alte ist.   FALL 2  #########################################################
			
			a = tNeu[countbegin];        //Lade erstes Zeichen des neuen Strings in a
			b = tAlt[countbegin];        //Lade erstes Zeichen des alten Strings in b
			
			while (a === b && (a !== "" || b !== "")) {       //Geht die Strings von Vorne nach hinten durch und stoppt sobald etwas anders ist
				countbegin++;                      //Zähle die Zeichen hoch
				a = tNeu[countbegin];    //Lade aktuelles Zeichen des neuen Strings in a
				b = tAlt[countbegin];    //Lade aktuelles Zeichen des alten Strings in b
            }
			
			tNeu = tNeu.substr(countbegin);        //Kürze die von Beginn des Strings an gleiche Zeichenfolge weg
			tAlt = tAlt.substr(countbegin);        //Kürze die von Beginn des Strings an gleiche Zeichenfolge weg
			
			vNeu = tNeu.length;                //Lade Aktuelle verkürzte Länge des Strings in vNeu
			vAlt = tAlt.length;                //Lade Aktuelle verkürzte Länge des Neuen Strings in vAlt

			a = tNeu[vNeu + countend];          //Lade erstes Zeichen des neuen Strings in a
			b = tAlt[vAlt + countend];          //Lade erstes Zeichen des alten Strings in b
			
			while (a === b && (a !== "" || b !== "")) {       //Geht die Strings von Vorne nach hinten durch und stoppt sobald etwas anders ist
				countend--;                        //Zähle die Zeichen runter
				a = tNeu[vNeu + countend]; //Lade aktuelles Zeichen des neuen Strings in a
				b = tAlt[vAlt + countend]; //Lade aktuelles Zeichen des alten Strings in b
            }
			
			sub = vNeu + countend + 1;           //Errechne Länge des veränderten Stringabschnittes
			edit = tNeu.substr(0, sub);           //Schneide veränderten Stringabschnitt aus.
			work = 1;                              //Definiere, dass der Stringabschnitt hinzugefügt wird.
			pos = countbegin;                      //Definiere Anfangsposition des zu überschreibenden Strings
			pos2 = sAlt + countend + 1;              //Berechne die Endposition des zu überschreibenden Strings
			
        }
		if (sNeu < sAlt) {  //Prüfe ob der Alte String länger als der Neue ist.   FALL 3  #########################################################
			
			a = tNeu[countbegin];        //Lade erstes Zeichen des neuen Strings in a
			b = tAlt[countbegin];        //Lade erstes Zeichen des alten Strings in b
			
			while (a === b && (a !== "" || b !== "")) {       //Geht die Strings von Vorne nach hinten durch und stoppt sobald etwas anders ist
				countbegin++;                      //Zähle die Zeichen hoch
				a = tNeu[countbegin];    //Lade aktuelles Zeichen des neuen Strings in a
				b = tAlt[countbegin];    //Lade aktuelles Zeichen des alten Strings in b
            }
			
			tNeu = tNeu.substr(countbegin);        //Kürze die von Beginn des Strings an gleiche Zeichenfolge weg
			tAlt = tAlt.substr(countbegin);        //Kürze die von Beginn des Strings an gleiche Zeichenfolge weg
			
			vNeu = tNeu.length;                //Lade Aktuelle verkürzte Länge des Neuen Strings in vNeu
			vAlt = tAlt.length;                //Lade Aktuelle verkürzte Länge des Neuen Strings in vAlt

			a = tNeu[vNeu + countend];          //Lade erstes Zeichen des neuen Strings in a
			b = tAlt[vAlt + countend];          //Lade erstes Zeichen des alten Strings in b
	
			while (a === b && (a !== "" || b !== "")) {       //Geht die Strings von Vorne nach hinten durch und stoppt sobald etwas anders ist
				countend--;                        //Zähle die Zeichen runter
				a = tNeu[vNeu + countend]; //Lade aktuelles Zeichen des neuen Strings in a
				b = tAlt[vAlt + countend]; //Lade aktuelles Zeichen des alten Strings in b
            }
			sub = vNeu + countend + 1;           //Errechne Länge des veränderten Stringabschnittes
			edit = tNeu.substr(0, sub);           //Schneide veränderten Stringabschnitt aus.
			work = 1;                              //Definiere, dass der Stringabschnitt hinzugefügt wird.
			pos = countbegin;                      //Definiere Anfangsposition des zu überschreibenden Strings
			pos2 = sAlt + countend + 1;              //Berechne die Endposition des zu überschreibenden Strings
        }
		if (work === 0) {
            pos2 = edit.length + pos;
        }

		outarray = {
			pos1: pos, 
			pos2: pos2, 
			edit: edit
		};
		return outarray;
    };

	this.buildnew = function (pos1, pos2, edit, tAlt) {
		return tAlt.substr(0, pos1) + '' + edit + '' + tAlt.substring(pos2);
    };

	this.generateOpt = function (tNeu, tAlt){
		if(tNeu === tAlt){
			return {pos1: 0, pos2: 0, edit: ""};
		} else {
			var s1 = tNeu.length;
			var s2 = tAlt.length;
			if((s1+s2)/2 < global.difcut){
				return this.generateNextGen(tNeu, tAlt, s1, s2);
			} else {
				return this.generateHuge(tNeu, tAlt, s1, s2);
			}
		}
	};
};

var dif = new dif_typ();

/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: hash.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var hash_typ = function hash_typ(){

	this.old = function(e){for(var r=0,i=0;i<e.length;i++)r=(r<<5)-r+e.charCodeAt(i),r&=r;return r};
    
    this.a = function(e){
	   var r = 0;
	   var l = e.length;
	   for(i=0; i<l; i++){
           r = (r<<5)-r+e.charCodeAt(i);
           r &= r;
	   }
	   return r;
	};

	this.generate = function (e){
		var dat = parseInt(this.a(e));
		if(dat<0){
			dat = dat.toString();
			var ndat = "";
			for(i=1;i<dat.length;i++){
				ndat += (10-parseInt(dat[i])).toString();
				}
			dat = parseInt(ndat);
			}
		var dat = convert.int_to_string(dat);
		var x = dat.length
		if(x>6){dat = dat.substr(0,6);}else{
			x = 6-x;
			while(x>0){
				dat = "0"+dat;
				x--;
				}
			}
		return dat;
	}

};

var hash = new hash_typ();


/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: int_string_converter.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var convert_typ = function convert_typ(){
	
	this.str_list = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	
	 this.spezInt_to_string = function (number){
		var temp = this.str_list[number];
		return temp;
	};
	
	
	 this.spezString_to_int = function (key){
		counter = 0;
		while(counter<62){
			if(this.str_list[counter]==key){
				return counter;
			}
			counter++;
		}
	};
	
	this.int_to_string = function (number){
		var h="";
		var d;
		var c=false;
		if (number<=61){
			h=this.spezInt_to_string(number);
		}
		while(number>61){
			d = number % 62;
			c = parseInt(number/62);
			number = c;
			h = this.spezInt_to_string(d)+""+h;
		}
		if(c){
			h = this.spezInt_to_string(c)+""+h;
			}
		return h;
		
	};
	
	this.string_to_int = function (string){
		var length = string.length;
		var counter = length-1;
		var quad = 0;
		var sum=0;
		while(counter>=0){
			var fak2 = string.substr(counter, 1);
			var fak = this.spezString_to_int(fak2);
			sum = sum+this.quadrat(62, quad)*fak;
			quad++;
			counter--;
		}
		return sum;
	};
	
	this.quadrat = function (fak, quad){ 
		if(quad==0){return 1;}
		var sum = fak;
		while(quad>1){
			sum = sum*fak;
			quad--;
		}
		return sum;
	};

};


var convert = new convert_typ();

/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: net_varsd.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var net_typ = function net_typ(){


    //this.hashlength = 32;				//Stringlaenge des verwendeten HashCodes
    this.hashlength = 6;				//Stringlaenge des verwendeten HashCodes
    
    this.hashCode = function(e){
    	//var ha = MD5UTF8(e);
    	var ha = hash.generate(e);
        return ha;
    }
};

var net = new net_typ();


/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: static_ids.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var sID_typ = function sID_typ() {
    //bei verÃ¤nderung auch verÃ¤nderungen in sync_L3.php vornehemen!
    //GET_FROM_SERVER
    this.idLength = 10; //ZeichenlÃ¤nge einer ID

    this.getServer = "2000000000"; //Fragt Server nach bestimmter static ID

    //SEND_TO_SERVER
    this.clientName = "2000000001"; //Ãœbergibt den Clientnamen der Instanz an den Server
    this.file = "2000000002"; //Ãœbergibt zu landene DateiID an den Server
    this.userName = "2000000007"; //Ãœbergibt den Login Benutzernamen an den Server
    this.userPassword = "2000000008"; //Ãœbergibt das Login Passwort an den Server
    this.legitimationID = "2000000009"; //Ãœbergibt das Login Passwort an den Server
    this.userEdit = "2000000016"; //Ãœbergibt das Login Passwort an den Server

    //SEND_TO_SERVER ACTIONS WITH LEGITIMATION ID
    this.Login = "2001000000"; //Ãœbergabe und RÃ¼ckgabe des Login Objektes
    this.unloadFile = "2001000001"; //SchlieÃŸt die Datei
    this.addFile = "2001000002"; //FÃ¼gt eine Datei ins Verzeichnis hinzu
    this.deleteFile = "2001000003"; //LÃ¶scht eine Datei von ID
    this.killServer = "2001000004"; //LÃ¶scht eine Datei von ID
    this.moveFile = "2001000005"; //LÃ¶scht eine Datei von ID
    this.copyFile = "2001000006"; //LÃ¶scht eine Datei von ID
    this.checkKillLink = "2001000007"; //PrÃ¼ft ob Datei noch existiert und lÃ¶scht wenn nicht den link
    this.fileInfo = "2001000008";
    this.getUserName = "2001000009";
    this.createAccount = "2001000010"; //Sends and Returns Account Information
    this.deleteInviteKey = "2001000011"; //Sends and Returns Account Information
    this.setUserActive = "2001000012"; //Sends and Returns Account Information
    this.createInviteKey = "2001000013";
    this.chPassword = "2001000014";
    this.chUserConfig = "2001000015";


    //GET_FROM_SERVER
    this.fileList = "2000000003"; //Server sendet Dateiliste
    this.userList = "2000000004"; //Server sendet Userliste
    this.deleteID = "2000000005"; //Server sendet zu lÃ¶schende ID
    this.message = "2000000006"; //Server sendet anzuzeigende Nachricht
    this.testid = "2000000010";
    this.updated = "2000000011"; //Server meldet, dass Datei fertig geladen hat.
    this.fileunloadtrue = "2000000012"; //Server says, that closing file completed GitHub => #5
    this.fileUserList = "2000000013"; //Server sends userlist of a file to client
    this.returnUserName = "2000000014";
    this.fileRigths = "2000000015"; //Server sends userlist of a file to client
    this.ownclientID = "2000000017";

    /*
    	LEGITIMATION ID: Idee: 
    	- wird vom server erstellt und gesendet
    	- kann nur einmal verwendet werden fÃ¼r wichtige sachen (Login)
    	- danach wird neue benÃ¶tigt
    	- wenn falsch 24h IP-Ban 
    	*/
};

var sURL_typ = function sURL_typ() {
    //bei verÃ¤nderung auch verÃ¤nderungen in sync_L3.php vornehemen!
    //GET_FROM_SERVER
    //this.getUserDir        = "hex/pragm/dirServer/dirServer.php?jop=getUserDir"; //URL fÃ¼r UserID
    this.fileserver = {
        hostname: 'hex',
        port: 80,
        path: '/pragm/dirServer/dirServer.php',
        method: 'POST'
    };

};

var sURL = new sURL_typ();
var sID = new sID_typ();
/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: Aglobal_vars.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/
//var agent = require('webkit-devtools-agent');
var fs = require('fs');

var global_typ = function global_typ(){

	//Mandanten
	this.mSystem = 0;
	this.mAdmin = 1;
	this.mManage = 2;
	this.mDefault = 3;
	this.mGuest = 4;
	this.mNoLogin = 5;
    
    
    //Dateirechte
	this.rAdmin = 0; // Is able to read/write/rename/move/copy/changePermissionsOf file
	this.rWrite = 1; // Is able to read/write/rename/move/copy file
	this.rRead = 2;  // Is able to view/copy file
	this.rDefault = 3;


    this.firewall = new Array();
    this.firewall[this.mSystem] = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    this.firewall[this.mAdmin] = new Array('1', '2', '3', '4', '5');
    this.firewall[this.mManage] = new Array('1', '2', '3', '4', '5');
    this.firewall[this.mDefault] = new Array('1', '2', '3', '4');
    this.firewall[this.mGuest] = new Array(sID.Login, sID.userName, sID.userPassword, sID.clientName, '1');
    this.firewall[this.mNoLogin] = new Array(sID.Login, sID.userName, sID.userPassword, sID.clientName, sID.createAccount, sID.ownclientID);
    
    //this.config = { };
    //log(fs.readFileSync('config.json', 'UTF8'));
    this.config = JSON.parse(fs.readFileSync('config.json', 'UTF8'));
    log("CONFIG: "+JSON.stringify(this.config));
    //this = 9343;
    //this.config.dir = "./data/";

};

var global = new global_typ();



var commander_typ = function commander_typ(){
    
    this.send = function(comm, object){
        console.log("#"+comm+""+JSON.stringify(object));
    };
    
    this.portBloc = function(port){
        this.send("bloc", {"port": port, "info": "Port is blocked!"})
    };
    
};

var commander = new commander_typ();
var defaultData_typ = function () {

    this.dirObject = {
        "5SYSTEMUSR": {
            "name": "System",
            "username": "System",
            "firstname": "System",
            "lastname": "Boss",
            "email": "system@pragm.de",
            "password": "boss",
            "parent": "4ROOTFOLDR",
            "owner": "5SYSTEMUSR",
            "userRight": "0",
            "content": ["4ROOTFOLDR", "4DELETED00", "4DEADOBJEC","4SHARENOBO"],
            "share": {},
            "maxStorageScore": 5368709120,
            "inviteKeyArray": [],
            "active": true,
            "lastactive": 0,
            "storageScore": 0
        },
        "5GUESTUSER": {
            "owner": "5GUESTUSER",
            "parent": "4ROOTFOLDR",
            "name": "Guest",
            "username": "Guest",
            "firstname": "Max",
            "lastname": "Mustermann",
            "email": "max.mustermann@gmail.com",
            "password": "Guest",
            "userRight": 3,
            "content": [],
            "share": {},
            "maxStorageScore": 20000000,
            "storageScore": 0,
            "active": true,
            "lastactive": 0
        },
        "4ROOTFOLDR": {
            "name": "root",
            "parent": "5SYSTEMUSR",
            "owner": "5SYSTEMUSR",
            "content": ["5SYSTEMUSR", "5GUESTUSER"],
            "share": {},
            "lastmod": 0
        },
        "4DEADOBJEC": {
            "name": "dead objects",
            "parent": "5SYSTEMUSR",
            "owner": "5SYSTEMUSR",
            "content": [],
            "share": {},
            "lastmod": 0
        },
        "4SHARENOBO": {
            "name": "Unknown Shares",
            "parent": "5SYSTEMUSR",
            "owner": "5SYSTEMUSR",
            "content": [],
            "share": {},
            "lastmod": 0
        },
        "4DELETED00": {
            "name": "DELETED",
            "parent": "5SYSTEMUSR",
            "owner": "5SYSTEMUSR",
            "content": [],
            "share": {},
            "lastmod": 0
        }
    }

};


var defaultData = new defaultData_typ();
/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: difcontrol_L2.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var L2_typ = function L2_typ(){

	this.cache = [];
    
    this.old = {};
    this.old.Stext;
    this.old.Scache;
    this.old.dif = new Object();
    this.old.dif.pos1 = 0;
    this.old.dif.pos2 = 0;
    this.old.dif.edit = "";
    this.lastSendID = [];
    this.lastReceiveID = [];
	
	this.send = function(clientID, id, text) {
        //global.setTime(new Date().getTime());
        text = text.toString(); 

		if(typeof this.cache[clientID][id] == 'undefined'){
			this.cache[clientID][id] = "";
		}
        var oldText = this.cache[clientID][id];
        this.cache[clientID][id] = text;
        
        if(oldText == this.old.Scache && text == this.old.Stext){
            this.newdif.pos1 = this.old.dif.pos1;
            this.newdif.pos2 = this.old.dif.pos2;
            this.newdif.edit = this.old.dif.edit;
        } else {
            this.newdif = dif.generateOpt(text, oldText);
            this.old.dif.pos1 = this.newdif.pos1;
            this.old.dif.pos2 = this.newdif.pos2;
            this.old.dif.edit = this.newdif.edit;
        }

		this.newmd5 = net.hashCode(text);

		//this.cache[clientID][id] = text;
		
		this.pos1 = convert.int_to_string(this.newdif.pos1);
		this.pos2 = convert.int_to_string(this.newdif.pos2);
		
		this.init = convert.int_to_string(parseInt(this.pos1.length+''+this.pos2.length));
        
		this.output = id+''+this.newmd5+''+this.init+''+this.pos1+''+this.pos2+''+this.newdif.edit;
        
        if(this.output.length<=28 && this.lastSendID[clientID] == id){
            this.output = this.output.substr(10);
        }
        
        this.lastSendID[clientID] = id;
		L1.send(clientID, this.output);
		//return this.output;
		};
	
	this.recieve = function(clientID, text) {
        
        if(text[0] == '='){
            this.id = text.substr(1,10);
            log("Clearing Cache of ID "+this.id+"");
            this.cache[clientID][this.id] = "";
            return;
        }
		
        if(text.length <= 18){
            text = this.lastReceiveID[clientID]+text;
        }
        
		this.id = text.substr(0, 10);
		text =  text.substr(10);
		
        this.lastReceiveID[clientID] = this.id;
        
		//this.work = text.substr(0, 1);
		//text =  text.substr(1);
		
		this.md5 = text.substr(0, net.hashlength);
		text =  text.substr(net.hashlength);
		
		this.init = String(convert.string_to_int(text.substr(0, 1)));
		text =  text.substr(1);
		
		this.pos1x = parseInt(this.init.substr(0, 1));
		this.pos2x = parseInt(this.init.substr(1, 1));

		this.pos1 = convert.string_to_int(text.substr(0, this.pos1x));
		this.pos2 = convert.string_to_int(text.substr(this.pos1x, this.pos2x));

		text =  text.substr(this.pos1x+this.pos2x);
		this.edit = text;
		
		if(typeof this.cache[clientID][this.id] == 'undefined'){
			this.cache[clientID][this.id] = "";
		}
		
		this.oldcon = this.cache[clientID][this.id];
	
		
		this.newcon = dif.buildnew(this.pos1, this.pos2, this.edit, this.oldcon);  // this.work ist draussen
		
		this.newmd5 = net.hashCode(this.newcon);
		
		if(this.newmd5 != this.md5){
            this.cache[clientID][this.id] = "";
            L1.send(clientID, "="+this.id);
			log("CLIENT=>"+clientID+" ID=>"+this.id+" NEWCON=>"+this.newcon.substr(0,10)+"..."); //.substr(0,10)
			log("ID => "+this.id+" HASH => "+this.md5+" INIT => "+this.init+" P1 => "+this.pos1+" P2 => "+this.pos2+" EDIT => "+this.edit+" OLD => "+this.oldcon);
			error.report(0, "HASHES are nor equal! ID: "+this.id+" => Cache cleared!");
		} else {
			this.cache[clientID][this.id] = this.newcon;
            dlog("START recieve");
            L2x1.recieve(clientID, this.id, this.newcon);
            dlog("END   recieve"); 
            //newmsg(this.newcon);
		}
		dlog("CLIENT=>"+clientID+" ID=>"+this.id+" NEWCON=>"+this.newcon.substr(0,10)+"..."); // .substr(0,10)
		
		
		};
		
	this.reset = function(clientID) {
		this.cache[clientID] = null;
		this.cache[clientID] = [];
        secure.reset(clientID);
        L3.reset(clientID);
		};	
};

var L2 = new L2_typ();

//var abc = new L2_typ();

//public functions 

//exports.send = L2.send;
//exports.recieve = L2.recieve;
//exports.reset = L2.reset;
//exports.init = L2.init;

/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: error_reports.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var error_typ = function error_typ(){
	this.report = function(number, info){
		this.text;
		switch(number){
		case 0:
			this.text = "Fatalerror";
			break;
		case 1:
			this.text = "Sonstige";
			break;
		case 2:
			this.text = "Unbekannte Package ID";
			break;
		case 3:
			this.text = "Dateizugriffs-Fehler";
			break;
		case 4:
			this.text = "Zugriff verweigert!";
			break;
		case 5:
			this.text = "Fileserver Problem!";
			break;
		case 6:
			this.text = "ID Zugriff fehlgeschlagen!";
			break;
		default:
			this.text = "Fatalerror";
			break;
		}
		log("Error: ["+number+"] => "+this.text+"; "+info+";");
	};
};

var error = new error_typ();
// Requieres fileSystemJson.js

var fRights_typ = function fRights_typ(){
    
    this.getRights = function(num){
        var out = { };
        out.read = false, out.write = false, out.rename = false, out.move = false, out.copy = false, out.perm = false;
        var bin = num.toString(2);
        while(bin.length < 6){bin = "0"+bin;}
        var count = 0;
        for(i in out){
            if(bin.substr(count,1) == "1"){
                out[i] = true;
            }
            count++;
        }
        return out;
    };
    
    this.setRights = function(out){
        var num = 0;
        var count = 5;
        for(i in out){
            if(out[i]){
                num+=Math.pow(2, count)
            }
            count--;
        }
        return num;
    };
    
    this.getUserFilePermissions = function(fileID, userID){
        if(fileID in pfile.dirObject){
            if(pfile.dirObject[fileID].owner == userID || userID == pfile.systemUsr){
                var out = { };
                out.read = true, out.write = true, out.perm = true;
                return out;
            }
            if(userID in pfile.dirObject[fileID].share){
                var out = { };
                out.read = true, out.write = pfile.dirObject[fileID].share[userID] > 0, out.perm = pfile.dirObject[fileID].share[userID] > 1;
                if(pfile.guestUser in pfile.dirObject[fileID].share){
                    out.write = pfile.dirObject[fileID].share[pfile.guestUser] > 0 || out.write;
                }
                return out;
            }
            if(pfile.guestUser in pfile.dirObject[fileID].share){
                var out = { };
                out.read = true, out.write = pfile.dirObject[fileID].share[pfile.guestUser] > 0, out.perm = pfile.dirObject[fileID].share[pfile.guestUser] > 1;
                return out;
            }
            var out = { };
            out.read = false, out.write = false, out.perm = false;
            return out;
        } else {
            error.report(6, "ID "+fileID+" does not exist in dirObject! [fileRights:getUserFilePermissions]");
            var out = { };
            out.read = false, out.write = false, out.perm = false;
            return out;
        }
    }
    
    this.isUserAllowedTo = function(fileID, userID, doSome){
        var rights = this.getUserFilePermissions(fileID, userID);
        return rights[doSome];
    };
    
    
};

var fRights = new fRights_typ();


var fileSystemControl_typ = function fileSystemControl(){
    
    this.checkKillLink = function(clientID, userID, checkObject){
        if(!(checkObject.linkID in pfile.dirObject)){
            if(pfile.dirObject[checkObject.folderID].content.indexOf(checkObject.linkID) != -1){
                dlog("REMOVED DEAD LINK: "+checkObject.linkID+" IN FOLDER "+checkObject.folderID);
                pfile.removeLink(checkObject.folderID, checkObject.linkID);
            }
            pfile.generateUserFilelist(clientID, userID);
            dlog("ALL OK => JUST UPDATE: "+checkObject.linkID+" IN FOLDER "+checkObject.folderID);
        } else {
            dlog("ALL OK: "+checkObject.linkID+" IN FOLDER "+checkObject.folderID);
        }
    };
    
    this.checkFileSystem = function(fobj){
        console.log('    CHECKING FILESYSTEM ... ');
        var change = false;
        var c = true;
        var deadObjects = [];
        for (i in fobj) {
            if (typeof fobj[i].share == 'array' || fobj[i].share instanceof Array) {
                //fobj[i].share = { };
                //console.log('    SET SHARE TO OBJECT');
                //change = true;
            }
            if (i[0] == "5") {
                //fobj[i].maxStorageScore = 200000;
                //console.log('    SET maxStorageScore TO 1000');
                //fobj[i].active = true;
                //fobj[i].lastactive = Date.now();
                //console.log('    SET active True');
            }
            c = false;
            if(fobj[[fobj[i].parent]]){
                if(fobj[[fobj[i].parent]].content.indexOf(i) > -1){
                    c = true;
                }
            }
            if(c==false){
                console.log('     Object '+i+' has no valid parent!'); 
                deadObjects.push(i);
            }
        }
        for(i in deadObjects){
            var i = deadObjects[i];
            fobj[i].parent = pfile.deadObj;
            if(fobj[pfile.deadObj].content.indexOf(i) < 0){
                fobj[pfile.deadObj].content.push(i);
            }
            console.log('      Moved '+i+' to '+pfile.deadObj+'!'); 
        }
        console.log('    CHECKING DONE !');
        pfile.dirObject = fobj;
        if (change) {
            pfile.saveDirObject();
            //pfile.writeStr('x', 'dir', 12);
        }
        pfile.init();
    };
    
};

var fileSystemControl = new fileSystemControl_typ();
/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: fileSystemJson.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var fs = require('fs');

var pfile_typ = function pfile_typ() {

    this.dirObject = {};
    this.dir = "./data/";
    this.deleteDir = "4DELETED00";
    this.guestUser = "5GUESTUSER";
    this.systemUsr = "5SYSTEMUSR";
    this.userDir = "4ROOTFOLDR";
    this.deadObj = "4DEADOBJEC";
    this.shareNobo = "4SHARENOBO";
    this.dirFile = "DirIndexFile";
    this.size = {
        "3": 1000,
        "4": 300
    };

    var searchArray = function (array, word) {
        if (array.indexOf(word) != -1) {
            return true;
        }
        return false;
    }

    this.checkFileSystem = function (fobj) {
        fileSystemControl.checkFileSystem(fobj);
    };

    this.readStr = function (id, operation, clientID) {
        if (operation == 'dir') {
            id = this.dirFile;
        }
        var file = global.config.dir + id + '.json';
        fs.readFile(file, 'UTF8', function (err, fileData) {
            if (err) {
                console.log('tryed to read file: ' + file);
            } else {
                if (operation == 'dir') {
                    //pfile.dirObject = JSON.parse(fileData);
                    pfile.checkFileSystem(JSON.parse(fileData));
                    //console.log(pfile.dirObject);
                    //pfile.generateUserFilelist(clientID, pfile.systemUsr);
                    //var rid = pfile.addFile(12, pfile.systemUsr, "Hans", pfile.systemUsr, "u");
                    //var rid2 = pfile.addFile(12, rid, "HansOrdner", rid, "f");
                    //var rid = pfile.addFile(12, rid, "HansDatei", rid2, "p");
                    //console.log(pfile.dirObject);
                    //console.log(pfile.deleteFile(12, "5000000001", rid));
                    //pfile.writeStr(pfile.dirFile, 'dir', 12);
                    //console.log(pfile.dirObject);

                }
                if (operation == 'file') {
                    dlog("UPDATE OLD");
                    L3.files[id] = JSON.parse(fileData);
                    //L3.oldFiles[id] = JSON.parse(fileData);
                    L3.updateUser(clientID);
                }
            }
        });
    };

    this.writeStr = function (id, operation, clientID) {
        if (operation == 'dir') {
            var text = JSON.stringify(this.dirObject);
            id = this.dirFile;
        }
        if (operation == 'file') {
            var text = JSON.stringify(L3.files[id]); // L3.files[id]
            if (text) {
                this.dirObject[id].size = text.length;
            }
            //L3.killData(id);
        }
        if (operation == 'newfile') {
            var tempNew = {};
            tempNew['1031111111'] = clientID;
            tempNew['1031111112'] = date.fileDate();
            var text = JSON.stringify(tempNew); // L3.files[id]
            // Todo: L3.killData(id); (clear RAM)
        }
        if (id != "") {
            fs.writeFile(global.config.dir + id + '.json', text, function (err) {
                if (err) {
                    error.report(3, 'tryed to write file: ' + file);
                } else {
                    log("Saved file " + pfile.dir + id + '.json');
                    if (operation == 'file') {
                        pfile.dirObject[id].lastmod = new Date().getTime();
                        pfile.saveDirObject();
                        //pfile.writeStr('x', 'dir', 12);
                    }
                    if (id != this.dirFile) {
                        L3.killData(id);
                    }
                    if (L3.exit == true && L3.lastkey == id) {
                        cLog("exit websocket server");
                        wsServer.shutDown();
                        server.close();
                    }
                }
            });
        }
    };

    this.copyFileOnDisc = function (fromID, toID) {
        fs.exists(global.config.dir + fromID + '.json', function (exists) {
            if (exists) {
                fs.createReadStream(global.config.dir + fromID + '.json').pipe(fs.createWriteStream(global.config.dir + toID + '.json'));
            }
        });
    };

    this.deleteFileOnDisc = function (id) {
        fs.exists(global.config.dir + id + '.json', function (exists) {
            if (exists) {
                fs.unlink(global.config.dir + id + '.json', function () {
                    log("File " + id + ".json deleted");
                });
            }
        });
    }

    this.checkLogin = function (clientID, username, password) {
        dlog("LOGIN DATA => clientID '" + clientID + "' username '" + username + "' password '" + password + "'");
        var userID = null;
        var temp = {};
        temp.userRight = global.mNoLogin;
        temp.username = "xxxxxxxxxx";
        temp.userID = "";
        for (key in this.dirObject) {
            if (this.dirObject[key].username == username) {
                userID = key;
                break;
            }
        }
        if (userID != null && userID[0] == "5") {
            if (this.dirObject[userID].active == true && this.dirObject[userID].password == password) {
                temp.userRight = this.dirObject[userID].userRight;
                temp.username = username;
                temp.userID = userID;
                this.dirObject[userID].lastactive = Date.now();
            }
        }
        secure.loginData(clientID, temp); // Todo: When mulible users cause problems copy temp object in another way
    };

    this.addFile = function (clientID, userID, name, dir, type) {
        if (type == "f") {
            if (this.dirObject[userID].storageScore + this.size["4"] <= this.dirObject[userID].maxStorageScore) {
                var typ = "4";
                var id = this.makeID(typ);
                this.dirObject[id] = {};
                this.dirObject[id].owner = userID;
                this.dirObject[id].parent = dir;
                this.dirObject[id].name = name;
                this.dirObject[id].content = [];
                this.dirObject[id].share = JSON.parse(JSON.stringify(this.dirObject[dir].share));
                if (this.dirObject[dir].owner != userID && !(this.dirObject[dir].owner in this.dirObject[dir].share)) {
                    this.dirObject[id].share[this.dirObject[dir].owner] = 2;
                }
                this.dirObject[id].lastmod = new Date().getTime();
                this.addLink(dir, id);
            } else {
                L2x1.send(clientID, sID.message, "Adding folder abort! Your storage is full!");
            }
        }
        if (type == "p") {
            if (this.dirObject[userID].storageScore + this.size["3"] <= this.dirObject[userID].maxStorageScore) {
                var typ = "3";
                var id = this.makeID(typ);
                this.dirObject[id] = {};
                this.dirObject[id].owner = userID;
                this.dirObject[id].parent = dir;
                this.dirObject[id].name = name;
                this.dirObject[id].share = JSON.parse(JSON.stringify(this.dirObject[dir].share));
                if (this.dirObject[dir].owner != userID && !(this.dirObject[dir].owner in this.dirObject[dir].share)) {
                    this.dirObject[id].share[this.dirObject[dir].owner] = 2;
                }
                this.dirObject[id].lastmod = new Date().getTime();
                this.addLink(dir, id);
                pfile.writeStr(id, 'newfile', name);
            } else {
                L2x1.send(clientID, sID.message, "Adding file abort! Your storage is full!");
            }
        }
        if (type == "u") {
            dir = this.userDir;
            var typ = "5";
            var id = this.makeID(typ);
            this.dirObject[id] = {};
            this.dirObject[id].owner = id;
            this.dirObject[id].parent = dir;
            this.dirObject[id].name = name;
            this.dirObject[id].username = name;
            this.dirObject[id].password = "initial";
            this.dirObject[id].userRight = 3;
            this.dirObject[id].content = [];
            this.dirObject[id].share = {};
            this.addLink(dir, id);
        }
        //return id;
        this.generateUserFilelist(clientID, userID);
        pfile.saveDirObject();
        //pfile.writeStr('x', 'dir', 12);
    };

    this.addUser = function (clientID, y) {
        var userNameUsed = false;
        for (i in this.dirObject) {
            if (i[0] == "5") {
                if (this.dirObject[i].username == y.username) {
                    userNameUsed = true;
                }
            }
        }
        if (!userNameUsed) {
            dir = this.userDir;
            var typ = "5";
            var id = this.makeID(typ);
            this.dirObject[id] = {};
            this.dirObject[id].owner = id;
            this.dirObject[id].parent = dir;
            this.dirObject[id].firstname = y.firstname;
            this.dirObject[id].lastname = y.lastname;
            this.dirObject[id].name = y.username;
            this.dirObject[id].username = y.username;
            this.dirObject[id].email = y.email;
            this.dirObject[id].password = y.password;
            this.dirObject[id].active = true;
            this.dirObject[id].userRight = 3;
            this.dirObject[id].content = [];
            this.dirObject[id].share = {};
            this.dirObject[id].storageScore = 0;
            this.dirObject[id].maxStorageScore = 200000;
            this.addLink(dir, id);
            inviteKey.setKeyUsed(y.invitekey, id);
            pfile.saveDirObject();
            //pfile.writeStr('x', 'dir', 12);
            L2x1.send(clientID, sID.createAccount, JSON.stringify({
                "value": true,
                "userID": id
            }));
        } else {
            L2x1.send(clientID, sID.createAccount, JSON.stringify({
                "value": false,
                "text": "Username already exists!"
            }));
        }
    };

    this.deleteFile = function (clientID, userID, id) {
        if (userID == this.systemUsr) {
            var first = id.substr(0, 1);
            var copylist = [];
            dlog("end1");
            if (first == '4' || first == '5') {
                copylist = this.copyFolder(copylist, clientID, userID, id, this.deleteDir, 0);
                dlog("end2");
            }
            if (first == '3') {
                copylist = this.copyFile(copylist, clientID, userID, id, this.deleteDir);
                dlog("end3");
            }
            for (i in copylist) {
                dlog("loop1");
                if (copylist[i].job == 'addfolder') {
                    var id = copylist[i].oldid;
                    //this.dirObject[id] = { };
                    //this.dirObject[id].owner = copylist[i].owner;
                    //this.dirObject[id].parent = copylist[i].parent;
                    //this.dirObject[id].name = copylist[i].name;
                    //this.dirObject[id].content = [];
                    //this.dirObject[id].share = JSON.parse(JSON.stringify(copylist[i].share));
                    //this.dirObject[id].lastmod = copylist[i].lastmod;
                    dlog("killfolder");
                    this.removeLink(this.dirObject[id].parent, id);
                    delete this.dirObject[id];
                    //this.deleteFileOnDisc(id);
                    dlog("killfolderend");
                }
                if (copylist[i].job == 'addfile') {
                    var id = copylist[i].oldid;
                    //this.dirObject[id] = { };
                    //this.dirObject[id].owner = copylist[i].owner;
                    //this.dirObject[id].parent = copylist[i].parent;
                    //this.dirObject[id].name = copylist[i].name;
                    //this.dirObject[id].share = JSON.parse(JSON.stringify(copylist[i].share));
                    //this.dirObject[id].lastmod = copylist[i].lastmod;
                    //this.copyFileOnDisc(copylist[i].oldid, id);
                    dlog("killfile");
                    this.removeLink(this.dirObject[id].parent, id);
                    delete this.dirObject[id];
                    this.deleteFileOnDisc(id);
                    dlog("killfileend");
                }
            }
            dlog("generateUserFilelist");
            this.generateUserFilelist(clientID, userID);
            dlog("generateUserFilelistend");
            pfile.saveDirObject(false);
            dlog("saved");
        } else {
            dlog("Deleteclient = " + clientID);
            dlog("DeleteuserID = " + userID);
            dlog("Delete    ID = " + id);
            dlog("Delete Owner = " + this.dirObject[id].owner);
            /*if (fRights.isUserAllowedTo(id, userID, 'write')) {
                dlog("Delete TRUE");
                this.removeLink(this.dirObject[id].parent, id);
                this.dirObject[id].parent = this.deleteDir;
                this.addLink(this.deleteDir, id);
                pfile.saveDirObject(false);
                this.generateUserFilelist(clientID, userID);
            } else {
                L2x1.send(clientID, sID.message, "Deleting file abort! Permission Denied!");
            }
            */
            L2x1.send(clientID, sID.message, "This function has been removed! Please contact an administrator with code #DEdel. You can delete files by moving them to trash!");
        }
    };

    this.moveFileList = function (clientID, userID, moveObject) {
        var k = 0;
        for (i in moveObject.files) {
            if (!this.moveFilePosible(clientID, userID, moveObject.files[i], moveObject.toid, moveObject.fromid)) {
                k++;
            }
        }
        if (k == 0) {
            // BLOCK DirObject Save
            this.editDirObject = true;

            for (i in moveObject.files) {
                this.moveFile(clientID, userID, moveObject.files[i], moveObject.toid, moveObject.fromid);
            }

            // UNBLOCK DirObject Save
            this.editDirObject = false;

            var infolist = this.joinArrays(this.getFileClients(moveObject.toid), this.getFileClients(moveObject.fromid));
            infolist = this.joinArrays(infolist, [clientID]);
            for (key in infolist) {
                if (infolist[key] in L3.users && 'userID' in L3.users[infolist[key]]) {
                    this.generateUserFilelist(infolist[key], L3.users[infolist[key]].userID);
                }
            }
            pfile.saveDirObject(false);
        } else {
            if (k > 1) {
                //L2x1.send(clientID, sID.message, "Moving of "+k+" files abort!");
            }
        }
    };

    this.moveFile = function (clientID, userID, id, toid, fromid) {
        var w = fRights.isUserAllowedTo(id, userID, 'write');
        var p = this.dirObject[id].parent != fromid;
        var r = fRights.isUserAllowedTo(id, userID, 'read');
        var s = this.isSubOrdered(toid, id);
        var d = userID == pfile.systemUsr && fromid == toid && toid == pfile.deleteDir;
        log("D:"+d);
        
        if ((((w || (p && r))) && !s) || d) {

            this.removeLink(fromid, id);
            if (this.dirObject[id].parent == fromid && !d && toid != pfile.deleteDir) {
                this.dirObject[id].parent = toid;
                this.addLink(toid, id);
            } else {
                if (toid == pfile.deleteDir) {
                    if (!d) {
                        var k = 0;
                        for(i in this.dirObject[id].share){
                            k++;
                            break;
                        }
                        log("Sharelenght = "+k);
                        if (k == 0) {
                            this.dirObject[id].parent = pfile.toid;
                            this.addLink(toid, id);
                        } else {
                            this.dirObject[id].parent = pfile.shareNobo;
                            this.addLink(pfile.shareNobo, id);
                        }
                    } else {
                        delete this.dirObject[id];
                        if(id[0] == "3"){
                            this.deleteFileOnDisc(id);
                        }
                    }
                } else {
                    this.addLink(toid, id);
                }
            }
        } else {
            if (!(fRights.isUserAllowedTo(id, userID, 'write') || (this.dirObject[id].parent != fromid && fRights.isUserAllowedTo(id, userID, 'read')))) {
                L2x1.send(clientID, sID.message, "Moving file abort! Permission Denied!");
            } else {
                if (this.isSubOrdered(toid, id)) {
                    L2x1.send(clientID, sID.message, "Moving file abort! Destination directory is subordinate to source directory!");
                } else {
                    L2x1.send(clientID, sID.message, "Moving file abort! Unknown Error! Please contact your server administrator!");
                }
            }
        }
    };

    this.moveFilePosible = function (clientID, userID, id, toid, fromid) {
        if (((fRights.isUserAllowedTo(id, userID, 'write') || (this.dirObject[id].parent != fromid && fRights.isUserAllowedTo(id, userID, 'read')))) && !this.isSubOrdered(toid, id)) {
            return true;
        } else {
            if (!(fRights.isUserAllowedTo(id, userID, 'write') || (this.dirObject[id].parent != fromid && fRights.isUserAllowedTo(id, userID, 'read')))) {
                L2x1.send(clientID, sID.message, "Moving file abort! Permission Denied!");
            } else {
                if (this.isSubOrdered(toid, id)) {
                    L2x1.send(clientID, sID.message, "Moving file abort! Destination directory is subordinate to source directory!");
                } else {
                    L2x1.send(clientID, sID.message, "Moving file abort! Unknown Error! Please contact your server administrator!");
                }
            }
            return false;
        }
    };



    this.copyFileList = function (clientID, userID, copyObject) {
        var copylist = [];
        for (i in copyObject.files) {
            var cid = copyObject.files[i];
            var first = cid.substr(0, 1);
            if (first == '4' || first == '5') {
                copylist = this.copyFolder(copylist, clientID, userID, cid, copyObject.toid, 0);
            }
            if (first == '3') {
                copylist = this.copyFile(copylist, clientID, userID, cid, copyObject.toid);
            }
        }
        //log(JSON.stringify(copylist));
        var addlinklist = [];
        var id = "";
        // BLOCK DirObject Save
        this.editDirObject = true;
        for (i in copylist) {
            if (copylist[i].job == 'addLink') {
                addlinklist.push(copylist[i]);
            }
            if (copylist[i].job == 'addfolder') {
                id = copylist[i].id;
                this.dirObject[id] = {};
                this.dirObject[id].owner = copylist[i].owner;
                this.dirObject[id].parent = copylist[i].parent;
                this.dirObject[id].name = copylist[i].name;
                this.dirObject[id].content = [];
                this.dirObject[id].share = JSON.parse(JSON.stringify(copylist[i].share));
                this.dirObject[id].lastmod = copylist[i].lastmod;
            }
            if (copylist[i].job == 'addfile') {
                id = copylist[i].id;
                this.dirObject[id] = {};
                this.dirObject[id].owner = copylist[i].owner;
                this.dirObject[id].parent = copylist[i].parent;
                this.dirObject[id].name = copylist[i].name;
                this.dirObject[id].share = JSON.parse(JSON.stringify(copylist[i].share));
                this.dirObject[id].lastmod = copylist[i].lastmod;
                this.copyFileOnDisc(copylist[i].oldid, id);
            }
        }
        //addlinklist.reverse();
        for (i in addlinklist) {
            this.addLink(addlinklist[i].toid, addlinklist[i].newID);
        }

        // UNBLOCK DirObject Save
        this.editDirObject = false;

        //this.generateUserFilelist(clientID, userID);
        var infolist = this.joinArrays(this.getFileClients(copyObject.toid), this.getFileClients(copyObject.fromid));
        infolist = this.joinArrays(infolist, [clientID]);
        for (key in infolist) {
            if (infolist[key] in L3.users && 'userID' in L3.users[infolist[key]]) {
                this.generateUserFilelist(infolist[key], L3.users[infolist[key]].userID);
            }
        }
        pfile.saveDirObject(false);
    };

    this.copyFile = function (copylist, clientID, userID, id, toid) {
        if (fRights.isUserAllowedTo(id, userID, 'read')) {
            if (this.dirObject[userID].storageScore + this.size["3"] <= this.dirObject[userID].maxStorageScore) {
                var typ = "3";
                var newID = this.makeID(typ);

                var x = {};
                x.job = 'addfile';
                //this.dirObject[newID] = { };
                x.oldid = id;
                x.id = newID;
                x.owner = userID;
                x.parent = toid;
                if (this.dirObject[id].parent == toid) {
                    x.name = this.dirObject[id].name + ' (copy)';
                } else {
                    x.name = this.dirObject[id].name;
                }
                x.share = JSON.parse(JSON.stringify(this.dirObject[id].share)); // probably problematic when share = object
                x.lastmod = new Date().getTime();

                var y = {};
                y.job = 'addLink';
                y.toid = toid;
                y.newID = newID;

                copylist.push(x);
                copylist.push(y);
                //this.addLink(toid, newID);
                //pfile.writeStr(newID, 'newfile', this.dirObject[newID].name);
                //this.copyFileOnDisc(id, newID);
            } else {
                L2x1.send(clientID, sID.message, "Copying file abort! Your storage is full!");
            }
        } else {
            L2x1.send(clientID, sID.message, "Copying file abort! Permission Denied!");
        }
        return copylist;
    };

    this.copyFolder = function (copylist, clientID, userID, id, toid, deep) { // ==== RECURSIVE ==== !!!!!!!!!!!!!!!!!!!!!
        if (fRights.isUserAllowedTo(id, userID, 'read')) {
            deep++;
            if (deep > 990) {
                log(" W A R N I N G  copy abort => looped to long! ID: " + id + " TOID: " + toid + " USERID: " + userID + " CLIENTID: " + clientID);
            } else {
                var typ = "4";
                var newID = this.makeID(typ);

                var x = {};
                x.job = 'addfolder';
                x.oldid = id;
                x.id = newID;
                x.owner = userID;
                x.parent = toid;
                if (this.dirObject[id].parent == toid) {
                    x.name = this.dirObject[id].name + ' (copy)';
                } else {
                    x.name = this.dirObject[id].name;
                }
                x.content = [];
                x.share = JSON.parse(JSON.stringify(this.dirObject[id].share)); // probably problematic when share = object
                x.lastmod = new Date().getTime();

                var y = {};
                y.job = 'addLink';
                y.toid = toid;
                y.newID = newID;

                copylist.push(x);
                copylist.push(y);
                //this.addLink(toid, newID);
                for (i in this.dirObject[id].content) {
                    var cid = this.dirObject[id].content[i];
                    var first = cid.substr(0, 1);
                    if (first == '4' || first == '5') {
                        copylist = this.copyFolder(copylist, clientID, userID, cid, newID, deep);
                    }
                    if (first == '3') {
                        copylist = this.copyFile(copylist, clientID, userID, cid, newID);
                    }
                }
            }
        } else {
            L2x1.send(clientID, sID.message, "Copying file abort! Permission Denied!");
        }

        return copylist;
    };

    this.addLink = function (id, linkID) {
        if (this.dirObject[id]) {
            var key = this.dirObject[id].content.indexOf(linkID);
            if (key == -1) {
                this.dirObject[id].content.push(linkID);
            }
        } else {
            error.report(6, "ID " + id + " does not exist in dirObject! [fileSystemJson:addLink]");
        }
    };

    this.removeLink = function (id, linkID) {
        if (this.dirObject[id]) {
            var key = this.dirObject[id].content.indexOf(linkID);
            this.dirObject[id].content.splice(key, 1);
        } else {
            error.report(6, "ID " + id + " does not exist in dirObject! [fileSystemJson:removeLink]");
        }
    };

    this.generateUserFilelist = function (clientID, userID) {
        this.generateUserFilelistJSON(clientID, userID);
        /*output = [];
        counter = 0;
        output[counter] = userID+''+this.dirObject[userID].name+';'+this.dirObject[userID].content;
        counter++;
        for(key in this.dirObject){
            share = this.dirObject[key].share.split(";");
            if(userID == pfile.systemUsr || this.dirObject[key].owner == userID || searchArray(share, userID)){
                var beginn = key.substr(0, 1);
                if(beginn=="3"){
                    output[counter] = key+''+this.dirObject[key].name;
                    counter++;
                }
                if(beginn=="4" || beginn=="5" || beginn=="6"){
                    output[counter] = key+''+this.dirObject[key].name+';'+this.dirObject[key].content;
                    counter++;
                }
            }
        }
        L2x1.send(clientID, sID.fileList, output.join(":"));
        //this.generateUserFilelistJSON(clientID, userID);*/
        //console.log(output.join(":"));
    }

    this.generateUserFilelistJSON = function (clientID, userID) {
        output = {};
        counter = 0;
        //output[counter] = userID+''+this.dirObject[userID].name+';'+this.dirObject[userID].content;
        //output[userID] = JSON.parse( JSON.stringify( a ) );
        counter++;
        var score = 0;
        var temp = "";
        for (key in this.dirObject) {
            if (fRights.isUserAllowedTo(key, userID, 'read')) {
                temp = JSON.stringify(this.dirObject[key]);
                output[key] = JSON.parse(temp); // Makes a Copy of the Object
                if (this.dirObject[key].parent != this.deleteDir) {
                    switch (key[0]) {
                    case "4":
                        score += temp.length;
                        break;
                    case "3":
                        var size = this.dirObject[key].size || this.size["3"];
                        score += temp.length + size;
                        break;
                    }
                }
            }
        }
        output.storageScore = score;
        output.maxStorageScore = this.dirObject[userID].maxStorageScore || 500;
        this.dirObject[userID].storageScore = score;
        L2x1.send(clientID, sID.fileList, JSON.stringify(output));
        //console.log(JSON.stringify(output));
    };

    this.isSubOrdered = function (superID, subID) {
        log("isSubordered('" + superID + "', '" + subID + "');");
        var id = superID;
        var i = 0;
        var idarr = [];
        idarr.push(id);
        while (id != subID && id != pfile.systemUsr && i < 10) {
            id = this.dirObject[id].parent;
            idarr.push(id);
            i++;
            dlog("isSubOrdered" + i);
        }
        log(JSON.stringify(idarr));
        if (idarr.indexOf(subID) != -1) {
            return true;
        }
        if (i > 990) {
            log(" W A R N I N G  fileSystemJson.js looped to long!");
            return true;
        }
        return false;
    };

    this.setFileInfo = function (clientID, userID, fileInfo) {
        if ('name' in fileInfo) {
            if (fRights.isUserAllowedTo(fileInfo.id, userID, 'write')) {
                this.dirObject[fileInfo.id].name = this.unescape(fileInfo.name);
                var list = pfile.getFileClients(fileInfo.id);
                for (key in list) {
                    if (list[key] != clientID) {
                        if (list[key] in L3.users && 'userID' in L3.users[list[key]]) {
                            this.generateUserFilelist(list[key], L3.users[list[key]].userID);
                        } else {
                            log("Cannot find Client " + list[key]);
                        }
                    }
                }
                pfile.saveDirObject(false);
            } else {
                this.generateUserFilelist(clientID, userID);
                L2x1.send(clientID, sID.message, "Rename file abort! Permission Denied!");
            }
        }
        if ('share' in fileInfo) {
            if (fRights.isUserAllowedTo(fileInfo.id, userID, 'perm')) {
                var list1 = pfile.getFileClients(fileInfo.id);
                this.checkLinkExists(this.dirObject[fileInfo.id].share, fileInfo.share, fileInfo.id);
                this.dirObject[fileInfo.id].share = fileInfo.share;
                //log("SHARE => "+JSON.stringify(fileInfo));
                var list2 = pfile.getFileClients(fileInfo.id);

                //log("Client "+clientID);
                var list = this.joinArrays(list1, list2);
                //log("LIST After "+JSON.stringify(list));
                for (key in list) {
                    if (list[key] != clientID) {
                        if (list[key] in L3.users && 'userID' in L3.users[list[key]]) {
                            this.generateUserFilelist(list[key], L3.users[list[key]].userID);
                        }
                    }
                }
                L3.updateFileRightsOfFile(fileInfo.id);
                pfile.saveDirObject(false);
            } else {
                this.generateUserFilelist(clientID, userID);
                L2x1.send(clientID, sID.message, "Change file config abort! Permission Denied!");
            }
        }
        //this.generateUserFilelist(clientID, userID);
    };

    this.makeid = function (type) {
        var id = Math.random().toString(36).substring(2, 11);
        return type + "" + id;
    };

    this.makeID = function (type) {
        var id = this.makeid(type);
        while (id in this.dirObject) {
            id = this.makeid(type);
            dlog("MakeID");
        }
        return id;
    };

    this.unescape = function (str) {
        while (str[0] == " ") {
            str = str.substr(1);
            dlog("Unescape1");
        }
        while (str[str.length - 1] == " ") {
            str = str.substr(0, str.length - 1);
            dlog("Unescape2");
        }
        return str;
    };

    this.joinArrays = function (l1, l2) {
        for (i in l1) {
            if (l2.indexOf(l1[i]) == -1) {
                l2.push(l1[i]);
            }
        }
        return l2;
    }

    this.getFileClients = function (id) {
        var userList = [];
        var clientList = [];
        userList.push(this.dirObject[id].owner);
        for (key in this.dirObject[id].share) {
            userList.push(key);
        }
        for (key in userList) {
            for (data in L3.users) {
                if (L3.users[data].userID == userList[key]) {
                    clientList.push(data);
                }
            }
        }
        return clientList;
    };

    this.checkLinkExists = function (o, n, id) {
        var l = [];
        for (i in n) {
            if (!(i in o)) {
                l.push(i);
            }
        }
        var found = false;
        for (i in l) {
            found = false;
            for (k in this.dirObject) {
                if (this.dirObject[k].owner == l[i] && 'content' in this.dirObject[k] && this.dirObject[k].content.indexOf(id) != -1) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.addLink(l[i], id);
            }
        }
    };

    this.getUserStorageScore = function (clientID, userID) {

    };

    // Smart Saver =====================================

    this.maxNotSavedTime = 180000; // 180000 = 3 Minutes
    this.maxIdleTime = 5000; // 5000 = 5 Seconds
    this.intervalTime = 5000;

    this.isSaved = true;
    this.editDirObject = false;
    this.forceNextSave = false;

    this.timeFirstNotSave = 0;
    this.timeLastSave = 0;
    this.timeLastChange = 0;

    this.saveDirObject = function (force) {
        if (force == true) {
            pfile.forceNextSave = true;
        }
        if (pfile.isSaved == true) {
            pfile.timeFirstNotSave = Date.now();
        }
        pfile.timeLastChange = Date.now();
        pfile.isSaved = false;
        //clearTimeout(this.waitSaveTimer);
        //this.waitSaveTimer = setTimeout(pfile.forceSave, this.waitSaveTime);
    };

    this.checkToSave = function () {
        if (!pfile.isSaved) {
            var toLongNotSaved = Date.now() - pfile.timeFirstNotSave > pfile.maxNotSavedTime;
            var toLongIdle = Date.now() - pfile.timeLastChange > pfile.maxIdleTime;
            var force = pfile.forceNextSave;
            if (toLongNotSaved || toLongIdle || force) {
                if (pfile.editDirObject == false) {
                    pfile.writeStr(12, 'dir', 12);
                    pfile.isSaved = true;
                    pfile.forceNextSave = false;
                    pfile.timeLastSave = Date.now();
                }
            }
        }
    };

    this.init = function () {
        setInterval(pfile.checkToSave, pfile.intervalTime);
    };
};

var pfile = new pfile_typ();

//pfile.readStr('123', 'dir', 2);
//var tea = { };
//tea['1002343355'] = "0392041400TEST IST DAS GEIL";
//tea['1031111111'] = "Dies ist eine Ueberschrift";
//tea['1009999409'] = "0133128400Dies ist keine Ueberschrift";
//pfile.writeStr('3emqfb6uw2', 'file', 12);
/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: firewall_L2x1.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var L2x1_typ = function L2x1_typ(){

	this.firewall = [];
	this.mandant = global.mNoLogin;
	this.id_pre = "2";
	
	this.send = function(clientID, id, data) {
        try{
            var mandant = secure.check(clientID);

            this.firewall = global.firewall[mandant];

            this.id_pre = id.substr(0, 1);

            if(this.firewall.indexOf(this.id_pre) >= 0 || this.firewall.indexOf(id) >= 0){
                L2.send(clientID, id, data);
            } else {
                error.report(4, "Firewall blocked send ID "+id+" of User "+clientID+" Mandant "+mandant);
            }
        } catch(e){
            console.log("=> FIREWALL CRASH SEND=> ClientID="+clientID+" ID="+id);
            console.log("=> FIREWALL CRASH SEND=> Mandant="+JSON.stringify(secure.check(clientID))+" Firewall="+JSON.stringify(global.firewall[secure.check(clientID)]));
            console.log(e);
        }
     };
	
	this.recieve = function(clientID, id, text) {
        try{
            var mandant = secure.check(clientID);

            this.firewall = global.firewall[mandant];

            this.id_pre = id.substr(0, 1);

            if(this.firewall.indexOf(this.id_pre) >= 0 || this.firewall.indexOf(id) >= 0){
                L3.recieve(clientID, id, text);
            } else {
                error.report(4, "Firewall blocked recieved ID "+id+" of User "+clientID+" Mandant "+mandant);
            }
        } catch(e){
            console.log("=> FIREWALL CRASH RESS=> ClientID="+clientID+" ID="+id);
            console.log("=> FIREWALL CRASH RESS=> Mandant="+JSON.stringify(secure.check(clientID))+" Firewall="+JSON.stringify(global.firewall[secure.check(clientID)]));
            console.log(e);
        }
	 };
};

var L2x1 = new L2x1_typ();


function inviteKey_typ(){
    
    this.isKeyFree = function(key){
        for(i in pfile.dirObject[pfile.systemUsr].inviteKeyArray){
            if(pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].key == key){
                if(!pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].used){
                    return true
                } else {
                    return false;
                }
            }
        }
        return false;
    };
    
    this.setKeyUsed = function(key, userID){
        for(i in pfile.dirObject[pfile.systemUsr].inviteKeyArray){
            if(pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].key == key){
                pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].used = {"userID": userID, "time": Date.now()};
                pfile.saveDirObject();
                break;
            }
        }
    };
    
    this.deleteInviteKey = function(key){
        var kill = false;
        for(i in pfile.dirObject[pfile.systemUsr].inviteKeyArray){
            if(pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].key == key){
                if(!pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].used){
                    kill = i;
                }
            }
        }
        if(kill){
            pfile.dirObject[pfile.systemUsr].inviteKeyArray.splice(kill,1);
            pfile.saveDirObject();
        }
    };
    
    this.createInviteKey = function(){
        var found = true;
        var newKey = "";
        while(found){
            newKey = this.generateKey();
            found = false;
            for(i in pfile.dirObject[pfile.systemUsr].inviteKeyArray){
                if(pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].key == newKey){
                    found = true;
                }
            }
        }
        pfile.dirObject[pfile.systemUsr].inviteKeyArray.push({"key":newKey,"used":false});
        pfile.saveDirObject();
    };
    
    this.generateKey = function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 32; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };
}

var inviteKey = new inviteKey_typ();
function manager_typ() {

    this.setUserActive = function (userID, active) {
        pfile.dirObject[userID].active = active;
        pfile.saveDirObject();
    };
    
    this.chPassword = function (clientID, userID, chpw) {
        if(chpw.new == chpw.new2){
            if(chpw.old == pfile.dirObject[userID].password){
                if(userID!=pfile.guestUser){
                    pfile.dirObject[userID].password = chpw.new;
                    pfile.saveDirObject();
                    L2x1.send(clientID, sID.message, "Password changed!");
                } else {
                    L2x1.send(clientID, sID.message, "You cannot change Guest password!");
                }
            } else {
                L2x1.send(clientID, sID.message, "Old password is incorrect!");
            }
        } else {
            L2x1.send(clientID, sID.message, "New passwords are not equal!");
        }
    };
    
    this.chUserConfig = function(clientID, userID, obj){
        var userID = obj.userID;
        for(i in obj){
            switch(i){
                case "email":
                    pfile.dirObject[userID].email = obj.email;
                    break;
                case "firstname":
                    pfile.dirObject[userID].firstname = obj.firstname;
                    break;
                case "lastname":
                    pfile.dirObject[userID].lastname = obj.lastname;
                    break;
                case "maxStorageScore":
                    pfile.dirObject[userID].maxStorageScore = obj.maxStorageScore;
                    break;
                case "name":
                    pfile.dirObject[userID].name = obj.name;
                    break;
                case "password":
                    pfile.dirObject[userID].password = obj.password;
                    break;
                case "username":
                    pfile.dirObject[userID].username = obj.username;
                    break;
            };
        };
    };

    this.resetSystem = function () {
        log("RESETTING SYSTEM");
        var dir = fs.readdirSync(global.config.dir);
        for (i in dir) {
            log("Deleting " + dir[i] + " ...");
            if (fs.existsSync(global.config.dir+dir[i])) {
                fs.unlinkSync(global.config.dir+dir[i]);
                log("File " + dir[i] + " deleted");
            }
        }
        pfile.checkFileSystem(JSON.parse(JSON.stringify(defaultData.dirObject)));
        pfile.writeStr('x', 'dir', 12);   // THE ONLY PART OF THE SCRIPT WHICH IS ALLOWED TO DO THIS WITHOUT pfile.saveDirObject();
        //pfile.saveDirObject(true);
    };
}

var manager = new manager_typ();
/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: security.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var secure_typ = function secure_typ(){

	this.userRights = new Array();
	this.userLegitimationIDs = new Array();

	this.check = function(clientID) {
        return this.userRights[clientID];
	};

	this.login = function(clientID, loginObject){
		if(this.userRights[clientID] == global.mNoLogin){
			if(this.userLegitimationIDs[clientID] == loginObject.legitimationID){
				pfile.checkLogin(clientID, loginObject.userName, loginObject.userPassword);
			} else {
				L2x1.send(clientID, sID.Login, this.userRights[clientID]);
				this.legitimationSet(clientID);
			}
		}
	};

	this.loginData = function(clientID, loginObject){
		this.userRights[clientID] = loginObject.userRight;
		if(this.userRights[clientID] == global.mNoLogin){
			this.legitimationSet(clientID);
			log("LOGIN FAILED => User '"+loginObject.username+"' ID '"+loginObject.userID+"' Mandant '"+loginObject.userRight+"'");
		} else {
			this.legitimationSetX(clientID);
			log("LOGIN => User '"+loginObject.username+"' ID '"+loginObject.userID+"' Mandant '"+loginObject.userRight+"'");
		}
        L3.users[clientID]['userID'] = loginObject.userID;
        L3.users[clientID]['username'] = loginObject.userID;
		L2x1.send(clientID, sID.Login, JSON.stringify(loginObject));
	};

	this.legitimationSet = function (clientID){
		this.userLegitimationIDs[clientID] = this.makeid();
		L2.send(clientID, sID.legitimationID, this.userLegitimationIDs[clientID]);
	};

	this.legitimationSetX = function (clientID){
		this.userLegitimationIDs[clientID] = this.makeid();
		//L2.send(clientID, sID.legitimationID, this.userLegitimationIDs[clientID]);
	};

	this.createAccount = function(clientID, accObject){
		if(this.userRights[clientID] == global.mNoLogin){
			if(this.userLegitimationIDs[clientID] == accObject.legitimationID){
                if(inviteKey.isKeyFree(accObject.invitekey)){
				    pfile.addUser(clientID, accObject);
                } else {
                    L2x1.send(clientID, sID.createAccount, JSON.stringify({"value": false, "text": "InviteKey incorrect!"}));
                }
			} else {
				L2x1.send(clientID, sID.createAccount, JSON.stringify({"value": false, "text": "LegitimationID incorrect!"}));
				this.legitimationSet(clientID);
			}
		}
	};

	this.reset = function(clientID){
		log("CONNECTION LOST => User '"+ L3.users[clientID]['username']+"' ID '"+L3.users[clientID]['userID']+"' Mandant '"+this.userRights[clientID]+"'");
		if(this.userRights[clientID]){delete this.userRights[clientID]};
	};

	this.makeid = function (){
	   var id = (Math.random()*100000000000000000);
	   id = id.toString()+"0000000000";
	   id = id.substring(0,16);
	   return id;
	   };

	this.init = function (clientID){
        this.userRights[clientID] = global.mNoLogin;
	};
};

var secure = new secure_typ();

/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: sync_L3.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var L3_typ = function L3_typ(){

    this.files = { };
    this.oldFiles = { };
    this.users = { };
    this.lastkey = false;
    this.exit = false;
    this.staticSave = { };
    this.usersAtFile = {};


    this.recieve = function (clientID, id, data){
       var id_pre = id.substr(0, 1);
       
        switch (id_pre) {
        //case "0":
    		//ID's welche mit 0 beginnen
           // break;
        case "1":
    		//ID's welche mit 1 beginnen (Content ID'S)
            L3.shareContentById(clientID, id, data);
           break;
        case "2":
        	//ID's welche mit 2 beginnen (Static ID'S)
        	L3.static_id(clientID, id, data);
            break;
        case "3":
        	//ID's welche mit 3 beginnen (File! ID'S)
            break;
         default:
        	error.report(2, id_pre+" not given or wrong");
        }
	};

    this.shareContentById = function (clientID, id, data){
        
        if(fRights.isUserAllowedTo(this.users[clientID].file, this.users[clientID].userID, 'write')){
            this.files[this.users[clientID].file][id] = data;
    
            for(var key in this.users){
                if(this.users[key].file == this.users[clientID].file){
                    this.users[key].files[this.users[key].file][id] = data;
                    if(key!=clientID){	
                        L2x1.send(key, id, data);
                    }
                }
            }
        } else {
            this.updateFileRights(clientID);
            if(id in this.files[this.users[clientID].file]){
                L2x1.send(clientID, id, this.files[this.users[clientID].file][id]);
            } else {
                L2x1.send(clientID, sID.deleteID, id);
            }
        }
    };

    this.deleteItemID = function (clientID, id, data){
        
        if(fRights.isUserAllowedTo(this.users[clientID].file, this.users[clientID].userID, 'write')){
            delete this.files[this.users[clientID].file][data];

            for(var key in this.users){
                if(this.users[key].file == this.users[clientID].file){
                    delete this.users[key].files[this.users[key].file][data];
                    if(key!=clientID){	
                        L2x1.send(key, id, data);
                    }
                }
            }
        } else {
            if(id in this.files[this.users[clientID].file]){
                L2x1.send(clientID, id, this.files[this.users[clientID].file][id]);
            }
        }
    };
	
    this.static_id = function (clientID, id, data){
        //this.staticSave[clientID][id] = data;
		switch (id) {
            case sID.getServer:
	            //ID's welche mit 0 beginnen
		        L3.getServer(clientID, id, data);
                break;
            case sID.clientName:
                L3.clientName(clientID, id, data);
		        //ID's welche mit 1 beginnen (Content ID'S)
                break;
            case sID.file:
                L3.switchFile(clientID, id, data);
                //ID's welche mit 2 beginnen (Static ID'S)
                break;
            case sID.unloadFile:
                //ID's welche mit 3 beginnen (BLA! ID'S)
                this.unloadFile(clientID);
                //error.report(2,"static id $id not connectet to a function");
                break;
            case sID.userList:
                //Server sendet Userliste
                error.report(2,"static id $id not connectet to a function");
                break;
            case sID.userEdit:
                this.setUserEditing(clientID, data);
                break;
            case sID.deleteID:
                L3.deleteItemID(clientID, id, data);
                //Server loescht ID und schickt das weiter
                break;
            case sID.Login:
                secure.login(clientID, JSON.parse(data));
                break;   
            case sID.createAccount:
                secure.createAccount(clientID, JSON.parse(data));
                break;  
            case sID.addFile:
                var temp = JSON.parse(data);
                pfile.addFile(clientID, L3.users[clientID]['userID'], temp.name, temp.dir, temp.type);
                break;     
            case sID.deleteFile:
                dlog("START Delete");
                pfile.deleteFile(clientID, L3.users[clientID]['userID'], data);
                dlog("END   Delete");
                break;   
            case sID.moveFile:
                pfile.moveFileList(clientID, L3.users[clientID]['userID'], JSON.parse(data));
                break;     
            case sID.copyFile:
                pfile.copyFileList(clientID, L3.users[clientID]['userID'], JSON.parse(data));
                break;     
            case sID.checkKillLink:
                fileSystemControl.checkKillLink(clientID, L3.users[clientID]['userID'], JSON.parse(data));
                break;      
            case sID.fileInfo:
                pfile.setFileInfo(clientID, L3.users[clientID]['userID'], JSON.parse(data));
                break;      
            case sID.chUserConfig:
                if(L3.users[clientID]['userID'] == pfile.systemUsr){
                    manager.chUserConfig(clientID, L3.users[clientID]['userID'], JSON.parse(data));
                }
                break;        
            case sID.createInviteKey:
                if(L3.users[clientID]['userID'] == pfile.systemUsr){
                    inviteKey.createInviteKey();
                    pfile.generateUserFilelistJSON(clientID, L3.users[clientID]['userID']);
                }
                break;      
            case sID.deleteInviteKey:
                if(L3.users[clientID]['userID'] == pfile.systemUsr){
                    inviteKey.deleteInviteKey(data);
                    pfile.generateUserFilelistJSON(clientID, L3.users[clientID]['userID']);
                }
                break;      
            case sID.chPassword:
                manager.chPassword(clientID, L3.users[clientID]['userID'], JSON.parse(data));
                break;      
            case sID.setUserActive:
                if(L3.users[clientID]['userID'] == pfile.systemUsr){
                    var obj = JSON.parse(data);
                    manager.setUserActive(obj.userID, obj.active);
                    pfile.generateUserFilelistJSON(clientID, L3.users[clientID]['userID']);
                }
                break;      
            case sID.getUserName:
                var x = {};
                x.id = data;
                if(data in pfile.dirObject){
                    x.name = pfile.dirObject[data].name;
                } else {
                    x.name = "cannot resolve name!";   
                    }
                L2x1.send(clientID, sID.returnUserName, JSON.stringify(x));
                break;          
            default: 
                error.report(2,"static id $id not given or wrong");
                break;
		}
    };

    this.clientName = function (clientID, id, data) {
        this.users[clientID].name = data;
        this.users[clientID].files = { };
        //this.users[clientID].fileRights = { };
        this.staticSave[clientID] = { };
        secure.legitimationSet(clientID);
        L2x1.send(clientID, sID.ownclientID, clientID);
    };

    this.getServer = function (clientID, id, data) {
        switch (data) {
            case sID.fileList:
                //L2x1.send(clientID, sID.fileList, pfile_generateFilelist()); XXX
                //L2x1.send(clientID, sID.fileList, "LOLOLOLOLOLOL");
                pfile.generateUserFilelist(clientID, L3.users[clientID]['userID']);
                break;
            case sID.userList:
                uList = '';
                for(key in this.users) {    
                    uList = uList+':'+this.users['key']['name'];
                } 
                uList = substr(uList, 1);
                L2x1.send(clientID, sID.userList, uList);
                break; 
            case sID.testid:
                filesystem.getTest();
                break;   
            case sID.killServer:
                log("USER TRYES TO KILL SERVER!");
                if(secure.userRights[clientID] == 0){
                    log("USER SYSTEM KILLED SERVER!");
                    stopServerNow();
                }
                break;
            default: 
                error.report(2, 'static id '+id+' not given or wrong');
                break;
        }
    };

    this.switchFile = function (clientID, id, data) {
        //var rights = fRights.getUserFilePermissions(data, this.users[clientID].userID);
        if(fRights.isUserAllowedTo(data, this.users[clientID].userID, 'read')){
            //this.users[clientID].fileRights[this.users[clientID].file] = rights;
            this.users[clientID].file = data; 
            if(!(data in this.files)) {
            this.files[data] = { };
                // Todo: NEUE JSON DateiSystemcheck
            pfile.readStr(data, 'file', clientID);
            } else {
                L3.updateUser(clientID);
            }
            if(data in this.usersAtFile){
                this.usersAtFile[data].push([clientID, this.users[clientID].userID, ""]);
                this.updateUserList(data);
            } else {
                this.usersAtFile[data] = [];
                this.usersAtFile[data].push([clientID, this.users[clientID].userID, ""]);
                this.updateUserList(data);
            }
        } else {
            L2x1.send(clientID, sID.message, 'Access Denied!');
        }
        this.updateFileRights(clientID);
    };

    this.unloadFile = function (clientID){
        this.saveFileOP(this.users[clientID].file);
        var tempid = this.users[clientID].file;
        this.deleteFromUserList(clientID, tempid);
        //delete this.users[clientID].files[this.users[clientID]['file']];
        this.users[clientID].file = "";
        L2x1.send(clientID, sID.fileunloadtrue, tempid);
    };
    
    this.setUserEditing = function(clientID, id){
        var data = this.users[clientID].file;
        if(data in this.usersAtFile){
            var found = false;    
            for(i in this.usersAtFile[data]){
                if(this.usersAtFile[data][i][0] == clientID){
                    this.usersAtFile[data][i][2] = id;
                    this.updateUserList(data);
                    found = true;
                    break;
                }
            }
            if(!found){
                this.usersAtFile[data].push([clientID, this.users[clientID].userID, id]);
                this.updateUserList(data);
            }
        } else {
            this.usersAtFile[data] = [];
            this.usersAtFile[data].push([clientID, this.users[clientID].userID, id]);
            this.updateUserList(data);
        }
    };
    
    this.deleteFromUserList = function(clientID, fileID){
        if(fileID in this.usersAtFile){
            for(i in this.usersAtFile[fileID]){
                if(this.usersAtFile[fileID][i][0] == clientID){
                    this.usersAtFile[fileID].splice(i,1);
                    this.updateUserList(fileID);
                    break;
                }
            }
        }
    };
    
    this.updateFileRights = function(clientID){
        var temp = JSON.stringify(fRights.getUserFilePermissions(this.users[clientID]['file'], this.users[clientID].userID));
        if('lastFileRights' in this.users[clientID]){
            if(this.users[clientID].lastFileRights != temp){
                this.users[clientID].lastFileRights = temp;
                //console.log("     > Change > "+clientID)
                L2x1.send(clientID, sID.fileRigths, temp);
            }    
        } else {
            this.users[clientID].lastFileRights = temp;
            //console.log("     > Change > "+clientID)
            L2x1.send(clientID, sID.fileRigths, temp);
        }
    };
    
    this.updateFileRightsOfFile = function(fileID){
        //console.log(" > updateFileRightsOfFile > "+fileID);
        for(i in this.usersAtFile[fileID]){
            //console.log("   > Client "+this.usersAtFile[fileID][i][0]);
            this.updateFileRights(this.usersAtFile[fileID][i][0]); //Possible Security Bug
        }
    };
    
    this.updateUserList = function(fileID){
        for(i in this.usersAtFile[fileID]){
            L2x1.send(this.usersAtFile[fileID][i][0], sID.fileUserList, JSON.stringify(this.usersAtFile[fileID]));
        }
    };

    this.updateUser = function (clientID){
        if(!(this.users[clientID]['file'] in this.users[clientID].files)) {
           this.users[clientID].files[this.users[clientID]['file']] = { };
           }
    
        var change = L3.checkChange(this.users[clientID].files[this.users[clientID]['file']], this.files[this.users[clientID]['file']]);
        //debugger;

        for(key in change[0]){
            this.users[clientID].files[this.users[clientID]['file']][change[0][key]] = this.files[this.users[clientID]['file']][change[0][key]];
            L2x1.send(clientID, change[0][key], this.files[this.users[clientID]['file']][change[0][key]]);
        }
        for(key in change[1]){
            delete this.users[clientID].files[this.users[clientID]['file']][change[1][key]];
            L2x1.send(clientID, "2000000005", change[1][key]);
        }
        //L2x1.send(clientID, sID.updated, this.users[clientID]['file']);
        //setTimeout(function(){
            L3.clientUpdated(clientID);
        //}, 1000);
        //this.users[clientID]['files'][this.users[clientID]['file']] = this.files[this.users[clientID]['file']];
    };
    
    this.clientUpdated = function(clientID){
        L2x1.send(clientID, sID.updated, this.users[clientID]['file']);
    }

    this.checkID = function (typ, id){
        var lID = strlen(id);
        var idType = parseInt(id.substr(0, 3));
        if(idType == parseInt(typ) && lID == 10){
            return true;   
        }
        return false; 
    };
    
    this.checkChange = function (array1, array2){
        dlog("EINS: ");
        dlog(array1);
        dlog("ZWEI: ");
        dlog(array2);
        var changes = new Array();
        for(var key in array2){
            var array2value = array2[key];
            var array1value = array1[key];
            if(!array1value){
                changes.push(key);
            } 
            if(array1value && array1value != array2value){
                changes.push(key);
            }
            }
    
        var deletes = new Array();
        
        for(var key in array1){ 
            if(!array2[key]){
                deletes.push(key);
            } 
        }
        var output = new Array();
        output[0] = changes;
        output[1] = deletes;
        
        dlog("CHAN: "+changes);
        dlog("DELE: "+deletes);
        //dlog(output);

        return output;
    };

    this.getChange = function (id){
        var array1 = this.oldFiles[id];
        var array2 = this.files[id];

        var changes = new Array();
        for(var key in array2){
            dlog("OLD => "+key+" VALUE => "+this.oldFiles[id][key]);
            dlog("NEW => "+key+" VALUE => "+this.files[id][key]);
            var array2value = array2[key];
            var array1value = array1[key];
            if(!array1value){
                changes.push(key);
            } 
            if(array1value && array1value != array2value){
                changes.push(key);
            }
            dlog(array1value);
            dlog(array2value);
            }
    
        var deletes = new Array();
        
        for(var key in array1){ 
            if(!array2[key]){
                deletes.push(key);
            } 
        }
        var output = new Array();
        output[0] = changes;
        output[1] = deletes;
        
        dlog(changes);
        dlog(deletes);
        dlog(output);

        return output;
    };

    this.reset = function (clientID){
        var found = false;

        for(key in this.users){
            if(this.users[key]['file'] == this.users[clientID]['file'] && key != clientID){
                found = true;
            }
        }
        
        if(clientID in this.users && this.users[clientID]['file'] != ""){
            this.deleteFromUserList(clientID, this.users[clientID]['file']);
        }
    
        if(!found && this.users[clientID]['file'] != ""){
            L3.saveFileOP(this.users[clientID]['file']);
        }
    
        if(clientID in this.users){
            delete this.users[clientID];
            dlog("DELETED "+clientID+" "+JSON.stringify(this.users));
        };
    };
    
    this.killData = function(fkey){
        var temp = false;
        for(key in this.users){
            if(this.users[key].file == fkey){
                temp = true;
                break;
            }
        }
        if(!temp){
            dlog("KILL DATA TRUE");
            delete this.files[fkey];
        }
    }

    this.saveAll = function(){
        L3.lastkey = false;
        for(key in this.files){
            this.saveFileOP(key);
            L3.lastkey = key;
        }
    };

    this.saveFileOP = function (id){
        pfile.writeStr(id, 'file', 123);
    };

    this.saveFile = function (id, keys){
        log('Datei wird gespeichert: '+id);
        //var change = L3.getChange(id);
        
        /*for(key in keys){
            var data = keys[key].split("#v#");
            if(data[0][0] == '1'){
                keys.splice(key, 1);
            }
        }

        for(key in this.files[id]){
            keys = 1;
            dlog('ID '+key+' der Datei '+id+' gespeichert! =>'+this.files[id][key]);
        }
        var daten = keys.join("#k#");
        //datei.writeStr(id, daten);*/
        
        pfile.writeStr(id, 'file', 123);
    };
    
    

    this.checkRight = function (id, clientID){
        //for
    };
};

var L3 = new L3_typ();

//$x = array(123 => "abc", 234 => "bcd", 342 => "cde", 456 => "efg", 777 => "fgh");
//$y = array(123 => "abc", 234 => "bcd", 342 => "ggg", 456 => "efg", 911 => "fgh");

//	
//		getServer         = 2000000000; //Fragt Server nach bestimmter static ID
//    
//    //SEND_TO_SERVER
//	this.clientName        = 2000000001; //Übergibt den Benutzernamen an den Server
//	this.file              = 2000000002; //Übergibt zu landene DateiID an den Server
//    
//    //GET_FROM_SERVER
//	this.fileList       = 2000000003; //Server sendet Dateiliste
//		this.userList          = 2000000004; //Server sendet Userliste


/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: Yobjects.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


//Globale Objekte:
//var error = new error_typ();
//var L1 = new L1_typ();
//var L2 = new L2_typ();
//var L3 = new L3_typ();
//var global = new global_typ();
//var globalEvent = new globalEvent_typ();
//var dif = new dif_typ();
//var convert = new convert_typ();
//var sID = new sID_typ();
//var data = new data_typ();
//var check = new check_typ();
//var textbox = new textbox_typ();
//var color = new color_typ();
//var net = new net_typ();
//var hash = new hash_typ();
//var pDrawInit = new pDrawInit_typ();
//var pDrawFoc = new pDrawFoc_typ();
//var dbc = new dbc_typ();
//var datei = new datei_typ();
//var sURL = new sURL_typ();
//var sID = new sID_typ();


function recreateObjects(){
    var L1 = new L1_typ();
    var L2 = new L2_typ();
    var L3 = new L3_typ();
}


/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: Zpragm-websocket.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/
"use strict";

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
    if(val.substr(0,5) == "#conf"){
        console.log("CONFIG ARGUMENTS: "+val.substr(5));
        //val = val.replace(/'/g,'"');
        //console.log(val.substr(5));
        global.config = JSON.parse(val.substr(5));
    }
});
 
process.stdin.on('data', function (chunk) {
    chunk = chunk.substr(0, 5);
    switch (chunk) {
        case "#save":
            cLog("save all files");
            L3.saveAll();
            break;
        case "#stop":
            cLog("exit websocket server");
            stopServerNow();
            //server.close();
            //wsServer.shutDown();
            //server.close();
            //process.kill();
            break;
        case "#ende":
            cLog("end => stops websocket server when all clients are disconnected (allows no new connections)");
            server.close();
            //process.kill();
            break;
        case "#exit":
            L3.exit = true;
            cLog("save all files");
            L3.saveAll();
            break;
        case "#kill":
            for (key in clients) {
                clients[key].close();
            }
            break;
        case "#rdir":
            datei.readDir();
            break;
        case "#dbug":
            debugLog = 5;
            break;
        default:
            cLog("command '"+chunk+"' does not exist");
            break;
    }
});

function cLog(text){
    console.log('COMMAND => ' + text);
}

var text = "0206224400ffshjnkbgmmm";

//log(hash.generate(text));

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'pragm-websocket';

//TEMP ======================================

function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}

function printMemoryUsage(){
    console.log("============MEMORY USAGE============");
    console.log("| secure  "+roughSizeOfObject(secure));
    console.log("| io  "+roughSizeOfObject(io));
    console.log("| L2      "+roughSizeOfObject(L2));
    console.log("| L2x1    "+roughSizeOfObject(L2x1));
    console.log("| L3      "+roughSizeOfObject(L3));
    console.log("|  files       "+roughSizeOfObject(L3.files));
    console.log("|  oldFiles    "+roughSizeOfObject(L3.oldFiles));
    console.log("|  users       "+roughSizeOfObject(L3.users));
    console.log("|  staticSave  "+roughSizeOfObject(L3.staticSave));
    console.log("|  usersAtFile "+roughSizeOfObject(L3.usersAtFile));
    console.log("| pfile   "+roughSizeOfObject(pfile));
    console.log("| clients "+roughSizeOfObject(clients));
    console.log("==========MEMORY USAGE END==========");
};
function startPrint(){
    setInterval(printMemoryUsage, 30000);
}
//setTimeout(startPrint, 2000);
// ==========================

// Port where we'll run the websocket server
if(!global.config.port){
    var webSocketsServerPort = 8080;
} else {
    var webSocketsServerPort = global.config.port;
}

var timeStatCounter = 0;
var timeStat = new Array();

// websocket and http servers
//var webSocketServer = require('websocket').server;
//var http = require('http');

/* SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL 
var options = {key: fs.readFileSync('./client.key'),cert: fs.readFileSync('./client.cert'),requestCert: true}
var server = require('https').createServer(options);
var io = require('socket.io').listen(server);
server.listen(webSocketsServerPort);
 SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL */

var io = require('socket.io').listen(webSocketsServerPort);

io.set('log level', 1);
io.server.on('error', function (e) {
  if (e.code == 'EADDRINUSE') {
    commander.portBloc(webSocketsServerPort);
  }
});

// list of currently connected clients (users)
var clients = [ ];

function log(text){
    var aTime = ((new Date()).toString()).substr(0, 24);
    console.log(aTime + '   ' + text);
}

function iLog(text){
    var aTime = ((new Date()).toString()).substr(0, 24);
    console.log(aTime + '   ' + text);
}
var debugLog = 0;

function dlog(text){
    if(debugLog>0){
        var aTime = ((new Date()).toString()).substr(0, 24);
        console.log(aTime + '   ' + text);
    }
}

function stopServerNow(){
    io.server.close();
    /*for(client in clients){
        clients[client].disconnect();
    }*/
    process.abort();;
}
if(fs.existsSync(global.config.dir+pfile.dirFile+".json")){
    pfile.readStr('123', 'dir', 2);
} else {
    manager.resetSystem();
}


var connectionCounter = 0;

// This callback function is called every time someone
// tries to connect to the WebSocket server
io.sockets.on('connection', function (socket) {
    //var connection = request.accept(null, request.origin); 
    //socket.origin;
    // we need to know client clientID to remove them on 'close' event
    //var clientID = clients.push(connection) - 1;   // -1
    var address = socket.handshake.address;
    var clientID = connectionCounter;
    clients[clientID] = socket;
    connectionCounter++;
    secure.init(clientID);
    L2.cache[clientID] = [];
    L3.users[clientID] = [];
    L3.users[clientID]['file'] = "";
    iLog('CONNECTION: CLIENTID: '+clientID+' IP: '+address.address+' PORT: '+address.port);

    socket.on('message', function (msg) {
        //if (message.type === 'utf8') { // accept only text
                //log(' Received Message from '+ clientID + ': ' + message.utf8Data+"<= AND =>"+connection.remoteAddress);

                //timeStatCounter = timeStat.push(new Date()) - 1;
                //L2.recieve(clientID, message.utf8Data);
                L2.recieve(clientID, msg);
                //for (var i=0; i < clients.length; i++) {
                //    clients[i].sendUTF(message.utf8Data+"<= AND =>"); 
                //}
            //}
        //}
    });
    

    // user disconnected
    socket.on('disconnect', function () {
        //clients.splice(clientID, 1);
        if(clients[clientID]){delete clients[clientID]};
        iLog("CLIENTID=>"+clientID+" disconnected!");
        L2.reset(clientID);
        //secure.reset(clientID);
        //L3.reset(clientID);
    });

});


    


var L1_typ = function L1_typ(){
    this.send = function (client, text){
        clients[client].send(text);
        //log(" SCRIPTTIME => "+(new Date()-timeStat[timeStatCounter])+"ms");
    }
    };

var L1 = new L1_typ();

function callbackInterval(){
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    //log(hour+":"+min+":"+sec);
    if(hour == 3 && min == 0){
        log("RESTART NIGHT NOW");
    }
}

setInterval(callbackInterval, 60000);

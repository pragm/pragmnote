//Server-Build Version: BETA => 0.2.669
console.log(""); console.log("pragm-Websocket-Server => BUILD 0.2.669 BETA"); console.log("");
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


var sID_typ = function sID_typ(){
    //bei veränderung auch veränderungen in sync_L3.php vornehemen!
    //GET_FROM_SERVER
	this.idLength          = 10; //Zeichenlänge einer ID

	this.getServer         = "2000000000"; //Fragt Server nach bestimmter static ID
    
    //SEND_TO_SERVER
	this.clientName        = "2000000001"; //Übergibt den Clientnamen der Instanz an den Server
	this.file              = "2000000002"; //Übergibt zu landene DateiID an den Server
	this.userName          = "2000000007"; //Übergibt den Login Benutzernamen an den Server
	this.userPassword      = "2000000008"; //Übergibt das Login Passwort an den Server
	this.legitimationID    = "2000000009"; //Übergibt das Login Passwort an den Server

	//SEND_TO_SERVER ACTIONS WITH LEGITIMATION ID
	this.Login 			   = "2001000000"; //Übergabe und Rückgabe des Login Objektes
	this.unloadFile		   = "2001000001"; //Schließt die Datei
	this.addFile		   = "2001000002"; //Fügt eine Datei ins Verzeichnis hinzu
	this.deleteFile		   = "2001000003"; //Löscht eine Datei von ID
	this.killServer		   = "2001000004"; //Löscht eine Datei von ID

    
    //GET_FROM_SERVER
	this.fileList          = "2000000003"; //Server sendet Dateiliste
	this.userList          = "2000000004"; //Server sendet Userliste
	this.deleteID          = "2000000005"; //Server sendet zu löschende ID
	this.message           = "2000000006"; //Server sendet anzuzeigende Nachricht
	this.testid			   = "2000000010";
    this.updated           = "2000000011"; //Server meldet, dass Datei fertig geladen hat.
    this.fileunloadtrue    = "2000000012"; //Server says, that closing file completed GitHub => #5
    
	/*
	LEGITIMATION ID: Idee: 
	- wird vom server erstellt und gesendet
	- kann nur einmal verwendet werden für wichtige sachen (Login)
	- danach wird neue benötigt
	- wenn falsch 24h IP-Ban 
	*/
};

var sURL_typ = function sURL_typ(){
    //bei veränderung auch veränderungen in sync_L3.php vornehemen!
    //GET_FROM_SERVER
	//this.getUserDir        = "hex/pragm/dirServer/dirServer.php?jop=getUserDir"; //URL für UserID
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


    this.firewall = new Array();
    this.firewall[this.mSystem] = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    this.firewall[this.mAdmin] = new Array('1', '2', '3', '4', '5');
    this.firewall[this.mManage] = new Array('1', '2', '3', '4', '5');
    this.firewall[this.mDefault] = new Array('1', '2', '3', '4');
    this.firewall[this.mGuest] = new Array(sID.Login, sID.userName, sID.userPassword, sID.clientName, '1');
    this.firewall[this.mNoLogin] = new Array(sID.Login, sID.userName, sID.userPassword, sID.clientName);
    
    //this.config = { };
    //log(fs.readFileSync('config.json', 'UTF8'));
    this.config = JSON.parse(fs.readFileSync('config.json', 'UTF8'));
    log("CONFIG: "+JSON.stringify(this.config));
    //this = 9343;
    //this.config.dir = "./data/";

};

var global = new global_typ();

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

	this.cache = new Array();
    
    this.old = new Object();
    this.old.Stext;
    this.old.Scache;
    this.old.dif = new Object();
    this.old.dif.pos1 = 0;
    this.old.dif.pos2 = 0;
    this.old.dif.edit = "";
    this.lastSendID = new Array();
    this.lastReceiveID = new Array();
	
	this.send = function(clientID, id, text) {
        //global.setTime(new Date().getTime());
        text = text.toString(); 

		if(typeof this.cache[clientID][id] == 'undefined'){
			this.cache[clientID][id] = "";
		}
        if(this.cache[clientID][id] === this.old.Scache && text === this.old.Stext){
            this.newdif.pos1 = this.old.dif.pos1;
            this.newdif.pos2 = this.old.dif.pos2;
            this.newdif.edit = this.old.dif.edit;
        } else {
            this.newdif = dif.generateOpt(text, this.cache[clientID][id]);
            this.old.dif.pos1 = this.newdif.pos1;
            this.old.dif.pos2 = this.newdif.pos2;
            this.old.dif.edit = this.newdif.edit;
        }

		this.newmd5 = net.hashCode(text);

		this.cache[clientID][id] = text;
		
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
            L2x1.recieve(clientID, this.id, this.newcon); 
            //newmsg(this.newcon);
		}
		dlog("CLIENT=>"+clientID+" ID=>"+this.id+" NEWCON=>"+this.newcon.substr(0,10)+"..."); // .substr(0,10)
		
		
		};
		
	this.reset = function(clientID) {
		this.cache[clientID] = new Array();
        L3.reset(clientID);
        secure.reset(clientID);
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
		default:
			this.text = "Fatalerror";
			break;
		}
		log("Error: ["+number+"] => "+this.text+"; "+info+";");
	};
};

var error = new error_typ();
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

var pfile_typ = function pfile_typ(){
    
    this.dirObject = { };
    this.dir = "./data/";
    this.deleteDir = "4DELETED00";
    this.userDir   = "4000000000";
    this.dirFile   = "DirIndexFile";
    
    var searchArray = function(array, word){
        for(key in array) {	
            if(array[key] == word){ return true;}   
        }
        return false;						
    }
    
    this.readStr = function (id, operation, clientID){
        if(operation==='dir'){
            id = this.dirFile;
        }
        var file = global.config.dir+id+'.json';
		fs.readFile(file, 'UTF8', function (err, fileData) {
  			if (err) {console.log('tryed to read file: '+file);} else {
  				if(operation==='dir'){
                    pfile.dirObject = JSON.parse(fileData);
                    //console.log(pfile.dirObject);
                    //pfile.generateUserFilelist(clientID, "5000000000");
                    //var rid = pfile.addFile(12, "5000000000", "Hans", "5000000000", "u");
                    //var rid2 = pfile.addFile(12, rid, "HansOrdner", rid, "f");
                    //var rid = pfile.addFile(12, rid, "HansDatei", rid2, "p");
                    //console.log(pfile.dirObject);
                    //console.log(pfile.deleteFile(12, "5000000001", rid));
                    //pfile.writeStr(pfile.dirFile, 'dir', 12);
                    //console.log(pfile.dirObject);
                    
                }
                if(operation==='file'){
		            dlog("UPDATE OLD");
                    L3.files[id] = JSON.parse(fileData);
		            L3.oldFiles[id] = JSON.parse(fileData);
		            L3.updateUser(clientID);
                }
  			}
		});
	};
    
    this.writeStr = function (id, operation, clientID){
        if(operation==='dir'){
            var text = JSON.stringify(this.dirObject);
            id = this.dirFile;
        }
        if(operation==='file'){
            var text = JSON.stringify(L3.files[id]); // L3.files[id]
            //L3.killData(id);
        }
        if(operation==='newfile'){
            var tempNew = { };
            tempNew['1031111111'] = clientID;
            tempNew['1031111112'] = date.fileDate();
            var text = JSON.stringify(tempNew); // L3.files[id]
            // Todo: L3.killData(id); (clear RAM)
        }
        if(id!=""){
            fs.writeFile(global.config.dir+id+'.json', text, function (err) {
                if (err) {error.report(3, 'tryed to write file: '+file);} else {
                    log("Saved file "+pfile.dir+id+'.json');
                    if(id != this.dirFile){
                        L3.killData(id);
                    }
                    if(L3.exit == true && L3.lastkey == id){
                    	cLog("exit websocket server");
                        wsServer.shutDown();
                        server.close();
                    }
                }
            });
        }
	};
    
    this.checkLogin = function (clientID, username, password){
        var userID = null;
        var temp = { }
        temp.userRight = global.mNoLogin;
        temp.username = "xxxxxxxxxx";
        temp.userID = "";
        for(key in this.dirObject){
            if(this.dirObject[key].username === username){
                userID = key;
                break;
            }
        }
        if(userID != null && userID[0] === "5"){
            if(this.dirObject[userID].password === password){
                temp.userRight = this.dirObject[userID].userRight;
                temp.username = username;
                temp.userID = userID;
            }
        }
        secure.loginData(clientID, temp); // Todo: When mulible users cause problems copy temp object in another way
	};
    
    this.addFile = function (clientID, userID, name, dir, type){
        if(type==="f"){
            var typ = "4";
            var id = this.makeid(typ);
            while(this.dirObject[id]){
                id = this.makeid(typ);
            }
            this.dirObject[id] = { };
            this.dirObject[id].owner = userID;
            this.dirObject[id].parent = dir;
            this.dirObject[id].name = name;
            this.dirObject[id].content = "";
            this.dirObject[id].share = "";
            this.addLink(dir, id);
        }
        if(type==="p"){
            var typ = "3";
            var id = this.makeid(typ);
            while(this.dirObject[id]){
                id = this.makeid(typ);
            }
            this.dirObject[id] = { };
            this.dirObject[id].owner = userID;
            this.dirObject[id].parent = dir;
            this.dirObject[id].name = name;
            this.dirObject[id].share = "";
            this.addLink(dir, id);
            pfile.writeStr(id, 'newfile', name);
        }
        if(type==="u"){
            dir = this.userDir;
            var typ = "5";
            var id = this.makeid(typ);
            while(this.dirObject[id]){
                id = this.makeid(typ);
            }
            this.dirObject[id] = { };
            this.dirObject[id].owner = id;
            this.dirObject[id].parent = dir;
            this.dirObject[id].name = name;
            this.dirObject[id].username = name;
            this.dirObject[id].password = "initial";
            this.dirObject[id].userRight = 3;
            this.dirObject[id].content = "";
            this.dirObject[id].share = "";
            this.addLink(dir, id);
        }
        //return id;
        this.generateUserFilelist(clientID, userID);
        pfile.writeStr('x', 'dir', 12);
    };
    
    this.deleteFile = function (clientID, userID, id){
        if(userID === "5000000000" || this.dirObject[id].owner === userID){
            this.removeLink(this.dirObject[id].parent, id);
            this.dirObject[id].parent = this.deleteDir;
            this.addLink(this.deleteDir, id);
        }
        this.generateUserFilelist(clientID, userID);
        pfile.writeStr(12, 'dir', 12);
    };
    
    this.addLink = function (id, linkID){
        var content = this.dirObject[id].content;
        if(content === ""){
    	   content = linkID;
        } else {
            var contentArr = content.split(";");
            var vorhanden = false;
            for(key in contentArr){
                if(contentArr[key] == linkID){
                    vorhanden = true;
                }
            }
            if(!vorhanden){
                contentArr.push(linkID);
            }
	        content = contentArr.join(";");
        }
        this.dirObject[id].content = content;
    };
    
    this.removeLink = function (id, linkID){
        var content = this.dirObject[id].content;
        var contentArr = content.split(";");
       
        var lastkey;
        for(key in contentArr){
            if(contentArr[key] == linkID){
                lastkey = key;
            }
        }
        
        contentArr.splice(key, 1);
        
	    content = contentArr.join(";");
        
        this.dirObject[id].content = content;
    };
    
    this.generateUserFilelist = function(clientID, userID){
        this.generateUserFilelistJSON(clientID, userID);
        /*output = [];
        counter = 0;
        output[counter] = userID+''+this.dirObject[userID].name+';'+this.dirObject[userID].content;
        counter++;
        for(key in this.dirObject){
            share = this.dirObject[key].share.split(";");
            if(userID === "5000000000" || this.dirObject[key].owner == userID || searchArray(share, userID)){
                var beginn = key.substr(0, 1);
                if(beginn=="3"){
                    output[counter] = key+''+this.dirObject[key].name;
                    counter++;
                }
                if(beginn==="4" || beginn==="5" || beginn==="6"){
                    output[counter] = key+''+this.dirObject[key].name+';'+this.dirObject[key].content;
                    counter++;
                }
            }
        }
        L2x1.send(clientID, sID.fileList, output.join(":"));
        //this.generateUserFilelistJSON(clientID, userID);*/
        //console.log(output.join(":"));
    }
    
    this.generateUserFilelistJSON = function(clientID, userID){
        output = {};
        counter = 0;
        //output[counter] = userID+''+this.dirObject[userID].name+';'+this.dirObject[userID].content;
        //output[userID] = JSON.parse( JSON.stringify( a ) );
        counter++;
        for(key in this.dirObject){
            share = this.dirObject[key].share.split(";");
            if(userID === "5000000000" || this.dirObject[key].owner == userID || searchArray(share, userID)){
                output[key] = JSON.parse(JSON.stringify(this.dirObject[key])); // Makes a Copy of the Object
            }
        }
        L2x1.send(clientID, sID.fileList, JSON.stringify(output));
        //console.log(JSON.stringify(output));
    }
    
    this.makeid = function (type){
	   var id = Math.random().toString(36).substring(2,11);
	   return type+""+id;
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

	this.firewall = new Array();
	this.mandant = global.mNoLogin;
	this.id_pre = "2";
	
	this.send = function(clientID, id, data) {
        var mandant = secure.check(clientID);

        this.firewall = global.firewall[mandant];

        this.id_pre = id.substr(0, 1);

        if(this.firewall.indexOf(this.id_pre) >= 0 || this.firewall.indexOf(id) >= 0){
	        L2.send(clientID, id, data);
     	} else {
     		error.report(4, "Firewall blocked send ID "+id+" of User "+clientID+" Mandant "+mandant);
     	}
     };
	
	this.recieve = function(clientID, id, text) {
        var mandant = secure.check(clientID);

        this.firewall = global.firewall[mandant];

        this.id_pre = id.substr(0, 1);

        if(this.firewall.indexOf(this.id_pre) >= 0 || this.firewall.indexOf(id) >= 0){
	        L3.recieve(clientID, id, text);
     	} else {
     		error.report(4, "Firewall blocked recieved ID "+id+" of User "+clientID+" Mandant "+mandant);
     	}
	 };
};

var L2x1 = new L2x1_typ();

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
    
        this.files[this.users[clientID]['file']][id] = data;
    
    
        for(var key in this.users){
            if(this.users[key]['file'] == this.users[clientID]['file']){
                this.users[key].files[this.users[key]['file']][id] = data;
                if(key!=clientID){	
                    L2x1.send(key, id, data);
                }
            }
        }
    };

    this.deleteItemID = function (clientID, id, data){
        delete this.files[this.users[clientID]['file']][data];

        for(var key in this.users){
            if(this.users[key]['file'] == this.users[clientID]['file']){
                delete this.users[key].files[this.users[key]['file']][data];
                if(key!=clientID){	
                    L2x1.send(key, id, data);
                }
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
            case sID.deleteID:
                L3.deleteItemID(clientID, id, data);
                //Server loescht ID und schickt das weiter
                break;
            case sID.Login:
                secure.login(clientID, JSON.parse(data));
                //Server loescht ID und schickt das weiter
                break;   
            case sID.addFile:
                var temp = JSON.parse(data);
                pfile.addFile(clientID, L3.users[clientID]['userID'], temp.name, temp.dir, temp.type);
                break;     
            case sID.deleteFile:
                pfile.deleteFile(clientID, L3.users[clientID]['userID'], data);
                break;     
            default: 
                error.report(2,"static id $id not given or wrong");
                break;
		}
    };

    this.clientName = function (clientID, id, data) {
        this.users[clientID]['name'] = data;
        this.users[clientID].files = { };
        this.staticSave[clientID] = { };
        secure.legitimationSet(clientID);
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
                if(secure.userRights[clientID] === 0){
                    log("USER SYSTEM KILLED SERVER!");
                    wsServer.shutDown();
                    server.close();
                }
                break;
            default: 
                error.report(2, 'static id '+id+' not given or wrong');
                break;
        }
    };

    this.switchFile = function (clientID, id, data) {   
        this.users[clientID]['file'] = data; 
        if(!(data in this.files)) {
        this.files[data] = { };
            // Todo: NEUE JSON DateiSystemcheck
        pfile.readStr(data, 'file', clientID);
        } else {
            L3.updateUser(clientID);
        }
    };

    this.unloadFile = function (clientID){
        this.saveFileOP(this.users[clientID]['file']);
        var tempid = this.users[clientID]['file'];
        //delete this.users[clientID].files[this.users[clientID]['file']];
        this.users[clientID]['file'] = "";
        L2x1.send(clientID, sID.fileunloadtrue, tempid);
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
        L2x1.send(clientID, sID.updated, this.users[clientID]['file']);
        //this.users[clientID]['files'][this.users[clientID]['file']] = this.files[this.users[clientID]['file']];
    };

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
    
        if(!found && this.users[clientID]['file'] != ""){
            L3.saveFileOP(this.users[clientID]['file']);
        }
    
        if(this.users[clientID]){delete this.users[clientID]};
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
 
process.stdin.on('data', function (chunk) {
    chunk = chunk.substr(0, 4);
    switch (chunk) {
        case "save":
            cLog("save all files");
            L3.saveAll();
            break;
        case "stop":
            cLog("exit websocket server");
            //server.close();
            wsServer.shutDown();
            server.close();
            //process.kill();
            break;
        case "ende":
            cLog("end => stops websocket server when all clients are disconnected (allows no new connections)");
            server.close();
            //process.kill();
            break;
        case "exit":
            L3.exit = true;
            cLog("save all files");
            L3.saveAll();
            break;
        case "kill":
            for (key in clients) {
                clients[key].close();
            }
            break;
        case "rdir":
            datei.readDir();
            break;
        case "dbug":
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

// Port where we'll run the websocket server
if(!global.config.port){
    var webSocketsServerPort = 9343;
} else {
    var webSocketsServerPort = global.config.port;
}

var timeStatCounter = 0;
var timeStat = new Array();

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

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

pfile.readStr('123', 'dir', 2);
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
    request.on('error', function(message){
        log(" E R R O R :  SERVERERROR (PROBABLE SOCKET ON PORT "+webSocketsServerPort+" BUSY) [REQUEST] MSG: "+message);
    });
    response.on('error', function(message){
        log(" E R R O R :  SERVERERROR (PROBABLE SOCKET ON PORT "+webSocketsServerPort+" BUSY) [RESPONSE] MSG: "+message);
    });
});
server.listen(webSocketsServerPort, function() {
    log(" Server is listening on port " + webSocketsServerPort);
    
});

process.on('uncaughtException', function(err) {
  log(' C A U G H T    E X C E P T I O N : ' + err);
   //server.close();
    process.abort();
});//*/

server.on('error', function(message){
        log(" E R R O R :  SERVERERROR (PROBABLE SOCKET ON PORT "+webSocketsServerPort+" BUSY) [LISTEN]");
        process.abort();
    });

server.on('close', function(message){
        log(" S T O P :  SERVER HAS STOPPED!  S T O P ");
        process.abort();
    });
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    httpServer: server
});


wsServer.on('error', function(message){
        log(" E R R O R :  SERVERERROR (PROBABLE SOCKET ON PORT "+webSocketsServerPort+" BUSY) [wsServer]");
        wsServer.close();
    });

var connectionCounter = 0;

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin); 
    // we need to know client clientID to remove them on 'close' event
    //var clientID = clients.push(connection) - 1;   // -1
    var clientID = connectionCounter;
    clients[clientID] = connection;
    connectionCounter++;
    secure.init(clientID);
    L2.cache[clientID] = new Array();
    L3.users[clientID] = new Array();
    L3.users[clientID]['file'] = "";
    iLog('Connection accepted! CLIENTID=>'+clientID+' IP=>'+connection.remoteAddress+' ORIGIN=>'+request.origin);

    connection.on('message', function(message) {
        if (message.type === 'utf8') { // accept only text
                //log(' Received Message from '+ clientID + ': ' + message.utf8Data+"<= AND =>"+connection.remoteAddress);

                //timeStatCounter = timeStat.push(new Date()) - 1;
                L2.recieve(clientID, message.utf8Data);
                //for (var i=0; i < clients.length; i++) {
                //    clients[i].sendUTF(message.utf8Data+"<= AND =>");
                //}
            //}
        }
    });

    // user disconnected
    connection.on('close', function(connection) {
        //clients.splice(clientID, 1);
        if(clients[clientID]){delete clients[clientID]};
        iLog("CLIENTID=>"+clientID+" disconnected!");
        secure.reset(clientID);
        L3.reset(clientID);
    });

});


var L1_typ = function L1_typ(){
    this.send = function (client, text){
        clients[client].sendUTF(text);
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

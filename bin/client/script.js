var clientversion = "0.1.637"/******************************************************************************************
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
#       Filename......................: addFile.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var addFile_typ = function addFile_typ(){

    this.AddFile = false;
    this.AddFileChoice = false;

    this.toggleAddFile = function(){
        if(this.AddFile){
            document.getElementById('AddFile').className = 'dirButtonsLi';
            this.AddFile = false;
        } else {
            document.getElementById('AddFile').className = 'dirButtonsLiAdd';
            this.AddFile = true;
            document.getElementById('AddFileInput').focus();
        }
    }
    
    this.AddFileD = function(x){
        if(x){
            document.getElementById('AddFile').className = 'dirButtonsLiAdd';
            this.AddFile = true;
        }else{
            document.getElementById('AddFile').className = 'dirButtonsLi';
            this.AddFile = false;
        }
    }//
    
    this.toggleAddFileChoice = function(){
        if(this.AddFileChoice){
            document.getElementById('AddFileChoice').src = 'img/doc/file.png';
            document.getElementById('AddFileChoice').style.bottom = '0px';
            this.AddFileChoice = false;
            document.getElementById('AddFileInput').focus();
        } else {
            document.getElementById('AddFileChoice').src = 'img/doc/folder.png';
            document.getElementById('AddFileChoice').style.bottom = '3px';
            this.AddFileChoice = true;
            document.getElementById('AddFileInput').focus();
        }
    }
    
    this.checkEnter = function(){  
      if(event.keyCode == 13){
        this.AddFileEnter();
      }  
    }
    
    this.AddFileEnter = function(){
        var fileType = 'p';
        if(this.AddFileChoice){
            fileType = 'f';
        }
        var fileName = document.getElementById('AddFileInput').value;
        this.AddFileD(false);
        document.getElementById('AddFileInput').value = "";
        document.getElementById('AddFileInput').blur();
        //console.log(fileType+' '+fileName);
        uiControl.addFile(fileName, fileType);
    }
}

var addFile = new addFile_typ();
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
#       Filename......................: check.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var check_typ = function check_typ(){
    
    this.id = function(typ, id){
        this.aID = String(id);
        this.lID = this.aID.length;
        this.idType = parseInt(this.aID.substr(0, 3));
        if(this.idType == parseInt(typ) && this.lID == 10){
            return true;   
        }
        return false; 
    };
    
};
var check = new check_typ();

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
#       Filename......................: colorshemer.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var color_typ = function color_typ(){
    this.colorswitchid = false;
	this.switchline = 0;
	this.switchbox = 0;
	this.switchrect = 0;
    
    this.setcolorswitch = function (id){
	    color.colorswitchid = id;
        var idstring = id.toString();
        var type = idstring.substring(0, 3);
	   
        switch (type) {
			    case "100":
				    //unfocusline();
				    if(color.switchbox==0){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>fontcolor";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>fontbackground";}
				    break;
			    case "101":
				    //unfocusline();
				    if(color.switchrect==0){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>rect color";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>rect border width";}
                    break;
                case "102":
				    if(color.switchline==1){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>line width";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>line color";}
				    break;
			    case "104":
				    document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Pfeilfarbe";
				    break;
			    default:
				    break;
		}
	};
    
    this.togglecolor = function (){
        var idstring = color.colorswitchid.toString();
        var type = idstring.substring(0, 3);
	   
        switch (type) {
			    case "100":
				    //unfocusline();
					if(color.switchbox==0){color.switchbox=1;}else{color.switchbox=0;}
				    if(color.switchbox==0){
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>fontcolor";
				    }else{
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>fontbackground";
				    }
				    break;
			    case "101":
				    //unfocusline();
					if(color.switchrect==0){color.switchrect=1;}else{color.switchrect=0;}
				    if(color.switchrect==0){
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>rect color";
				    }else{
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>rect border width";
				    }
                    break;
                case "102":
					if(color.switchline==0){color.switchline=1;}else{color.switchline=0;}
				    if(color.switchline==1){
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>line width";
				    }else{
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>line color";
				    }
				    break;
			    case "104":
				    document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Pfeilfarbe";
				    break;
			    default:
				    break;
		}
	};

	this.setcolor = function(mycolor){
		var idstring = color.colorswitchid.toString();
		var type = idstring.substring(0, 3);
		
		switch (type) {
				case "100":
					if(color.switchbox==0){rich.fontEdit('ForeColor', mycolor);}else{rich.fontEdit('BackColor', mycolor);}
					break;
				case "101":
					if(color.switchrect==0){setdrawrectcolor(colorswitchid, mycolor);}else{alert('not available!');}
					break;
				case "102":
					if(color.switchline==0){setdrawlinecolor(colorswitchid, mycolor);}else{}
					break;
				case "104":
					if(color.switchline==0){setdrawarrowcolor(colorswitchid, mycolor);}else{}
					break;
				default:
					alert('Please chose an object!');
					break;
		}
	};
};
/*
var switchline=0;
var switchbox=0;
var switchrect=0;

function makecolorshemer(){
	var counter = 0;
	var colorcontent="";
	while(colorarray2[counter]){
		colorcontent=colorcontent+'<li unselectable="on" id="color'+counter+'" onclick="setcolor(this.style.background);" style="background: #'+colorarray2[counter]+';"><input type="button" unselectable="on" class="unselectinput"></input></li>';
		counter++;
		}
	colorcontent=colorcontent+'<li unselectable="on" id="color'+counter+'" onclick="setcolor(this.style.background);" style="background: transparent; border: 1px solid black;"><input type="button" unselectable="on" class="unselectinput"></input></li>';
	document.getElementById('colorshemer').innerHTML = colorcontent;	
	}
	

	
function togglecolor(){
	var idstring = colorswitchid.toString();
	var type = idstring.substring(0, 3);
	
	switch (type) {
			case "100":
				if(switchbox==0){switchbox=1;}else{switchbox=0;}
				if(switchbox==0){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Schriftfarbe";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Schrifthintergrund";}
				break;
			case "101":
				if(switchrect==0){switchrect=1;}else{switchrect=0;}
				if(switchrect==0){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Rechteckfarbe";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Rechteckrahmen";}
				break;
			case "102":
				if(switchline==0){switchline=1;}else{switchline=0;}
				if(switchline==1){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Liniendicke";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Linienfarbe";}
				break;
			case "104":
				document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Pfeilfarbe";
				break;
			default:
				break;
	}
	
	}
	
	
function setcolor(mycolor){
	var idstring = colorswitchid.toString();
	var type = idstring.substring(0, 3);
	
	switch (type) {
			case "100":
				if(switchbox==0){fontEdit('ForeColor', mycolor);}else{fontEdit('BackColor', mycolor);}
				break;
			case "101":
				if(switchrect==0){setdrawrectcolor(colorswitchid, mycolor);}else{alert('Rahmenfarbe nicht verfuegbar!');}
				break;
			case "102":
				if(switchline==0){setdrawlinecolor(colorswitchid, mycolor);}else{}
				break;
			case "104":
				if(switchline==0){setdrawarrowcolor(colorswitchid, mycolor);}else{}
				break;
			default:
				alert('Bitte waehlen sie ein Objekt aus!');
				break;
	}
	}
//*/	
var color = new color_typ();

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
#       Filename......................: data.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var data_typ = function data_typ(){
    
	this.fileList;
	this.files = { }; //Struktur: files[fileID][contentID] = content;
	this.users;
    
    this.edited_sync = function(fileID, contentID){
        var type = contentID.substr(0,3);
        switch(type){
            case '100':
                textbox.setid(contentID, data.files[fileID][contentID]);
                break;
            case '103':
                staticItems.setid(contentID, data.files[fileID][contentID]);
                break;
        }
    };
    
    this.edited_UI = function(contentID){
        L3.send(contentID);
    };
    
    this.reset = function(){
        this.fileList = "";
	    this.files = { };
	    this.users = "";
    }
        
    this.delete_UI = function(id){
        delete data.files[L3.file][id];
        L3.delete(id);
    }
        
    this.delete_sync = function(id){
        delete data.files[L3.file][id];
        textbox.removeElement("editarea"+id);
    }
    
};
var data = new data_typ();

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
    this.lastSendID;
    this.lastReceiveID;
	
	this.send = function(id, text) {
        global.setTime(new Date().getTime());
        
        //console.log(id);
        //console.log(text);
		
		if(!this.cache[id]){
			this.cache[id] = "";
		}

		this.newdif = dif.generateOpt(text, this.cache[id]);

		this.newmd5 = net.hashCode(text);
		
		this.cache[id] = text;
		
		this.pos1 = convert.int_to_string(this.newdif.pos1);
		this.pos2 = convert.int_to_string(this.newdif.pos2);
		
		this.init = convert.int_to_string(parseInt(this.pos1.length+''+this.pos2.length));
		
		this.output = id+''+this.newmd5+''+this.init+''+this.pos1+''+this.pos2+''+this.newdif.edit;
		
        if(this.output.length<=28 && this.lastSendID == id){
            this.output = this.output.substr(10);
        }
        this.lastSendID = id;
		L1.send(this.output);

        //console.log(this.output);
		};
	
	this.recieve = function(text) {
		
        if(text[0] == '='){
            this.id = text.substr(1,10);
            console.log("Clearing Cache of ID "+this.id+"");
            this.cache[this.id] = "";
            return;
        }        
        
        if(text.length <=18){
            text = this.lastReceiveID+text;
        }
        
		this.id = text.substr(0, 10);
		text =  text.substr(10);
        
        
        this.lastReceiveID = this.id;
		
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
		
		if(!this.cache[this.id]){
			this.cache[this.id] = "";
		}
		
		this.oldcon = this.cache[this.id];
		
		this.newcon = dif.buildnew(this.pos1, this.pos2, this.edit, this.oldcon); // this.work ist draussen
		
		this.newmd5 = net.hashCode(this.newcon);
		
		if(this.newmd5 != this.md5){
            this.cache[this.id] = "";
            L1.send("="+this.id);
			error.report(0, "HASHES are not equal! ID:"+this.id);
		} else {
			this.cache[this.id] = this.newcon;
            L3.recieve(this.id, this.newcon); 
            //newmsg(this.newcon);
		}
		
		
		
		};
    
    this.errorhandling = function() {
        
    }
		
	this.reset = function() {
		this.cache = new Array();
        L3.reset();
		};	
    
    this.init = function(){
        //var L3 = new L3_typ();
        L3.init();
    }
};

var L2 = new L2_typ();


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
#       Filename......................: dirCreator.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var testDir = "33e1d210cfDatei1:39f6168622Datei2:3aaaaaaaaaDatei3:4000000000root;4000000001;3aaaaaaaaa:4000000001Ordner1;45909c4fcf;39f6168622:45909c4fcfOrdner2;33e1d210cf";
var lastDir = '5000000001';
var mainDir = '5000000001';
//alert(testDir.substr(10));
// TODO: Muss noch an Programmierrichtlinien Angepasst werden.

function createDirArray(dir, folder){
    var fullDirArray = dir.split(":");
    var key = getFolderKey(fullDirArray, folder);
    var folderContent = fullDirArray[key].substr(10);
    var folderArray = folderContent.split(";");
    var folderName = folderArray[0];
    var folderNameLength = folderName.length;
    folderContent = folderContent.substr(folderNameLength+1);
    folderArray = folderContent.split(";");
    var fileCounter = 0;
    var id   = false;
    var name = false;
    var html = "";
    while(folderArray[fileCounter]){
        id   = folderArray[fileCounter];
        name = getFileName(fullDirArray, folderArray[fileCounter]);
        html = html+createElement(id, name);
        fileCounter++;
    }
    document.getElementById('fileListUl').innerHTML = html;
    }

function showDir(id){
    return createDirArray(testDir, id);
}

function getFolderKey(fullDirArray, id){
    var counter = 0;
    while(fullDirArray[counter]){
        if(fullDirArray[counter].substr(0,10) == id){
            return counter;
            console.log('t');
            }
        counter++
        }
}

function getFileName(fullDirArray, id){
    var idCounter = 0;
    var name = false;
    while(fullDirArray[idCounter] && name == false){
        if(fullDirArray[idCounter].substr(0,10) == id){
            var temp = id.substr(0,1);
            if(temp == "4"){
                var name = fullDirArray[idCounter].substr(10).split(";")[0];
            }
            if(temp == "5"){
                var name = fullDirArray[idCounter].substr(10).split(";")[0];
            }
            if(temp == "3"){
                var name = fullDirArray[idCounter].substr(10);
            }
        }
        idCounter++;
        }
    return name;
}

function createElement(id, name){
    var t = new Array("fileIcon", "file");
    switch(id.substr(0,1)){
            case "3":
            t[0] = "fileIcon";
            t[1] = "file";
            break;
            case "4":
            t[0] = "folderIcon";
            t[1] = "folder";
            break;
            case "5":
            t[0] = "fileIcon";
            t[1] = "user";
            break;
    }
    id = "'"+id+"'";
    var e = '<li onclick="openFile('+id+');"><img src="img/doc/'+t[1]+'.png" class="'+t[0]+'"><font style="position: relative; left: 30px;">'+name+'</font></li>';
    return e;
    
}

function createFolderElement(id, name){
    id = "'"+id+"'";
    var e = '<li onclick="openFile('+id+');">'+name+'</li>';
    return e;
}

function getFilePath(id){
    var dir = testDir;
    var fullDirArray = dir.split(":");
    var filePath = searchLink(fullDirArray, id);
    var filePathCounter = 0;
    var html = "";
    while(filePath[filePathCounter]){
        id = filePath[filePathCounter];
        name = getFileName(fullDirArray, id);
        html = createFolderElement(id, name)+html;
        filePathCounter++;
    }
    //var temp = "'4000000000'";
    //html = '<li style="color: #333333;" onclick="openFile('+temp+')">//</li>'+html;
    document.getElementById('dirShow').innerHTML = html;
}

function searchLink(fullDirArray, id){
    var searchCounter = 1;
    var searchArray = new Array();
    var found = false;
    var checkId = id;
    searchArray[0] = id;
    while(checkId != mainDir && searchCounter<100){
        checkId = getSuperPath(fullDirArray, checkId);
        if(!checkId){ alert('Fatal Error: Konnte Uebergeordnetes Verzeichnis nicht finden!'); }
        searchArray[searchCounter] = checkId;
        searchCounter++
    }
    return searchArray;
}

function getSuperPath(fullDirArray, id){
    var counter = 0;
    var found = false;
    while(fullDirArray[counter]){
        if(fullDirArray[counter].substr(0,1) == "4" ||fullDirArray[counter].substr(0,1) == "5"){
            var folderContent = fullDirArray[counter].split(';');
            var fCounter = 0;
            while(folderContent[fCounter]){
                if(folderContent[fCounter] == id){
                    return fullDirArray[counter].substr(0,10);
                }
                fCounter++;
            }
        }
        counter++;
    }
}
    

function openFile(id){
    switch(id.substr(0,1)){
            case "3":
            //Datei Oeffnen
            uiControl.loadFile(id);
            break;
            case "4":
            showDir(id);
            getFilePath(id);
            lastDir = id;
            break;
            case "5":
            showDir(id);
            getFilePath(id);
            lastDir = id;
            break;
    }
}

function refreshShow(){
    showDir(lastDir);
    getFilePath(lastDir);
}

function createFile(folder, name, type){
    
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
			this.text = "ELSE";
			break;
		case 2:
			this.text = "unknown package ID";
			break;
		case 3:
			this.text = "Tried to set/get not existing element.";
			break;
		default:
			this.text = "Fatalerror";
			break;
		}
		console.log("Error: ["+number+"] => "+this.text+"; "+info+";");
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
#       Filename......................: global_events.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var globalEvent_typ = function globalEvent_typ(){

    //function update_websocketstate(){
	//   stateupdate();
    //}
    
    this.fpsTimer = false;
    this.fpsTimer2 = false;
    this.fpsControl = false;
    this.stateTimer = false;

    this.mousemove = function (){
        if(globalEvent.fpsControl) {
            if(!globalEvent.fpsTimer){
                clearTimeout(globalEvent.fpsTimer2);
                globalEvent.mousemove_fps();
                globalEvent.fpsTimer = setTimeout("globalEvent.fpsTimer = false;", 1000/global.fps);
                globalEvent.fpsTimer2 = setTimeout("globalEvent.mousemove_fps();", 1100/global.fps);
            }
        } else {
            globalEvent.mousemove_fps();
        }
    };

    this.mousemove_fps = function (){
        globalEvent.fpsTimer = false;
        textbox.mousemove();
    };
        
    this.onload = function (){
        this.updateMainFieldPosition();
        //this.setDefaultNotecon();
        //setTimeout("globalEvent.lateload();", 1000);
        document.getElementById('displayBlocker').style.display = "none";
        
        document.getElementById('madebyinfo').innerHTML = "Version: "+clientversion+" | "+document.getElementById('madebyinfo').innerHTML;
        //document.getElementById('noteconBackground').style.display = "none";
        //uiControl.view('start');
        L1.onload();
    };
    
    this.onConnect = function (){
        //setTimeout('L3.loadFile("3aaaaaaaaa");', 1000);
    };
    
    this.drop = function () {
        //slidestop();
        //drawmouseup();
        textbox.drop();
    };
        
    this.updateMainFieldPosition = function (){
	   global.chY = document.getElementById("notecon").offsetTop;
	   global.chX = document.getElementById("notecon").offsetLeft;
    };
        
    this.onclick = function (){
        //drawunfocus();
    };

    this.state = function (n){
        // Rot: #f92d4d Gruen: #67d200
        clearTimeout(this.stateTimer);
        switch(n){
            case 0:
                //document.getElementById("pragmico1").src = "img/doc/pragm_1.png";
                document.getElementById("pragmico2").style.backgroundImage = "url('img/doc/pragm_1_white.png')";
                //document.getElementById('fileTabs').style.height = "";
                //document.getElementById('noteconBackground').style.display = "none";
                break;
            case 1:
                //document.getElementById("pragmico1").src = "img/doc/pragm_1_green.png";
                document.getElementById("pragmico2").style.backgroundImage = "url('img/doc/pragm_1_lightgreen.png')";
                this.stateTimer = setTimeout('globalEvent.state(0)', 1000);
                break;
            case 2:
                //document.getElementById("pragmico1").src = "img/doc/pragm_1_red.png";
                document.getElementById("pragmico2").style.backgroundImage = "url('img/doc/pragm_1_red.png')";
                //document.getElementById('fileTabs').style.height = "50px";
                //document.getElementById('noteconBackground').style.display = "";
                break;
            case 3:
                //document.getElementById("pragmico1").src = "img/doc/pragm_1_yellow.png";
                document.getElementById("pragmico2").style.backgroundImage = "url('img/doc/pragm_1_yellow.png')";
                //document.getElementById('fileTabs').style.height = "50px";
                //document.getElementById('noteconBackground').style.display = "";
                break;
        }
    }
};

var globalEvent = new globalEvent_typ();


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
#       Filename......................: global_vars.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var global_typ = function global_typ(){
    this.config = JSON.parse(globalconfig);
    this.websocket_server_address_online = 'ws://pragm.dyndns-work.com:9343';
    this.websocket_server_address_local  = 'ws://localhost:9343';
	this.websocket_server_address = 'ws://91.89.70.45:9343'; 
    this.websocket_server_address = 'ws://localhost:9343'; //ws://pragm.dyndns-work.com:9300
    this.websocket_server_address_array = new Array();
    this.websocket_server_address_array[0] = 'ws://localhost:9343'; //ws://pragm.dyndns-work.com:9300 
	this.websocket_server_address_array[3] = 'ws://localhost:9342'; 
	this.websocket_server_address_array[2] = 'ws://demo.pragm.de:9342'; 
	this.websocket_server_address_array[1] = 'ws://demo.pragm.de:9343';
    this.actualServer = -1;
    this.pServer = this.websocket_server_address_array[3];
    this.firstConnect = true;
    this.firstTry = true;
    
    this.get_websocket_server_address = function(){
        if(this.config.addressalert){
            return prompt("WebSocket Server:", this.pServer);
        } else {
            return this.config.serveraddress;
        }
        if(this.firstTry){
            this.firstTry = false;
            //return prompt("WebSocket Server:", this.pServer);
        } else {
            //return prompt("Connection failed! Please retry! WebSocket Server:", this.pServer);
        }
        this.actualServer++;
        if(!this.websocket_server_address_array[this.actualServer]){
            this.actualServer = 0;
        }
        return this.websocket_server_address_array[this.actualServer];
    };
    //var temp = confirm("Befinden Sie sich im lokalen Netzwerk des Servers?");
    //if(temp){
    //    this.websocket_server_address = this.websocket_server_address_local;
    //}

	this.retry_when_disconnected = true;
    this.time = 1;
    this.fps = 60;              //FramesPerSecond für mousemove
    this.chX = 0;             //X-Position des notecon div's
    this.chY = 50;              //Y-Position des notecon div's
    this.textboxXdif = 8;       //X-Verschiebung einer Textbox beim erstellen
    this.textboxXdif = 18;      //Y-Verschiebung einer Textbox beim erstellen
    this.websocket_slow_down = 10; //Verlangsame reconnect Versuche nach n Versuchen
    this.websocket_slow_time = 500; // nach 20 Sekunden Reconnect
    this.draganddroprealtime = false;
    this.difcut = 457;
    this.notecon = '<div class="noteheadline" contenteditable="true" oninput="staticItems.saveid(this.id);" id="1031111111">My Headline</div><div class="notedateline" contenteditable="true" oninput="staticItems.saveid(this.id);" id="1031111112">Mittwoch 7.November 2012<br>12:42</div>';
    
    this.setTime = function(time){
        this.time = time;
    };
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
#       Filename......................: item_text.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var textbox_typ = function textbox_typ(){
	
    this.mousemove = function (){
       textbox.Ereignis = window.event;
	   if(textbox.draging==1){
           textbox.x = textbox.Ereignis.clientX;
           textbox.y = textbox.Ereignis.clientY;
           textbox.movX = textbox.x-textbox.startX;
           textbox.movY = textbox.y-textbox.startY;
           textbox.actualX = textbox.movX+textbox.objectX;
           textbox.actualY = textbox.movY+textbox.objectY;
           if(!(textbox.actualX<=10)){
               document.getElementById(textbox.dragid).style.left = textbox.actualX+"px";
           }
           if(!(textbox.actualY<19)){
               document.getElementById(textbox.dragid).style.top  = textbox.actualY+"px";
           }
           document.getElementById(textbox.dragid).className = "editareax2";
           //textbox.saveid('editing'+textbox.draganddropid);
       }
	   if(textbox.resizeing==1){
           textbox.x = textbox.Ereignis.clientX;
           textbox.difference = textbox.x-textbox.startXsize;
           textbox.newwidth = textbox.objectXsize+textbox.difference;
           document.getElementById(textbox.resizeid).style.width = textbox.newwidth+"px";
           document.getElementById(textbox.resizeid).className = "editareax2";
           //textbox.saveid('editing'+textbox.draganddropid);
       }
	};
    
    this.drag = function (id){
        document.getElementById("editarea"+id).className = "editareax2";
	    textbox.draging = 1;
        textbox.draganddropid = id;
        textbox.dragid = "editarea"+id;
        textbox.Ereignis = window.event;
        textbox.startX = textbox.Ereignis.clientX;
        textbox.startY = textbox.Ereignis.clientY;
        textbox.objectX = document.getElementById(textbox.dragid).style.left;
        textbox.objectY = document.getElementById(textbox.dragid).style.top;
        textbox.objectX = parseInt(textbox.objectX.replace(/px/g, ""));
        textbox.objectY = parseInt(textbox.objectY.replace(/px/g, ""));
    };
    
    this.drop = function (){
    if(textbox.draging == 1 || textbox.resizeing == 1){
        elem = document.getElementById("editing"+textbox.draganddropid); //This is the element that you want to move the caret to the end of
        textbox.setEndOfContenteditable(elem);
        textbox.saveid('editing'+textbox.draganddropid);
		}
	textbox.draging = 0;
	textbox.resizeing = 0;
	};
    
    this.setEndOfContenteditable = function (contentEditableElement){
        var range,selection;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        { 
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    };
    
    this.resize = function (id){
	   document.getElementById("editarea"+id).className = "editareax2";
	   textbox.resizeing = 1;
	   textbox.draganddropid = id;
	   textbox.resizeid = "editarea"+id;
	   textbox.Ereignis = window.event;
	   textbox.startXsize = textbox.Ereignis.clientX;
	   textbox.objectXsize = document.getElementById(textbox.resizeid).style.width;
	   textbox.objectXsize = parseInt(textbox.objectXsize.replace(/px/g, ""));
	};
    
    this.aktivatefocus = function (id){
	   textbox.iding = id.split("editing");
	   textbox.id = textbox.iding[1];
	   textbox.aktiveid = textbox.id;
	   document.getElementById("editarea"+textbox.id).className = "editareax2";
	   color.setcolorswitch(textbox.id);
	   }

    this.deaktivatefocus = function (id){
	   textbox.eid = id;
	   textbox.iding = id.split("editing");
	   textbox.id = textbox.iding[1];
	   if(document.getElementById("editarea"+textbox.id)){
           document.getElementById("editarea"+textbox.id).className = "editareax";
       }
	}
        
    this.setid =function (id, value){
        textbox.init = convert.string_to_int(value.substr(0,1));
        
        var temp = ''+textbox.init/16+'';
        textbox.widthL = parseInt(temp.substr(0,1))+3;
        textbox.init = textbox.init%16;
        
        var temp = ''+textbox.init/4+'';
        textbox.yPosL = parseInt(temp.substr(0,1))+3;
        textbox.xPosL = (textbox.init%4)+3;
        
        var content = value.substr(1+textbox.xPosL+textbox.yPosL+textbox.widthL);
        var xPos = value.substr(1, textbox.xPosL);
        var yPos = value.substr(1+textbox.xPosL, textbox.yPosL);
        var width = value.substr(1+textbox.xPosL+textbox.yPosL, textbox.widthL);
        
        
	   if(document.getElementById('editarea'+id)){
           if(content!=0){
               document.getElementById('editing'+id).innerHTML = content;
           }
           if(xPos!=0){
               document.getElementById('editarea'+id).style.left = xPos+'px';
           }
           if(yPos!=0){
               document.getElementById('editarea'+id).style.top = yPos+'px';
           }
           if(width!=0){
               document.getElementById('editarea'+id).style.width = width+'px';
           }
       } else {
	   	
           textbox.newdiv = document.createElement("div");
           textbox.newdiv.className		     = "editareax";
           textbox.newdiv.id				 = 'editarea'+id;
           textbox.newdiv.style.left		 = xPos+'px';
           textbox.newdiv.style.top		     = yPos+'px';
           textbox.newdiv.style.width		 = width+'px';
           textbox.newdiv.contenteditable	 = 'false';
           textbox.newdiv.innerHTML 		 = textbox.getTextboxHTML(id, content);	   
           document.getElementById('notecon').appendChild(textbox.newdiv);
       }
	};
    
    this.addfield = function (){
	   this.id = textbox.makeid('100');
	   this.Ereignis = window.event;
	   this.x = this.Ereignis.clientX-global.chX-global.textboxXdif;   //changestartsize42 8
	   this.y = this.Ereignis.clientY-global.chY-global.textboxXdif;  //changestartsize42 18
	   textbox.newdiv = document.createElement("div");
	   textbox.newdiv.className		 = "editareax";
	   textbox.newdiv.id				 = 'editarea'+this.id;
	   textbox.newdiv.style.left		 = this.x+'px';
	   textbox.newdiv.style.top		 = this.y+'px';
	   textbox.newdiv.style.width		 = '400px';
	   textbox.newdiv.contenteditable	 = 'false';
       textbox.newdiv.innerHTML 		 = textbox.getTextboxHTML(this.id, "");
	   document.getElementById('notecon').appendChild(textbox.newdiv);
	   document.getElementById("editing"+this.id).focus();
	};
    
    this.getTextboxHTML = function (id, content){
        return '<div class="inarea2" contenteditable="false" id="'+id+'" onmousedown="textbox.drag(this.id);"></div><div class="inarea3" contenteditable="false" id="'+id+'" onmousedown="textbox.resize(this.id);"></div><div class="editspan" contenteditable="true" id="editing'+id+'" onblur="textbox.deleteelement(this.id); textbox.deaktivatefocus(this.id);" onfocus="textbox.aktivatefocus(this.id);" oninput="textbox.saveid(this.id);">'+content+'</div>';
    };
    
    this.makeid = function (type){
	   var id = (Math.random()*100000000000000000);
	   id = id.toString();
	   id = id.substring(0,7);
	   return type+""+id;
	   };
        
    this.removeElement = function (id) {
	   if(document.getElementById(id)){
           this.element = document.getElementById(id);
           this.element.parentNode.removeChild(this.element);
       }
    };

    this.deleteelement = function (id){
        id = id.split("editing")[1];
        textbox.tempcon = document.getElementById("editing"+id).innerHTML;
        if(textbox.tempcon == "<br>" || textbox.tempcon==""){
            textbox.removeElement("editarea"+id);
            data.delete_UI(id);
		    }
	   };
    
    this.saveid = function (id){
        id = id.split("editing")[1];
        textbox.content		=	document.getElementById('editing'+id).innerHTML;
        textbox.posX 		=	document.getElementById('editarea'+id).style.left; // 4^0
        textbox.posY 		=	document.getElementById('editarea'+id).style.top;  // 4^1
        textbox.width 		=	document.getElementById('editarea'+id).style.width;// 4^2
					
        textbox.posX = textbox.posX.replace(/px/g, "");
        textbox.posY = textbox.posY.replace(/px/g, "");
        textbox.width = textbox.width.replace(/px/g, ""); //parseInt()
        
        textbox.posXL = textbox.posX.length;
        while(textbox.posXL<3){
            textbox.posX = '0'+textbox.posX;
            textbox.posXL = textbox.posX.length;
        }
        
        textbox.posYL = textbox.posY.length;
        while(textbox.posYL<3){
            textbox.posY = '0'+textbox.posY;
            textbox.posYL = textbox.posY.length;
        }
        
        textbox.widthL = textbox.width.length;
        while(textbox.widthL<3){
            textbox.width = '0'+textbox.width;
            textbox.widthL = textbox.width.length;
        }
        
        textbox.init = convert.int_to_string(parseInt((textbox.posXL-3)+(textbox.posYL-3)*4+(textbox.widthL-3)*16));
        
        var tempContent = textbox.content;
        
        tempContent = tempContent.replace(/�/g, "&Auml;");
        tempContent = tempContent.replace(/�/g, "&auml;");
        tempContent = tempContent.replace(/�/g, "&Ouml;");
        tempContent = tempContent.replace(/�/g, "&ouml;");
        tempContent = tempContent.replace(/�/g, "&Uuml;");
        tempContent = tempContent.replace(/�/g, "&uuml;");
        tempContent = tempContent.replace(/�/g, "&sect;");
        tempContent = tempContent.replace(/�/g, "&szlig;");
        tempContent = tempContent.replace(/�/g, "&deg;");
        tempContent = tempContent.replace(/�/g, "&euro;");
        
        
        textbox.value = textbox.init+''+textbox.posX+''+textbox.posY+''+textbox.width+''+tempContent;
					
        //var value = textbox.content+":"+textbox.posX+":"+textbox.posY+":"+textbox.width;
        
        //console.log(textbox.value);
        data.files[L3.file][id] = textbox.value;
        data.edited_UI(id);
        //console.log(value);
        //SYNC_CONNECT
    };
};

var textbox = new textbox_typ();


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
#       Filename......................: pDrawFoc.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var pDrawFoc_typ = function pDrawFoc_typ(){
    this.p1x = 0;
    this.p1y = 0;
    this.p2x = 0;
    this.p2y = 0;
    this.pSx = 0;
    this.pSy = 0;


    this.edit = function(pID){
        var Ereignis = window.event;
		this.pSx = Ereignis.clientX;     //Ereignis.clientX
		this.pSy = Ereignis.clientY;     //Ereignis.clientY
        var a = pID.substr(0,1);
        var b = pID.substr(1,1);

        
        if(a=="t"){this.yDifferenz = function(yDif){ return Array(this.p1y + yDif, this.p2y); };}
        if(a=="b"){this.yDifferenz = function(yDif){ return Array(this.p1y, this.p2y + yDif); };}
        if(a=="c"){this.yDifferenz = function(yDif){ return Array(this.p1y, this.p2y);};}
        
        if(a=="l" || b=="l"){this.xDifferenz = function(xDif){ return Array(this.p1x + xDif, this.p2x); };}
        if(a=="r" || b=="r"){this.xDifferenz = function(xDif){ return Array(this.p1x, this.p2x + xDif); };}
        
        if(pID=="cc"){
        	this.xDifferenz = function(xDif){ return Array(this.p1x + xDif, this.p2x + xDif); };
        	this.yDifferenz = function(yDif){ return Array(this.p1y + yDif, this.p2y + yDif); };
        }
    };

    this.move = function(Ereignis){
		var pAx = Ereignis.clientX;     //Ereignis.clientX
		var pAy = Ereignis.clientY;     //Ereignis.clientY
		var tempX = this.xDifferenz(this.pSx-this.pAx);
		var tempY = this.yDifferenz(this.pSy-this.pAy);
		this.drawingrect(tempX[0],tempY[0],tempX[1],tempY[1]);
    };
    
    this.drawingrect = function (p1X, p1Y, p2X, p2Y){
		var drawrectid = 'foc';
		var temp_p1X = p1X;
		var temp_p1Y = p1Y;
		var temp_p2X = p2X;
		var temp_p2Y = p2Y;
		
		
		if(p1X>p2X){
			var temp = p1X;
			p1X = p2X;
			p2X = temp;
		}
		if(p1Y>p2Y){
			var temp = p1Y;
			p1Y = p2Y;
			p2Y = temp;
		}
		
		var height = p2Y-p1Y;
		var width = p2X-p1X;
		var posX = p1X;
		var posY = p1Y;
		
		console.log('Points /'+p1X+':'+p1Y+':'+p2X+':'+p2Y);
		console.log(height+':'+width+':'+posX+':'+posY);
		
		document.getElementById(drawrectid).style.left 					= posX-chX+"px";    //changestartsize42
		document.getElementById(drawrectid).style.top  					= posY-chY+"px"; //changestartsize42
		document.getElementById(drawrectid).style.width 				= width+"px";
		document.getElementById(drawrectid).style.height 				= height+"px";
		//document.getElementById(drawrectid).setAttribute("points", temp_p1X+":"+temp_p1Y+":"+temp_p2X+":"+temp_p2Y, 0);
	};
};


var pDrawFoc = new pDrawFoc_typ();
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
#       Filename......................: pDrawInit.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var pDrawInit_typ = function pDrawInit_typ(){
    
	this.fileList;
	this.files = new Array(); //Struktur: files[fileID][contentID] = content;
	this.users;
    
    this.mousemove = function(){
        var Ereignis = window.event;
        pDrawFoc.move(Ereignis);
    };
    
    this.mouseup = function(){
    	Ereignis = window.event;
    };
    
    this.reset = function(){
        this.fileList = "";
	    this.files = new Array();
	    this.users = "";
    }
        
    this.delete_UI = function(id){
        data.files[L3.file].splice(id, 1);
        L3.delete(id);
    }
        
    this.delete_sync = function(id){
        data.files[L3.file].splice(id, 1);
        textbox.removeElement("editarea"+id);
    }
    
};

var pDrawInit = new pDrawInit_typ();
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
#       Filename......................: rich_edit.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var rich_typ = function rich_typ (){

	this.fontchangetimer;
	this.dropdownA = 0;
	this.dropdownB = 0;
	this.sizechangetimer;
	this.showtitles = 0;
	this.showtitletimer;
	this.unshowtitletimer;

	this.fontEdit = function(x,y){
		document.execCommand(x,"",y);
		document.STOP_EXEC_COMMAND = true; 
		//checkedit(aktiveid);
	};

	this.fontchangepos = function(){
		var widthOff = document.getElementById('fontchangeButton').offsetWidth;
		var leftOff  = document.getElementById('fontchangeButton').offsetLeft;
		var posOff = leftOff+(widthOff/2)-55+global.chX;
		document.getElementById('fontchange').style.left = posOff;
	};

	this.fontchange = function(s){
	if(s==1){
		document.getElementById('fontchange').style.height = "";
		document.getElementById('fontchange').style.zIndex = 15;
		document.getElementById('fontchangeButton').className = "editlidown";
		clearTimeout(rich.fontchangetimer);
		rich.unshowtitlenow();
		rich.fontchangepos();
		rich.dropdownA=1;
		}
	if(s==0){
		document.getElementById('fontchange').style.height = "0px";
		document.getElementById('fontchangeButton').className = "editli";
		document.getElementById('fontchange').style.zIndex = 7;
		rich.dropdownA=0;
		}
	};
	
	this.fontchangehide = function(){
		rich.fontchangetimer = setTimeout("rich.fontchange(0);", 10);
	};

	this.sizechangepos = function(){
		var widthOff = document.getElementById('sizechangeButton').offsetWidth;
		var leftOff  = document.getElementById('sizechangeButton').offsetLeft;
		var posOff = leftOff+(widthOff/2)-55+global.chX;
		document.getElementById('sizechange').style.left = posOff;
	};

	this.sizechange = function(s){
	if(s==1){
		document.getElementById('sizechange').style.height = "";
		document.getElementById('sizechange').style.zIndex = 15;
		document.getElementById('sizechangeButton').className = "editlidown";
		clearTimeout(rich.sizechangetimer);
		//rich.unshowtitlenow(); #WET#
		rich.sizechangepos();
		rich.dropdownB=1;
		}
	if(s==0){
		document.getElementById('sizechange').style.height = "0px";
		document.getElementById('sizechangeButton').className = "editli";
		document.getElementById('sizechange').style.zIndex = 7;
		rich.dropdownB=0;
		}
	};
	
	this.sizechangehide = function(){
		rich.sizechangetimer = setTimeout("rich.sizechange(0);", 10);
	};
	
	this.donthide = function(id){
	if(id=="fontchangeButton" && rich.dropdownB==1){
		clearTimeout(rich.fontchangetimer);
		rich.fontchange(1);
		}
	if(id=="sizechangeButton" && rich.dropdownA==1){
		rich.sizechange(1);
		clearTimeout(rich.sizechangetimer);
		}
	};
	
	this.dohide = function(){
		rich.fontchangetimer = setTimeout("rich.fontchange(0);", 10);
		rich.sizechangetimer = setTimeout("rich.sizechange(0);", 10);
	};

	this.showtitle = function(width, yPos, title){
		clearTimeout(rich.unshowtitletimer);
		if(rich.showtitles==1){
			rich.showtitlenow(width, yPos, title);
		} else {
			clearTimeout(rich.showtitletimer);
			rich.showtitletimer = setTimeout("rich.showtitlenow("+width+", "+yPos+", '"+title+"');", 500);
		}
	};
	this.unshowtitle = function(){
		clearTimeout(rich.unshowtitletimer);
		rich.unshowtitletimer = setTimeout("rich.unshowtitlenow();", 100);
	};
	
	this.showtitlenow = function(width, yPos, title){
		rich.showtitles=1;
		document.getElementById('showtitle').innerHTML = "<div class='titleeck' id='titleeck'></div>"+title;
		var titlewidth = document.getElementById('showtitle').offsetWidth;
		
		var titlepos = ((width/2)-(titlewidth/2))+yPos+1+global.chX;
		
		if(titlepos<global.chX){
			document.getElementById('titleeck').style.marginLeft = titlepos-5-global.chX;
			titlepos=global.chX;
			}
		documentoffset = document.getElementById('body').offsetWidth;
		if(titlepos>documentoffset-titlewidth){
			document.getElementById('titleeck').style.marginLeft = ((documentoffset-titlewidth-titlepos)*(-1))-5;
			titlepos=documentoffset-titlewidth;
			}
		
		document.getElementById('showtitle').style.left = titlepos+"px";
	}
	
	this.unshowtitlenow= function(){
		clearTimeout(rich.showtitletimer);
		document.getElementById('showtitle').style.left = "-200px";
		rich.showtitles=0;
	}
    
    this.win = null;
    
    this.printTest = function(){
        printContent = document.getElementById('notecon').innerHTML;
    };
};

var rich = new rich_typ();
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
#       Filename......................: SimpleWebSocket.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var SimplebSocket = function(url)
{
	var callbacks = {};
	var conn;

	this.bind = function(eventName, callback){
		callbacks[eventName] = callbacks[eventName] || [];
		callbacks[eventName].push(callback);
		return this;
	};

	this.send = function(event_name, event_data){
		this.conn.send( event_data );
		return this;
	};

	this.connect = function() {
		if ( typeof(MozWebSocket) == 'function' )
			this.conn = new MozWebSocket(url);
		else
			this.conn = new WebSocket(url);
		this.conn.onmessage = function(evt){
			dispatch('message', evt.data);
		};
		this.conn.onclose = function(){dispatch('close',null)}
		this.conn.onopen = function(){dispatch('open',null)}
	};

	this.disconnect = function() {
		this.conn.close();
	};

	var dispatch = function(eventName, message){
		var chain = callbacks[eventName];
		if(typeof chain == 'undefined') return;
		for(var i = 0; i < chain.length; i++){
			chain[i]( message )
		}
	}
};
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
#       Filename......................: static_items.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var staticItems_typ = function staticItems_typ(){
    
    this.setid = function(id, content){
        if(document.getElementById(id)){
            document.getElementById(id).innerHTML = content; //TODO: Tryes to call ID 1031111110
        } else {
            error.report(3, "ID: "+id+" Content: "+content);
        }
    };

    this.saveid = function(id){
        if(document.getElementById(id)){
            var content = document.getElementById(id).innerHTML;
            data.files[L3.file][id] = content;
            data.edited_UI(id);
        } else {
            error.report(3, "ID: "+id+" Content: "+content);
        }
    };

};


var staticItems = new staticItems_typ();



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
#       Filename......................: syncUIconnect.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


function set_id(){
    
}

function kill_contentbyid(){
    
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
#       Filename......................: sync_L3.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/



var L3_typ = function L3_typ(){
    
    this.file = false;
    this.beforeEvent = "loadFirst";
    this.loadedFile = false;
	
    this.init = function(){
        //Random generierter Username 
        if(!this.clientName) {
        this.clientName = (Math.random()*100000000000000000);
	    this.clientName = this.clientName.toString();
	    this.clientName = this.clientName.substring(0, 5);
        }
        //return this.clientName;
        
        L2.send(sID.clientName, this.clientName);
        
        //L2.send(sID.getServer, String(sID.fileList));
        
    };
    
    this.recieve = function(id, data){
        this.aID = String(id);
        this.idType = parseInt(this.aID.substr(0, 1));
        
        if(this.aID.length!=10) {
            
          error.report(2, id);
         return false;   
        }
        
        switch(this.idType){
          case 1:
                L3.saveContent(id, data);
                break;
          case 2:
                L3.saveData(id, data);
                if(id==sID.fileList){globalEvent.onConnect();}
                break;
          default:
                error.report(2, id);
                break;
        }
    };
    
    this.saveContent = function(id, daten){
        //if(!check.id(300, this.file)){
        //    error.report(2, this.file);
        //    return false;
        //}
        //console.log(id);
        //console.log(daten);
        //console.log(L3.file);
        data.files[L3.file][id] = daten;
        
        data.edited_sync(this.file, id);
        
        };
    
    this.saveData = function(id, daten){
        //if(!check.id(300, this.file)){
        //    error.report(2, this.file);
        //    return false;
        //}
        id = ""+id+"";

        switch(id){
            case sID.fileList:
                data.fileList = daten;
                testDir = daten;
                switch(this.beforeEvent){
                        case "loadFirst":
                            lastDir = data.login.userID;
                            mainDir = data.login.userID;
                            showDir(mainDir);
                            refreshShow();
                            uiControl.loadHandlerFin();
                            uiControl.view('files');
                            this.beforeEvent = "";
                        break;
                        case "addFile":
                            refreshShow();
                            uiControl.loadHandlerFin();
                            uiControl.view('files');
                            this.beforeEvent = "";
                        break;
                        case "refresh":
                            refreshShow();
                            uiControl.loadHandlerFin();
                            uiControl.view('files');
                        break;
                        case "":
                            refreshShow();
                        break;
                }
                break;
            
            case sID.userList:
                data.users = daten;
                break;
                
            case sID.deleteID:
                data.delete_sync(daten);
                break;

            case sID.message:
                alert(daten);
                break;

            case sID.Login:
                data.login = JSON.parse(daten);
                if(data.login.userRight < 5){
                    uiControl.loginGood();
                } else {
                    uiControl.loginBad();
                }
                break;

            case sID.legitimationID:
                data.legitimationID = daten;
                break;
                
            case sID.updated:
                if(this.loadedFile){
                    uiControl.loadHandlerFin();
                    uiControl.view('editor');
                    this.loadedFile = false;
                }
                break;
                
            case sID.fileunloadtrue:
                if(uiControl.switchfilebool){
                    uiControl.switchfilebool = false;
		            uiControl.resetUI();
                    uiControl.view('editor');
                    L3.loadFile(uiControl.switchfile);
                } else {
                    if(uiControl.unloadfile){
                        uiControl.unloadfile = false;
                        L3.file = "0000000000";
		                uiControl.view('files');
		                uiControl.resetUI();
                    } else {
                        L3.file = "0000000000";
                    }
                }
                break;
                
            default:
                error.report(2, id);
                return false;
                break;
        }
        
        
        data.edited_sync(this.file, id);
        
        };
    
    this.loadFile = function(id){
        L3.file = id;
        if(!data.files[id]) {
            data.files[id] =  { };
        } else {
            for(key in data.files[id]){
                data.edited_sync(id, key);
            }
        }
        uiControl.loadHandler();
        this.loadedFile = true;
        L2.send(sID.file, id);  
    };

    this.unloadFile = function(id){
        L2.send(sID.unloadFile, '');  
    };
    
    this.send = function(id){
        L2.send(id, data.files[this.file][id]);
    };

    this.login = function(obj){
        L2.send(sID.Login, JSON.stringify(obj));
    }
    
    this.delete = function (id){
        L2.send(sID.deleteID, id);
    };

    this.addFile = function(name, dir, type){
        var temp = new Object();
        temp.name = name;
        temp.dir = dir;
        temp.type = type;
        this.beforeEvent = "addFile";
        uiControl.loadHandler();
        L2.send(sID.addFile, JSON.stringify(temp));
    }
    
    this.refreshDir = function(){
        this.beforeEvent = "refresh";
        uiControl.loadHandler();
        L2.send(sID.getServer, sID.fileList);
    };
    
     this.reset = function(){
         data.reset();
         this.file = false;
         if(data.login){
             if(data.login.userRight){
                if(data.login.userRight < 5){
                    uiControl.view('load');
                    setTimeout("location.reload();", 5000);
                }
             }
         }
     };
        
    };
    
   
var L3 = new L3_typ();
    

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
#       Filename......................: tabHandler.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var tab_typ = function tab_typ(){

    this.fileTabs = true;
    this.tabArray = new Array();
    this.tabArrayHTML = new Array();
    this.active;
    this.showElemNum = 7;
    
    this.fileOpened = function(oFile){
        var oFile = oFile.toString();
        var temp = this.tabArray.indexOf(oFile);
        this.active = oFile;
        //console.log("=> "+oFile+" <=> "+temp);
        if(temp === -1){
            this.tabArray.unshift(oFile);
        }
        if(this.tabArray[this.showElemNum]){this.tabArray.splice(this.showElemNum,1);}
        this.generate();
    }
    
    this.add = function(temp){
        this.tabArray.unshift(temp);
        if(this.tabArray[5]){this.tabArray.splice(5,1);}
        this.generate();
    }
    
    this.generate = function(){
        var out = "";
        var numb = 0;
        while(numb < this.showElemNum){
            if(this.tabArray[numb]){
                var add = "";
                if(this.active == this.tabArray[numb]){add = 'id="TabActive" ';}
                var temp = "'TabActive'";
                var tempId = "'"+this.tabArray[numb]+"'";
                var fullDirArray = testDir.split(":");
                var tempName = getFileName(fullDirArray, this.tabArray[numb]);
                out += '<li '+add+'onclick="tab.deactivateTab(); uiControl.loadOtherFile('+tempId+'); this.id = '+temp+';">'+tempName+'</li>';
            }
            numb++;
        }
        document.getElementById('tabsUL').innerHTML = out;
    }
    
    this.html = function(name, active){
        var temp = "'TabActive'";
        if(active){
            return '<li id="TabActive" onclick="tab.deactivateTab(); this.id = '+temp+';">'+name+'</li>';
        } else {
            return '<li onclick="tab.deactivateTab(); this.id = '+temp+';">'+name+'</li>';
        }
    }
    
    this.deactivateTab = function(){
        if(document.getElementById('TabActive')){
            document.getElementById('TabActive').id = "";
        }
    }
}
    
var tab = new tab_typ();
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
#       Filename......................: testscripts.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


function stateupdate(){
	var text;
	switch(L1.state){
	case 0:
		text = "Offline";
		document.getElementById('state').style.color = "#ff0000";
		break;
	case 1:
		text = "Verbindung wird hergestellt";
		document.getElementById('state').style.color = "#FFBF00";
		break;
	case 2:
		text = "Online";
		document.getElementById('state').style.color = "#04B404";
		break;
	default:
		text = "Fehler!";
		document.getElementById('state').style.color = "#ff0000";
		break;
	}
	document.getElementById('state').innerHTML = text;
}

function newmsg(msg){
	document.getElementById('msg').innerHTML = msg;
}

var intervall; 
var count3=0;
    
function startTest(){
    intervall = window.setInterval("sendTest();", 0);
}

function sendTest(){
    tee = count3;
    L2.send(1001234911, 'Hallo ich bin nicht '+tee+' wirklich Toll');
    count3++;
}

function stopTest(){
    window.clearInterval(intervall);
}

function onmousemove(){
    alert(1);
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
#       Filename......................: uiControl.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var uiControl_typ = function global_typ(){
    
    this.loadwait;
    this.loadtimeout = 100;
    this.switchfilebool = false;
    this.switchfile = "";
    this.unloadfile = false;
    
	this.loadFile = function(id){
        tab.fileOpened(id);
		L3.loadFile(id);
		this.view('editor');
	}

	this.unloadFile = function(){
		L3.unloadFile(L3.file);
        this.unloadfile = true;
	}

	this.loadOtherFile = function(id){
        this.switchfilebool = true;
        tab.fileOpened(id);
        this.switchfile = id;
		L3.unloadFile(L3.file);
	}

	this.resetUI = function(){
		//document.getElementById("notecon").innerHMTL = global.notecon;
		document.getElementById("notecon").innerHTML = "";
		document.getElementById("notecon").innerHTML = global.notecon;
	}

	this.login = function (){
		var loginObject = new Object();

		loginObject.userName     = document.getElementById('loginUsername').value;
		loginObject.userPassword = document.getElementById('loginPassword').value;
		loginObject.legitimationID = data.legitimationID;

		data.loginObject = loginObject;
        uiControl.loadHandler();
		L3.login(loginObject);
		return false;
	};

	this.loginGood = function (){
		this.view('load');
		L2.send(sID.getServer, sID.fileList);
	};

	this.loginBad = function (){
		alert("Bad Login");
		this.view('start');
	};
    
    this.addFile = function(name, type){
        //this.view("load");
        L3.addFile(name, lastDir, type);
    };
    
    this.loadHandler = function(){
        this.loadwait = setTimeout("uiControl.view('load');", this.loadtimeout);
    };
    
    this.loadHandlerFin = function(){
        clearTimeout(this.loadwait);
    };

	this.view = function (code){
		switch (code) {
	        case "start":
				document.getElementById('noteconBackground').style.display = "none";
				document.getElementById('loginHTML').style.display = "";
				document.getElementById('pleasewait').style.display = "none";
				document.getElementById('fileTabs').style.height = "50px";
                document.title = "pragm note";
				break;
	        case "files":
				document.getElementById('noteconBackground').style.display = "";
				document.getElementById('loginHTML').style.display = "none";
				document.getElementById('pleasewait').style.display = "none";
				document.getElementById('fileTabs').style.height = "50px";
                document.title = "pragm note";
				break;
	        case "editor":
				document.getElementById('loginHTML').style.display = "none";
				document.getElementById('noteconBackground').style.display = "none";
				document.getElementById('pleasewait').style.display = "none";
				document.getElementById('fileTabs').style.height = "";
                document.title = getFileName(testDir.split(":"), L3.file);
	            break;
	        case "load":
				//document.getElementById('loginHTML').style.display = "none";
				//document.getElementById('noteconBackground').style.display = "none";
				document.getElementById('pleasewait').style.display = "";
				//document.getElementById('fileTabs').style.height = "50px";
                document.title = "pragm note - please wait";
	            break;
	        default:
	            console.log("command '"+code+"' does not exist");
	            break;
	    }
	};
};

var uiControl = new uiControl_typ();

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
#       Filename......................: websocketcontrol_L1.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var oTime = 1;

var L1_typ = function L1_typ(){
	
	this.Server;
	this.state;// test
	
	this.send = function(text) {
		this.Server.send('message',text);
        
        aTime = new Date().getTime();
        nTime = parseInt(aTime) - parseInt(global.time);
        //console.log("TIME: "+nTime);
		};
 
	this.onload = function() {
		L1.state = 1;
        this.countErrors = 0;
		//update_websocketstate();  //Test UI
		globalEvent.state(2);
        var address = global.get_websocket_server_address();
		this.Server = new SimplebSocket(address);
		this.Server.bind('open', function() {
            console.log("open");
			L1.state = 2;
            var L2 = new L2_typ();
            L2.init();
            globalEvent.state(1);
            if(global.firstConnect){
                uiControl.view('start');
                global.firstConnect = false;
            }
			//update_websocketstate();  //Test UI
			});
	 
		this.Server.bind('close', function( data ) {
			L1.state = 0;
			//update_websocketstate();  //Test UI
			globalEvent.state(2);
			this.Server = false;
			L2.reset();
            this.countErrors++;
			if(global.retry_when_disconnected){
                if(this.countErrors<global.websocket_slow_down){
				    L1.onload();
                } else {
                    setTimeout("L1.onload();", global.websocket_slow_time);
                }
				}
			});
	 
		this.Server.bind('message', function( msg ) {
            //console.log(msg);
			L2.recieve(msg);
			//newmsg(msg); //Test UI
			});
	     
		this.Server.connect();
		};
	
};

var L1 = new L1_typ();

		
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
#       Filename......................: yObjects.js
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
//var hash = new hash_typ();
//var pDrawInit = new pDrawInit_typ();
//var pDrawFoc = new pDrawFoc_typ();


function recreateObjects(){
    var L1 = new L1_typ();
    var L2 = new L2_typ();
    var L3 = new L3_typ();
}



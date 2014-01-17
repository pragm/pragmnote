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

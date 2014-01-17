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

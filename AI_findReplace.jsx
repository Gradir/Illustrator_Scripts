var scope = app.activeDocument.selection.length ? app.activeDocument.selection : app.activeDocument.pageItems;

var find = prompt("Find: (Text or GREP/regex)","");
if(find !== null){

    var replace = prompt("Replace: (Text or GREP/regex)","");
    if(replace !== null){

        var changes = 0;

        for(var i=0;i<scope.length;i++){  

            var text = scope[i];

            var string = text.contents;  
            if(typeof string == "string"){
                var newstring = string.replace( new RegExp(find, 'g'), replace);
                if (newstring != string) {
                    changes++;
                    var paragraphsArray = newstring.split("\n");
                    text.paragraphs.removeAll(); 
                    for(var ii=0;ii<paragraphsArray.length;ii++){  
                         text.paragraphs.add(paragraphsArray[ii]);
                    }
                }
            }
        }
        alert( changes==1 ? "1 text object changed" : changes + " text objects changed");
    }
}
var doc = activeDocument;
var selx = doc.selection;
if(selx.length ==0){alert("You must select objects");}
else{replace(selx);}

function replace(sel)
{
	var active_doc = app.activeDocument;
    var search_string = String(prompt("Replace with", "XXX"));
    var replace_string = String(prompt("Replace with", "YYY"));

	if (sel.length > 0)
	{
		for (var i = 0 ; i < sel.length; i++)
		{
			var this_text_frame = sel[i];
			if ( this_text_frame.typename == "TextFrame" )
			{
				var new_string = this_text_frame.contents.replace(search_string, replace_string);
				if (new_string != this_text_frame.contents)
				{
					this_text_frame.contents = new_string;
				}
			}
		}
	}
}
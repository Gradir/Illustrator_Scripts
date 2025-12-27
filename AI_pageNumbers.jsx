#target illustrator
// Modified by - Rakibul Yeasin

if (app.documents.length > 0) {
	// continue if there's at leat one document open
	// start building User Interface
	var win = new Window("dialog", "Insert Page Numbers");
	var panelMargins = win.add("panel", undefined, "Margins");
	var lblMargins = panelMargins.add("statictext", undefined, "How far from the edge:");
	var txtMargins = panelMargins.add("edittext", undefined, 0.25); 
	var lblUnits = panelMargins.add("statictext", undefined, "inches");

	var panelLocation = win.add("panel", undefined, "Location");
	var radTop = panelLocation.add("radiobutton", undefined, "Top");
	var radBottom = panelLocation.add("radiobutton", undefined, "Bottom"); 

	var panelAlignment = win.add("panel", undefined, "Alignment");
	var radLeft = panelAlignment.add("radiobutton" ,undefined, "Left");
	var radCenter = panelAlignment.add("radiobutton",undefined, "Center"); 
	var radRight = panelAlignment.add("radiobutton",undefined, "Right");
	var radLeftRight = panelAlignment.add("radiobutton",undefined, "Left - Right"); // Adds Left and Right

	var countFrom = win.add("panel", undefined, "Start Count From");
	var txtCounter = countFrom.add("edittext"); //,undefined, "[Type text to insert here]"); 
	txtCounter.size = [300,16]

	var panelFooter = win.add("panel", undefined, "Text to Insert");

	var grpPages = panelFooter.add("group");
	var btnPage = grpPages.add("button", undefined, "P");
	var btnPages = grpPages.add("button", undefined, "Ps");
	var btnDate = grpPages.add("button", undefined, "D");
	var btnTime = grpPages.add("button", undefined, "T");
	var btnFullName = grpPages.add("button", undefined, "fFn");
	var btnFile = grpPages.add("button", undefined, "Fn");

	var txtFooter = panelFooter.add("edittext"); //,undefined, "[Type text to insert here]"); 
	var btnClear = panelFooter.add("button", undefined, "Clear");
	btnPage.size = btnPages.size = btnDate.size = btnTime.size = btnFullName.size = btnFile.size = [30,21];
	btnClear.size = [45, 21];

	var btnOk = win.add("button", undefined, "Ok");

	radRight.value = radBottom.value = true;

	win.alignChildren = panelFooter.alignChildren = "fill";
	btnClear.alignment = "left";
	panelMargins.spacing = 5;
	panelMargins.orientation = panelLocation.orientation = panelAlignment.orientation = "row";
	
	win.helpTip = "Coded by - Rakibul Yeasin";
	btnPage.helpTip = "Adds *page* keyword, it represents a single page";
	btnPages.helpTip = "Adds *pages* keyword, it represents total number of pages";
	btnDate.helpTip = "Adds *date* keyword, it represents today's date";
	btnTime.helpTip = "Adds *time* keyword, it represents current time";
	btnFullName.helpTip = "Adds *fname* keyword, it represents Full File Name (including path)";
	btnFile.helpTip = "Adds *file* keyword, it represents File Name";
	btnClear.helpTip = "Clears input text area";
	txtFooter.helpTip = "Type \r\t'Page *page* of *pages*' \rto get \r\t'Page 1 of 3' \rfor example";
	txtCounter.helpTip = "Type page number to start from";


	//-----------------------------------------------------------------------------------------
	// text place holder by Jongware / Marc Autret
	var wgx = win.graphics;
	var grayPen = wgx.newPen(wgx.PenType.SOLID_COLOR,[.67,.67,.67], 1);

	txtCounter.onDraw = function(/*DrawState*/) {
		var gx = this.graphics;
		gx.drawOSControl();
		this.text || this.active || gx.drawString("[Type page number to start from]", grayPen, 0, 0);
	};	

	txtFooter.onDraw = function(/*DrawState*/) {
		var gx = this.graphics;
		gx.drawOSControl();
		this.text || this.active || gx.drawString("[Type text to insert here]", grayPen, 0, 0);
	};		
	
	//-----------------------------------------------------------------------------------------
	btnOk.onClick = function(){
		doSomething(); // call main function
		//win.close(); // close when done
		}
	//-----------------------------------------------------------------------------------------

	//-----------------------------------------------------------------------------------------
	btnClear.onClick = function(){
		txtFooter.text = ""; // call main function
		// win.close(); // close when done
		}
	//-----------------------------------------------------------------------------------------		
	//-----------------------------------------------------------------------------------------
	btnPage.onClick = function(){
		footer("*page*");
		}
	//-----------------------------------------------------------------------------------------
	//-----------------------------------------------------------------------------------------
	btnPages.onClick = function(){
		footer("*pages*");
		}
	//-----------------------------------------------------------------------------------------
	//-----------------------------------------------------------------------------------------
	btnDate.onClick = function(){
		footer("*date*");
		}
	//-----------------------------------------------------------------------------------------
	//-----------------------------------------------------------------------------------------
	btnTime.onClick = function(){
		footer("*time*");
		}
	//-----------------------------------------------------------------------------------------
	//-----------------------------------------------------------------------------------------
	btnFullName.onClick = function(){
		footer("*fname*");
		}
	//-----------------------------------------------------------------------------------------
	//-----------------------------------------------------------------------------------------
	btnFile.onClick = function(){
		footer("*file*");
		}
	//-----------------------------------------------------------------------------------------
	win.center();
	win.show();

	//-----------------------------------------------------------------------------------------


	function footer (page) {
		txtFooter.text = txtFooter.text + page;
	}

	function doSomething() {
		//alert("I'm doing something");
		var idoc = app.activeDocument;
		try {
			var ilayer = idoc.layers["Page Numbers"];
		} catch(e) {
			var ilayer = idoc.layers.add();
			ilayer.name = "Page Numbers";
		}

		var pages = idoc.artboards.length; // number of artboards
		var datee = getdate ();
		var timee = gettime ();
		var fname = idoc.path == '' ? "Full Name: <unsaved document>" : idoc.fullName;
		var file = idoc.name;
		
		var footerPages = (txtFooter.text).replace("*pages*",pages);
		//$.writeln(msg);
		footerPages = footerPages.replace("*pages*",pages); // replace the "*pages*" keyword with the actual number fo pages (artboards)
		footerPages = footerPages.replace("*date*",datee);
		footerPages = footerPages.replace("*time*",timee);
		footerPages = footerPages.replace("*fname*",fname);
		footerPages = footerPages.replace("*file*",file);
		
		var margins = Number(txtMargins.text)*72; // get margins in points
		//$.writeln(margins);
		
		var start = 0;
		for (i = 0; i<idoc.artboards.length; i++) {
			// loop through all artboards, and add input text from UI
			if (txtCounter.text != "") {
				start = i + parseInt(txtCounter.text);
				footerPage = footerPages.replace("*page*", start); // replace "*page*" keyword with the actual page Number
			} else {
				start = i + 1;
				footerPage = footerPages.replace("*page*", start); // replace "*page*" keyword with the actual page Number
			}
			
			var itext = ilayer.textFrames.add();
			itext.contents = footerPage; //"page 1 of 1";				
			var fontSize = itext.textRange.characterAttributes.size;
			
			var activeAB = idoc.artboards[i];

			var iartBounds = activeAB.artboardRect;
			
			var ableft = iartBounds[0]+margins;
			var abtop = iartBounds[1]-margins;
			var abright = iartBounds[2]-margins;
			var abbottom = iartBounds[3]+margins+fontSize;
			
			var abcenter = ableft+(abright-ableft)/2;
	
			if (radRight.value == true) {
				// var msg = "right";
				itext.left = abright;
				itext.textRange.paragraphAttributes.justification = Justification.RIGHT;
			}
			else if (radCenter.value == true) {
				// var msg = "center";
				itext.left = abcenter;
				itext.textRange.paragraphAttributes.justification = Justification.CENTER;
			}
			else if (radLeftRight.value == true) {
				// var msg = "LeftRigh";
				if (start % 2 == 1) {
					itext.left = abright;
					itext.textRange.paragraphAttributes.justification = Justification.RIGHT;
				} else {
					itext.left = ableft;
					itext.textRange.paragraphAttributes.justification = Justification.LEFT;
				}
			}
			else {
				// var msg = "Left";
				itext.left = ableft;
				itext.textRange.paragraphAttributes.justification = Justification.LEFT;
			}

			if (radTop.value == true) {
				// var msg = "top";
				itext.top = abtop;
			}
			else {
				// var msg = "bottom";
				itext.top = abbottom;
			}
		} // end for loop thru all artboards
		app.redraw();
	} // end function doSomething();
} else {
	alert ("there's no open documents");
}

function getdate() {
	var date = new(Date);
	var m = date.getMonth()+1;
	var d = date.getDate();
	var y = date.getFullYear();
	var datemdy = m+"/"+d+"/"+y;
	//alert(date);
	//alert(m+"/"+d+"/"+y);
	return datemdy;
}

function gettime() {
	var time = new(Date);
	var hours = time.getHours();
	var minutes = time.getMinutes();
	if (minutes < 10){
		minutes = "0" + minutes
	}

	if(hours > 11) {
		ampm = "PM";
	} else {
		ampm = "AM";
	}	
	var curtime = hours + ":" + minutes + " " + ampm;
	return curtime;
}
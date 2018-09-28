"use strict";

function formatString(text){
	
	var newString = text.replace(/,/g, "<br/>");
	return newString;
}

function createNewCanvas(index,text){
	var canvasId = "qrcode-canvas-"+index;
	var canvasDiv = document.createElement("div");
	canvasDiv.setAttribute("class","canvas-wrapper");

	var textDiv = document.createElement("div");	

	var canvas = document.createElement("canvas");
	canvas.setAttribute("id",canvasId);
	canvas.setAttribute("class","qr-canvas");
	canvasDiv.appendChild(canvas);
	canvasDiv.appendChild(textDiv);
	var allCodes = document.getElementById("all-codes");
	allCodes.appendChild(canvasDiv);
	textDiv.innerHTML = formatString(text);
	
	redrawQrCode(document.getElementById(canvasId),text);
}

function generateQR(){

	document.getElementById("all-codes").innerHTML = "";
	var text = document.getElementById("text-input").value;
	var names = text.split("\n");

	for(var i=0;i<names.length;i++){
		if(names[i]!="")
			createNewCanvas(i,names[i]);
	}
}

function redrawQrCode(canvas,text) {

	canvas.style.display = "none";

	var ecl = qrcodegen.QrCode.Ecc.MEDIUM;
	
	var segs = qrcodegen.QrSegment.makeSegments(text);
	var minVer = 1;
	var maxVer = 40;
	var mask = -1;
	var boostEcc = true;
	var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
	
	// Draw image output
	var border = 0;
	if (border < 0 || border > 100)
		return;

		var scale = 8;
		if (scale <= 0 || scale > 30)
			return;
		qr.drawCanvas(scale, border, canvas);
		canvas.style.removeProperty("display");
}
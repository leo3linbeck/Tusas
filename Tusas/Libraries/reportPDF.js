﻿include('Libraries/jspdf.js');L3 = L3 || {};L3._ = require(getFolder('path') + 'Libraries/underscore.js');L3.SERVER_URL = require(getFolder('path') + 'APIKeys/server.url').get_server_url();L3.SERVER_URL;L3.generatePDFFileAndURL = function generatePDFFileAndURL(dataStoreArray) {		var pdfPageParams = {		orient: 'portrait',		unit: 'in',		format: 'letter',		fontName: 'courier',		margin: {			top: 0.5,			left: 0.5,			bottom: 0.5,			right: 0.5		},		charsPerLine: 100,		linesPerPage: 52,		header: {			xStart: 0,			yStart: 0,			title: {				fontStyle: 'bold',				fontSize: 18			},			indent: 1.8,			fontStyle: 'normal',			fontSize: 14,			lineHeight: 0.25,			breakLine: {				x1: 0.5,				x2: 8.0,				y: 1.0,				yGap: 0.03,				thickness: 1/500			}		},				entity: {			xStart: 0,			yStart: 0.5,			fontStyle: 'normal',			fontSize: 9,			lineHeight: 0.17,			breakLine: {				x1: 0.5,				x2: 8.0,				yGap: 0.05,				thickness: 1/500			}		},					footer: {			xStart: 0.0,			yStart: 10.0,			xDateTime: 3.1,			xPage: 5.55,			fontStyle: 'normal',			fontSize: 12,			breakLine: {				x1: 0.5,				x2: 8.0,				y: 10.1,				yGap: 0.03,				thickness: 1/500			}		},				box: {			x: 10,			y: 58,			h: 220,			w: 190,			thickness: 2		}		}	function addHeaderToPage(doc, dStore, param, page) {		var h = pdfPageParams.header;		var x = h.xStart + pdfPageParams.margin.left;		var y = h.yStart + pdfPageParams.margin.top;		var subtitle = 'Entities: ' + (param.lineBreak[page] + 1) + '-' + param.lineBreak[page+1] + ' out of ' + dStore.length + ', Number of Attributes: ' + param.numberOfAttributes;				doc.setFontStyle(h.title.fontStyle)			.setFontSize(parseInt(h.title.fontSize))			.text(dStore.getDataClass().getName(), x, y)			.setFontStyle(h.fontStyle)			.setFontSize(h.fontSize)			.text(subtitle, x, y += 1.5 * h.lineHeight)			.setLineWidth(h.breakLine.thickness)			.line(h.breakLine.x1, h.breakLine.y, h.breakLine.x2, h.breakLine.y)			.line(h.breakLine.x1, h.breakLine.y + h.breakLine.yGap, h.breakLine.x2, h.breakLine.y + h.breakLine.yGap);	}	function addFooterToPage(doc, page, maxPages) {		var f = pdfPageParams.footer;		var b = pdfPageParams.box;		var x = f.xStart + pdfPageParams.margin.left;		var y = f.yStart + pdfPageParams.margin.top;				doc.setFontStyle(f.fontStyle)			.line(f.breakLine.x1, f.breakLine.y, f.breakLine.x2, f.breakLine.y)			.line(f.breakLine.x1, f.breakLine.y + f.breakLine.yGap, f.breakLine.x2, f.breakLine.y + f.breakLine.yGap)			.setFontSize(f.fontSize)			.text('(c) 2013 YOUR COMPANY HERE', x, y)			.text((new Date).toDateString(), x + f.xDateTime, y)			.text('Page ' + page + ' of ' + maxPages, x + f.xPage, y)			.rect(b.x, b.y, b.w, b.h);	}	function addDataSourceToPDF(doc, dStore, param) {		var e = pdfPageParams.entity;		var i, j, k;		var numPages = param.lineBreak.length - 1;		var x = e.xStart + pdfPageParams.margin.left;		var y = e.yStart + pdfPageParams.margin.top;					for (i = 0; i < numPages; i += 1) {			if (i !== 0) {				doc.addPage();				y = e.yStart + pdfPageParams.margin.top;			}			addHeaderToPage(doc, dStore, param, i);			doc.setFontStyle(e.fontStyle)				.setFontSize(e.fontSize);			for (j = param.lineBreak[i]; j < param.lineBreak[i+1]; j += 1) {				for (k = 0; k < param.text[j].length; k += 1) {					doc.text(param.text[j][k], x, y += e.lineHeight);				}				doc.setLineWidth(e.breakLine.thickness)					.line(e.breakLine.x1, y + e.breakLine.yGap, e.breakLine.x2, y + e.breakLine.yGap);			}			addFooterToPage(doc, i + 1, numPages);		}	}	function paginateParam(param) {		var lineCount = 0;				param.lineBreak = [0];		param.text.forEach(function(x, i) {			lineCount += x.length;			if(lineCount > pdfPageParams.linesPerPage) {				param.lineBreak.push(i);				lineCount = x.length;			}		});				param.numberOfPages = param.lineBreak.length;		param.lineBreak.push(param.text.length);	}	function analyzeDataSource (dStore) {		var maxChars = pdfPageParams.charsPerLine;		var param = {};		var t = [];		var s = L3._.filter(dStore.getDataClass().attributes, function(o) { return (o.kind === 'storage' || o.kind === 'calculated')} );		var a = L3._.pluck(s, 'name');		param.numberOfAttributes = a.length;						dStore.forEach(function(e) {			var x = ''			var z = [];			a.forEach(function(w, i) {				var p = w + ': ' + e[w];				if ((x.length + p.length) <= (maxChars - 2)) {					x += '\t\t' + p;				}				else {					z.push(x);					x = p;				}			});			z.push(x);			t.push(z);		});				param.text = t;		paginateParam(param);				return param;	}	function generatePDF(dataStoreArray) {		var doc = new jsPDF(pdfPageParams.orient, pdfPageParams.unit, pdfPageParams.format);				doc.setFont(pdfPageParams.fontName);				dataStoreArray.length = 2;		dataStoreArray.forEach(			function(d, i) {				var params = analyzeDataSource(d);								if (i !== 0) {					doc.addPage();				}				addDataSourceToPDF(doc, d, params);			}		);				return doc.output();	}	var f, hash, pdfText, ts;		if (typeof dataStoreArray === 'undefined') {		dataStoreArray = [];		L3._.keys(ds.dataClasses).fprEach(function(d) {			dataStoreArray.push(ds[d].all());		});	}		pdfText = generatePDF(dataStoreArray);		hash = generateUUID();		f = File(getFolder('path') + 'WebFolder/PDF/' + hash + '.pdf');	ts = TextStream(f, 'write');	ts.write(pdfText);	ts.close();		return (L3.SERVER_URL + 'PDF/' + hash + '.pdf');}
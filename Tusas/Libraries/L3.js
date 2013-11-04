﻿var L3 = L3 || {};include('Libraries/addresses.js');L3.addressAttributes = ['Street1', 'Street2', 'City', 'State', 'ZipCode'];L3.validateAddress = function validateAddress(e, a) {	var result = 	L3.addressesGetInfo({						street1: e[a + 'Street1'],						street2: e[a + 'Street2'],						city: e[a + 'City'],						state: e[a + 'State'],						zipCode: e[a + 'ZipCode']					});						if (result) {		e[a + 'USPSLine1'] = result.delivery_line_1;		e[a + 'USPSLine2'] = result.last_line;		e[a + 'USPSDeliveryPoint'] = result.delivery_point_barcode;		e[a + 'MapCoords'] = result.metadata.latitude + ',' + result.metadata.longitude;	}	else {		e[a + 'USPSLine1'] = '';		e[a + 'USPSLine2'] = '';		e[a + 'USPSDeliveryPoint'] = '';		e[a + 'MapCoords'] = '';	}}L3.updateAddressInfo = function updateAddressInfo(ent, addrType) {	var updateUSPS = false;		if (ent.isModified()) {		L3.addressAttributes.forEach(function(attr){			updateUSPS = updateUSPS || (this.indexOf(addrType + attr) !== -1);		}, ent.getModifiedAttributes());		if (updateUSPS) {			L3.validateAddress(ent, addrType);		}	}}
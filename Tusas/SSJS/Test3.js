﻿include('Libraries/reportPDF.js');L3.dataStoreArray = [];L3.dataStoreArray.push(ds.District.query('category == :1', 'Independent School District'));L3.dataStoreArray.push(ds.Family.query('name == :1', 'D*'));L3.dataStoreArray.push(ds.Person.all());L3.dataStoreArray.push(ds.School.query('district.category == :1', 'Charter District'));L3.generatePDFFileAndURL(L3.dataStoreArray);
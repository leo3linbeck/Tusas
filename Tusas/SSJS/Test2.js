//ds.Family.all().remove();
//ds.Person.all().remove();

include('SSJS/GenerateMockData.js');
L3.generateMockData();
ds.District.all().toArray('ID, name, category, superintendent, numberOfSchools, totalEnrollment');

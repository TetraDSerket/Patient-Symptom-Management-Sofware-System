Parse.initialize("xH9SSQx0WqXieSxga3xzv7CY72sUeYe7TnEhBic1", "zm2J9iNV1m0IHZ8S0lP1dmDCHNvs4JUBWCrGG4W2");
fillPatientSelect();
fillUserSelect();

function enterDataButton()
{
	var DataPoint = Parse.Object.extend("DataPoint");
	var datapoint = new DataPoint();
	
	datapoint.set("Month", parseInt(document.getElementById("datepicker").value.substr(0, 2)));
	datapoint.set("Year", parseInt(document.getElementById("datepicker").value.substr(6, 10)));
	datapoint.set("Hour", parseInt(document.getElementById("Hour").value));
	datapoint.set("Minute", parseInt(document.getElementById("Minute").value));
	datapoint.set("TimeStamp", document.getElementById("Hour").value+":"+document.getElementById("Minute").value+" "+document.getElementById("AM/PM").value+" "+document.getElementById("datepicker").value );
	datapoint.set("Pain", parseInt(document.getElementById("Pain").value));
	datapoint.set("Morphine", parseInt(document.getElementById("Morphine").value));
	datapoint.set("Dilaudid", parseInt(document.getElementById("Dilaudid").value));
	datapoint.set("Oxyfast", parseInt(document.getElementById("Oxyfast").value));
	datapoint.set("PatientFullName", SelectedPatient.get("FullName"));

	if(parseInt(document.getElementById("Hour").value) == 12)
	{
		switch(document.getElementById("AM/PM").value)
		{
		case 'AM':
		case 'am':
			datapoint.set("AM_PM", "PM");
			datapoint.set("Day", parseInt(document.getElementById("datepicker").value.substr(3, 5))-1);
			break;
		case 'PM':
		case 'pm':
			datapoint.set("AM_PM", "AM");
			datapoint.set("Day", parseInt(document.getElementById("datepicker").value.substr(3, 5)));
			break;
		}
	}
	else
	{
		datapoint.set("AM_PM", document.getElementById("AM/PM").value);
		datapoint.set("Day", parseInt(document.getElementById("datepicker").value.substr(3, 5)));
	}

	
	if(document.getElementById("Pain").value == "")
	{
		alert("Enter input");
	}
	else
	{
		datapoint.save(null,
		{
			success: function(datapoint)
			{
				alert("DataPoint saved to "+SelectedPatient.get("FullName"));
			},
			error: function(patient, error) 
			{
				alert('Failed to create new object, with error code: ' + error.message);
			}
		});
	}
}

function newPatientButton()
{
	var Patient = Parse.Object.extend("Patient");
	var patient = new Patient();
	
	patient.set("FirstName", document.getElementById("NPFirstName").value);
	patient.set("LastName", document.getElementById("NPLastName").value);
	patient.set("Email", document.getElementById("NPEmail").value);
	patient.set("Age", parseInt(document.getElementById("NPAge").value));
	patient.set("FullName", document.getElementById("NPFirstName").value+" "+document.getElementById("NPLastName").value);
	patient.save(null, 
	{
	  success: function(patient) 
	  {
	    alert("New Patient "+patient.get("FullName")+" created!");
	  },
	  error: function(patient, error) 
	  {
	    alert('Failed to create new object, with error code: ' + error.message);
	  }
	});

}

function newUserButton()
{
	var user = new Parse.User();
	user.set("username", document.getElementById("NUUsername").value);
	user.set("firstname", document.getElementById("NUFirstName").value);
	user.set("lastname", document.getElementById("NULastName").value);
	user.set("password", document.getElementById("NUPassword").value);
	user.set("email", document.getElementById("NUEmail").value);
	user.set("phone", document.getElementById("NUPhone").value);
	user.signUp(null, 
	{
		success: function(user) 
		{
			alert("New User "+user.get("username")+" created!");
		},
		error: function(user, error) 
		{
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function fillPatientSelect()
{
	var PatientSelect = document.getElementById("PatientSelect");
	var Patient = Parse.Object.extend("Patient");
	var query = new Parse.Query(Patient);
	query.notEqualTo("FirstName", " ");
	query.find(
	{
		success: function(results) 
		{
			for (var i = 0; i < results.length; i++) 
			{ 
				var opt = document.createElement('option');
				opt.innerHTML = results[i].get('FullName');
				PatientSelect.appendChild(opt);
			}
		},
	  	error: function(error) 
	  	{
	  		alert("Error: " + error.code + " " + error.message);
	  	}
	});
}

function fillUserSelect()
{
	var UserSelect = document.getElementById("UserSelect");
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.notEqualTo("FirstName", " ");
	query.find(
	{
		success: function(results) 
		{
			for (var i = 0; i < results.length; i++) 
			{ 
				var opt = document.createElement('option');
				opt.value = results[i].get('username');
				opt.innerHTML = results[i].get('username');
				UserSelect.appendChild(opt);
			}
		},
	  	error: function(error) 
	  	{
	  		alert("Error: " + error.code + " " + error.message);
	  	}
	});
}

function sortData()
{
	var table = $("#table_id").DataTable();
	table.order( [[ 0, 'desc' ], [ 1, 'desc' ], [2, 'desc'], [3, 'desc'], [4, 'desc'], [5, 'desc']] ).draw();
	for ( var i=0 ; i<6 ; i++ ) 
	{
	    table.column( i ).visible( false, false );
	}
	table.columns.adjust().draw( false );
}
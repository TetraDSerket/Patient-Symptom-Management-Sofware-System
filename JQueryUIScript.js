Parse.initialize("xH9SSQx0WqXieSxga3xzv7CY72sUeYe7TnEhBic1", "zm2J9iNV1m0IHZ8S0lP1dmDCHNvs4JUBWCrGG4W2");
var SelectedPatient;
var SelectedUser;


$( "#tabs" ).tabs();
$("button[name$='Button']").button();
$("input[name$='Spinner']").spinner();
$("select[name$='Select']").selectmenu({
	width: 200
});
$( "#datepicker" ).datepicker();
$("#datepicker").datepicker('setDate', new Date());
$(function () 
{
	$("#table_id").DataTable();
	sortData();
});

function checkDataForPain(datapoint)
{
	var MorphineSum=0, DilaudidSum=0, OxyfastSum=0;
	var DataPoint = Parse.Object.extend("DataPoint");
	var query = new Parse.Query(DataPoint);
	query.equalTo("PatientFullName", SelectedPatient.get("FullName"));
	query.equalTo("Year", datapoint.get("Year"));
	query.equalTo("Month", datapoint.get("Month"));
	query.equalTo("Day", datapoint.get("Day"));
	query.find(
	{
		success: function(results) 
		{
			for (var i = 0; i < results.length; i++) 
			{ 
				MorphineSum = parseInt(MorphineSum+results[i].get('Morphine'));
				DilaudidSum = DilaudidSum+results[i].get('Dilaudid');
				OxyfastSum = OxyfastSum+results[i].get('Oxyfast');
				if(i==results.length-1)
				{
					if(datapoint.get("Pain")>7||MorphineSum>60||DilaudidSum>30||OxyfastSum>50)
					{
						sendMail(datapoint,MorphineSum,DilaudidSum,OxyfastSum);
					}
				}
			}
		},
	  	error: function(error) 
	  	{
	  		alert("Error: " + error.code + " " + error.message);
	  	}
	});
}


function sendMail(datapoint,MorphineSum,DilaudidSum,OxyfastSum) 
{
	alert("Abnormal Pain Level and/or total medication dose!");
	if (confirm('Would you like to send an alert to Doctor '+SelectedUser.get("username"))) 
	{
		alert("Sending email...");
		$.ajax(
		{
			type: 'POST',
			url: 'https://mandrillapp.com/api/1.0/messages/send.json',
			data: 
			{
				'key': '4Et_ivgxtKfptiZsKu-YBg',
				'message': 
				{
					'from_email': 'varsha.r22@gmail.com',
					'to': 
					[{
					    'email': SelectedUser.get("email"),
					    'name': SelectedUser.get("username"),
					    'type': 'to'
					}],
				'autotext': 'true',
				'subject': 'Alert for patient '+SelectedPatient.get("FullName"),
				'html': 'Hello '+SelectedUser.get("username")+", <br><br>" +
		      		"Patient "+SelectedPatient.get("FullName")+" has been either experiencing a high level of pain <br><br>" +
		      		"Timestamp: "+datapoint.get("TimeStamp")+"<br>"+
		      		"Pain: "+datapoint.get("Pain")+"<br><br>"+
	  				"and/or has been prescribed a high dose of pain medication(s)<br><br>" +
	  				"Date: "+datapoint.get("Month")+"/"+datapoint.get("Day")+"/"+datapoint.get("Year")+"<br>"+
	  				"Morphine: "+MorphineSum+"<br>" +
	  				"Dilaudid: "+DilaudidSum+"<br>" +
	  				"Oxyfast: "+OxyfastSum+"<br><br>" +
	  				"Please access the Patient Symptom Management System for more information <br>" +
	  				"Thank you"
		    }
		  }
		 }).done(function(response) {
		   console.log(response); // if you're into that sorta thing
		 });
		alert("Done");
	} 
	else 
	{
	    alert("No message was sent.");
	}
	
}


$("#PatientSelect").on('selectmenuchange', function() 
{
	setSelectedPatient();
});
$("#UserSelect").on('selectmenuchange', function() 
{
	setSelectedUser();
});

function setSelectedPatient()
{
	var SelectedPatientValue = $( "#PatientSelect option:selected" ).text();
	var Patient = Parse.Object.extend("Patient");
	var query = new Parse.Query(Patient);
	query.equalTo("FullName", SelectedPatientValue);
	query.first(
	{
		success: function(object) 
		{
			SelectedPatient = object;
			$("#EnterDataTitle").html("Enter Data for patient "+SelectedPatient.get("FullName"));
			drawTable();
//			SelectedPatient.save(null, 
//			{
//				success: function(SelectedPatient) 
//				{
//					alert("success");
//				    SelectedPatient.set();
//				    SelectedPatient.save();
//				}
//			});
		},
		error: function(error) 
		{
		    alert("Error: " + error.code + " " + error.message);
		}
	});
	//= "Submit Data for "+SelectedPatient.get("FullName");
}

function setSelectedUser()
{
	var SelectedUserValue = $( "#UserSelect option:selected" ).text();
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.equalTo("username", SelectedUserValue);
	query.first(
	{
		success: function(object) 
		{
			SelectedUser = object;
//			alert("Selected User: "+SelectedUser.get('username'));
		},
		error: function(error) 
		{
		    alert("Error: " + error.code + " " + error.message);
		}
	});
}

function clearInput(list)
{
	var idlist;
	switch (list)
	{
	   	case "PatientInput": 
	   		idList = ["NPFirstName", "NPLastName", "NPEmail", "NPAge"];
	   		break;
	   	case "UserInput":
	   		idList = ["NUFirstName", "NULastName", "NUPassword", "NUEmail", "NUPhone"];
	   		break;
	   	case "EnterData":
	   		idList = ["datepicker", "Hour", "Minute", "AM/PM", "Pain", "Morphine", "Dilaudid", "Oxyfast"];
	   		break;
	   	default:
		   idList = [" "];
	   		break;
	}
	for(var i=0; i<idList.length; i++)
	{
		document.getElementById(idList[i]).value = "";
	}
}
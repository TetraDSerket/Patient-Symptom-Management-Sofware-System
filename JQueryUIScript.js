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
$(function () 
{
	$("#table_id").DataTable();
	sortData();
});

function sendMail() 
{
	alert("sending");
	$.ajax(
	{
		type: 'POST',
		url: 'https://mandrillapp.com/api/1.0/messages/send.json',
		data: 
		{
	    'key': '4Et_ivgxtKfptiZsKu-YBg',
	    'message': {
	      'from_email': 'varsha.r22@gmail.com',
	      'to': [
	          {
	            'email': 'varsha.r22@gmail.com',
	            'name': 'Varsha',
	            'type': 'to'
	          }
//	          ,{
//	            'email': 'RECIPIENT_NO_2@EMAIL.HERE',
//	            'name': 'ANOTHER RECIPIENT NAME (OPTIONAL)',
//	            'type': 'to'
//	          }
	        ],
	      'autotext': 'true',
	      'subject': 'YOUR SUBJECT HERE!',
	      'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
	    }
	  }
	 }).done(function(response) {
	   console.log(response); // if you're into that sorta thing
	 });
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
			$("#EnterDataTitle").html("Enter Data for Patient "+SelectedPatient.get("FullName"));
			drawTable();
//			SelectedPatient.save(null, 
//			{
//				success: function(SelectedPatient) 
//				{
//					//alert("success");
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
	//alert("2");
	var SelectedUserValue = $( "#UserSelect option:selected" ).text();
	//alert(SelectedUserValue);
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	//alert("3");
	query.equalTo("username", SelectedUserValue);
	query.first(
	{
		success: function(object) 
		{
			SelectedUser = object;
			//alert("SelectedUser: "+SelectedUser.get('username'));
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
	   		idList = ["NUUsername", "NUFirstName", "NULastName", "NUPassword", "NUEmail", "NUPhone"];
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
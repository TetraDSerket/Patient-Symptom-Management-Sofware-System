Parse.initialize("xH9SSQx0WqXieSxga3xzv7CY72sUeYe7TnEhBic1", "zm2J9iNV1m0IHZ8S0lP1dmDCHNvs4JUBWCrGG4W2");

function drawTable()
{
	var table = $('#table_id').DataTable(); 
	table
	    .clear()
	    .draw();
	var DataPoint = Parse.Object.extend("DataPoint");
	var query = new Parse.Query(DataPoint);
	query.equalTo("PatientFullName", SelectedPatient.get("FullName"));
	query.find(
	{
		success: function(results) 
		{
			for (var i = 0; i < results.length; i++) 
			{
//				var table = document.getElementById("myTable");
//			    var row = table.insertRow(0);
//			    var cell1 = row.insertCell(0);
//			    var cell2 = row.insertCell(1);
//			    cell1.innerHTML = "NEW CELL1";
//			    cell2.innerHTML = "NEW CELL2";
				//var row = myTable.insertRow(i+1);
				//alert("row inserted");
				table.row.add( 
				[ 
					results[i].get("Year"),
					results[i].get("Month"),
					results[i].get("Day"),
					results[i].get("AM_PM"),
					results[i].get("Hour"),
					results[i].get("Minute"),
					results[i].get("TimeStamp"),
					results[i].get("Pain"),
					results[i].get("Morphine"),
					results[i].get("Dilaudid"),
					results[i].get("Oxyfast"),
				]).draw();
				sortData();
			}
		},
	  	error: function(error) 
	  	{
	  		alert("Error: " + error.code + " " + error.message);
	  	}
	});
//	myTable.rows[0].cells[1].innerHTML = 'Hello';
}

//
//    var myTable= "<table><tr><td style='width: 100px; color: red;'>Col Head 1</td>";
//    myTable+= "<td style='width: 100px; color: red; text-align: right;'>Col Head 2</td>";
//    myTable+="<td style='width: 100px; color: red; text-align: right;'>Col Head 3</td></tr>";
//
//    myTable+="<tr><td style='width: 100px;                   '>---------------</td>";
//    myTable+="<td     style='width: 100px; text-align: right;'>---------------</td>";
//    myTable+="<td     style='width: 100px; text-align: right;'>---------------</td></tr>";
//
//  for (var i=0; i<8; i++) {
//    myTable+="<tr><td style='width: 100px;'>Number " + i + " is:</td>";
//    myArray[i] = myArray[i].toFixed(3);
//    myTable+="<td style='width: 100px; text-align: right;'>" + myArray[i] + "</td>";
//    myTable+="<td style='width: 100px; text-align: right;'>" + myArray[i] + "</td></tr>";
//  }  
//   myTable+="</table>";
//   
//   document.getElementById('tablePrint').innerHTML = myTable;
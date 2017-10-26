$(function() {
  $('button[type=submit]').click(function(e) {
    e.preventDefault();
    //For Refresh the FilesDetails and Result Grid
    deleteRows("keywords");
    deleteRows("keywords2");
    var dvTable = document.getElementById("outputDetails");
    if(dvTable.style.display=="block"){
    	dvTable.style.display = "none";
    }
    var form = document.forms[0];
    var formData = new FormData(form);
    	
    // Ajax call for file uploaling
    var ajaxReq = $.ajax({
      url : 'uploadFile',
      type : 'POST',
      
      data : formData,
      cache : false,
      contentType : false,
      processData : false,
      cache: false,
     
      xhr: function(){
        //Get XmlHttpRequest object
         var xhr = $.ajaxSettings.xhr() ;
        
        //Set onprogress event handler 
         xhr.upload.onprogress = function(event){
          	var perc = Math.round((event.loaded / event.total) * 100);
          	$('#progressBar').text(perc + '%');
          	$('#progressBar').css('width',perc + '%');
         };
         return xhr ;
    	},
    	beforeSend: function( xhr ) {
    		//Reset alert message and progress bar
    		$('#alertMsg').text('');
    		$('#progressBar').text('');
    		$('#progressBar').css('width','0%');
       }
    });
  
    // Called on success of file upload
    ajaxReq.done(function(data, textStatus, xhr) {
      if(data[0].status=true){
    	  var columns = new Array();
  	    columns.push(["Request No", "Status", "Input File", "Submitted Date/Time"]);
  	    
	  var metaData = new Array();
      metaData.push(["requestno"], ["status"], ["inputFileName"], ["fileSubmittedDate"]);
      deleteRows("keywords");
      var table = GenerateTable(data,metaData,columns,"keywords");
  	      
  	    var dvTable = document.getElementById("wrapper");
  	    dvTable.style.display = "block";
	    dvTable.appendChild(table);
  	      
      }else{
    	  dvTable.innerHTML = "No Files are uploaded Or please click refresh button for get the Data";
      }
    });
    
    // Called on failure of file upload
    ajaxReq.fail(function(data, textStatus, xhr) {
    	alert(xhr.responseText);
        alert(xhr.responseText);
    });
    
    var refreshAjaxReq = $.ajax({
    	url : "refresh",
        type : "GET",
        
    
    });
    
  });
});

function getUploadFileResult(requestId){
	//Refresh the Result grid
	deleteRows("keywords2");
	  $.ajax({
			type : "GET",
			url : "http://localhost:8080/uploadRequestFileDetails/uploadFile/"+requestId,
			dataType: "json",
			
			success: function(data){
				if(data.lenght!=0){
					 var columns = new Array();
				  	    columns.push(["S.No", "Link", "Result"]);
					   var metaData = new Array();
				      metaData.push(["requestno"], ["link"], ["result"]);
				      var table = GenerateTable(data,metaData,columns,"keywords2");
					
					var dvTable = document.getElementById("outputDetails");
					dvTable.style.display = "block";
				    dvTable.appendChild(table);
				    
				}else{
					$("#outputDetails").html("<strong>Error</strong>");
				}
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
}

function GenerateTable(data,metaData,columns,divId) {
    var table = document.getElementById(divId);
	var row = table.insertRow(-1);
    //Add the data rows.
    for (var i = 0; i < data.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < metaData.length; j++) {
            var cell = row.insertCell(-1);
            cell.style.color = "black";
            cell.align = "center";
            applyBackGroundColourToCells(divId,cell,data[i].status);
            if(j==0&&data[i].status==true){
            	var elLink = document.createElement('a');
            	elLink.id = "demo";
	            var href='javascript:getUploadFileResult('+data[i][metaData[j]]+')';
	            elLink.href = href;
	            elLink.innerHTML = data[i][metaData[j]];
	            cell.appendChild(elLink);
            }else{
            	if(metaData[j]=="status"){
            		if(data[i][metaData[j]]==true){
            			cell.innerHTML = "Completed";
            		}else{
            			cell.innerHTML = "Processing";
            		}
            	}else{
            		cell.innerHTML = data[i][metaData[j]];
            	}
            }
        }
    }
    
    return table;
}

function applyBackGroundColourToCells(divId,cell,status){
	if(divId=="keywords"){
    	if(status==true){
    		cell.style.backgroundColor = "#dff0d8";
    	}else{
    		cell.style.backgroundColor = "#f2dede";
    	}
    }else{
    	cell.style.backgroundColor = "#dff0d8";
    }
}

function deleteRows(tableId){
	 var table = document.getElementById(tableId);
	 var rowCount = table.rows.length;
	 while(table.rows.length > 1) {
		  table.deleteRow(1);
	 }
}

function refreshGrid(){
	var dvTable = document.getElementById("outputDetails");
	dvTable.style.display = "none";
	$.ajax({
		type : "GET",
		url : "http://localhost:8080/uploadRequestFileDetails",
		dataType: "json",
		
		success: function(data){
			
			if(data[0].status=true){
		    	  var columns = new Array();
		  	    columns.push(["Request No", "Status", "Input File", "Submitted Date/Time"]);
		  	    
			  var metaData = new Array();
		      metaData.push(["requestno"], ["status"], ["inputFileName"], ["fileSubmittedDate"]);
		      deleteRows("keywords");
		      var table = GenerateTable(data,metaData,columns,"keywords");
		  	      
		  	    var dvTable = document.getElementById("wrapper");
		  	    dvTable.style.display = "block";
			    dvTable.appendChild(table);
		  	      
		      }else{
		    	  dvTable.innerHTML = "No Files are uploaded";
		      }
			
		},
		error : function(e) {
			dvTable.innerHTML = "No Files are uploaded";
		}
	});
}
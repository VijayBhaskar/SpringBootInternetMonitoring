<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
        <meta charset="utf-8" />
        <!-- CSS for Bootstrap -->
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
		<!-- JQuery -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <title></title>
        <link href="css/main.css" rel="stylesheet" type="text/css" />
        <link href="css/table.css" rel="stylesheet" type="text/css" />
        <script src="js/script.js" type="text/javascript"></script>
    </head>
    <body>
        <header>
            <h2>Internet Monitoring</h2>
        </header>
        <div class="container">
		    <h2>Upload CSV file</h2>
		    <hr>
		    <!-- File Upload From -->
		    <form action="uploadFile" method="post" enctype="multipart/form-data">
		      <div class="form-group">
		        <label>Select File</label> 
		        <input class="form-control" type="file" name="file">
		      </div>
		      <div class="form-group">
		        <button class="btn btn-primary" type="submit">Upload</button>
		      </div>
		    </form>
		    <br />		
		</div>
		<div id="wrapper" style="display: none;">
			<table>
				<tr>
					<td class="d1"> 
						Request Details
						<div class="copy">right text</div>
					</td>
					<td class="d3"><input type="button" class="button" value="Refresh" onclick="refreshGrid()"></td>
				</tr>
			</table>
			  
			  <table id="keywords" cellspacing="0" cellpadding="0">
			   <thead>
			      <tr>
			        <th><span>Request No</span></th>
			        <th><span>Status</span></th>
			        <th><span>Input File</span></th>
			        <th><span>Submitted Date/Time</span></th>
			      </tr>
			    </thead>
			     <tbody>
			    </tbody>
			  </table> 
		 </div> 
		 
		 <div id="outputDetails" style="display: none;">
			<table>
				<tr>
					<td class="d1">
						Output
						<div class="copy">right text</div>
					</td>
				</tr>
			</table>
		 	<table id="keywords2" cellspacing="0" cellpadding="0">
			   <thead>
			      <tr>
			        <th><span>S.No</span></th>
			        <th><span>Link</span></th>
			        <th><span>Result</span></th>
			      </tr>
			    </thead>
			     <tbody>
			    </tbody>
			  </table> 
		 </div>
    </body>
<body>
</body>
</html>
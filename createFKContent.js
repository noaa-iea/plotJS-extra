// This function generates the modal window content for the Florida Keys ESR site

function createFKContent(DataSourceURL, icon){
  var query = new google.visualization.Query(DataSourceURL);
  query.send(handleQueryResponse);

  function handleQueryResponse(response) {
  
    var GoogleData = response.getDataTable();

    function getColumnIndex(dataTable, columnName){
      var i = -1;
        do {
          i = i +1;
        } while (columnName != dataTable.getColumnLabel(i));
      return i;
    }
    var rowNumber = GoogleData.getFilteredRows([{column: getColumnIndex(GoogleData, "icon"), value: icon}])[0];
    var caption = GoogleData.getValue(rowNumber, getColumnIndex(GoogleData, "caption"));
    var provider_link = GoogleData.getValue(rowNumber, getColumnIndex(GoogleData, "provider_link"));
    var source = GoogleData.getValue(rowNumber, getColumnIndex(GoogleData, "source"));
    var title = GoogleData.getValue(rowNumber, getColumnIndex(GoogleData, "title"));
    var YAxisTitle = GoogleData.getValue(rowNumber, getColumnIndex(GoogleData, "y_label"));
    var YAxis2Title = GoogleData.getValue(rowNumber, getColumnIndex(GoogleData, "y2_label"));
    var SpreadsheetLink = GoogleData.getValue(rowNumber, getColumnIndex(GoogleData, "data"));
    
    console.log(YAxis2Title == null);

    document.getElementById('caption').innerHTML = caption;
    document.getElementById('title').innerHTML = title;

    var node = document.createElement("a");                
    var textnode = document.createTextNode(source);    
    node.appendChild(textnode);             
    node.href = provider_link;  
    node.target = "_parent";         
    document.getElementById("source").appendChild(node);

    GraphWrapper({Google_Spreadsheet_Link: SpreadsheetLink,
      YAxisTitle: YAxisTitle,
      threshold_year: 2011,
      SST: (icon == "SST"),
      twoYAxes: (YAxis2Title != null),
      YAxisTitle2: YAxis2Title
    });
  }
}
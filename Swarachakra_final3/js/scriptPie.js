google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Language', 'Downloads'],
          ['Hindi',     76860],
          ['Marathi',     273878],
          ['Gujarati',  47580],
          ['Telugu', 116204],
          ['Kannada',    34658],
          ['Malayalam',    91189],
          ['Odia',    16197],
          ['Punjabi',    10776],
          ['Bengali',    223332],
          ['Tamil',    223332],
          ['Konkani',    1936],
          ['Asomiya',    6650],
        ]);

        var options = {
          // title: 'Swarachakra Text input keyboards user installs',
          // legend: 'none',
          // pieSliceText: 'label',
          slices: {  2: {offset: 0.1},
                     4: {offset: 0.2},
                     6: {offset: 0.3},
                     8: {offset: 0.4},
          },
          pieStartAngle:20,
          titleTextStyle: {
            color: '2a2a2a',
            fontName: 'Exo 2',
            fontSize: 20,
            
          },
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }
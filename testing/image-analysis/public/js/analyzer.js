$(document).ready(function () {
  $('#run').click(function (e) {
    $.get('/top20_data_new.json', runAnalysis, 'json');
  });
});

function runAnalysis(data) {

  // gets the length of the dataset
  var len = data.mixtape_data.length;

  var i = 19;

  function run() {
    // tells you which
    console.log(i + ' out of ' + len + ' total');

    // connects to the analysis route to actually process the json
    $.get('/analysis/' + i, 'json');

    i++;

    // runs every 4 seconds so that it has time to load
    if (i < len) {
      setTimeout(run, 6000);
    } else {
      //tells you when it's done
      console.log('Complete');
    }
  }

  // start that shit
  run();

}

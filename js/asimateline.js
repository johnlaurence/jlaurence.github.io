//--Pull data from csv--//
d3.csv('https://jchartbeagle.s3.af-south-1.amazonaws.com/SampleData(Outsurance).csv').then(makeChart);
var color = Chart.helpers.color;
function makeChart(emotion) {
	var timeData = emotion.map(function(d) {
		return d.Time;
	});
	var arousalData = emotion.map(function(d) {
		return d.Arousal;
	});
	var valenceData = emotion.map(function(d) {
		return d.Valence;
	});

	const yData = arousalData.slice(0, 234);
	const xData = valenceData.slice(0, 234);
	const time = timeData.slice(0, 234);

	// console.log(yData);
	// console.log(xData);

	//--Timing of animation--//
	const duration = timeData[timeData.length - 1];
	const animationLength = timeData[timeData.length - 1] * 1000;
	document.getElementById('duration').innerHTML = `${duration} seconds`;
	document.getElementById('timer').innerHTML = `0`;
	const totalSteps = yData.length;
	const stepLength = animationLength / totalSteps;
	var stepCount = 0;
	var newDataX = [ 0.0 ];
	var newDataY = [ 15 ];

	//--Colours--//
	const bgdClr = color(chartColors.yellow).alpha(0.6).rgbString();
	const purpleC = color(chartColors.purple).alpha(0.6).rgbString();
	const blueC = color(chartColors.blue).alpha(0.6).rgbString();
	const redC = color(chartColors.red).alpha(0.6).rgbString();
	const greyC = color(chartColors.grey).alpha(0.6).rgbString();

	//--Color Point Array Creation--//
	const colorArrayX = xData.map(function(x) {
		if (x >= 0) return true;
		else return false;
	});
	const colorArrayY = yData.map(function(x) {
		if (x >= 15) return true;
		else return false;
	});

	let colorArrayComb = colorArrayX.map(function(x, i) {
		return [ x, colorArrayY[i] ];
	});

	const colorArrayFinal = colorArrayComb.map(function([ firstA, secondA ]) {
		if (firstA === true && secondA === true) {
			return purpleC;
		} else if (firstA === true && secondA === false) {
			return blueC;
		} else if (firstA === false && secondA === true) {
			return redC;
		} else if (firstA === false && secondA === false) {
			return greyC;
		} else {
			return 'error';
		}
	});

	//--Emotion Array Creation--//
	const emotionNow = colorArrayComb.map(function([ firstA, secondA ]) {
		if (firstA === true && secondA === true) {
			return 'excited';
		} else if (firstA === true && secondA === false) {
			return 'happy';
		} else if (firstA === false && secondA === true) {
			return 'angry';
		} else if (firstA === false && secondA === false) {
			return 'sad';
		} else {
			return 'error';
		}
	});

	console.log(colorArrayFinal);
	console.log(emotionNow);

	//--Link HTML Button--//
	var ctx = document.getElementById('animateline').getContext('2d');

	//--Chart Settings--//
	const config = {
		type: 'scatter',
		options: {
			scales: {
				xAxes: [
					{
						scaleLabel: {
							labelString: 'Emotional Valence →',
							display: true,
							fontColor: chartColors.green
						},
						ticks: {
							display: true,
							min: -0.2,
							max: 0.2,
							stepSize: 0.2
						},
						gridLines: {
							display: true,
							color: color(chartColors.grey)
						}
					}
				],
				yAxes: [
					{
						scaleLabel: {
							labelString: 'Emotional Arousal →',
							display: true,
							fontColor: chartColors.red
						},
						ticks: {
							display: true,
							min: 12,
							max: 18,
							stepSize: 3
						},
						gridLines: {
							display: true,
							color: color(chartColors.grey),
							lineWidth: 1,
							zeroLineWidth: 1.5,
							zeroLinedColor: color(chartColors.grey)
						}
					}
				]
			}
		},
		responsive: true
	};

	//-Datapoint format--//
	var dataPoint = (config.data = {
		datasets: [
			{
				label: 'Emotional Response',
				borderColor: colorArrayFinal[stepCount],
				backgroundColor: colorArrayFinal[stepCount],
				radius: 10,
				data: [
					{
						x: newDataX,
						y: newDataY
					}
				]
			}
		]
	});

	//--Create chart--//
	var animatelines = new Chart(ctx, config);

	//--Stop chart--//
	document.getElementById('stopAnim').addEventListener('click', function reset() {
		const mediaElem = document.getElementById('chartVideo');
		mediaElem.pause();
		animatelines.destroy();
	});

	//--Reset chart--//
	document.getElementById('resetAnim').addEventListener('click', function reset() {
		wipe = () => {
			animatelines.destroy();
			stepCount = 0;
			newDataX = [ 0.0 ];
			newDataY = [ 15 ];
		};
		wipe();
		animatelines = new Chart(ctx, config);
		const mediaElem = document.getElementById('chartVideo');
		mediaElem.load();
		console.log('reset complete');
	});

	//--Animation--//
	document.getElementById('startAnim').addEventListener('click', function updateData() {
		const mediaElem = document.getElementById('chartVideo');
		mediaElem.play();
		var timeInterval = setInterval(function() {
			newDataX = xData[stepCount];
			newDataY = yData[stepCount];
			timer = time[stepCount];
			emotionDisplay = emotionNow[stepCount];
			pointColor = colorArrayFinal[stepCount];
			//updateDataPoint();
			dataPoint.datasets.forEach(function(dataset) {
				(dataset.backgroundColor = pointColor),
					(dataset.borderColor = pointColor),
					(dataset.data = dataset.data.map(function() {
						return {
							x: newDataX,
							y: newDataY,
							pointColor
						};
					}));
			});
			animatelines.update();
			stepCount++;
			console.log(stepCount);
			console.log(pointColor);
			document.getElementById('timer').innerHTML = `${timer} seconds`;
			document.getElementById('emotionDisplay').innerHTML = `${emotionDisplay}`;
			if (stepCount > totalSteps) {
				clearInterval(timeInterval);
				document.getElementById('timer').innerHTML = `End`;
				document.getElementById('emotionDisplay').innerHTML = `End`;
				console.log('end of update');
			}
		}, stepLength);
	});
}

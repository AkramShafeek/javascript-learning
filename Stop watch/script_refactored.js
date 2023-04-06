
var timer;
var clock = { 'days'    : 0,
			  'hours'   : 0,
			  'minutes' : 0,
			  'seconds' : 0 }

var lookup_table = [
					  //[a,b,c,d,e,f,g,dp]
						{'a':true, 'b':true, 'c':true, 'd':true, 'e':true, 'f':true, 'g':false,'dp':false},  //0
						{'a':false,'b':true, 'c':true, 'd':false,'e':false,'f':false,'g':false,'dp':false},  //1
						{'a':true, 'b':true, 'c':false,'d':true, 'e':true, 'f':false,'g':true, 'dp':false},  //2
						{'a':true, 'b':true, 'c':true, 'd':true, 'e':false,'f':false,'g':true, 'dp':false},  //3
						{'a':false,'b':true, 'c':true, 'd':false,'e':false,'f':true, 'g':true, 'dp':false},  //4
						{'a':true, 'b':false,'c':true, 'd':true, 'e':false,'f':true, 'g':true, 'dp':false},  //5
						{'a':true, 'b':false,'c':true, 'd':true, 'e':true, 'f':true, 'g':true, 'dp':false},  //6
						{'a':true, 'b':true, 'c':true, 'd':false,'e':false,'f':false,'g':false,'dp':false},  //7
						{'a':true, 'b':true, 'c':true, 'd':true, 'e':true, 'f':true, 'g':true, 'dp':false},  //8
						{'a':true, 'b':true, 'c':true, 'd':true, 'e':false,'f':true, 'g':true, 'dp':false}   //9									
				   ];

function updateWatch()
{
	clock.seconds = clock.seconds + 1;
	if (clock.seconds > 59)
	{
		clock.seconds = 0;
		clock.minutes = clock.minutes + 1;
	}
	if (clock.minutes > 59)
	{
		clock.minutes = 0;
		clock.hours = clock.hours + 1;
	}
	if (clock.hours > 23)
	{
		clock.hours = 0;
		clock.days = clock.days + 1;
	}
}

function resetWatch()
{	
	for(let clockElement in clock)
		clock[clockElement] = 0;		
}

function initialize() 
{
    resetWatch();
	updateDisplay();
}

function updateDisplay()
{
	//Extract each single digit from seconds-value.
		//Until digits get over.
		//Display each digit on segments.
		//Pad the rest of the left most digits to 0.
		//			(OR)
		//Until segments get over. 
		 //e.g. 100 seconds cannot be displayed on 2 digit display, though 100seconds may not be used.
	
	//Extract each single digit from minutes-value.
		//Perform similar to above steps

	for(let clockElement in clock)
	{
		//getting days/hours/minutes/seconds
		let clockElementHTML = document.getElementById(clockElement);

		//if days/hours/minutes/seconds doesnt exist, continue iteration
		if(clockElementHTML == null)
			continue;

		//getting value of days/hours/minutes/seconds		
		let value = clock[clockElement];	
		
		//getting d0,d1 of days/h0,h1 of hours...
		let digitIDs = (Array.from(clockElementHTML.children)).reverse();
		for(let digitID of digitIDs)
		{
			//extracting the last digit from the value
			let digitValue = value%10;

			//getting a,b,c... of d0,d1,h0,h1....
			let segments = Array.from(digitID.children);
			for(let segment of segments)
			{
				let segmentClass = segment.classList[0];
				if(lookup_table[digitValue][segmentClass])
					segment.style.backgroundColor = "rgb(228, 86, 86)";
				else
					segment.style.backgroundColor = "rgb(211, 211, 211)";
			}
			//removing the last digit from the value
			value = Math.floor(value/10);
		}
	}
	
}

function onEverySecond()
{
	updateWatch();
	updateDisplay();
}

function startTimer()
{
	timer = setInterval(onEverySecond, 1000); //1000millisec
}

function stopTimer()
{
	clearInterval(timer);
}

function onResumeButtonPressed()
{
    //removing the reset and resume button
    document.getElementById('resetButton').remove();
    document.getElementById('resumeButton').remove();

    //start function will insert the stop button
	onStartButtonPressed();
}

function onResetButtonPressed()
{
	resetWatch();
	updateDisplay();

    //creating a start button
    let startButton = document.createElement("button");
    startButton.setAttribute('id','startButton');
    startButton.setAttribute('onclick','onStartButtonPressed()');
    startButton.innerHTML = 'start';

    //removing the reset and resume button
    document.getElementById('resetButton').remove();
    document.getElementById('resumeButton').remove();

    //inserting the start button
    document.getElementById('buttonContainer').append(startButton);
}

function onStartButtonPressed()
{
	//creating a stop button
    let stopButton = document.createElement("button");
    stopButton.setAttribute('id','stopButton');
    stopButton.setAttribute('onclick','onStopButtonPressed()');
    stopButton.innerHTML = 'stop';
    
    //removing the start button
    if(document.getElementById('startButton') != null)
        document.getElementById('startButton').remove();

    //inserting the stop button
    document.getElementById('buttonContainer').append(stopButton);

	startTimer();
}

function onStopButtonPressed()
{
	stopTimer();

	//creating a reset button
    let resetButton = document.createElement("button");
    resetButton.setAttribute('id','resetButton');
    resetButton.setAttribute('onclick','onResetButtonPressed()');
    resetButton.innerHTML = 'reset';

    //creating a resume button
    let resumeButton = document.createElement('button');
    resumeButton.setAttribute('id','resumeButton');
    resumeButton.setAttribute('onclick','onResumeButtonPressed()');
    resumeButton.innerHTML = 'resume';

    //removing the stop button
    document.getElementById('stopButton').remove();

    //inserting the reset and resume button
    document.getElementById('buttonContainer').append(resetButton);
    document.getElementById('buttonContainer').append(resumeButton);
}



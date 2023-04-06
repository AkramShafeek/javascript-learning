var isColonVisible = true;
var timerId;

//CREATION OF SEGMENTS MAP
var segments = ['a','b','c','d','e','f','g'];
var segmentMap = [];
for(let i=0;i<10;i++)
{
    let segmentConditionObject = { 
        'a' : '14',
        'b' : '56',
        'c' : '2',
        'd' : '147',
        'e' : '134579',
        'f' : '1237',
        'g' : '017'      
      }
    let digitMap = new Object( );
    for(let j=0;j<7;j++)
    {
        let segment = segments[j];
        if(!segmentConditionObject[segment].includes(i.toString()))
            digitMap[segment] = true;
        else    
            digitMap[segment] = false;
    }
    segmentMap[i] = digitMap;
}

//CREATION OF CLOCK OBJECT
var clock = new Object();
var clockValues = new Object();

var clockElements = ['hours','minutes','seconds'];

var digitsId = [ ['h0','h1'],
                 ['m0','m1'],
                 ['s0','s1'] ];

//create clock elements: hours, minutes, seconds;
for(let i=0;i<digitsId.length;i++)
{
    let clockElement = new Object();

    //create digits: h0,h1; m0,m1; s0,s1;    
    for(let j=0;j<digitsId[i].length;j++)
        clockElement[digitsId[i][j]] = 0;
    
    clockValues[clockElements[i]] = 0;
    clock[clockElements[i]] = clockElement;
}




function initialize() 
{
    for(let i=0;i<3;i++)
    {
        let clockElement = clockElements[i];
        clockValues[clockElement] = 0;
        updateObject(clockValues[clockElement],clock[clockElement]);
        updateClockInHTML(clock[clockElement]);
    }
}
//updates the clock in html
function updateClockInHTML(object)
{
    for(let digitId in object)
    {
        for(let segment of segments)
        {
            let digitValue = object[digitId];
            let element = document.getElementById(digitId).getElementsByClassName(segment);

            if(segmentMap[digitValue][segment])
                element[0].style.backgroundColor = "rgb(228, 86, 86)";
            else
                element[0].style.backgroundColor = "rgb(211, 211, 211)";
        }
    }    
}
//updates the clock object, which is separating out the digits of 
//each clock element
function updateObject(value, object) 
{
    for(let digit in object)
    {
        object[digit] = value%10;
        value = Math.floor(value/10);
    }
}

function start()
{
    //creating a stop button
    let stopButton = document.createElement("button");
    stopButton.setAttribute('id','stopButton');
    stopButton.setAttribute('onclick','stop()');
    stopButton.innerHTML = 'stop';
    
    //removing the start button
    if(document.getElementById('startButton') != null)
        document.getElementById('startButton').remove();

    //inserting the stop button
    document.getElementById('buttonContainer').append(stopButton);

    timerId = setInterval(increment,500);
}
function stop()
{
    clearInterval(timerId);
    
    let colons = document.getElementsByClassName("colonContainer");
    
    for(let colon of colons)
        colon.classList.remove("hidden")
    isColonVisible = true;

    //creating a reset button
    let resetButton = document.createElement("button");
    resetButton.setAttribute('id','resetButton');
    resetButton.setAttribute('onclick','reset()');
    resetButton.innerHTML = 'reset';

    //creating a resume button
    let resumeButton = document.createElement('button');
    resumeButton.setAttribute('id','resumeButton');
    resumeButton.setAttribute('onclick','resume()');
    resumeButton.innerHTML = 'resume';

    //removing the stop button
    document.getElementById('stopButton').remove();

    //inserting the reset and resume button
    document.getElementById('buttonContainer').append(resetButton);
    document.getElementById('buttonContainer').append(resumeButton);
}
function resume()
{   
    //removing the reset and resume button
    document.getElementById('resetButton').remove();
    document.getElementById('resumeButton').remove();

    //start function will insert the stop button
    start();
}
function reset()
{
    initialize();
    let colons = document.getElementsByClassName("colonContainer");
    
    for(let colon of colons)
        colon.classList.remove("hidden")
    isColonVisible = true;

    //creating a start button
    let startButton = document.createElement("button");
    startButton.setAttribute('id','startButton');
    startButton.setAttribute('onclick','start()');
    startButton.innerHTML = 'start';

    //removing the reset and remove button
    document.getElementById('resetButton').remove();
    document.getElementById('resumeButton').remove();

    //inserting the start button
    document.getElementById('buttonContainer').append(startButton);
}
function increment()
{
    let colons = document.getElementsByClassName("colonContainer");
    
    for(let colon of colons)
        colon.classList.toggle("hidden")

    isColonVisible = !(isColonVisible);
    
    //updation synchronized only when colon is visible
    if(isColonVisible)
    {
        clockValues['seconds'] = (clockValues['seconds']+1);
        clockValues['minutes'] = clockValues['minutes'] + Math.floor((clockValues['seconds'])/60);
        clockValues['hours'] += Math.floor((clockValues['minutes'])/60);
    
        clockValues['seconds'] = (clockValues['seconds'])%60;
        clockValues['minutes'] = (clockValues['minutes'])%60;
    
        for(let i=0;i<3;i++)
        {
            let clockElement = clockElements[i];
            updateObject(clockValues[clockElement],clock[clockElement]);
            updateClockInHTML(clock[clockElement]);
        }
    }
}






// Dad's js file : https://doc-0g-68-docs.googleusercontent.com/docs/securesc/8mibb6r0r26425eqv9pq2v5m28gvcvul/alk57md5k0l9ekq03vibc1vufli7i8m9/1672604700000/10866102969798543766/04425298469843234859/1SjGdv-EXIJ3XL-qA95jHBVAJYaIV791h?e=download&ax=ALjR8swQYMxOckehu81XDChYSOdSKYJVuLMTlSwEU81CTLJBZUKjsh1-na1ixm_-R7lsRW5OXuuixQZHF2E3Gnlwot4ZyTIp706jzVL9nB2DTA7ZLRU2OPq2UakZfa_qWbqFzsMRs1SnqEr2vwjPLx0-dQq1Krb4tubzNLkGcXyN5tnBZ6DkV_9-phMjFfYNou095T5rrL7ljKNRysMgccLyyF3sKu9Ki5Uy806VMpacPoS6CLpzHcbLmecK-ngySazZfthSSVs4Sbg2TUmd9mreF8tRpICxxmf7-BHsSR6hYuOWsNpcnmyg7ntFvH1RME20DZFNf74ypL0GMNPLq4Th7VyYTXLmnPLaLXEad3K16c6ecX8dLWWXnj-jrSoPiNUzN2Ex9oRZUEgzZxXHhNWr8_-gMblALlevI-wPF__1_QoOa46y0eMefllWqfhxcN1IOhpgOd1y4N9Nx2NYHIOwNE7-M3QaQo6pxltrfOtsNK6R7xladSJ6Va1pkj4DaeCaQtIcf0ZLhRUDYgt1DfXuITPeQV-c-lgMjqi3demWlg2acA4Hb-YmkeRPyyB2bAHpRNTiw2h9uAuhu_l3ze6Eo-NAFn_84MmkiiNJDVk-ROF9Q4LW8LTWmdz4n_SfJjGPrNpmuNhBXRnviKajNhpl5OJtT8P-MbiLQjIme-YRMaq3FuNKIvuYVYP0U3D91okLVg59PwL6fpWXBJkknIXOzghi87hZrSwr1Q92fbYsSsvQ1pU9Er5Gow7eSvwYO99DZ6v7eYk2Lq21OYSlR2JTYlibBDMh4PArrrW6E8-r6pRK8YGX13ZqpUYkihOiLwIUZVrl7wdeQga0EOVdmyMKqnA-7lJDF7b62_-Lbcb6s4f_mUbXNUxl-7fFddb4GKGhPA&uuid=f8065573-c5ba-4f5c-9943-156498a4b1e2&authuser=0&nonce=0p71tiao03cve&user=04425298469843234859&hash=lhi3pv042e3qfgeaabpp6rlltkvr805k

let divs = []; // divs within page
let spans = []; // spans within page
let spanObj = []; // span objects
let fadedSpan = [];
let randDivs = [];
let count = 0;
let isShow = false;
let panelOpen = false;
let index = 0; // check for span creation array
let divSpan = 45;
let divSpanNext = 44;
let panelTop = -150;
let text = "qwertyuiop;:}asdfghjkl#!=+/(){<zxcvb>$%mn359'";// 45 characters
let textMut = text;
let main = document.getElementsByTagName('main');
let handle = document.getElementById('handle');
let panel = document.getElementById('panel');
let removeDiv = false;
let divTimerDelay = 800;
let fadeFactor = 0.2;
let rainLoopSpeed = 80;
let gameTimer;
let randTimer;
let toggleTimer;
let divTimer;
let addRandDiv;
let oldRandDivs;
let keys;
let fadeKeys;
let randTimerMin = 500;
let randTimerMax = 800;
let mutateTimer = setInterval('Mutate()', 500);

function Mutate()
{
  for(let i = 0; i < spanObj.length; i++)
  {
    let randSpan = ((Math.random() * (spanObj.length - 1)) + 0).toFixed(0);
    spanObj[randSpan].Mutate();
  }
} // Mutate()

function SetRandTimer()
{
  divTimerDelay = ((Math.random() * (randTimerMax - randTimerMin)) + randTimerMin).toFixed(0);
} // SetRandTimer()

// create divs
for(let i = 0; i < 85; i++)
{
  divs[i] = document.createElement('div');
  divs[i].setAttribute('class', 'cols');
  divs[i].setAttribute('id', i);
  main[0].appendChild(divs[i]);
  // create spans
  while(index < textMut.length)
  {
    spanObj[count] = new Span();
    spans[count] = spanObj[count].span;
    let alphaIndex = RandAlpha();
    spans[count].innerHTML = textMut.charAt(alphaIndex);
    textMut = textMut.replace(textMut.charAt(alphaIndex), '');
    divs[i].appendChild(spans[count]);
    count++;
  }
  textMut = text;
}

randDivs = RandDiv();

function RandDiv()
{
  let randDivs = []; // local randDivs
  let randRain = ((Math.random() * 5) + 5).toFixed(0);
  for(let i = 0; i < randRain; i++)
  {
    let randNum = (Math.random() * 84).toFixed(0);
    if(!randDivs.includes(randNum))
    {
      randDivs[i] = randNum;
    }
    else
    {
      i--;
    }
  }
  return randDivs; // local randDivs
} // RandDiv()

function RandAlpha()
{
  let randAlpha = (Math.random() * (textMut.length - 1)).toFixed(0);
  return randAlpha;
} //RandAlpha()

function SetKeys()
{
  keys = [];
  fadeKeys = [];
  for(let i = 0; i < randDivs.length; i++)
  {
    keys[i] = randDivs[i] * divSpan;
    fadeKeys[i] = randDivs[i] * divSpan;
  }
} // SetKeys()

SetKeys();
gameTimer = setInterval('RainLoop()', rainLoopSpeed);
divTimer = setInterval('AddRandDiv()', divTimerDelay);
randTimer = setInterval('SetRandTimer()', 100);

function RainLoop()
{
  clearInterval(gameTimer);
  for(let i = 0; i < randDivs.length; i++)
  {
    if(keys[i] == (randDivs[i]*divSpan))
    {
      spanObj[keys[i]].Show();
    }
    else
    {
      if(keys[i] < randDivs[i]*divSpan + divSpan)
      {
        spanObj[keys[i] - 1].Show();
        spanObj[keys[i]].SetAttribute();
      }
      else
      {
        if(spanObj[fadeKeys[i]].opacity >= 0)
        {
          spanObj[fadeKeys[i]].Fade(fadeFactor);
          isShow = false;
        }
        else
        {
          isShow = true;
        }
      }
    }
  }
  if(!isShow)
  {
    for(let i = 0; i < randDivs.length; i++)
    {
      keys[i]++;
    }
  }
  if(isShow)
  {
    for(let i = 0; i < randDivs.length; i++)
    {
      if(randDivs[i] == 0 && fadeKeys[i] == 1)
      {
        if(spanObj[randDivs[i] * divSpan + 1].opacity < 1 && (fadeKeys[i] + 1) < (randDivs[i] * divSpan + divSpan))
        {
          fadeKeys[i]++;
        }
      }
      else
      {
        if(spanObj[randDivs[i] * divSpan].opacity < 1 && (fadeKeys[i] + 1) < (randDivs[i] * divSpan + divSpan))
        {
          fadeKeys[i]++;
        }
      }
    }
    isShow = false;
  }
  for(let i = 0; i < randDivs.length; i++)
  {
    let span = (randDivs[i] * divSpan) + divSpanNext;
    if(spanObj[span].opacity < 0)
    {
      removeDiv = true;
      fadedSpan.push((span - divSpanNext) / divSpan);
    }
  }

  if(removeDiv)
  {
    clearInterval(divTimer)
    for(let i = 0; i < fadedSpan.length; i++)
    {
      for(let j = 0; j < randDivs.length; j++)
      {
        if(fadedSpan[i] == randDivs[j])
        {
          let span = (fadedSpan[i] * divSpan) + divSpanNext;
          spanObj[span].opacity = 0;
          randDivs.splice(j, 1);
          keys.splice(j, 1);
          fadeKeys.splice(j, 1);
        }
      }
    }
    fadedSpan = [];
    removeDiv = false;
    divTimer = setInterval('AddRandDiv()', divTimerDelay);
  }
  gameTimer = setInterval('RainLoop()', rainLoopSpeed);
} // RainLoop()

function AddRandDiv()
{
  addRandDiv = RandDiv();
  oldRandDivs = randDivs;
  randDivs = randDivs.concat(addRandDiv.filter(function (item){
    return randDivs.indexOf(item) < 0;
  }));
  for(let i = oldRandDivs.length; i < randDivs.length; i++)
  {
    keys[i] = randDivs[i] * divSpan;
    fadeKeys[i] = randDivs[i] * divSpan;
  }
} // AddRandDiv()

function ToggleTimer()
{
  toggleTimer = setInterval('ToggleCall()', 55);
} // ToggleTimer()

function ToggleCall()
{
  if(panelOpen)
  {
    if(panelTop > -150)
    {
      panelTop -= 25;
      panel.style.top = panelTop + 'px';
      handle.style.top = panelTop + 150 + 'px';
    }
    else
    {
      handle.innerHTML = '&DownArrow;';
      panelOpen = false;
      clearInterval(toggleTimer);
    }
  }
  else
  {
    if(panelTop < 0)
    {
      panelTop += 25;
      panel.style.top = panelTop + 'px';
      handle.style.top = panelTop + 150 + 'px';
    }
    else
    {
      handle.innerHTML = '&UpArrow;';
      panelOpen = true;
      clearInterval(toggleTimer);
    }
  }
} // ToggleTimer()

function ChangeColor(color)
{
  let count = 0;
  for(let i = 0; i < spanObj.length; i++)
  {
    if(count == 44)
    {
      spanObj[i].ColorChange('white');
      count = 0;
    }
    else
    {
      spanObj[i].ColorChange(color);
      count++;
    }
  }
  handle.style.backgroundColor = color;
} // ChangeColor() change the rain color

function ChangeSpeed(speed)
{
  switch(speed)
  {
    case '1':
      rainLoopSpeed = 120;
      fadeFactor = 0.5;
      randTimerMax = 800;
      randTimerMin = 500;
      break;
    case '2':
      rainLoopSpeed = 80;
      fadeFactor = 0.4;
      randTimerMax = 600;
      randTimerMin = 300;
      break;
    case '3':
      rainLoopSpeed = 40;
      fadeFactor = 0.3;
      randTimerMax = 500;
      randTimerMin = 200;
      break;
  }
} // ChangeSpeed()
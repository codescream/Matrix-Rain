
class Span
{
  constructor()
  {
    this.opacity = 0;
    this.span = document.createElement('span');
    let isIE = /*@cc_on!@*/false || !!document.documentMode;
    let isEdge = !isIE && !!window.StyleMedia;
    let isChrome = navigator.userAgent.indexOf("Chrome") != -1 && !isEdge;
    let isFox = navigator.userAgent.indexOf("Firefox") != -1;
    if(isChrome)
    {
      this.fontSize = 1.0;
      this.transform = 180;
    }
    else if(isFox)
    {
      this.fontSize = 1.12;
      this.transform = 180;
    }
    else if(isEdge)
    {
      this.fontSize = 1.2;
      this.transform = 270;
    }
    this.span.setAttribute('style', 'opacity: ' + this.opacity + '; font-size: ' + this.fontSize + 'em; transform: rotate(' + this.transform + 'deg); line-height: 0.7em; color:' + this.color + '; font-family: Matrix Code NFI;');
    this.color = "limegreen";
    this.text = "qwertyuiop;:}asdfghjkl#!=+/(){<>zxcvb";
  }
  // methods
  Fade(fadeFactor)
  {
    this.opacity -= fadeFactor;
    this.span.setAttribute('style', 'opacity: ' + this.opacity + '; font-size: ' + this.fontSize + 'em; transform: rotate(' + this.transform + 'deg); line-height: 0.7em; color:' +  this.color + '; font-family: Matrix Code NFI;');
  } // Fade(param)
  Mutate()
  {
    let randAlpha = ((Math.random() * 45) + 0).toFixed(0);
    if(this.text.charAt(randAlpha) != '')
    {
      this.span.innerHTML = this.text.charAt(randAlpha);
    }
  } // Mutate()
  SetAttribute()
  {
    this.opacity = 1;
    this.span.setAttribute('style', 'opacity: ' + this.opacity + '; font-size: ' + this.fontSize + 'em; transform: rotate(' + this.transform + 'deg); line-height: 0.7em; color: white; font-family: Matrix Code NFI;');
  } // SetAttribute
  Show()
  {
    this.opacity = 1;
    this.span.setAttribute('style', 'opacity: ' + this.opacity + '; font-size: ' + this.fontSize + 'em; transform: rotate(' + this.transform + 'deg); line-height: 0.7em; color:' + this.color + '; font-family: Matrix Code NFI;');
  } // Show()
  ColorChange(color)
  {
    //alert(color);
    this.span.setAttribute('style', 'opacity: ' + this.opacity + '; font-size: ' + this.fontSize + 'em; line-height: 0.7em; transform: rotate(' + this.transform + 'deg); color:' + color + '; font-family: Matrix Code NFI;');
    this.color = color;
  } // ColorChange(param)
}
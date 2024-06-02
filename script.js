document.getElementById("htmlIDE").defaultValue = 
`<!DOCTYPE html>
<html>
<head>
  <title>Document</title>
</head>
<body>
  
</body>
</html>`;

function coloredTitle() {
  const colors = [
    "purple", "lime", "aqua", "white", "yellow", "red", "green", 
    "blue", "orange", "pink", "gold", "cyan", "magenta", 
    "coral", "indigo", "violet", "salmon", "turquoise", 
    "silver", "chocolate"
  ];
  const title = $('#tt');
  let lastTime = 0;

  function changeColor(currentTime) {
    if (currentTime - lastTime >= 700) {
      let randomIndex = Math.floor(Math.random() * colors.length);
      title.css('color', colors[randomIndex]);
      lastTime = currentTime;
    }
    requestAnimationFrame(changeColor);
  }
  requestAnimationFrame(changeColor);
}
$(document).ready(function() {
  coloredTitle();
});
function showHtml() {
  adjustCols('#cssIDE', 40, '#jsIDE', 40, '#htmlIDE', 150);
  showElements('#htmlTitle', '#htmlIDE');
  hideElements('#cssTitle', '#cssIDE', '#jsTitle', '#jsIDE','#myFrame');
}

function showCss() {
  adjustCols('#htmlIDE', 40, '#jsIDE', 40, '#cssIDE', 150);
  showElements('#cssTitle', '#cssIDE');
  hideElements('#htmlTitle', '#htmlIDE', '#jsTitle', '#jsIDE','#myFrame');
}

function showJs() {
  adjustCols('#htmlIDE', 40, '#cssIDE', 40, '#jsIDE', 150);
  showElements('#jsTitle', '#jsIDE');
  hideElements('#htmlTitle', '#htmlIDE', '#cssTitle', '#cssIDE','#myFrame');
}

function adjustCols(firstIDE, firstSize, secondIDE, secondSize, thirdIDE, thirdSize) {
  $(firstIDE).attr("cols", firstSize);
  $(secondIDE).attr("cols", secondSize);
  $(thirdIDE).attr("cols", thirdSize);
}

function showElements(...elements) {
  elements.forEach(element => $(element).show());
}

function hideElements(...elements) {
  elements.forEach(element => $(element).hide());
}

let isFrameCreated = false;
function runCode() {
  hideElements('#cssTitle', '#cssIDE', '#jsTitle', '#jsIDE','#htmlTitle', '#htmlIDE');
  const htmlContent = $("#htmlIDE").val();
  const bodyContentRegex = /<body>([\s\S]*?)<\/body>/i;
  const matches = bodyContentRegex.exec(htmlContent);
  let bodyContent;
  if (matches && matches.length > 1) {
    bodyContent = matches[1].trim();
  }
  const cssContent = $('#cssIDE').val();
  const jsContent = $('#jsIDE').val();

  const pageContents = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Document</title>
    <style>${cssContent}</style>
  </head>
  <body>
    ${bodyContent}
    <script>${jsContent}<\/script>
  </body>
  </html>`;
  if (!isFrameCreated) {
    const iframe = $("<iframe id='myFrame' width='100%' height='100%'> </iframe>");
    $('#section').append(iframe);
    isFrameCreated = true;
  }
  const iframe = $('#myFrame');
  const iframeDocument = iframe[0].contentDocument || iframe[0].contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(pageContents);
  iframeDocument.close();
  $('#myFrame').show();
}
let themeShown = false;
function showThemes(){
  if(!themeShown){
    $('#ulThemes').css('display','block');
    themeShown = !themeShown;
  }else if(themeShown){
    $('#ulThemes').css('display','none');
    themeShown = !themeShown;
  }
  
}
function changeTheme(){
  if($('#themes').val() == 'normal'){
    $('#header').css('backgroundColor','rgb(34, 40, 49');
    $('#sidebar').css('backgroundColor','rgb(0, 173, 181)');
    $('body').css('backgroundColor','rgb(250,250,250)');
    $('#section').css('backgroundColor','rgb(250,250,250)');
    $('button').removeClass('btn-dark').addClass('btn-light');
    $('h2').css('color','black');
  }
  else if($('#themes').val() == 'light'){
    $('#header').css('backgroundColor','rgb(210,211,219)');
    $('#sidebar').css('backgroundColor','rgb(228,229,241)');
    $('body').css('backgroundColor','rgb(250,250,250)');
    $('#section').css('backgroundColor','rgb(250,250,250)');
    $('button').removeClass('btn-dark').addClass('btn-light');
    $('h2').css('color','black');
  }
  else if($('#themes').val() == 'dark'){
    $('#header').css('backgroundColor','rgb(99, 89, 133)');
    $('#sidebar').css('backgroundColor','rgb(68, 60, 104)');
    $('body').css('backgroundColor','rgb(24, 18, 43)');
    $('#section').css('backgroundColor','rgb(24, 18, 43)');
    $('button').removeClass('btn-light').addClass('btn-dark');
    $('h2').css('color','white');
  }
}

 // Media query to detect screen size changes
 const mediaQuery = window.matchMedia('(max-width: 800px)');

 function handleMediaChange(e) {
   if (e.matches) {
     $('#btnJS').text('js');
     $('#btnRun').text('');
     $('#btnRun').append('<i class="bi bi-play" style="font-size: 1.5rem; color: #0e80e3;" ></i>');
   }else {
    $('#btnJS').text('JAVASCRIPT');
    $('#btnRun').text('Run Code');
  }
 }

 // Initial check
 handleMediaChange(mediaQuery);

 // Add listener for media query changes
 mediaQuery.addEventListener('change', handleMediaChange);
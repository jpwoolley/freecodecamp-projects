// elements
var editor = document.getElementById('editor');
var viewer = document.getElementById('preview');

// variables
initialMarkup = 
`<h1>Welcome to Markdown Previewer!</h1>
<p>This previewer is powered by <a href="https://github.com/markedjs/marked?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library">Marked</a>.</p>
<h2>How to use</h2>
<p>Delete the placeholder markdown from the input area and replace it with your own GitHub flavoured markdown to view it in the preview box below.</p>
<p>For example, you can include...</p> 
<ul>
<li>lists</li>
<li><code>codeblocks</code></li>
<li><blockquote>blockquotes</blockquote></li>
<li><p>Cat photos</p>
<img src="https://images.pexels.com/photos/1314550/pexels-photo-1314550.jpeg?cs=srgb&dl=pexels-katarzyna-modrzejewska-1314550.jpg&fm=jpg" alt="cat photos" height="100px"></li>
<li><p>and <strong>much</strong>, <strike>much</strike>, <i>more</i>...</li>
</ul>
`


// functions
function pageLoad(){
    editor.value = initialMarkup;
    viewer.innerHTML = marked.parse(initialMarkup)
    editor.style.height = `256px`
}

function updatePreview(e){
    viewer.innerHTML = marked.parse(e.target.value);
}

function setTextareaHeight(){
    var text = editor.value;
    var lines = text.split(/\r|\r\n|\n/);
    var count = lines.length
    var newHeight = count * 16;
    editor.style.height = `${newHeight}px`
}

// event listeners
window.addEventListener('load', pageLoad, false)
editor.addEventListener('input', function(e){updatePreview(e)}, false);
editor.addEventListener('input', setTextareaHeight, false);
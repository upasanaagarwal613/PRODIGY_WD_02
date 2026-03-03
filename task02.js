let ms=0,sec=0,min=0,hr=0;
let timer=null;
let running=false;

/* TIMER */
function update(){
ms+=10;
if(ms==1000){ms=0;sec++;}
if(sec==60){sec=0;min++;}
if(min==60){min=0;hr++;}
displayTime();
}

function displayTime(){
let h=hr<10?"0"+hr:hr;
let m=min<10?"0"+min:min;
let s=sec<10?"0"+sec:sec;
let milli=ms<100?"0"+(ms/10):ms/10;
document.getElementById("display").innerText=
h+":"+m+":"+s+":"+milli;
}

function start(){
if(!running){
running=true;
timer=setInterval(update,10);
}
}

function pause(){
running=false;
clearInterval(timer);
}

function reset(){
running=false;
clearInterval(timer);
ms=sec=min=hr=0;
displayTime();
}

/* NOTES */
function addNote(){
let text=document.getElementById("noteText").value;
if(text==="") return;

let time=document.getElementById("display").innerText;
let note={time,text};

let notes=JSON.parse(localStorage.getItem("notes"))||[];
notes.push(note);
localStorage.setItem("notes",JSON.stringify(notes));

renderNotes();
document.getElementById("noteText").value="";
}

function renderNotes(){
let notes=JSON.parse(localStorage.getItem("notes"))||[];
let list=document.getElementById("noteList");
list.innerHTML="";
notes.forEach((n,i)=>{
let div=document.createElement("div");
div.className="item";
div.innerHTML=`<span>[${n.time}] ${n.text}</span>
<button onclick="deleteNote(${i})">X</button>`;
list.appendChild(div);
});
}

function deleteNote(i){
let notes=JSON.parse(localStorage.getItem("notes"))||[];
notes.splice(i,1);
localStorage.setItem("notes",JSON.stringify(notes));
renderNotes();
}

/* THEME */
function toggleTheme(){
let menu=document.getElementById("themeMenu");
menu.style.display=menu.style.display==="block"?"none":"block";
}

function setTheme(type){
document.body.className=type;
document.getElementById("themeMenu").style.display="none";
}

renderNotes();
displayTime();

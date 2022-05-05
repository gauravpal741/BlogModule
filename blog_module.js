
function formsubmit(event) {
    // prevent page reloading
    event.preventDefault();
    let inputval = document.getElementById("demo");
    let descval = document.getElementById("demo1");

    // check data exist into the localstrage 
    let blogall = localStorage.getItem("blog_data");

    if (blogall == null) {
        // if initially there is no data in localstorage
        arr = [{
            'title': inputval.value,
            'desc': descval.value,
        }];
        localStorage.setItem("blog_data", JSON.stringify(arr));
    }
    else {
        arr = JSON.parse(blogall);
        arr.push({
            'title': inputval.value,
            'desc': descval.value,
        });
    }
    localStorage.setItem("blog_data", JSON.stringify(arr));
    inputval.value = "";
    descval.value = "";
    myfun();

    myfun();    
}


// manage_block
function myfun() {
    let listrecord = document.getElementById("box");
    let list = "";
    let blogdata = localStorage.getItem("blog_data");
    let blogarr = JSON.parse(blogdata);
    blogarr.forEach((item, index) => {
        list += `<h3 id="oldtitle"> ${item.title}</h3 > <br> <h4 id="olddesc"> ${item.desc}</h4> <button onclick="delblog(${index})">DELETE</button> <button onclick="edit(${index})">EDIT </button> <br> <br>
        <form onsubmit="newadd(event)" id="${index}" style="display:none;">
        <input type='hidden' id='uid' value=${index}>
        TITLE : <textarea id="newtitle" row="1">${item.title}</textarea>
        DESCRIPTION : <textarea id="newdesc">${item.desc}</textarea> 
        <button type="submit">ADD</button>
        </form> 
        <hr>`
        // <div id="${index}" style= "display:none;">
        // TITLE : <textarea id="newtitle" row="1">${item.title}</textarea>
        // DESCRIPTION : <textarea id="newdesc">${item.desc}</textarea> 
        // <button onclick="newadd(${index})" id="newadd">ADD</button>
        // </div>;
    });
    if (blogarr.length != 0) {
        listrecord.innerHTML = list;
    }
    else {
        listrecord.innerHTML = "No recorrd";
    }
}
myfun();

function delblog(e) {
    let olda = localStorage.getItem("blog_data");
    let oldarr = JSON.parse(olda);
    oldarr.splice(e, 1);
    localStorage.setItem("blog_data", JSON.stringify(oldarr));
    myfun();
}

// edit
var select_blog = null;
function edit(e) {
    select_blog = e;
    document.getElementById(e).style.display = "block";
}

// re-add edit value  
function newadd(f) {
    f.preventDefault()
    let editdata = localStorage.getItem("blog_data");
    let edit_data = JSON.parse(editdata);

    e_form=document.getElementById(select_blog);
    userid=document.getElementById("uid").value;
    e_title=document.getElementById("newtitle").value;
    e_desc=document.getElementById("newdesc").value;
    let y=document.getElementById(select_blog).children;

    
    


    console.log(y);
    console.log(y[0]);
    console.log(y[1]);
    // console.log(e_form);
    // console.log(e_title);
    // console.log(e_desc);
   let new_edit_blog={
       'title':y[0],
       'desc':y[1],
   }
   console.log(new_edit_blog);
   edit_data[select_blog]=new_edit_blog
   localStorage.setItem('blog_data',JSON.stringify(edit_data))
   
   document.getElementById(select_blog).style.display = "none";
   document.getElementById("newtitle").value="";
   document.getElementById("newdesc").value="";
}

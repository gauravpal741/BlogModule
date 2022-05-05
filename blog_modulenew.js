
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
        TITLE : <textarea id="newtitle${index}" row="1">${item.title}</textarea>
        DESCRIPTION : <textarea id="newdesc${index}">${item.desc}</textarea> 
        <button type="submit">ADD</button>
        </form> 
        <hr>`
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
    let fid = f.target.id ;
    let editdata = localStorage.getItem("blog_data");
    let edit_data = JSON.parse(editdata);
    e_form=document.getElementById(select_blog);
    rowId = document.getElementsByTagName('form')[select_blog].id;
    let e_title=document.getElementById(`newtitle${fid}`).value;
    let e_desc= document.getElementById(`newdesc${fid}`).value;
    let y=document.getElementById(select_blog).children;

    let returndata = edit_data.filter((items, index)=>{
       return  rowId == index;
    });
    returndata[select_blog]=e_title;
    let newarr= { 
        'title':e_title,
        'desc': e_desc,
    }
    edit_data[select_blog]=newarr;
    localStorage.setItem('blog_data', JSON.stringify(edit_data));
    document.getElementById(`newtitle${fid}`).value="";
    document.getElementById(`newdesc${fid}`).value="";
    document.getElementById(select_blog).style.display = "none";

}
 
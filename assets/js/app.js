let cl = console.log;
const postInfo = document.getElementById('postInfo');
const title = document.getElementById('title');
const info = document.getElementById('info');
const postform = document.getElementById('postform');
const submitBtn = document.getElementById('submit');
const updateBtn = document.getElementById('update');

let BaseUrl = `http://localhost:3000/posts`;

/* fetch(BaseUrl,{
    method : 'GET'
}) */
localStorage.setItem('Token', "Bearer Token: qwertyuiop")
// fetch returns promise
function fetchData(url, methodname, obj){
    return fetch(url,{
        method : methodname,
        body : obj,
        headers:{
            "content-type": "application/json; charset=UTF-8",
            authrazation: localStorage.getItem('Token'),
        }
    })
            .then(res => res.json()) //res.json ()also returns promise
};
fetchData(BaseUrl, 'GET') // it returns promise
                .then(data => templating(data))
                .catch(cl)


function templating(arr){
    let result = '';
    arr.forEach((ele) => {
        result +=  `
        <div class="card mt-2" data-id="${ele.id}">
            <div class="card-body">
                <h3>${ele.title}</h3>
                <p>${ele.body}</p>
                <p class="text-right">
                    <button class="btn btn-primary" onclick="onEditHandler(this)">
                            edit
                    </button>
                    <button class="btn btn-danger" onclick="onDeleteHandler(this)">
                            Delete
                    </button>
                </p>
            </div>
        </div>
        `
    });
    postInfo.innerHTML = result;
}

const onEditHandler = (ele) => {
   // cl(ele)
   let getId = ele.closest('.card').dataset.id;
   localStorage.setItem('getId',getId)
   cl(getId);
   let editUrl = `${BaseUrl}/${getId}`;

   fetchData(editUrl, 'GET')
        .then(res => {
            cl(res)
            title.value = res.title
            info.value= res.body;
            updateBtn.classList.remove('d-none');
            submitBtn.classList.add('d-none');
        })
}

const updateHandler = (e) =>{

    let obj = {
        title : title.value,
        body : info.value
    }

    let getId = localStorage.getItem('getId');
    //cl(getId)
    let updateUrl = `${BaseUrl}/${getId}`;
    
    fetchData(updateUrl, 'PATCH', JSON.stringify(obj))
                .then(cl)
                .catch(cl)

}

const onDeleteHandler = (ele) => {
    let getId = ele.closest('.card').dataset.id;
    let DeleteUrl = `${BaseUrl}/${getId}`;
    fetchData(DeleteUrl, 'DELETE')
                .then(cl)
                .catch(cl)
}

const onPostSubmit = (eve) =>{
    eve.preventDefault();
    let obj ={
        title : title.value,
        body : info.value,
        userId :""+Math.ceil(Math.random() *10)
    }
    eve.target.reset()

    cl(obj)
  /*   fetch(BaseUrl, {
       method: "post", 
       body: JSON.stringify(obj),
       headers:{
        "content-type": "application/json; charset=UTF-8",
        'authrazation': "Bearer Token qwertyuiop",
    }, */

   // })
   fetchData(BaseUrl, "post", JSON.stringify(obj))
    .then(res => cl(res))
    .catch(cl)
}

updateBtn.addEventListener('click',updateHandler)
postform.addEventListener('submit', onPostSubmit);


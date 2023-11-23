const cl = console.log;

const posts = document.getElementById("postcontainer");



//html 5 gives us some browser API 
//Called as webStorages, fetch,etc
//Before html 5 we are using XHR(XMLHttpRequest) in
//order to API call which is given by Javascript, it helps
//to transfer and get data communication betn browser and server



//will get dumy json data from backened 

let baseurl = `https://jsonplaceholder.typicode.com`;
        //here, it is a baseurl containing all form of data 

let posturl = `${baseurl}/posts`;
        //here, we get post content by giving end point posts will get post
        //data from base url

// now we have the data url need to do API call and get data for templating;

//########## POST METHOD ############


// ######## TEMPLATING ###########

const templating = eve => {
    let result = " ";
    eve.forEach(ele => {
        result += `
        <div class="col-md-8 offset-md-2">
            <div class="card mb-2">
                <div class="card-header bg-dark text-white">
                    ${ele.title}
                </div>
                <div class="card-body">
                    <p>${ele.body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-outline-primary">Edit</button>
                    <button class="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </div>
        `
    });

    posts.innerHTML = result;
}

//####### GET METHOD ###########
const geturl = () => {
    
// ########## STEPS : 

//1] create a instance/object;

let xhr = new XMLHttpRequest();//it is a construction which is used to create multiple object;

//2] configuration of API; using api method

    //syntax: xhr.open(method,url,true)
    //method represent the method we have to use to do task e.g get,post,put,patch,delete 
    //should always write in capital
    //url represet the url of data/object
    //true : it is by default true is asynchronous and false is synchronous


    xhr.open("GET", posturl, true);
    //here we get the posts data/object using open api method asynchronously here we call the api result will be
    //resolve / reject
    
    xhr.send();//always get response either solve and reject;

    xhr.onload = function(){  //result is onloading

        cl(xhr.status);//it gives the response if api is successfull as 200
        //while we send data(posts) and if it is successfull response as 201
        //404 if api is unsuccessfull it will throw error as 404
        // cl(xhr.statusText);
        cl(xhr.response); //if api is successfull will use xhr.response to get the data for functionality and templating,etc


        if(xhr.status === 200){ //here , if api is successfull then only next expression should execute
            let data = JSON.parse(xhr.response);
            cl(data);// here, from backened or db or server the data will always come in stringify format
                        //and key is also stringified by using parse method we converted stringify to object;

            templating(data);
        }else{
            alert("something went wrong!!!")
        }

    }
}
 
geturl();
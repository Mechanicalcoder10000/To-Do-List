let form=document.getElementById("itemform");
let inputItem=document.getElementById("itemInput");
let itemsList=document.getElementById("itemsList");
let filters=document.querySelectorAll(".nav-item");
let alert_div=document.getElementById("alert_div");

let todoitems=[];

// alert and other messages

const alertMsg=function(message,className){
    alert_div.innerHTML=message;
    alert_div.classList.add(className,"show");
    alert_div.classList.remove("hide");
    setTimeout(()=>{
    alert_div.classList.add("hide");
    alert_div.classList.remove("show");},3000
    );
    return;

};


//get data from local storage

 const getLocalStorage=function(){
   
     const localItems=localStorage.getItem("todoitems");
     if(localItems===undefined || localItems===null){
         todoitems=[];


     }
     else{
         todoitems=JSON.parse(localItems);
         console.log(todoitems);
     }
     setInList(todoitems);
 }
 //handle the events
 const handleItem=function(item_data){
     const items=document.querySelectorAll(".list-group-item");
     items.forEach(item=>{
            
         if(item.querySelector(".title").getAttribute("data-time")==item_data.addAt){
             item.querySelector('[data-done]').addEventListener("click",function(e){
                 e.preventDefault();
                const itemIndex=todoitems.indexOf(item_data);
              
                const currItem=todoitems[itemIndex];
                const currClass=currItem.isDone ?  "bi-check2" :"bi-check-all";
        
    
                currItem.isDone=currItem.isDone? false:true;
                todoitems.splice(itemIndex,1,currItem);
                setInLocalStorage(todoitems);
                const icon_class=currItem.isDone ?  "bi-check2" :"bi-check-all";
                this.firstElementChild.classList.replace(currClass,icon_class);
                const filterVal=document.querySelector("#TabValue").value;
                filerItems(filterVal);
                alertMsg("Congo!! You have completed the task","alert-success");
             });
            };
             //edit
             if(item.querySelector(".title").getAttribute("data-time")==item_data.addAt){
                item.querySelector('[data-edit]').addEventListener("click",function(e){
                    e.preventDefault();
                    inputItem.value=item_data.name;
                    document.querySelector("#objInd").value=todoitems.indexOf(item_data);
                    alertMsg("Your update has been recorded","alert-success");
                

                });
            }
                item.querySelector('[data-delete]').addEventListener("click",function(e){
                    e.preventDefault();
                    itemsList.removeChild(item);
                    removeItem(item);
                    setInLocalStorage(todoitems);
                    alertMsg("Item succesfully deleted","alert-success");


                });

                


         
    
     });
    }

 // add into list

 const setInList=function(todoitems){
     itemsList.innerHTML="";
     if(todoitems.length >0){
         todoitems.forEach((item) => {
            const  class_icon=item.isDone ;
            console.log(class_icon);
            if(class_icon==false){
                var cuustyle= "bi-check2"
            }
            else{
                cuustyle= " bi-emoji-smile";
            };
         
             itemsList.insertAdjacentHTML("beforeend",` <li class="list-group-item d-flex justify-content-between align-item-center fs-3 mb-1 border border-dark "><span class="title" data-time="${item.addAt}">${item.name }</span>
             <span >
                 <a href="#" class="ms-1 fs-4" data-done><i class="bi ${cuustyle}"></i></a>
                 <a href="#" class="ms-2 fs-4" data-edit ><i class="bi bi-pencil-square"></i></a>
                 <a href="#" class="ms-2 fs-4" data-delete><i class="bi bi-calendar-x-fill"></i></a>
             </span></li>`);
             handleItem(item);
             
         });

     }
     else{
         
        itemsList.insertAdjacentHTML("beforeend",` <li class="list-group-item d-flex justify-content-between align-item-center fs-3"><span >$No Record Found !! Congo You finished All</span>
        </li>`);

     }
 }


 //update function making
  const updateFunction=function(currIndex,itemname){
      const updateTerm=todoitems[currIndex];
      updateTerm.name=itemname;
      todoitems.splice(currIndex,1,updateTerm);
      setInLocalStorage(todoitems);
      setInList(todoitems);


  }

// set in local Storage

function setInLocalStorage(todoitems){
 
    localStorage.setItem("todoitems",JSON.stringify(todoitems));
};
document.addEventListener("DOMContentLoaded",()=>{
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
       const ItemName=inputItem.value.trim();

       if(ItemName.length==0){
           
        alertMsg("Please write something","alert-danger");
       }
       else{

        
      const currIndex=document.querySelector("#objInd").value;
        if(currIndex){
            //update
            console.log(currIndex);
            updateFunction(currIndex,ItemName);
            document.querySelector("#objInd").value="";


        }
        else{
            const ItemObj={
                name:ItemName,
                isDone:false,
                addAt:new Date().getTime()
 

        }
        todoitems.push(ItemObj);
        alertMsg("New item has been added","alert-success");
      
           };
         
           setInLocalStorage(todoitems);
           setInList(todoitems);
             
          
      
       }
       inputItem.value="";

    });

    filters.forEach((tab)=>{
        tab.addEventListener("click",function(e){
            e.preventDefault();
            const tabType=this.getAttribute("data-type");
            document.querySelectorAll(".nav--link").forEach(nav=>{
                nav.classList.remove("active");
            });
            this.firstElementChild.classList.add("active");
            filerItems(tabType);
            document.querySelector("#TabValue").value=tabType;
        })
    })
    getLocalStorage();


 });
 const removeItem=function(item){
     const currInd=todoitems.indexOf(item);
     todoitems.splice(currInd,1);

 }
 // filter items
 const filerItems=function(type){
     let filterItems=[];
     switch(type){
         case "Pending":
         filterItems=todoitems.filter(item=>!item.isDone);
         break;
         case "Completed":
             filterItems=todoitems.filter(item=>item.isDone);
             break;
             default:
                 filterItems=todoitems;
     }
     setInList(filterItems);
 }

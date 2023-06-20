import React, { useEffect, useState } from "react";
import {saveAs} from "file-saver";
import Image from "next/image";


const home=()=> {
  const getLocalStorage = () => {
    if (typeof window !== 'undefined') { 
    let list = localStorage.getItem("data");
    if (list) {
        return (list = JSON.parse(localStorage.getItem("data")))
    } else {
        return [];
    }
  }
  };
const [input,setInput]=useState("");
const [data,setData]=useState(getLocalStorage());
const [title,setTitle]=useState("");
const [isediting, setIsediting] = useState([]);
const [del,setDel]=useState([]);
   const handleClick = (id)=>{
    // console.log("first",id)
    const down = data.filter((item) => item.id == id.id);
    console.log("test",down);
    let var1 = Object.entries(down);
          const var2 = var1[0][1];
    let url = var2.input
    let title =var2.title
    saveAs(url, title);
   }


   const handleEdit=(id)=>{console.log(id,"id")
    const down = data.filter((item) => item.id == id.id);
    
    let var1 = Object.entries(down);           
    const var2 = var1[0][1];
    console.log(var2.input,"dd")

          setInput(var2.input);
          setTitle(var2.title);
    setIsediting(id);
         
   }

    const editItems =()=>{
      const editItem = data.find((item) => {
        if(item.title == isediting.title&& item.input==isediting.input){
          return item.title = title,
          item.input=input
        }else{
          let add ={title:title ,input: input}
          setData([add,...data]);
        }

      });
      // console.log("first", editItem)
    setInput(editItem)
    setTitle(editItem)

    }
   const handleSave=()=>{
    if(input!==""){
    setData([{ id: `${Date.now()}`,input,title }, ...data])

    }
    // setData(input)
   }
   const handledelete =(i)=>{
    setData(data.filter((item) => item!==i));
    // console.log(">>>>>item",data)
  }
  const handleCheck = (id) => {
  
    setDel([...del, id])
}

const DownloadAll =()=>{
console.log(">>>",del)
del.map((item)=>saveAs(item.input))
}


   useEffect(()=>{
    localStorage.setItem("data", JSON.stringify(data))
  })
 
   return (
     <>
    
         <input value={input} onChange={(e)=>setInput(e.target.value)}></input>
         <input value={title} placeholder="title..." onChange={(e)=>setTitle(e.target.value)}></input>

         <button onClick={handleSave}>save</button>
         <button onClick={()=>editItems()}>edit items</button>
         <button onClick={()=>DownloadAll()}>download items</button>


         
          {data &&data.map(val=>{

           return(
            <div>
            
         <button onClick={()=>handleClick(val)}>Dowload image</button>
         <button onClick={()=>handleEdit(val)}>Edit</button>
         <button onClick={()=>handledelete(val)}>delete</button>
         <input type="checkbox" className='checkbox' onChange={() => handleCheck(val)} value={val} checked={val.ischecked} />
              <Image src={val.input} width="300" height="100" alt="image"/>
               <h1>{val.title}</h1>
            </div>
           )
          })}
        
     </>
   );
}


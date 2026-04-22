import React, { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
function Crud() {
    const [formData, setFormData] = useState({
      Name: '', Email: '', age: "0", Password: '', Id:'',
    });
    const [isUpdating,setIsUpdating]= useState(false)
    const [users,setUsers]= useState([])
  
    const handleInputChange = (event) => {
      setFormData((prev)=>({ ...prev, [event.target.name]: event.target.value }));
      console.log(formData);
      
    };
  
  
     const getallusers= async()=>{
      try {
        const {data}= await axios.get("http://localhost:1000/user") // note - data is the json response which is send as response from backend
        console.log("allUsers",data.users);
        setUsers(data.users)
        console.log("list of all users",data.users);      
      } catch (error) {
        console.log(error);
      }
    }
  
    const handleSubmit = async (event) => {
      try {
        console.log(isUpdating);
        
        if(!isUpdating){
          const { Id, ...dataToPost } = formData;
          alert(dataToPost.Name);
          const {data} = await axios.post('http://localhost:1000/user/info',dataToPost);
          alert(data?.Message)
          getallusers()
          setFormData({Name: '', Email: '', age: 0, Password: '', Id:'', })
          
        }else{
          const {data} = await axios.put('http://localhost:1000/user/info',formData);
          alert(data?.Message)
          getallusers()
          setFormData({Name: '', Email: '', age: 0, Password: '', Id:'', })
          setIsUpdating(false)
          
        }
      } catch (error) {
        console.log(error);
      }
    };
  
   
  
    const updateuser = async(data)=>{
      console.log(formData);
     setFormData({
          Name: data.Name, Email: data.Email, age: data.age, Password: data.Password, Id:data._id
        });
      setIsUpdating(true);
      
    }
    
    const deleteUser = async (id) => {
      try {
        const { data } = await axios.delete(
      "http://localhost:1000/user/info",
      {
        data: { Id: id }
      }
    );
          alert(data?.Message)
          getallusers()
        
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(()=>{
      getallusers();
    },[])
  return (
    <>
      <div className="p-8 bg-white min-h-screen font-sans text-slate-700 flex flex-wrap gap-4 items-end mb-10">
      {/* Input Form Section */}
      <div className="flex flex-wrap gap-4 items-end mb-10">
        <div className=" flex-1 min-w-[150px]">
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input name="Name" value={formData.Name} onChange={handleInputChange} placeholder="Book Name" className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input name="Email" value={formData.Email} onChange={handleInputChange} placeholder="Book Title" className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-semibold mb-1">Age</label>
          <input name="age" value={formData.age} onChange={handleInputChange} placeholder="Author" className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400" />
        </div>
        <div className="flex-1 min-w-[100px]">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input name="Password" value={formData.Password} onChange={handleInputChange} placeholder="Selling Price" className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400" />
        </div>
        <button onClick={() => handleSubmit()} className="bg-[#2D3748] text-white px-6 py-2 rounded font-bold hover:bg-slate-700 transition">SUBMIT</button>
      </div>
      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase border-b">
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Password</th>
              <th className="py-3 px-4 font-semibold">age Price</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr, index) => (
              <tr key={usr.id} className={index % 2 !== 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-4 px-4">{usr.Name}</td>
                <td className="py-4 px-4">{usr.Email}</td>
                <td className="py-4 px-4">{usr.age}</td>
                <td className="py-4 px-4">
                  <span className={index === 1 ? "bg-blue-600 text-white px-1" : ""}>{usr.Password}</span>
                </td>
                <td className="py-4 px-4 flex justify-center gap-2">
                  <button onClick={() => deleteUser(usr._id)} className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
                    🗑️
                  </button>
                  <button onClick={() => updateuser(usr)} className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200">
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Crud;

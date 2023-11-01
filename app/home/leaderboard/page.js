"use client";
import React, { useEffect, useState } from "react";
import { fetchAllUsersWithProgress } from "@/firebase/firebase.utils";
import Spinner from "@/components/Spinner/Spinner";
function page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const usersData = await fetchAllUsersWithProgress();
      setUsers(usersData);
      console.log(usersData);
    }

    fetchData();
    setLoading(false);
  }, []);

  return (
    
      loading ? 
        <Spinner />
       :    
        <div>   
        <h1 className="text-3xl text-red-500 text-center">LeaderBoard</h1>
      {  users.map((user, index) => (
          <div key={index} className="text-2xl ">
         {index+1}.   {user.name}  <span className="text-green-500">Progress</span>  --- {user.progress}
          </div>
        ))}
      
      </div>
      
   
  
  )
}

export default page;

"use client";
import React, { useEffect, useState } from "react";
import { fetchAllUsersWithProgress } from "@/firebase/firebase.utils";
import ReactCountryFlag from "react-country-flag";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner/Spinner";
function page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userReducer.user);

  const [selectedLanguage, setSelectedLanguage] = useState(user.want_to_learn);
console.log({"user":user})
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
  }
    useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const usersData = await fetchAllUsersWithProgress();
      const filteredUsersData= usersData.filter(a => a.language == selectedLanguage)
      setUsers(filteredUsersData);
      console.log(filteredUsersData);
    }

    fetchData();
    setLoading(false);
  }, [selectedLanguage]);

  return (
    
      loading ? 
        <Spinner />
       :    
        <div className="flex flex-col justify-center ">   
        <h1 className="text-3xl text-red-500 text-center">LeaderBoard</h1>
      <div className="flex flex-row-reverse">
        <label >
         <span className="text-2xl text-yellow-500">Language : </span> 
          <select name="language" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="English">English</option>
    <option value="Spanish">Spanish</option>
          </select>
        </label>
      </div>
       
        <table className="table-fixed">
  <thead>
    <tr>
      <th className="px-4 py-2 text-3xl ">Name</th>
      <th className="px-4 py-2 text-3xl">Progress</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={index} className={`${index%2 ? "" : "bg-gray-600 text-white "} text-2xl`}>
        <td className=" px-4 py-2">
          {index + 1}. {user.name}
        </td>
        <td className=" px-4 py-2 text-green-500">
           {user.progress}%
        </td>
      </tr>
    ))}
  </tbody>
</table>

      
      </div>
      
   
  
  )
}

export default page;

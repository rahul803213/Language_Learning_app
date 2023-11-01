"use client"
import React,{useEffect} from 'react'
import Sidebar from '@/components/sidebar/SideBar'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { setCurrentUser } from '@/redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { removeTokenFromLocalMeansLogout,getTokenFromLocal } from '@/client-helper/authHelper'
function page() {
  const token = getTokenFromLocal();
  const dispatch = useDispatch();
   const Router = useRouter();
useEffect(()=>{
 if(  !token ) {
 // dispatch(removeCurrentUser());
  removeTokenFromLocalMeansLogout();
  Router.push('/login');}
  else{
    const token=getTokenFromLocal();
    dispatch(setCurrentUser(token));
  }
},[token,Router])

    const pathname = usePathname();
  return (
    <div className='flex flex-row w-full'>
    hellow
    </div>
  )
}

export default page

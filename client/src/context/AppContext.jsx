
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {useState, useEffect } from "react";
axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({children})=>{
  const [isAdmin,setIsAdmin]= useState(false);
  const [shows,setShows]= useState([]);
  const [favouriteMovies,setFavouriteMovies]= useState([]);

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const {user}= useUser();
  const {getToken}= useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchIsAdmin= async ()=>{
    try {
      const {data}= await axios.get('/api/admin/is-admin',{headers:{Authorization:`Bearer ${await getToken()}`}})// here not providing the complete url as only adding path , baseUrl is already added above
      
      setIsAdmin(data.isAdmin);
      console.log(data.isAdmin);

      if(!data.isAdmin && location.pathname.startsWith("/admin")){
        navigate("/");
        toast.error("You are not authorized to access admin dashboard");
      }
    
    } catch (error) {
      
      console.log(error);
    }
  }

  const fetchShows = async ()=>{
    try {
      const {data} = await axios.get("/api/show/all");
      if(data.success){
        setShows(data.shows);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchFavouriteMovies = async ()=>{
    try {
      const {data} = await axios.get("/api/user/favourites",{headers:{Authorization:`Bearer ${await getToken()}`}})
      if(data.success){
        setFavouriteMovies(data.movies);
      }
      else{
        toast.error(data.message);
      }
    
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchShows();
  },[])

  useEffect(()=>{
    if(user){

      fetchIsAdmin();
      fetchFavouriteMovies();
    }
  },[user])

  const value = {
    axios,
    fetchIsAdmin,
    user,getToken,navigate,isAdmin,shows,favouriteMovies,fetchFavouriteMovies,image_base_url
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext= ()=>useContext(AppContext);
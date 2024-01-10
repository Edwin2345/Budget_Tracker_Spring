import Navbar from "../components/styles/Navbar"
import TableComp from "../components/dashboard/TableComp";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { SUMMARY_REQUEST_BASE_URL, EXPENSE_REQUEST_BASE_URL } from "../components/utils/baseUrls";



function TablePage(){

 //data and search state
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  async function fetchData(){
    try{
      const respData = await axios.get(EXPENSE_REQUEST_BASE_URL);

      setData(respData.data.map( (el) => {
          return {...el, amount: parseFloat(el.amount)};
      }));
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
  fetchData()
  },[])


  //Search Function
  async function searchHandler(e){
     e.preventDefault();
     try{
       const respData =  await axios.get(`${SUMMARY_REQUEST_BASE_URL}/search?summary=${searchTerm}`)
      
       setData(respData.data.map( (el) => {
          return {...el, amount: parseFloat(el.amount)};
       }));
     }
     catch(e){
      console.log(e);
     }
  }

  //Reset Function
  async function resetHandler(){
    try{
       await fetchData();
       setSearchTerm("");
    } 
    catch(e){
      console.log(e);
    }
  }

  //Delete Function
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);


  async function deleteHandler(){
    try{
      await axios.delete(`${EXPENSE_REQUEST_BASE_URL}/${deleteId}`)
      handleOpen();
      await resetHandler();
    }
    catch(e){
      console.log(e);
    }
  }

return(
 <div className="app">
    <Navbar/>
    <div className="w-full mt-[5rem] flex flex-col items-center h-[100vh]">
      <div className="bg-black w-[80%] pt-2 pb-[2rem] px-6 mt-6"> 
        <h1 className="text-4xl font-bold mb-[2rem] mt-5 text-white">Expense Table</h1>
        <div className="flex justify-end mb-6">
          <form onSubmit={searchHandler}>
            <input
                  required
                  name="summary"
                  maxLength={30}
                  placeholder="search for expense"
                  onChange={(e)=>setSearchTerm(e.target.value)}
                  value={searchTerm}
                  className="border-2 border-black p-2 w-[25rem] mb-2 font-bold text-black"
            />
            <button className=" p-2 mb-2 text-white rounded-sm bg-green-700" >
              Search
            </button>
          </form>
          <button onClick={resetHandler}  className=" p-2 mb-2 ml-3 text-white rounded-sm bg-blue-700" >
             Reset
          </button>
        </div>
        <TableComp  tableData={data} setDeleteId={setDeleteId} handleOpen={handleOpen}/>
      </div>
    </div>
   <Dialog open={open} handler={handleOpen} size="xs" className="text-center">
    <DialogHeader className="text-center justify-center">Confirm Expense Deletion?</DialogHeader>
    <DialogFooter className="flex justify-center">
      <Button variant="gradient" color="red"  onClick={handleOpen}className="mr-6">
        <span>Cancel</span>
      </Button>
      <Button variant="gradient" color="green" onClick={deleteHandler}>
        <span>Confirm</span>
      </Button>
    </DialogFooter>
  </Dialog>
 </div>
)
}

export default TablePage;
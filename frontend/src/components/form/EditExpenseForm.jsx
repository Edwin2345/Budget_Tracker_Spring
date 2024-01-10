import {Card,Typography,} from "@material-tailwind/react";
import categoriesArr from "../utils/catergories";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";
import { EXPENSE_REQUEST_BASE_URL } from "../utils/baseUrls";

function EditExpenseForm(){
  
const navigate = useNavigate();

const [expense, setExpense] = useState({
    summary: "",
    amount: '',
    date: "",
    categoryId: 1,
})

const {id} = useParams();

useEffect(()=>{
  async function fetchExpense(){
    try{
       const resp = await axios.get(`${EXPENSE_REQUEST_BASE_URL}/${id}`);
       console.log(resp);
       setExpense((e)=>{return {...e, summary: resp.data.summary, amount: resp.data.amount, date: resp.data.date, categoryId: resp.data.categoryId}});
    }
    catch(e){
      console.log(e);
    }
  }
  fetchExpense();
},[])



function changeHandler(evt){
setExpense( (prev) => {
    let newValue = evt.target.value;

    if(evt.target.name === "amount" || evt.target.name === "categorId"){
    newValue = parseFloat(evt.target.value)
    }

    return  {...prev, [evt.target.name]: newValue}
})
}

async function submitHandler(evt){

    evt.preventDefault();
    setExpense({summary: "", amount: '',date: "", categoryId: 1});

    try{
     await axios.put(`${EXPENSE_REQUEST_BASE_URL}/${id}`, expense);
     navigate(-1);
    }
    catch(e){
    console.log(e);
    } 
}


    return(
        <Card color="white" className="p-6 w-[80%] h-[90%]" shadow={false}>
        <form className="mt-8 mb-2" onSubmit={submitHandler}>
        <div className="mb-1 flex flex-col gap-3">
            <Typography variant="h2" color="blue-gray" className="mb-4">
                Edit an Expense
            </Typography>
            <Typography variant="h5" color="blue-gray">
                Expense Summary
            </Typography>
            <input
                required
                name="summary"
                maxLength={30}
                placeholder="Ex: Car Repair"
                onChange = {changeHandler}
                value={expense.summary}
                className="border-2 border-black p-2 rounded-md mb-2 font-bold text-black"
            />
            <Typography variant="h5" color="blue-gray">
                Amount
            </Typography>
            <input
                name="amount"
                type="number"
                size="sm"
                required
                min={0}
                max={99999.99}
                step="0.01"
                placeholder="0.00"
                onChange = {changeHandler}
                value={expense.amount}
                className="border-2 border-black p-2 rounded-md mb-2 font-bold text-black"
            />
            <Typography variant="h5" color="blue-gray">
                Expense Date
            </Typography>
            <input
                required
                name="date"
                type="date"
                onChange = {changeHandler}
                value={expense.date}
                className="border-2 border-black p-2 rounded-md mb-2 font-bold text-black"
            />
            <Typography variant="h5" color="blue-gray">
                Category
            </Typography>
            <select   onChange={changeHandler} value={expense.categoryId} name="categoryId" className="p-3 border-2 rounded-md border-black mb-2 font-bold text-black">
            {categoriesArr.map( (c)=>{
                return <option key={c.id} value={c.id}>{c.value}</option>
                })}
            </select>
            <button className="my-3 rounded-md text-[1.2rem] font-bold text-white p-3 rounded-md bg-blue-700" >
             Update Expense
            </button>
         </div>
        </form>
        </Card>
    )

}

export default EditExpenseForm;
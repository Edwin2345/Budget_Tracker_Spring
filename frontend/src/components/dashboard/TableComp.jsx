import {
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon} from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import categoriesArr from "../utils/catergories";
import { useNavigate } from "react-router-dom";


 
const TABLE_HEAD = ["Expense Summary", "Amount", "Category", "Date", "", ""];
 

 

export function TableComp({tableData, setDeleteId, handleOpen}) {
   
  const navigate = useNavigate();

   //redirect to edit page with id
   function editHandler(id, summary, amount, category){
      navigate(`/edit/${id}`, {state: {summary, amount, category}})
   }

   function deleteHandler(id){
       setDeleteId(id);
       handleOpen();
   }


  return (
  <>
    <Card className="h-fit w-full rounded-none p-0 m-0">
      <CardBody className="overflow-scroll p-0 m-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="h5"
                    color="black"
                    className="flex items-center justify-between gap-2 font-bold leading-none "
                  >
                    {head}{" "}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map(
              ({ id, summary, amount, date, categoryId }, index) => {
                const isLast = index ===  tableData.length - 1;
                const classes = isLast
                  ? "p-2"
                  : "p-2 border-b border-blue-gray-50";
 
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold text-[1.1rem] text-ellipsis"
                        >
                          {summary}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold text-[1.1rem]"
                        >
                          {amount.toFixed(2)}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={categoriesArr[categoryId-1].value}
                          color={categoriesArr[categoryId-1].color}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="font-bold text-[1.1rem]"
                      >
                        {date}
                      </Typography>
                    </td>
                     <td className={classes}>
                      <Tooltip content="Edit Expense">
                        <IconButton variant="text" onClick={() => editHandler(id, summary, amount, categoryId)}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                     <td className={classes}>
                      <Tooltip content="Delete Expense">
                        <IconButton variant="text" onClick={() => deleteHandler(id)}>
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </>
  );
}

export default TableComp;
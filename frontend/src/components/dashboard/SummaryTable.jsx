
import {
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";


 
const TABLE_HEAD = ["Category", "Total Amount", "Average Expense"];
 
export function SummaryTable({summaryData}) {

  //Calculate total
  const totalSum  = summaryData.reduce((sum, value) => sum + value.total_amount, 0);
  const finalData =  [...summaryData, {category: "Total", total_amount: totalSum, average_expense: (totalSum/summaryData.length)}]

  return (
    <Card className="h-fit rounded-none p-0 m-0">
      <CardBody className="overflow-scroll p-0 m-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="h5"
                    color="black"
                    className="flex items-center justify-between gap-2 font-bold leading-none text-center"
                  >
                    {head}{" "}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {finalData.map(
              ({ category, total_amount, average_expense}, index) => {
                const isLast = index === finalData.length - 1;
                const classes = isLast
                  ? "p-2 border-b border-blue-gray-50 font-extrabold text-[1.12rem]"
                  : "p-2 border-b border-blue-gray-50 font-bold text-[1.12rem]";
 
                return (
                  <tr key={category}>
                    <td>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={classes}
                        >
                          {category}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={classes}
                        >
                          {total_amount.toFixed(2)}
                        </Typography>
                      </div>
                    </td>
                   <td>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={classes}
                        >
                          {average_expense.toFixed(2)}
                        </Typography>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default SummaryTable;

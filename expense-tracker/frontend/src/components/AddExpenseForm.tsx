import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Expense {
  name: string | number | readonly string[] | undefined;
  amount: number | null;
  category: string | number | readonly string[] | undefined;
}
interface AddExpenseFormProps {
  setRenderId: React.Dispatch<React.SetStateAction<number>>;
}
const AddExpenseForm = ({ setRenderId }: AddExpenseFormProps) => {
  const handleExpenseForm = () => {
    console.log("clicked");
  };
  const addMore = () => {
    if (!expense.name || !expense.amount || !expense.category) {
      alert("Please fill all the fields");
      return;
    }
    setExpenseList((prev) => [...prev, expense]);
    setExpense({
      name: undefined,
      amount: null,
      category: undefined,
    });
  };
  const saveExpense = () => {
    if (!expense.name || !expense.amount || !expense.category) {
      alert("Please fill all the fields");
      return;
    }
    setExpenseList((prev) => [...prev, expense]);
  };
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [expense, setExpense] = useState<Expense>({
    name: undefined,
    amount: null,
    category: undefined,
  });
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      <form className="w-4/5 h-3/5 flex flex-col items-center border py-4 gap-4 rounded-md overflow-y-scroll md:w-[60%]">
        <div className="w-[90%] h-4 flex justify-end">
          <AiOutlineClose
            className="w-6 h-6 hover:bg-gray-300"
            onClick={() => setRenderId(0)}
          />
        </div>
        <h2 className="w-[90%] h-8 text-center text-2xl font-medium">
          Add Expense
        </h2>
        <div className="w-[90%] h-10">
          <input
            type="text"
            placeholder="Name"
            value={expense.name}
            onChange={(e) => {
              setExpense((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
            className="w-full h-full border border-gray-400 rounded-md pl-3"
          />
        </div>
        <div className="w-[90%] h-10">
          <input
            type="number"
            placeholder="Amount"
            className="w-full h-full border border-gray-400 rounded-md pl-3"
            value={expense.amount || ""}
            onChange={(e) => {
              setExpense((prev) => {
                return { ...prev, amount: Number(e.target.value) };
              });
            }}
          />
        </div>
        <div className="w-[90%] h-10">
          <select
            title="Category"
            value={expense.category}
            className="w-full h-full border border-gray-400 rounded-md pl-3"
            onChange={(e) => {
              setExpense((prev) => ({ ...prev, category: e.target.value }));
            }}
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="shopping">Shopping</option>
            <option value="grocery">Grocery</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="w-[90%] h-10 flex justify-end gap-4">
          <button
            className="w-24 h-full border-green-600 rounded-md bg-blue-600 text-white"
            onClick={(e) => {
              e.preventDefault();
              addMore();
            }}
          >
            Add More
          </button>
          <button
            className="w-16 h-full border-green-600 rounded-md bg-green-600 text-white"
            onClick={(e) => {
              e.preventDefault();
              saveExpense();
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;

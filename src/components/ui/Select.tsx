export interface SelectProps {
  id: string;
  datas: string[];
  label: string;
}

const Select = ({ id, datas, label }: SelectProps) => {
  return (
    <div className="relative">
      <select
        id={id}
        className="block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer
    border focus:border-2 text-base"
      >
        {datas.map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`
         absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white  px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:-translate-y-4 left-1
       `}
      >
        {label}
      </label>
    </div>
  );
};

export default Select;

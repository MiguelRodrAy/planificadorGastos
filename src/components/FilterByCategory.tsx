import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import { ChangeEvent } from "react";

const FilterByCategory = () => {
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "FILTER",
      payload: { id: e.target.value },
    });
  };

  return (
    <div className='p-10 bg-white shadow-lg rounded-lg '>
      <form>
        <div className='flex flex-col md:flex-row gap-5 md:items-center'>
          <label htmlFor='category'>Filtrar Gastos por Categoría</label>
          <select
            id='category'
            className='bg-slate-100 p-3 flex-1 rounded'
            onChange={(e) => handleChange(e)}
          >
            <option value=''>Todos los gastos</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default FilterByCategory;

import { Check } from 'phosphor-react';

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What is your goal?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: do exercises, sleep well..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
      />
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Which days of the week?
      </label>
      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-teal-700 hover:bg-teal-600"
      >
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  );
}

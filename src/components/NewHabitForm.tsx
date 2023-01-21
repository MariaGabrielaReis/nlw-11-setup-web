import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';

const weekDaysNames = [
  'Sunday',
  'Monday',
  'Tueday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

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
      <div className="mt-3 flex flex-col gap-2">
        {weekDaysNames.map(day => {
          return (
            <Checkbox.Root key={day} className="flex items-center gap-3 group">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-blue-600 group-data-[state=checked]:border-blue-600">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              <span className="text-white leading-tight ">{day}</span>
            </Checkbox.Root>
          );
        })}
      </div>

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

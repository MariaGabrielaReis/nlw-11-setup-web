import { FormEvent, useState } from 'react';
import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { api } from '../lib/axios';

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
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) return;

    await api.post('/habits', {
      title,
      weekDays,
    });
    setTitle('');
    setWeekDays([]);
    alert('Habit created successfully!');
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
    } else {
      setWeekDays([...weekDays, weekDay]);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What is your goal?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: do exercises, sleep well..."
        autoFocus
        onChange={event => setTitle(event.target.value)}
        value={title}
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      />
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Which days of the week?
      </label>
      <div className="mt-3 flex flex-col gap-2">
        {weekDaysNames.map((day, index) => {
          return (
            <Checkbox.Root
              key={index}
              onCheckedChange={() => handleToggleWeekDay(index)}
              checked={weekDays.includes(index)}
              className="flex items-center gap-3 group focus:outline-none "
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-blue-600 group-data-[state=checked]:border-blue-600 transition-colors group-focus:ring-2 group-focus:ring-blue-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
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
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-teal-700 hover:bg-teal-600 transition-colors focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  );
}

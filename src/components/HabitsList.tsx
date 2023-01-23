import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitListProps {
  date: Date;
}

interface HabitsInfo {
  possibleHabits: Array<{ id: string; title: string; created_ad: string }>;
  completedHabits: string[];
}

export function HabitsList({ date }: HabitListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  async function getHabitsList() {
    const { data } = await api.get('/day', {
      params: {
        date: date.toISOString(),
      },
    });
    setHabitsInfo(data);
  }

  useEffect(() => {
    getHabitsList();
  }, []);

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted =
      habitsInfo?.completedHabits.includes(habitId);

    await api.patch(`habits/${habitId}/toggle`);

    let completedHabits = isHabitAlreadyCompleted
      ? habitsInfo!.completedHabits.filter(id => id !== habitId)
      : [...habitsInfo!.completedHabits, habitId];

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map(habit => (
        <Checkbox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          className="flex items-center gap-3 group"
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-blue-600 group-data-[state=checked]:border-blue-600">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}

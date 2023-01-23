import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface HabitDayProps {
  date: Date;
  amount?: number;
  defaultCompleted?: number;
}

export function HabitDay({
  date,
  amount = 0,
  defaultCompleted = 0,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 border-2 rounded-lg', {
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
          'bg-teal-900 border-teal-800':
            completedPercentage > 0 && completedPercentage < 20,
          'bg-teal-800 border-teal-600':
            completedPercentage >= 20 && completedPercentage < 40,
          'bg-teal-600 border-teal-500':
            completedPercentage >= 40 && completedPercentage < 60,
          'bg-teal-500 border-teal-400':
            completedPercentage >= 60 && completedPercentage < 80,
          'bg-teal-400 border-teal-300': completedPercentage >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">
            {dayOfWeek.toLowerCase()}
          </span>
          <span className="mt-1 font-bold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

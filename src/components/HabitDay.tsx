import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';

interface HabitDayProps {
  amount: number;
  completed: number;
}

export function HabitDay(props: HabitDayProps) {
  const completedPercentage = Math.round(
    (props.completed / props.amount) * 100
  );

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
          <span className="font-semibold text-zinc-400">Friday</span>
          <span className="mt-1 font-bold leading-tight text-3xl">20/01</span>

          <ProgressBar progress={completedPercentage} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

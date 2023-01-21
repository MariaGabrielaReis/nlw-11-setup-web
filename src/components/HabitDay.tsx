import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import { Check } from 'phosphor-react';

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

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-blue-600 group-data-[state=checked]:border-blue-600">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Drink water
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

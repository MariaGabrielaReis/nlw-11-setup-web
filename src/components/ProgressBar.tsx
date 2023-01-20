import * as Bar from '@radix-ui/react-progress';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <Bar.Root
      value={props.progress}
      className="h-3 rounded-xl bg-zinc-700 w-full mt-4"
    >
      <Bar.Indicator
        className="h-3 rounded-xl bg-teal-600 "
        style={{
          width: `${props.progress}%`,
        }}
      />
    </Bar.Root>
  );
}

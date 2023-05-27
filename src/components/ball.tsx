interface BallProps extends React.HTMLAttributes<HTMLDivElement> {
  noAnimation?: boolean;
}

export default function Ball({ ...props }: BallProps) {
  return (
    <div
      className={`rounded-full shadow-[inset_0_-2vh_5vh_#1c1b1b30] 
      bg-white h-[20vh] aspect-square flex 
      ${!props.noAnimation && "animate-pulseIn"}
      text-pink-950
      items-center justify-center text-[14vh] ${props.className}`}
    >
      {props.children}
    </div>
  );
}

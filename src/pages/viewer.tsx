import Ball from "@/components/ball";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Viewer() {
  const [bollsSorted, setBollsSorted] = useState<string[]>([""]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const cacheBolls = JSON.parse(localStorage.getItem("bolas")!) || [];
    bollsSorted[0] == "" && setBollsSorted(cacheBolls);

    const handleReceiveMessage = (event: MessageEvent) => {
      setBollsSorted(event.data as string[]);
    };

    const broadcastChannel = new BroadcastChannel("bolasChannel");
    broadcastChannel.addEventListener("message", handleReceiveMessage);

    return () => {
      broadcastChannel.removeEventListener("message", handleReceiveMessage);
      broadcastChannel.close();
    };
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-2 gap-4 ${inter.className}`}
    >
      {!showAll && (
        <Ball key={bollsSorted[0]} className="!h-[50vh] !text-[30vh]">
          {bollsSorted[0]}
        </Ball>
      )}

      {showAll ? (
        <div
          className="max-h-min justify-center  flex flex-wrap gap-x-[0.9vh] 
            border-red-700 border-2 no-scrollbar py-[2vh] rounded-[4vh] cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {bollsSorted.map((bola, index) => (
            <div key={bola} className="flex flex-col items-center gap-[1vh] ">
              <p className="h-[3vh] text-[2.5vh] font-medium text-red-700">
                {index == 0 && "●"}
              </p>

              <Ball>{bola}</Ball>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="max-h-min justify-center  flex gap-[0.9vh] 
            border-red-700 border-2 no-scrollbar p-[1vh]  rounded-full  cursor-pointer"
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          {bollsSorted.slice(1, 10).map((bola, index) => (
            <Ball key={bola} noAnimation>
              {bola}
            </Ball>
          ))}
        </div>
      )}
    </main>
  );
}

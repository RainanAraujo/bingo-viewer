import Link from "next/link";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [newBollSorted, setNewBollSorted] = useState<string>("");
  const [bollsSorted, setBollsSorted] = useState<string[]>([""]);
  const [bollToEdit, setBollToEdit] = useState<string>("");
  const [bollToDelete, setBollToDelete] = useState<string>("");
  const [bollEditValue, setBollEditValue] = useState<string>("");

  useEffect(() => {
    const cacheBolls = JSON.parse(localStorage.getItem("bolas")!) || [];
    bollsSorted.length == 1 &&
      bollsSorted[0] == "" &&
      setBollsSorted(cacheBolls);
  }, []);

  const isDuplicated = (bola: string): boolean => {
    if (bollsSorted.includes(bola)) {
      alert("Bola já sorteada");
      return true;
    }
    return false;
  };

  const handleSubmit = (bola: string) => {
    if (!isDuplicated(bola)) {
      setBollsSorted([bola, ...bollsSorted]);
      const bolas: string[] = JSON.parse(localStorage.getItem("bolas")!) || [];
      bolas.unshift(bola);
      localStorage.setItem("bolas", JSON.stringify(bolas));
      const broadcastChannel = new BroadcastChannel("bolasChannel");
      broadcastChannel.postMessage(bolas);
    }
  };
  const editBoll = () => {
    console.log(bollToEdit);
    if (!isDuplicated(bollEditValue)) {
      const newBolas = bollsSorted.map((bola) => {
        if (bola == bollToEdit) {
          return bollEditValue;
        }
        return bola;
      });
      localStorage.setItem("bolas", JSON.stringify(newBolas));
      setBollsSorted(newBolas);
      const broadcastChannel = new BroadcastChannel("bolasChannel");
      broadcastChannel.postMessage(newBolas);
    }
  };

  const deleteBoll = () => {
    const newBolas = bollsSorted.filter((bola) => bola != bollToDelete);
    localStorage.setItem("bolas", JSON.stringify(newBolas));
    setBollsSorted(newBolas);
    const broadcastChannel = new BroadcastChannel("bolasChannel");
    broadcastChannel.postMessage(newBolas);
  };

  const resetBollsSorted = () => {
    localStorage.setItem("bolas", JSON.stringify([]));
    setBollsSorted([]);
    const broadcastChannel = new BroadcastChannel("bolasChannel");
    broadcastChannel.postMessage([]);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-2 gap-4 ${inter.className}`}
    >
      <Link
        href="/viewer"
        target="_blank"
        className="
        border-2 bg-red-700  rounded-md p-2 text-white"
      >
        Página de visualização
      </Link>
      <h2 className="text-2xl text-center ">Nova bola sorteada</h2>
      <input
        className="border-2 border-red-700 rounded-md p-3 w-80"
        type="number"
        value={newBollSorted}
        accept="number"
        max={75}
        min={1}
        onChange={(event) => setNewBollSorted(event.target.value)}
        placeholder="Bola Sorteada"
      />
      <button
        className="border-2  duration-200 border-red-700 text-red-700 rounded-md p-2 w-28 hover:bg-red-700 hover:text-white"
        type="submit"
        onClick={() => handleSubmit(newBollSorted)}
      >
        Enviar
      </button>
      <div className="w-full border-y-[1px] border-red-300" />
      <div className="w-full flex flex-col items-center gap-3">
        <div>
          <h1 className="text-2xl text-center mb-2 ">Bolas Sorteadas</h1>
          <div
            className="max-h-min justify-center  flex gap-[0.9vh]
            border-red-700 border-2 no-scrollbar p-1 rounded-md"
          >
            {bollsSorted.map((bola, index) => (
              <div
                key={index}
                className="border-2 border-red-700 rounded-md p-2 text-center"
              >
                {bola}
              </div>
            ))}
          </div>
        </div>

        <div className="w-[500px] flex flex-col items-center  gap-2">
          <h3>Editar uma bola</h3>
          <div className="flex gap-2 w-full">
            <select
              className="border-2 border-red-700 rounded-md p-3 w-full"
              value={bollToEdit}
              onChange={(event) => setBollToEdit(event.target.value)}
            >
              <option value="">Selecione uma bola</option>
              {bollsSorted.map((bola, index) => (
                <option key={index} value={bola}>
                  {bola}
                </option>
              ))}
            </select>
            <input
              className="border-2 border-red-700 rounded-md p-3 w-full"
              type="number"
              value={bollEditValue}
              accept="number"
              max={75}
              min={1}
              onChange={(event) => setBollEditValue(event.target.value)}
              placeholder="Novo valor"
            />
          </div>

          <button
            className="border-2  duration-200 border-red-700 text-red-700 rounded-md p-2 w-28 hover:bg-red-700 hover:text-white"
            type="submit"
            onClick={editBoll}
          >
            Editar
          </button>
        </div>
        <div className="w-[500px] flex flex-col items-center  gap-2">
          <h3>Deletar uma bola</h3>
          <div className="flex gap-2 w-full">
            <select
              className="border-2 border-red-700 rounded-md p-3 w-full"
              value={bollToDelete}
              onChange={(event) => setBollToDelete(event.target.value)}
            >
              <option value="">Selecione uma bola</option>
              {bollsSorted.map((bola, index) => (
                <option key={index} value={bola}>
                  {bola}
                </option>
              ))}
            </select>

            <button
              className="border-2  duration-200 border-red-700 text-red-700 rounded-md p-2 w-28 hover:bg-red-700 hover:text-white"
              type="submit"
              onClick={deleteBoll}
            >
              Deletar
            </button>
          </div>
        </div>
      </div>

      <button
        className="fixed right-5  duration-200 bottom-5 font-bold text-xs text-red-800 bg-white p-2 rounded-md hover:bg-red-800 hover:text-white"
        onClick={resetBollsSorted}
      >
        LIMPAR TUDO
      </button>
    </main>
  );
}

import { ContatoForm } from "./components/ContatoForm";
import { ContatoCards } from "./components/ContatoCards";

export default function ContatoSection() {
  return (
    <section id="contato" className="mx-auto -mt-6">
      {/* Banner Superior da Seção */}
      <div className="bg-primary dark:bg-primary-foreground flex flex-col items-center pt-20 text-white w-full h-[45vh] space-y-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl">FALE CONOSCO</h3>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Marque uma conversa</h1>
        <h4 className="text-center text-lg sm:text-xl md:text-2xl">
          Preencha o formulário abaixo que
          <br />
          vamos retornar o contato
        </h4>
      </div>

      {/* Grid Principal Inferior */}
      <div className="p-6 sm:p-8 md:p-12 mx-auto flex flex-col md:flex-row-reverse gap-10 -mt-16 sm:-mt-30 md:-mt-35 lg:-mt-40 bg-background dark:bg-background shadow-2xl z-10 rounded-xl w-[95%] md:w-[100vh] h-fit relative">
        {/* Lado Direito/Principal: Formulário envelopado no container correto */}
        <div className="rounded-xl border dark:border-border p-6 sm:p-8 w-full md:flex-1">
          <ContatoForm />
        </div>

        {/* Lado Esquerdo: Cards de Contatos Isolados */}
        <ContatoCards />
      </div>
    </section>
  );
}

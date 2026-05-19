import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContatoCards() {
  const cardsContacts = [
    {
      label: "Email",
      text: "breno.oliveira2011@hotmail.com",
      icon: <Mail size={32} color="white" />,
    },
    {
      label: "Telefone",
      text: "(85) 98570-3660",
      icon: <Phone size={32} color="white" />,
    },
    {
      label: "Endereço",
      text: "Fortaleza, Ceará",
      icon: <MapPin size={32} color="white" />,
    },
  ];

  return (
    <div className="w-full md:w-[35%]">
      <div className="mb-8">
        <h2 className="text-primary dark:text-primary-foreground text-3xl md:text-4xl font-bold">Mande-nos uma mensagem</h2>
        <p className="text-card-foreground dark:text-card-foreground text-sm md:text-base">Ou fale conosco por alguma das formas abaixo</p>
      </div>
      <div className="grid grid-cols-1 gap-8 w-fit">
        {cardsContacts.map((item, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <div className="border border-dashed border-black dark:border-white p-1 rounded-full">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary dark:bg-primary-foreground">{item.icon}</div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm md:text-md font-semibold text-card-foreground dark:text-card-foreground">{item.label}</p>
              <span className="text-card-foreground dark:text-card-foreground text-xs md:text-md">{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

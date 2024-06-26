"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaRegCreditCard, FaLock } from "react-icons/fa6";
import PaymentInput from "../Input/PaymentInput";
import AccordionItem from "../Accordion/AccordionItem";
import Accordion from "../Accordion/Accordion";
import ButtonLink from "../Button/ButtonLink";

const MethodForm = ({ children }) => {
  const [openIndex, setOpenIndex] = useState(1);

  const handleItemClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [cardNumber, setCardNumber] = useState("");

  // Event handler untuk memperbarui nilai input dan memformat nomor kartu
  const handleCreditChange = (e) => {
    let input = e.target.value;

    input = input.replace(/\D/g, "");

    let formattedInput = "";
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += " ";
      }
      formattedInput += input[i];
    }
    setCardNumber(formattedInput);
  };

  const [cvv, setCvv] = useState("");

  // Event handler untuk memperbarui nilai input dan memformat nomor kartu atau CVC
  const handleCvvChange = (e) => {
    let input = e.target.value;

    // Hapus spasi dan karakter non-digit
    input = input.replace(/\D/g, "");

    // Format nomor kartu atau CVC secara otomatis dengan menambahkan spasi setiap 4 karakter
    let formattedInput = "";
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += " ";
      }
      formattedInput += input[i];
    }

    // Update state dengan nilai input yang diformat
    setCvv(formattedInput);
  };

  const contentPaypal = () => {
    return (
      <div className="flex flex-col gap-4">
        <PaymentInput
          type="text"
          label="Card Number"
          value={cardNumber}
          onChange={handleCreditChange}
          placeholder="0000 0000 0000"
          maxLength="12"
          icon={<FaRegCreditCard size={20} />}
        />

        <div className="flex items-center justify-between gap-5">
          <PaymentInput
            type="text"
            label="Date"
            value={cardNumber}
            onChange={handleCreditChange}
            placeholder="00 / 00"
            maxLength=""
            icon={<FaLock size={18} />}
          />
          <PaymentInput
            type="text"
            label="CVC/CVV"
            value={cvv}
            onChange={handleCvvChange}
            placeholder="000"
            maxLength=""
            icon={<FaLock size={18} />}
          />
        </div>
        <div className="flex items-center gap-1 text-grey1">
          <FaLock size={10} />
          <p className="text-xs">
            Your transaction is secured with ssl certificate
          </p>
        </div>
      </div>
    );
  };

  const methodItem = [
    {
      title: "Paypal",
      icon: (
        <Image src="/assets/paypal.png" width={20} height={20} alt="paypal" />
      ),
      content: contentPaypal(),
    },
    {
      title: "Credit Card",
      icon: (
        <Image
          src="/assets/credit-card.png"
          width={150}
          height={20}
          alt="credit-card"
        />
      ),
      content: contentPaypal(),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <Accordion>
        {methodItem.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            icon={item.icon}
            color="boxInput"
            isOpen={openIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </Accordion>
      <ButtonLink href={"/my-booking"}>Submit</ButtonLink>
    </div>
  );
};

export default MethodForm;

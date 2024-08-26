import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./text-reveal-card";

export const TextCard = () => {
  return (
    
    <div
      className="flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full">
      <TextRevealCard text="You know the business" revealText="Password-Generator..">
        <TextRevealCardTitle>
          Sometimes, you just need to Create a strong password.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          Ensuring your account is properly secured helps protect your personal
          information and data.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>

  )
}



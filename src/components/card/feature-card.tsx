import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  description: string;
  imgUrl: string;
};

const FeatureCard = ({ title, imgUrl, description }: Props) => {
  return (
    <div className="py-4 px-2 flex items-center rounded-md gap-3 bg-white min-w-[350px] max-w-96 ">
      <div className="w-[100%]">
        <Image width={100} height={100} src={imgUrl} alt="feature" />
      </div>
      <div>
        {" "}
        <p className="text-[16px] font-semibold ">{title}</p>{" "}
        <span className="text-sm font-normal text-[#868686] ">
          {description}
        </span>{" "}
      </div>
    </div>
  );
};

export default FeatureCard;

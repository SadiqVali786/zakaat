import WrapperCard from "./wrapper-card";
import Image, { StaticImageData } from "next/image";

const PotentialContact = ({
  fullName,
  dp,
}: {
  fullName: string;
  dp: StaticImageData;
}) => {
  return (
    <WrapperCard className="flex justify-between items-center py-[10px] px-[20px]">
      <div className="flex gap-x-1 items-center">
        <Image src={dp} alt="more" />
        <div className="flex flex-col leading-tight">
          <p className="text-blue-50">{fullName}</p>
          <p className="text-neutral-7">
            @{fullName.toLowerCase().replace(" ", "-")}
          </p>
        </div>
      </div>
      <span className="text-[26px]">+10</span>
    </WrapperCard>
  );
};

export default PotentialContact;

import Image from "next/image";
import React from "react";
import me from "../../public/me.jpg";
function Card() {
  return (
    <div className=" border-black flex md:justify-end md:right-[10%]  w-full absolute justify-center top-44 sm:-z-10" >

    <div className="relative w-36 h-44 md:w-40 md:h-52 ">
      <Image
        src={me}
        alt="it's me"
        className="object-contain rounded-lg"
        fill={true}
        sizes="100%"
      />
    </div>
  </div>
  );
}

export default Card;

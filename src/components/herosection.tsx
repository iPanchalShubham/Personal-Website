"use client";
import React from "react";
import Card from "./card";
import ProjectCard from "./projectsSection/projectCard";
import ChatButton from "./chat/chat";
import { NavigationMenuDemo } from "./navigation";
import OptionsTabs from "./optionsTabs";

function Herosection() {
  return (
    <div>
      <div >
        <video
          id="background-video"
          loop
          autoPlay
          muted
          className="object-cover -z-10"
          style={{
            position: "relative",
            width: "100%",
            height: "15rem",
            left: 0,
            top: 0,
            inset: 0,
          }}
        >
          <source
            src={
              "https://res.cloudinary.com/shubhamvishwa/video/upload/v1691510880/Untitled_video_-_Made_with_Clipchamp_3_pufzto.mp4"
            }
            // className="h-full w-full fixed"
            type="video/mp4"
          />
        </video>

        <div className="font-medium text-5xl w-full   flex flex-col  md:h-fit  absolute top-20 z-20 pl-16 text-white ">
          <div>Projects.</div>
          <div>Facinations.</div>
          <div>Ideas.</div>
        </div>
        {/* <div className="inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] absolute"></div> */}
      </div>
      <section className="w-full flex flex-col gap-y-6 md:inline-block md:gap-y-0">
        <div>
          <Card />
        </div>
        <div className=" font-semibold text-3xl py-2 text-center md:text-left md:pl-16 rounded-b-lg w-full mt-10">
          {/* <NavigationMenuDemo/> */}
          <OptionsTabs />
        </div>
      </section>
      <ChatButton />
    </div>
  );
}

export default Herosection;

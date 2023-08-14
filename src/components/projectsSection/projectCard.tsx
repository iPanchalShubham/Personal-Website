import Image from "next/image";
import React from "react";
import tempImage from "../../../public/visualiScreenshot.png";
import { ProjectType } from "../optionsTabs";
type MyComponentProps = {
  dialogHandler: (DialogTrigger?:any) => void;
  projectContent: ProjectType;
};
const ProjectCard: React.FC<MyComponentProps> = ({ dialogHandler,projectContent }) => {
  return (
    <div
      className="w-72 h-52 shadow rounded cursor-pointer "
      onClick={() => dialogHandler()}
    >
      <div className="relative w-full h-44">
        <Image
          src={projectContent.imgUrl}
          className="object-contain rounded-lg"
          fill={true}
          alt="project name"
        />
      </div>
      <div className="text-center items-center font-bold  mt-2">
        {projectContent.name}
      </div>
    </div>
  );
};

export default ProjectCard;

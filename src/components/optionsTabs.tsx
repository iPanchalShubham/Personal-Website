"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState, useEffect } from "react";
import ProjectCard from "./projectsSection/projectCard";
import ComingSoon from "./comingsoon";
import { Button } from "./ui/button";
import Link from "next/link";
import ProjectDialog from "./projectDialog";
import { data } from "autoprefixer";

export interface ProjectType {
  deployment: string;
  description: string;
  imgUrl: string;
  name: string;
  posts: { socialSite: string; post: string };
  videoUrl: string;
}
function OptionsTabs() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [projectContent, setProjectContent] = useState<ProjectType>();
  // const [projectsToFetchArray, setProjectsToFetchArray] = useState<any>([]);

  const dialogHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  // responses will be caches by default

  const fetchProjectsData = async () => {
    const res = await fetch(
      "https://api.github.com/repos/ipanchalshubham/reposToFetchForPortfolio/readme",
      {
        next: {
          revalidate: 60,
        },
      }
    );
    await res
      .json()
      .then((data) => JSON.parse(atob(data.content).replace(/\n/g, "")))
      .then((data) => {
        setProjects(data);
      });
  };
  useEffect(() => {
    fetchProjectsData();
  }, []);
  return (
    <div>
      <Tabs defaultValue="projects" className="w-full h-full text-base ">
        <div className="space-x-2">
          <TabsList>
            <TabsTrigger value="projects" className="">
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="open_source"
              className="space-x-0.5 items-center"
            >
              <div>Open Source</div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </span>
            </TabsTrigger>
          </TabsList>
          <Link
            href={"/ShubhamResumeLight.pdf"}
            locale={false}
            download={"fullStackShubhamResume.pdf"}
          >
            <Button variant={"link"}>
              <div>Resume</div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </span>
            </Button>
          </Link>
        </div>

        <TabsContent value="projects">
          {/* Projects display */}
          <div className="grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-3 gap-4 w-full mt-10 sm:mt-24 justify-center justify-items-center">
            {projects?.map((project) => (
              <div
                onClick={() => setProjectContent(project)}
                key={project.name}
              >
                <ProjectCard
                  dialogHandler={dialogHandler}
                  projectContent={project}
                />
              </div>
            ))}
          </div>
          <div>
            {projectContent ? (
              <ProjectDialog
                open={open}
                onOpenChange={setOpen}
                projectContent={projectContent}
              />
            ) : (
              ""
            )}
          </div>
        </TabsContent>
        <TabsContent value="open_source">
          <ComingSoon />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OptionsTabs;

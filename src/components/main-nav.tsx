"use client";
import React from "react";
import { MainNavItem } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import { Button } from "./ui/button";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  return (
    <div>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex ">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {/* <Button variant={"ghost"}> */}
              {item.title}

              {/* </Button> */}
            </Link>
          ))}
        </nav>
      ) : (
        ""
      )}
    </div>
  );
}

export default MainNav;

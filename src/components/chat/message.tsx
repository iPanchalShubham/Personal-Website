import React from "react";
import { MsgType } from "../utils";
import { cn } from "@/lib/utils";
function Message({
  msgObj,
}: {
  msgObj: {
    text: string;
    msgMetaData: { type: MsgType.ai | MsgType.human; isLoading: boolean };
  };
}) {
  return (
    <div
      className={`w-full max-h-fit  ${
        msgObj.msgMetaData.type === MsgType.human ? "flex justify-end" : ""
      }`}
    >
      <div
        className={cn(
          "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
          msgObj.msgMetaData.type === "ai"
            ? "bg-muted"
            : "ml-auto bg-primary text-primary-foreground"
        )}
      >
        {msgObj.msgMetaData.isLoading ? (
          <div className="flex items-center justify-center space-x-1 animate-pulse bg">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        ) : (
          msgObj.text
        )}
      </div>
    </div>
  );
}

export default Message;

"use client";
import React, { useState } from "react";
import { MsgType } from "../utils";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
export const runtime = "edge";

interface Msg {
  id: number;
  text: string | undefined;
  msgMetaData: { type: MsgType; isLoading: boolean };
}

function ChatInput({
  setMessages,
  pastMessages,
}: {
  setMessages: any;
  pastMessages: Msg[];
}) {
  const [query, setQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [inflight, setInflight] = useState(false);

  const handleSubmit = async () => {
    if (inflight) return;
    setInflight(true);
    setMessageInput("");
    setMessages((prevMsgs: [Msg]) => [
      ...prevMsgs,
      {
        id: prevMsgs.length,
        text: query,
        msgMetaData: { type: MsgType.human, isLoading: false },
      },
    ]);

    setMessages((prevMsgs: [Msg]) => [
      ...prevMsgs,
      {
        id: prevMsgs.length,
        text: "",
        msgMetaData: { type: MsgType.ai, isLoading: true },
      },
    ]);

    const res = await fetch("http://localhost:3000/api/read", {
      method: "POST",
      body: JSON.stringify({
        query,
        pastMessages,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const reader = res.body?.getReader();
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        let text = new TextDecoder().decode(value, { stream: true });

        text = text.trim();
        text = text.replace(/data:/g, "");
        text = text.replace(/:/g, "");

        setMessages((prevMsgs: [Msg]) =>
          prevMsgs.map((msgObj) => {
            if (
              msgObj.id === prevMsgs.length - 1 &&
              msgObj.msgMetaData.type === "ai"
            ) {
              return {
                ...msgObj,
                text: msgObj.text + " " + text,
                msgMetaData: { ...msgObj.msgMetaData, isLoading: false },
              };
            }
            return msgObj;
          })
        );
      }
    } else {
      console.log("no reader");
    }

    setInflight(false);
  };

  return (
    <div>
      {" "}
      <form
        className="flex sticky bottom-0 mt-4 "
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          disabled={inflight ? true : false}
          value={messageInput}
          id="message"
          placeholder="Type your message..."
          className="flex-1"
          autoFocus
          autoComplete={"off"}
          onChange={(e) => {
            setMessageInput(e.target.value);
            setQuery(e.target.value);
          }}
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}

export default ChatInput;

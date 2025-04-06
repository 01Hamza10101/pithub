"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import CopyIcon from "@/app/components/icons/icon-Copy.svg";
import DownloadIcon from "@/app/components/icons/icon-Download.svg";
import PenIcon from "@/app/components/icons/icon-pen.svg";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export function CodeEditor() {
  const [code, setCode] = useState("// Start coding...");
  const [isEditable, setIsEditable] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (isEditable && value !== undefined) {
      setCode(value);
    }
  };

  return (
    <div className="flex flex-col p-4 min-h-screen">
      {/* README Section */}
      <div className="flex justify-between text-sm px-3 py-2 mb-2 text-gray-300 bg-gray-900 rounded-md">
        <div>01011Hanzla1923</div>
        <div className="hover:cursor-pointer hover:underline">Initial commit from Create Next App</div>
        <div>8249746 · 3 months ago</div>
      </div>

      <div className="p-3 min-h-96 border border-[#333] rounded-md mb-4 shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b-2 mb-2 border-[#333]">
          <span>comp / index.js</span>
          <div className="flex">
            <button className="hover:bg-gray-900 ml-2 px-2 py-1 text-xs flex justify-center items-center rounded-md border border-[#333]">
              Cancel changes
            </button>
            <button className="hover:bg-green-800 bg-green-600 ml-2 mr-2 px-2 py-1 text-xs flex justify-center items-center rounded-md">
              Commit changes
            </button>
            <div className="flex items-center space-x-2">
              <Image src={CopyIcon} width={18} height={18} alt="Copy" />
              <Image src={DownloadIcon} width={26} height={26} alt="Download File" />
              <button
                className={`ml-2 rounded-md border border-[#333] ${!isEditable ? '' : 'bg-green-600 border-transparent'}`}
                onClick={() => setIsEditable(!isEditable)}
              >
                <Image src={PenIcon} alt="Pen" width={34} height={34}/>
              </button>
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
          <MonacoEditor
            height="400px"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{
              readOnly: !isEditable,
              minimap: { enabled: false },
            }}
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import CopyIcon from '@/app/components/icons/icon-Copy.svg';
import DownloadIcon from '@/app/components/icons/icon-Download.svg';
import PenIcon from '@/app/components/icons/icon-pen.svg';

import { commitChanges } from '@/app/ReduxToolkit/ReduxSlice/User.Slice';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export function CodeEditor() {
  const [code, setCode] = useState('// Start coding...');
  const [originalCode, setOriginalCode] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const dispatch = useDispatch<any>();
  const CodeContent = useSelector((state: any) => state.User?.CodeContent);

  useEffect(() => {
    if (CodeContent?.content) {
      setCode(CodeContent.content);
      setOriginalCode(CodeContent.content); // Save original for comparison
    }
  }, [CodeContent]);

  const handleEditorChange = useCallback((value?: string) => {
    if (isEditable && value !== undefined) {
      setCode(value);
    }
  }, [isEditable]);

  const handleCommit = () => {
    if (CodeContent?.path && code !== originalCode) {
      dispatch(commitChanges({ content: code, path: CodeContent.path }));
      setOriginalCode(code); // Update original after commit
    }
  };

  const isModified = code !== originalCode;

  return (
    <div className="flex flex-col p-1">
      <div className="p-3 min-h-96 border border-[#333] rounded-md mb-4 shadow-md">
        {/* Header */}
        <div className="flex justify-between font-mono p-2 items-center pb-2 border-b-2 mb-2 border-[#333]">
          <span className="text-sm">{`...${CodeContent.path.split('/').slice(-2).join('/')}`  || 'No file loaded'}</span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCommit}
              disabled={!isModified}
              className={`px-2 py-1 text-xs flex items-center rounded-md transition-all
                ${isModified ? 'bg-green-600 hover:bg-green-800 text-white' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}
              `}
            >
              commit
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 32 32"><path fill="currentColor" d="m16 13l-5 5l1.41 1.41L15 16.83V28H6v2h9a2 2 0 0 0 2-2V16.83l2.59 2.58L21 18Z"/><path fill="currentColor" d="M23.5 22H23v-2h.5a4.498 4.498 0 0 0 .356-8.981l-.815-.064l-.099-.812a6.994 6.994 0 0 0-13.883 0l-.1.812l-.815.064A4.498 4.498 0 0 0 8.5 20H9v2h-.5A6.497 6.497 0 0 1 7.2 9.136a8.994 8.994 0 0 1 17.6 0A6.497 6.497 0 0 1 23.5 22"/></svg>
            </button>

            <Image onClick={() => { navigator.clipboard.writeText(code); }} className='hover:cursor-pointer' src={CopyIcon} width={18} height={18} alt="Copy" />
            <Image onClick={() => {
              const element = document.createElement("a");
              const file = new Blob([code], { type: 'text/plain' });
              element.href = URL.createObjectURL(file);
              element.download = CodeContent?.path?.split('/').pop() || 'code.js';
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
             className='cursor-pointer' src={DownloadIcon} width={26} height={26} alt="Download File" />

            <button
              className={`rounded-md border border-[#333] ${isEditable ? 'bg-green-600 border-transparent' : ''}`}
              onClick={() => setIsEditable(prev => !prev)}
            >
              <Image src={PenIcon} alt="Toggle Edit" width={34} height={34} />
            </button>
          </div>
        </div>

        {/* Editor */}
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

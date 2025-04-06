"use client";

import React, { useEffect, useState } from "react";
import {Folder} from "./file/Folder";
import {CodeEditor} from "./file/CodeEdit";

export default function Page({ params }: any) {
  const [isFileEdit, setIsFileEdit] = useState(false);
  const [repoParam, setRepoParam] = useState<string | null>(null);

  useEffect(() => {
    // Resolve the params promise
    const resolveParams = async () => {
      const resolvedParams = await params;
      setRepoParam(resolvedParams?.repo || null);
    };

    resolveParams();
  }, [params]);
  
  useEffect(() => {
    const fileExtensions = ['.txt', '.js', '.png', '.jpg'];
   if (fileExtensions.some((ext) => repoParam?.endsWith(ext))) {
      setIsFileEdit(true);
    } else {
      setIsFileEdit(false);
    }
  }, [repoParam]); // React when `repoParam` changes

  return (
    <div>
      {isFileEdit ? <CodeEditor /> : <Folder />}
    </div>
  );
}

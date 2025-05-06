import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { AddStar, GetRepos } from "@/app/ReduxToolkit/ReduxSlice/User.Slice";

import StarIcon from "@/app/components/icons/icon-star.svg";
import StarredIcon from "@/app/components/icons/icon-Starred.svg";

import { FolderTree } from "@/app/components/comp/FolderTreeNode";
import { CodeEditor } from "./CodeEdit";

export function Folder({repoName}:any) {
  const dispatch = useDispatch();
  const { folders, files, user, repositories } = useSelector((state: any) => state.User);

  const [currentRepo, setCurrentRepo] = useState<any>();

  const isStarred = useMemo(
    () => user?.activity?.starred?.some((item: string) => `${item}/` === folders?.[0]) ?? false,
    [user?.activity?.starred, folders]
  );

  useEffect(() => {
    if (!Array.isArray(repositories)) {
      dispatch(GetRepos({ repositories: user?.activity?.repositories }));
    } else {
      const repo = repositories.find((r: any) => r?.name === repoName);
      if (repo) setCurrentRepo(repo);
    }
  }, [dispatch, repositories, user?.activity?.repositories, repoName]);

  return (
    <div className="p-4 bg-gray-900 text-gray-100 rounded-md shadow-md">
      {currentRepo && (
        <div className="flex items-center gap-4 p-3 border-b border-gray-700">
          <span className="font-semibold text-lg">{repoName.split("/")[1]}</span>
          <span className="h-6 rounded-lg flex justify-center items-center text-xs bg-blue-950 border-2 border-blue-800 px-3 py-1 font-semibold">
            {currentRepo.status.toUpperCase()}
          </span>
          <button
            onClick={() => dispatch(AddStar({ name: repoName }))}
            className={`flex items-center gap-1 rounded-md border border-gray-700 px-3 py-1 text-sm font-medium transition-colors duration-200 ${
              isStarred
                ? "bg-yellow-900 text-yellow-300 hover:bg-yellow-800 border-yellow-700"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Image src={isStarred ? StarredIcon : StarIcon} className="h-4 w-4" alt="Star" />
            {isStarred ? "Starred" : "Star"}
          </button>
          <div className="rounded-md border border-gray-700 px-3 py-1 text-sm font-medium bg-gray-800">
            Views <span className="font-semibold">{currentRepo.views}</span>
          </div>
        </div>
      )}

      <div className="grid h-[calc(100vh-5rem)] grid-cols-1 gap-4 p-4 md:grid-cols-4">
        <div className="col-span-1 max-h-full min-w-[180px] overflow-y-auto bg-gray-800 rounded-md shadow-sm border border-gray-700">
          <div className="p-3 font-semibold border-b border-gray-700">Project Explorer</div>
          <FolderTree folders={folders} files={files} repoName={repoName} />
        </div>
        <div className="col-span-3 overflow-hidden rounded-md shadow-md border border-gray-700 bg-gray-800">
          <div className="bg-gray-700 p-3 font-semibold border-b border-gray-700">Code Editor</div>
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}
"use client"
import { useState, useEffect, useRef, useMemo } from "react"
import { buildTree } from "./buildTree"
import { useDispatch } from "react-redux"
import {
  getFileContent,
  renamePath,
  createFolder,
  createFile,
  deletePath,
  uploadFile,
} from "../../ReduxToolkit/ReduxSlice/User.Slice"

function FolderTreeNode({
  name,
  node,
  repoName,
  fullPath,
  selectedPath,
  setSelectedPath,
  onClickFolder,
  onRightClick,
}) {
  const [open, setOpen] = useState(false)
  const isFile = node.__type === "file"
  const dispatch = useDispatch()
  const currentPath = fullPath ? `${fullPath}/${name}` : name
  const isSelected = selectedPath === currentPath

  const handleClick = async () => {
    setSelectedPath(currentPath)
    if (!isFile) {
      setOpen((prev) => !prev)
      onClickFolder?.(currentPath)
    } else {
      const normalizedPath = (repoName + "/" + currentPath).replace(/\/+/g, "/")
      dispatch(getFileContent({ path: normalizedPath }))
    }
  }

  const handleContextMenu = (e) => {
    e.preventDefault() // Add this line to prevent default browser context menu
    e.stopPropagation()
    onRightClick(e, currentPath, node.__type)
  }

  return (
    <div className="pl-1 -mt-1">
      <div
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        className={`flex items-center select-none gap-1 transition-colors ${
          isFile ? "text-gray-200 cursor-pointer hover:text-gray-400" : "cursor-pointer hover:text-gray-400 font-medium"
        } ${isSelected ? "hover:text-gray-50 bg-blue-700 text-white px-1 rounded" : ""}`}
      >
        <span className="text-sm">{isFile ? "📄" : open ? "📂" : "📁"}</span>
        <span className="text-sm leading-loose font-mono truncate whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </span>
      </div>

      {!isFile && open && (
        <div className="border-l border-gray-600 ml-1">
          {Object.entries(node.children || {}).map(([childName, childNode]) => (
            <FolderTreeNode
              key={childName}
              repoName={repoName}
              name={childName}
              node={childNode}
              fullPath={currentPath}
              selectedPath={selectedPath}
              setSelectedPath={setSelectedPath}
              onClickFolder={onClickFolder}
              onRightClick={onRightClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FolderTree({ folders, files, repoName }) {
  const [treeState, setTreeState] = useState({})
  const [selectedPath, setSelectedPath] = useState(null)
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    path: "",
    type: null,
  })
  const dispatch = useDispatch()
  const fileInputRef = useRef()

  const reponamefolder = useMemo(() => folders?.[0]?.split("/").slice(0, 2).join("/") || null, [folders])

  // Helper function to normalize paths
  const normalizePath = (basePath, relativePath) => {
    const combined = `${basePath}/${relativePath}`.replace(/\/+/g, "/")
    return combined.startsWith("/") ? combined.substring(1) : combined
  }

  // Initialize tree state when folders and files change
  useEffect(() => {
    if (folders && files) {
      // Normalize the repoName to ensure it doesn't end with a slash
      const normalizedRepoName = repoName.endsWith("/") ? repoName.slice(0, -1) : repoName

      const foldersUsernameRemoved = folders
        .map((f) => {
          // Normalize paths by removing double slashes
          const normalizedPath = f.replace(normalizedRepoName, "").replace(/\/+/g, "/")
          return normalizedPath.startsWith("/") ? normalizedPath.substring(1) : normalizedPath
        })
        .filter(Boolean)

      const filesUsernameRemoved = files
        .map((f) => {
          // Normalize file paths
          const normalizedName = f.name.replace(normalizedRepoName, "").replace(/\/+/g, "/")
          return {
            ...f,
            name: normalizedName.startsWith("/") ? normalizedName.substring(1) : normalizedName,
          }
        })
        .filter(Boolean)

      const newTree = buildTree(foldersUsernameRemoved, filesUsernameRemoved)
      setTreeState(newTree)
    }
  }, [folders, files, repoName])

  const handleRightClick = (e, path, type) => {
    e.preventDefault()
    setSelectedPath(path)
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      path,
      type,
    })
  }

  const hideContextMenu = () => {
    setContextMenu((prev) => ({
      ...prev,
      visible: false,
      x: 0,
      y: 0,
    }))
  }

  useEffect(() => {
    const closeMenu = () => hideContextMenu()
    window.addEventListener("click", closeMenu)
    return () => window.removeEventListener("click", closeMenu)
  }, [])

  // Safely navigate to a path in the tree and perform an operation
  const navigateToPath = (path) => {
    const parts = path.split("/").filter(Boolean)
    let current = treeState
    const pathParts = []

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      pathParts.push(part)

      if (!current[part] || current[part].__type !== "folder") {
        console.error(`Path not found or not a folder: ${pathParts.join("/")}`)
        return null
      }

      current = current[part].children
    }

    const fileName = parts[parts.length - 1]
    const target = current[fileName]

    if (!target) {
      console.error(`Target not found: ${path}`)
      return null
    }

    return {
      container: current,
      fileName,
      type: target.__type, // either 'file' or 'folder'
      node: target,
    }
  }

  const handleRename = async () => {
    const pathParts = contextMenu.path.split("/")
    const oldName = pathParts.pop()
    const newName = prompt("Enter new name:", oldName)

    if (!newName || newName.trim() === "" || newName === oldName) {
      return hideContextMenu()
    }

    const result = navigateToPath(contextMenu.path)
    if (!result) return hideContextMenu()

    const { container, fileName } = result

    if (container[newName]) {
      alert(`An item named "${newName}" already exists.`)
      return hideContextMenu()
    }

    await dispatch(
      renamePath({
        path: (repoName + "/" + contextMenu.path).replace(/\/+/g, "/"),
        newName,
      }),
    )
    // Create a copy with the new name
    container[newName] = { ...container[fileName] }
    delete container[fileName]

    setTreeState({ ...treeState })
    hideContextMenu()
  }

  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete "${contextMenu.path}"?`)) {
      return hideContextMenu()
    }

    const result = navigateToPath(contextMenu.path)
    if (!result) return hideContextMenu()

    const { container, fileName, type } = result

    // Dispatch the deletion request
    dispatch(
      deletePath({
        path: (repoName + "/" + contextMenu.path).replace(/\/+/g, "/"),
        type,
      }),
    )
      .unwrap()
      .then(() => {
        // Remove the item from the tree state
        delete container[fileName]
        setTreeState({ ...treeState })
        hideContextMenu()
      })
      .catch((err) => {
        hideContextMenu()
      })
  }

  const handleCreateFolder = async () => {
    const folderName = prompt("Enter name for new folder:")
    if (!folderName || folderName.trim() === "") {
      return hideContextMenu()
    }

    let targetPath = contextMenu.path
    let targetContainer

    // If right-clicked on a file, create in its parent directory
    if (contextMenu.type === "file") {
      const pathParts = targetPath.split("/")
      pathParts.pop() // Remove file name
      targetPath = pathParts.join("/")
    }

    if (targetPath === "") {
      // Creating at root level
      targetContainer = treeState
    } else {
      const result = navigateToPath(targetPath)
      if (!result) return hideContextMenu()

      const { node, type } = result
      // If clicked on a folder, create inside that folder
      targetContainer = type === "folder" ? node.children : result.container
    }

    if (targetContainer[folderName]) {
      alert(`An item named "${folderName}" already exists.`)
      return hideContextMenu()
    }

    await dispatch(createFolder({ path: `${repoName}/${targetPath}/${folderName}`.replace(/\/+/g, "/") }))
    targetContainer[folderName] = { __type: "folder", children: {} }
    setTreeState({ ...treeState })
    hideContextMenu()
  }

  const handleCreateFile = async () => {
    const fileName = prompt("Enter name for new file:")
    if (!fileName || fileName.trim() === "") {
      return hideContextMenu()
    }

    let targetPath = contextMenu.path
    let targetContainer

    if (contextMenu.type === "file") {
      const pathParts = targetPath.split("/")
      pathParts.pop() // Remove file name
      targetPath = pathParts.join("/")
    }

    if (targetPath === "") {
      targetContainer = treeState
    } else {
      const result = navigateToPath(targetPath)
      if (!result) return hideContextMenu()

      const { node, type } = result
      targetContainer = type === "folder" ? node.children : result.container
    }

    if (targetContainer[fileName]) {
      alert(`An item named "${fileName}" already exists.`)
      return hideContextMenu()
    }

    await dispatch(createFile({ path: (repoName + "/" + targetPath + "/" + fileName).replace(/\/+/g, "/") }))
    targetContainer[fileName] = { __type: "file" }
    setTreeState({ ...treeState })
    hideContextMenu()
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const fileName = file.name
    let targetPath = contextMenu.path
    let targetContainer

    // If right-clicked on a file, upload to its parent directory
    if (contextMenu.type === "file") {
      const pathParts = targetPath.split("/")
      pathParts.pop() // Remove file name
      targetPath = pathParts.join("/")
    }

    if (targetPath === "") {
      // Uploading at root level
      targetContainer = treeState
    } else {
      const result = navigateToPath(targetPath)
      if (!result) {
        event.target.value = ""
        return hideContextMenu()
      }

      const { container, fileName: folderName, type } = result
      // If clicked on a folder, upload inside that folder
      targetContainer = type === "folder" ? result.node.children : container
    }

    if (targetContainer[fileName]) {
      alert(`A file named "${fileName}" already exists.`)
      event.target.value = ""
      return hideContextMenu()
    }

    await dispatch(uploadFile({ fileName: `${repoName}${targetPath == "" ? "" : "/"}${targetPath}/${file.name}`, file }))

    targetContainer[fileName] = { __type: "file" }
    setTreeState({ ...treeState })
    event.target.value = ""
    hideContextMenu()
  }

  return (
    <div
      className="text-white h-5/6 min-h-8"
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleRightClick(e, "", "folder")
      }}
    >
      {Object.entries(treeState).map(([name, node]) => (
        <FolderTreeNode
          key={name}
          repoName={repoName}
          name={name}
          node={node}
          fullPath=""
          selectedPath={selectedPath}
          setSelectedPath={setSelectedPath}
          onClickFolder={() => {}}
          onRightClick={handleRightClick}
        />
      ))}

      {contextMenu.visible && (
        <div
          style={{
            position: "fixed",
            top: contextMenu.y,
            left: contextMenu.x,
          }}
          className="bg-gray-800 border border-gray-700 rounded shadow-lg w-40 z-50"
        >
          {contextMenu.path !== '' && (
            <div>
              {" "}
              <button onClick={handleRename} className="w-full text-left px-3 py-2 hover:bg-gray-700">
                ✏️ Rename
              </button>
              <button onClick={handleDelete} className="w-full text-left px-3 py-2 hover:bg-gray-700">
                🗑️ Delete
              </button>{" "}
            </div>
          )}
          <button onClick={handleCreateFolder} className="w-full text-left px-3 py-2 hover:bg-gray-700">
            📁 New Folder
          </button>
          <button onClick={handleCreateFile} className="w-full text-left px-3 py-2 hover:bg-gray-700">
            📄 New File
          </button>
          <button onClick={handleUploadClick} className="w-full text-left px-3 py-2 hover:bg-gray-700">
            ⬆️ Upload File
          </button>
        </div>
      )}

      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
    </div>
  )
}

export function buildTree(folders, files) {
    const root = {};
  
    function insert(path, isFile = false, fileMeta = {}) {
      const parts = path.split('/').filter(Boolean);
      let current = root;
  
      parts.forEach((part, idx) => {
        if (!current[part]) {
          current[part] = {
            path: path,
            __type: idx === parts.length - 1 && isFile ? 'file' : 'folder',
            ...(isFile ? fileMeta : {}),
            children: {}
          };
        }
        current = current[part].children || {};
      });
    }
  
    folders.forEach(folder => insert(folder));
    files.forEach(file => insert(file.name, true, file));
  
    return root;
  }
  
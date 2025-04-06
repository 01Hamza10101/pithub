export default function Lists() {
    return (
      <div className="border border-[#333] rounded-md">
        <div className="p-4 hover:bg-gray-700 rounded-md cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">test list</span>
              <span className="text-xs text-gray-600">test</span>
            </div>
            <span className="text-xs text-gray-600">1 repository</span>
          </div>
        </div>
      </div>
    )
}  
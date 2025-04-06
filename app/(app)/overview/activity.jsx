export default function ContributionActivity() {
    return (
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">January 2025</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-1" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
              </svg>
              <div>
                <h4 className="font-semibold">Created 2 repositories</h4>
                <ul className="text-sm space-y-2 mt-2">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">01Hamza10101/test</a>
                    <span className="text-gray-600 text-xs ml-2">Jan 9</span>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">01Hamza10101/RP</a>
                    <span className="text-gray-600 text-xs ml-2">Jan 4</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-1" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M4 4v2h-.25A1.75 1.75 0 002 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-5.5A1.75 1.75 0 0012.25 6H12V4a4 4 0 10-8 0zm6.5 2V4a2.5 2.5 0 00-5 0v2h5zM12 7.5h.25a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-5.5a.25.25 0 01.25-.25H12z"/>
              </svg>
              <div>
                <h4 className="font-semibold">2 contributions in private repositories</h4>
                <p className="text-gray-600 text-sm mt-1">Jan 4 - Jan 5</p>
              </div>
            </div>
          </div>
        </div>
        <button className="text-blue-600 hover:underline text-sm">
          Show more activity
        </button>
      </div>
    )
  }
  
  
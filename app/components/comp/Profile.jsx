export default function Profile({username="test123"}){
    return(
        <div className="space-y-4 flex flex-col items-center">
            <div className="relative w-40 h-40 bg-white rounded-full">
              {/* <Image
                src="https://sjc.microlink.io/cDXC3vwf_SpSVY2vpxun7XzfNkko8hBss3Y3BqJi22m3P5kTnV7utJUseNCeEwbXb39HLT3BQYTOLmBCUSa4qA.jpeg"
                alt={`${username}'s avatar`}
                width={296}
                height={296}
                className="rounded-full"
                priority
              /> */}
            </div>
            <h1 className="text-2xl font-semibold">{username}</h1>
            <button className="w-60 px-3 py-1 text-sm font-semibold border border-[#333] rounded-md hover:bg-gray-700">
              Edit
            </button>
            {/* <button className="w-full px-3 py-1 text-sm text-gray-600 hover:text-blue-600">
              Block or Report
            </button> */}
          </div>
    )
}
import React from 'react'

const Pagination = ({ data, isNext, isPrev, handleNext, handlePrev, currentPage, handlePageChange }) => {
    const from = data.data?.results ? 10 * (currentPage - 1) + 1 : 0;
    const to = data.data?.results ? (10 * currentPage > data.data.count ? data.data.count : 10 * currentPage) : 0;
    debugger
    return (
        <div className='w-full border my-1 mx-1'>
            <div className="flex justify-center gap-4 p-4 items-center">
                <button className={`bg-gray-800 text-white ${isPrev ? 'opacity-100' : 'opacity-40 cursor-not-allowed'} px-4 py-1 rounded-lg`}
                    disabled={!isPrev} onClick={() => { handlePrev() }}>
                    Prev
                </button>
                {/* showing from x to y count */}
                <div>
                    {data.data?.results ? `Showing ${from}-${to} results` : ''}
                </div>
                <div>
                    <select name="pageNumber" id="pageNumber" onChange={(e) => { handlePageChange(e.target.value) }} className='border focus:ring-0 rounded focus:outline-0'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
                <div className="">
                    {data.data?.count ? `Total Results: ${data.data.count}` : ''}
                </div>
                <button className={`bg-gray-800 text-white ${isNext ? 'opacity-100' : 'opacity-40 cursor-not-allowed'} px-4 py-1 rounded-lg`}
                    disabled={!isNext} onClick={() => { handleNext() }}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination

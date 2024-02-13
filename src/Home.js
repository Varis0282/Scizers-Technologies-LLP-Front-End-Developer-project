import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Navbar, Pagination } from './components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setData } from './redux/dataReducer';
import { toast } from 'react-toastify';
import { setLoading } from './redux/loaderReducer';

const Home = () => {
    const data = useSelector((state) => state.data);
    const [fetchedData, setFetchedData] = useState(data.data?.results ? data.data.results : []);
    const [search, setSearch] = useState('');
    const [isNext, setIsNext] = useState(true);
    const [isPrev, setIsPrev] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    const handleNext = async () => {
        dispatch(setLoading(true));
        try {
            const response = await axios.get(data.data.next);
            setFetchedData(response.data.results);
            dispatch(setData(response.data));
            setCurrentPage(currentPage + 1);
            toast("Data fetched successfully", { type: "success" });
        } catch (error) {
            console.log(error);
            toast("Error occured", { type: "error" });
        }
        dispatch(setLoading(false));
    };

    const handlePrev = async () => {
        dispatch(setLoading(true));
        try {
            const response = await axios.get(data.data.previous);
            setFetchedData(response.data.results);
            dispatch(setData(response.data));
            setCurrentPage(currentPage - 1);
            toast("Data fetched successfully", { type: "success" });
        } catch (error) {
            console.log(error);
            toast("Error occured", { type: "error" });
        }
        dispatch(setLoading(false));
    };

    const handlePageChange = async (page) => {
        dispatch(setLoading(true));
        try {
            setCurrentPage(page);
            const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
            setFetchedData(response.data.results);
            dispatch(setData(response.data));
            toast("Data fetched successfully", { type: "success" });
        } catch (error) {
            console.log(error);
            toast("Error occured", { type: "error" });
        }
        dispatch(setLoading(false));
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        let filteredData = fetchedData.filter((val) => {
            return val.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFetchedData(filteredData);
    }

    useEffect(() => {
        if (search === '') {
            setFetchedData(data.data?.results ? data.data.results : []);
        }
    }, [search, data.data?.results]);

    useEffect(() => {
        setIsNext(data.data?.next !== null);
        setIsPrev(data.data?.previous !== null);
    }, [data.data?.next, data.data?.previous]);
    return (
        <div>
            <Navbar data={data} handleSearchChange={handleSearchChange} search={search} setSearch={setSearch} />
            <Pagination data={data} isNext={isNext} isPrev={isPrev} handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage} handlePageChange={handlePageChange} />
            {fetchedData ? (
                <div className="flex flex-wrap p-4 justify-evenly">
                    {fetchedData.length > 0 &&
                        fetchedData.map((val, index) => (
                            <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-2">
                                <Card val={val} />
                            </div>
                        ))}
                </div>
            ) : (
                'Sorry, no data found! Try removing the search filter.'
            )}
        </div>
    )
}

export default Home

import React, { useEffect, useState } from 'react'

const Card = ({ val }) => {
    const [hair, setHair] = useState('');

    useEffect(() => {
        // if therer are 2 hair colors
        if (val.hair_color.includes(',')) {
            let hairColors = val.hair_color.split(',')
            setHair(hairColors[0])
        }
        else {
            setHair(val.hair_color)
        }
    }, [val.hair_color]);

    
    return (
        <div className={`flex flex-col border gap-2 border-black rounded shadow lg:w-auto md:w-auto h-[32rem] p-4`}
            style={{ backgroundColor: hair==='none'?'white':hair, color: hair === 'black' ? 'white' : 'black' }}
        >
            <div className='text-xl font-bold'>{val.name}</div>
            <div className="w-full flex justify-center">
                <img src="https://picsum.photos/200/300.jpg" alt="" className='w-[100%] h-72' />
            </div>
            <div className="flex flex-col font-semibold gap-1 text-lg">
                <div>
                    Hair color : {val.hair_color}
                </div>
                <div>
                    Skin color : {val.skin_color}
                </div>
                <div>
                    Gender : {val.gender}
                </div>
                <div>
                    Birth Year : {val.birth_year}
                </div>
                <div>
                    No. of Vehicles : {val.vehicles.length}
                </div>
            </div>
        </div>
    )
}

export default Card

import React from 'react';
import Stock from '../Table/Stock';
import Vente from '../Chartjs/Vente';



const Prod = () => {
  return (
    <div className='prod overflow-x-hidden px-5 py-2'>
        <aside className="sidebar">
            <div className="tabs ">
                <input id="tab-1" type="radio" name="group" />
                <input id="tab-2" type="radio" name="group" />

                <div className="buttons flex gap-8  mx-5">
                    <label className=" text-neutral-800 text-lg " for="tab-1">En stock</label>
                    <label className=" text-neutral-800 text-lg" for="tab-2">Vente</label>

                    <div className="underline"></div>
                </div>

                <div className="contents">
                    <div className="content-inner">
                        <div className='px-5 py-2'>
                            <Stock/>
                        </div >
                        <div className='px-5 py-2'>
                            <Vente/>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    </div>
  )
}

export default Prod



import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const ProblemView = () => {
  return (
    <>
    
        <Navbar></Navbar>
        <div className='grid grid-cols-[288px,1fr] grid-rows-1'>
          <Sidebar></Sidebar>
          <main className='max-h-[calc(100vh-80px)] w-full overflow-y-auto px-44'>
          <h1 className='py-4  text-3xl font-semibold'>Lesson</h1>
          <p className='pb-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem assumenda corporis odit, facilis placeat ex quos, dolore recusandae magni, a voluptate? Labore ipsum totam similique officia repudiandae quasi eius accusantium minus quaerat dolor! Beatae eum in est consequuntur alias voluptatum eaque fugiat, consequatur vitae similique aspernatur eius quae laboriosam deserunt quisquam repudiandae porro accusantium nisi magnam a quod, incidunt veritatis adipisci non! Minima nobis quo eligendi, hic magnam rerum quasi sapiente esse suscipit corporis ipsum ratione, cumque laborum voluptatibus ad iure harum reiciendis illo fuga, aliquam laboriosam magni obcaecati possimus at. Aspernatur itaque, aliquam nisi quas, officiis similique quis inventore eligendi quisquam molestiae unde? Dolores architecto nemo tempora blanditiis eveniet odio velit iure. Alias itaque nesciunt soluta quisquam aliquid, iusto facere, ducimus saepe vel nobis sit ad veniam distinctio numquam? Consectetur mollitia est quidem temporibus itaque officia, exercitationem facere. Expedita maxime blanditiis ipsa fugiat quaerat assumenda commodi dolorem obcaecati dolor minus optio fugit ea est eligendi sint magnam ex voluptas, consequuntur vel, quasi nobis molestias. Praesentium beatae dolore soluta, nulla impedit quisquam officia eveniet facilis obcaecati magni, laudantium totam accusamus fugiat culpa nesciunt eum dolor voluptatibus architecto non aperiam ipsa expedita! Aut, adipisci itaque eos minima, numquam porro consectetur minus odio ab, cupiditate est quo nesciunt. Dolores molestiae id est atque officia ex suscipit, nobis sequi reprehenderit, reiciendis modi laudantium consequuntur eius illo, odit magni dignissimos eveniet et. Culpa error assumenda ducimus velit, aut, sit repellendus quae officia eos nihil similique earum voluptatum at sequi aliquid suscipit dolor incidunt necessitatibus non! Atque architecto itaque minima nobis beatae! Consequuntur nostrum quae perspiciatis, possimus expedita reprehenderit esse alias saepe, eius tempore voluptatum voluptas exercitationem. Quis atque voluptate eos officiis iure in doloribus numquam maiores saepe eveniet? Dicta pariatur at cumque repellat assumenda! Et dicta officiis deleniti quas cupiditate quaerat architecto itaque nostrum!</p>
          <h1 className='py-4  text-3xl font-semibold'>Problem</h1>
          <p className='pb-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem assumenda corporis odit, facilis placeat ex quos, dolore recusandae magni, a voluptate? Labore ipsum totam similique officia repudiandae quasi eius accusantium minus quaerat dolor!</p>
          <h1 className='pb-4 font-semibold'>Test output</h1>
          <textarea spellCheck={false}  className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-3/4 resize-none text-white px-4 py-4'></textarea>
          <h1 className='font-semibold pb-4'>Solution</h1>
          <div className='grid grid-cols-1 grid-rows'>
          <textarea spellCheck={false}  className='bg-black  w-full rounded-t-lg decoration-none border-none outline-none h-[600px] resize-none text-white px-4 py-4'></textarea>
          <div className='bg-gray-800 h-16 px-4 rounded-b-lg flex justify-end items-center  '>
          <button className=' rounded-lg h-12 bg-green-600 w-36 align-left text-white float-right hover:bg-green-700 '><span className='text-lg mr-3 '>Run</span> <FontAwesomeIcon icon={faPlay} /></button>
          </div>
          </div>
          {/* <div className='grid grid-cols-1 grid-rows-'>
            <textarea className='bg-black text-white'>alo da</textarea>
            <div className='bg-gray-800 h-12px-4'>
            <button className=' float-right rounded-lg bg-green-600 w-36 align-left text-white'>Run</button>
            </div>
          </div> */}
          
          
          </main>
        </div>
    </>
    
  )
}

export default ProblemView
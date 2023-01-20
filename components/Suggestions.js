import React from 'react'
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react'

function Suggestions() {

      const [suggestion, setSuggestion] = useState([])

      useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => ({
          userId: faker.datatype.uuid(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar(),
          password: faker.internet.password(),
          birthdate: faker.date.birthdate(),
          registeredAt: faker.date.past(),
          id: i
        }))
        setSuggestion(suggestions)
      }, [])

  return (
    <div className='mt-4 ml-10'>
      <div className='flex justify-between text-sm mb-5'>
            <h3 className='text-sm font-bold text-gray-400'>Suggestion for you</h3>
            <button className='text-gray-600 font-semibold'>See all</button>
      </div>

      {suggestion.map(profile => (
            <div key={profile.id} className="flex items-start justify-between mt-3">
                  <img src={profile.avatar} alt="user" 
                  className='w-10 h-10 rounded-full border p-[2px] object-contain' />
                  <div className='flex-1 ml-4'>
                        <h2 className='font-semibold text-sm'>{profile.username}</h2>
                        <h3 className='text-xs text-gray-400'>Email: {profile.email}</h3>
                        
                        </div>
                        <button className='text-blue-400 text-xs'>Follow</button>
            </div>
      ))}
    </div>
  )
}

export default Suggestions
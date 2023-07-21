import React from 'react'

const userProfile = ({params}) => {
  return (
    <React.Fragment>
        <h1 className='test-4xl font-bold'>Profile {params.id}</h1>
    </React.Fragment>
  )
}

export default userProfile;
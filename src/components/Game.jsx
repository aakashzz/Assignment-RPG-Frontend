import React, { useEffect } from 'react'

function Game({config}) {
    useEffect(()=>{
        const game = new Phaser.Game(config);

        return ()=> { 
            return game.destroy(true)
        }
    })
  return (
    <>  </>
  )
}

export default Game
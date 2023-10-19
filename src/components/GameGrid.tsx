"use client"

import { useState, useRef } from "react";
import Cell from "./Cell";

export default function GameGrid() {
    const rows = 16
    const cols = 16
    const mines = 40
    
    const firstClick = useRef(true)
    const gridRef = useRef([...Array(rows)].map((_, i) => {
        return [...Array(cols)].map((_, j) => {
            return {cleared: false, minesAround: 0, flagged: false}
        })
    }))

    // why am i forced to do this ;(
    const [_, forceRender] = useState(false)

    const clear = (coords: [number, number]) => {
        let grid = gridRef.current
        if (grid[coords[0]][coords[1]].cleared || grid[coords[0]][coords[1]].flagged || grid[coords[0]][coords[1]].minesAround === -1) {
            return
        }
        
        grid[coords[0]][coords[1]].cleared = true

        if (grid[coords[0]][coords[1]].minesAround == 0) {
			// top left
			if (coords[0] - 1 >= 0 && coords[1] - 1 >= 0 && !grid[coords[0]-1][coords[1]-1].cleared) {
				clear([coords[0]-1, coords[1]-1]);
			}
			
			// top middle
			if (coords[0] - 1 >= 0 && !grid[coords[0]-1][coords[1]].cleared) {
				clear([coords[0]-1, coords[1]]);
			}
			
			// top right
			if (coords[0] - 1 >= 0 && coords[1] + 1 < cols && !grid[coords[0]-1][coords[1]+1].cleared) {
				clear([coords[0]-1, coords[1]+1]);
			}
			
			// middle left
			if (coords[1] - 1 >= 0 && !grid[coords[0]][coords[1]-1].cleared) {
				clear([coords[0], coords[1]-1]);
			}
				
			// middle right
			if (coords[1] + 1 < cols && !grid[coords[0]][coords[1]+1].cleared) {
				clear([coords[0], coords[1]+1]);
			}
				
			// bottom left
			if (coords[0] + 1 < rows && coords[1] - 1 >= 0 && !grid[coords[0]+1][coords[1]-1].cleared) {
				clear([coords[0]+1, coords[1]-1]);
			}
			
			// bottom middle
			if (coords[0] + 1 < rows && !grid[coords[0]+1][coords[1]].cleared) {
				clear([coords[0]+1, coords[1]]);
			}
			
			// bottom right
			if (coords[0] + 1 < rows && coords[1] + 1 < cols && !grid[coords[0]+1][coords[1]+1].cleared) {
				clear([coords[0]+1, coords[1]+1]);
			}
			
		}

        // updateGrid(coords, {cleared: true})
    }

    const flag = (coords: [number, number]) => {
        let grid = gridRef.current
        if (grid[coords[0]][coords[1]].cleared) {
            return
        }
        
        // updateGrid(coords, {flagged: !grid[coords[0]][coords[1]].flagged})
        grid[coords[0]][coords[1]].flagged = !grid[coords[0]][coords[1]].flagged
    }

    const generateMines = (coords: [number, number]) => {
        let grid = gridRef.current
        if (grid[coords[0]][coords[1]].flagged) {
            return
        }
		
		let list: number[] = []
        for (let i = 0; i < (rows*cols); i++) {
        	if (i == coords[0] * cols + coords[1] ||
    			// top left
    			(coords[0] - 1 >= 0 && coords[1] - 1 >= 0 && i == (coords[0]-1)*cols + (coords[1]-1)) ||
    			
    			// top middle
    			(coords[0] - 1 >= 0 && i == (coords[0]-1)*cols + coords[1]) ||
    			
    			// top right
    			(coords[0] - 1 >= 0 && coords[1] + 1 < cols && i == (coords[0]-1)*cols + (coords[1]+1)) ||
    			
    			// middle left
    			(coords[1] - 1 >= 0 && i == coords[0]*cols + (coords[1]-1)) ||
    				
    			// middle right
    			(coords[1] + 1 < cols && i == coords[0]*cols + (coords[1]+1)) ||
    				
    			// bottom left
    			(coords[0] + 1 < rows && coords[1] - 1 >= 0 && i == (coords[0]+1)*cols + (coords[1]-1)) ||
    			
    			// bottom middle
    			(coords[0] + 1 < rows && i == (coords[0]+1)*cols + coords[1]) ||
    			
    			// bottom right
    			(coords[0] + 1 < rows && coords[1] + 1 < cols && i == (coords[0]+1)*cols + (coords[1]+1))) {
                    continue
                }
        	list.push(i)
        }
        
        // shuffle list
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        let mineList = []
        for (let i = 0; i < mines; i++) {
            // updateGrid([Math.floor(list[i]/cols), list[i]%cols], {minesAround: -1})
            grid[Math.floor(list[i]/cols)][list[i]%cols].minesAround = -1
            mineList.push(list[i])
        }

        for (let i = 0; i < (rows*cols); i++) {
        	
        	if (mineList.includes(i)) {
                continue
            }
        	
        	let numMines = 0
            
        	// top left
        	if ((Math.floor(i/cols) - 1 >= 0 && i%cols - 1 >= 0) && grid[Math.floor(i/cols) - 1][i%cols - 1].minesAround === -1) {
        		numMines++
                console.log(`loged`)
        	}
        	
        	// top middle
        	if (Math.floor(i/cols) - 1 >= 0 && grid[Math.floor(i/cols) - 1][i%cols].minesAround === -1) {
        		numMines++
                console.log(`loged`)
        	}
        	
        	// top right
        	if ((Math.floor(i/cols) - 1 >= 0 && i%cols + 1 < cols) && grid[Math.floor(i/cols) - 1][i%cols + 1].minesAround === -1) {
        		numMines++
                console.log(`loged`)
        	}
        	
        	// middle left
        	if (i%cols - 1 >= 0 && grid[Math.floor(i/cols)][i%cols - 1].minesAround === -1) {
        		numMines++
                console.log(`loged`)
        	}
        	
        	// middle right
        	if (i%cols + 1 < cols && grid[Math.floor(i/cols)][i%cols + 1].minesAround === -1) {
        		numMines++
                console.log(`loged`)
        	}
        	
        	// bottom left
        	if ((Math.floor(i/cols) + 1 < rows && i%cols - 1 >= 0) && grid[Math.floor(i/cols) + 1][i%cols - 1].minesAround === -1) {
        		numMines++
                console.log(`loged`)
        	}
        	
        	// bottom middle
        	if (Math.floor(i/cols) + 1 < rows && grid[Math.floor(i/cols) + 1][i%cols].minesAround === -1) {
        		numMines++
                console.log(`loged`)
        	}
        	
        	// bottom right
        	if ((Math.floor(i/cols) + 1 < rows && i%cols + 1 < cols) && grid[Math.floor(i/cols) + 1][i%cols + 1].minesAround === -1) {
        		numMines++
                console.log(`loged`)
        	}
        	
        	// updateGrid([Math.floor(i/cols), i%cols], {minesAround: numMines})
            grid[Math.floor(i/cols)][i%cols].minesAround = numMines
        }
        
        firstClick.current = false;
	}
    

    const onLeftClick = (coords: [number, number]) => {
        if (firstClick.current) {
            generateMines(coords)
        }

        clear(coords)
        forceRender(prev => !prev)
    }

    const onRightClick = (coords: [number, number]) => {
        flag(coords)
        forceRender(prev => !prev)
    }

    // const updateGrid = (coords: [number, number], update: {cleared?: boolean; flagged?: boolean; minesAround?: number}) => {
    //     setGrid(a => [
    //         ...a.slice(0, coords[0]),
    //         [
    //             ...a[coords[0]].slice(0, coords[1]),
    //             {
    //                 ...a[coords[0]][coords[1]],
    //                 ...update
    //             },
    //             ...a[coords[0]].slice(coords[1] + 1, a[coords[0]].length),
                
    //         ],
    //         ...a.slice(coords[0] + 1, a.length),
    //     ])
    // }

    return (
        <div style={{aspectRatio: cols/rows}} className={`flex flex-col max-w-full h-full select-none`}>
            {
                [...Array(rows)].map((_, i) => (
                    <div key={i} className="flex">
                        {
                            [...Array(cols)].map((_, j) => (
                                <Cell
                                key={`${i} ${j}`}
                                coords={[i, j]}
                                onLeftClick={onLeftClick}
                                onRightClick={onRightClick}
                                cleared={gridRef.current[i][j].cleared}
                                minesAround={gridRef.current[i][j].minesAround}
                                flagged={gridRef.current[i][j].flagged}
                                />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}
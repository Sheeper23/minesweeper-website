"use client"

import Image from "next/image"
import Minesweeper0 from "../../public/Minesweeper_0.svg"
import Minesweeper1 from "../../public/Minesweeper_1.svg"
import Minesweeper2 from "../../public/Minesweeper_2.svg"
import Minesweeper3 from "../../public/Minesweeper_3.svg"
import Minesweeper4 from "../../public/Minesweeper_4.svg"
import Minesweeper5 from "../../public/Minesweeper_5.svg"
import Minesweeper6 from "../../public/Minesweeper_6.svg"
import Minesweeper7 from "../../public/Minesweeper_7.svg"
import Minesweeper8 from "../../public/Minesweeper_8.svg"
import MinesweeperUnopened from "../../public/Minesweeper_unopened_square.svg"
import MinesweeperFlag from "../../public/Minesweeper_flag.svg"

type CellProps = {
    coords: [number, number]
    onLeftClick: (coords: [number, number]) => void
    onRightClick: (coords: [number, number]) => void
    cleared: boolean
    minesAround: number
    flagged: boolean
}

export default function Cell({
    coords,
    onLeftClick,
    onRightClick,
    cleared,
    minesAround,
    flagged

}: CellProps) {
    let display: any = ""

    switch (minesAround) {
        case -1:
            "";
            break;
        case 0:
            display = <Image draggable={false} className="grow" src={Minesweeper0} alt="0" />;
            break;
        case 1:
            display = <Image draggable={false} className="grow" src={Minesweeper1} alt="1" />;
            break;
        case 2:
            display = <Image draggable={false} className="grow" src={Minesweeper2} alt="2" />;
            break;
        case 3:
            display = <Image draggable={false} className="grow" src={Minesweeper3} alt="3" />;
            break;
        case 4:
            display = <Image draggable={false} className="grow" src={Minesweeper4} alt="4" />;
            break;
        case 5:
            display = <Image draggable={false} className="grow" src={Minesweeper5} alt="5" />;
            break;
        case 6:
            display = <Image draggable={false} className="grow" src={Minesweeper6} alt="6" />;
            break;
        case 7:
            display = <Image draggable={false} className="grow" src={Minesweeper7} alt="7" />;
            break;
        case 8:
            display = <Image draggable={false} className="grow" src={Minesweeper8} alt="8" />;
            break;
    }

    return (
        <div
        onClick={() => onLeftClick(coords)}
        onContextMenu={(e) => {e.preventDefault(); onRightClick(coords)}}
        className={`w-8 aspect-square flex items-center justify-center box-border`}>
            {flagged ? <Image draggable={false} className="grow" src={MinesweeperFlag} alt="flag" /> : cleared ? display : display = <Image draggable={false} className="grow" src={MinesweeperUnopened} alt="uo" />}
        </div>
    )
}
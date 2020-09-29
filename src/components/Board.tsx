import React, {useState} from "react";
import {ISquare} from "../interface";
import {Square} from "./Square";
import _ from "lodash";

interface BoardState {
    squares: ISquare[]
    xIsNext: Boolean
}

export const Board: React.FC = () => {
    const [boardState, setBoardState] = useState<BoardState>({
        squares: Array(9).fill(null),
        xIsNext: true,
    })

    const handleClick = (i: number) => {
        const squares = boardState.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = boardState.xIsNext ? 'X' : 'O';
        setBoardState({
            squares: squares,
            xIsNext: !boardState.xIsNext
        })
    }

    const winner = calculateWinner(boardState.squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner
    } else {
        status = 'Next player: ' + (boardState.xIsNext ? 'X' : 'O');
    }

    const chunked = _.chunk(Array(9).fill(null).map((_, i) => i), 3)
    return (
        <div>
            <div className="status">{status}</div>
            {chunked.map((hs, i) => (
                <div key={i} className="board-row">
                    {hs.map((j, _) => (
                        <Square key={j}
                                value={boardState.squares[j]}
                                onClick={() => handleClick(j)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

function calculateWinner(squares: Array<ISquare>) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
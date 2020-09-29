import React from "react";
import {Board} from "./Board";

export const Game: React.FC = () => {
    return (
        <div className="game">
            <div className="game-board">
                <Board/>
            </div>
        </div>
    );
}

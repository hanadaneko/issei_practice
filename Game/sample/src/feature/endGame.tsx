import { Monster } from "@/type/monster";
import { PLAYER } from "@/type/player";
import { Dispatch, SetStateAction } from "react";

interface EndGameProps {
    gameState: string;
    player: PLAYER;
    monster: Monster | null;
    consecutiveKills: number;
    setGameState: Dispatch<SetStateAction<string>>
    setConsecutiveKills : Dispatch<SetStateAction<number>>
}

export default function StartGame({
    gameState,
    player,
    monster,
    consecutiveKills,
    setGameState,
    setConsecutiveKills
} : EndGameProps) {
    function restart() {
        setGameState('start');
        setConsecutiveKills(0);
    }
    return (
        <div>
            {gameState === 'end' &&
            <>
                <h1>Game End</h1>
                <p>{player.name}は{monster?.name}にやられてしまった…！</p>
                <p>連続討伐数: {consecutiveKills}</p>
                <button onClick={restart}>Restart</button>
            </>
            }
            {gameState === 'escape' &&
            <>
                <h1>Escape</h1>
                <p>{player.name}は{monster?.name}から逃げ出した！</p>
                <p>連続討伐数: {consecutiveKills}</p>
                <button onClick={restart}>Restart</button>
            </>
            }
        </div>
    );
}
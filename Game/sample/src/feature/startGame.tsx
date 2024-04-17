import { Dispatch, SetStateAction } from "react";

interface StartGameProps {
    setGameState: Dispatch<SetStateAction<string>>
}

export default function StartGame({setGameState} : StartGameProps) {
    return (
        <div>
            <h1>Game Start</h1>
            <button onClick={() => setGameState('game')}>Start</button>
        </div>
    );
}
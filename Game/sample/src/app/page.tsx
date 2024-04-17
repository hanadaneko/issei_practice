'use client'

import { PLAYERS } from "@/const/player";
import BattleGame from "@/feature/battleGame";
import EndGame from "@/feature/endGame";
import StartGame from "@/feature/startGame";
import { Monster } from "@/type/monster";
import { PLAYER } from "@/type/player";
import { useState } from "react";


export default function Page() {
  // ゲームの状態を管理する
  // ゲームの状態に応じて表示する画面を変更する
  const [gameState, setGameState] = useState('start');
  const [player, setPlayer] = useState<PLAYER>(PLAYERS);
  const [monster, setMonster] = useState<Monster | null>(null);
  const [consecutiveKills, setConsecutiveKills] = useState(0);

  
  return (
    <div>
      {/* ゲーム開始画面 */}
      {gameState === 'start' && (
          <StartGame setGameState={setGameState}/>        
      )}

      {/* 戦闘画面(ゲーム中の画面) */}
      {gameState === 'game' && (
        <BattleGame 
        player={player}
        monster={monster}
        consecutiveKills={consecutiveKills}
        setGameState={setGameState}
        setPlayer={setPlayer}
        setMonster={setMonster}
        setConsecutiveKills={setConsecutiveKills}
        />
      )}

      {/* ゲーム終了画面 */}
      {gameState !== 'start' && (
        <EndGame 
        gameState={gameState}
        player={player}
        monster={monster}
        consecutiveKills={consecutiveKills}
        setGameState={setGameState}
        setConsecutiveKills={setConsecutiveKills}
        />
      )}
    </div>
  );
}

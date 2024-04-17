import { Monster } from "@/type/monster";

import { PLAYERS } from "@/const/player";
import { MONSTERS } from "@/const/monster";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from 'next/image';
import { PLAYER } from "@/type/player";

interface BattleGameProps {
    player: PLAYER;
    monster: Monster | null;
    consecutiveKills: number;
    setGameState: Dispatch<SetStateAction<string>>
    setPlayer: Dispatch<SetStateAction<PLAYER>>
    setMonster: Dispatch<SetStateAction<Monster | null>>
    setConsecutiveKills: Dispatch<SetStateAction<number>>
}


export default function BattleGame({
    player,
    monster,
    consecutiveKills,
    setGameState, 
    setPlayer, 
    setMonster, 
    setConsecutiveKills
} : BattleGameProps) {


    function defeatMonster() {
        setMonster(null);
        setPlayer({
            ...player,
            hp: player.hp + 10
        });
        setConsecutiveKills(consecutiveKills + 1);
    }

    function monsterAttack() {
        if (monster === null) return;

        const monsterDamage = monster.attack - player.defense;
        if (monsterDamage > 0) {
            setPlayer({
                ...player,
                hp: player.hp - monsterDamage
            });
        }
        
        if (player.hp <= monsterDamage) {
            setGameState('end'); 
        }
    }

    function playerAttack() {
        if (monster === null) return;

        if (!monster.defense){
            monster.defense = 0;
        }

        const damage = player.attack - monster.defense;

        if (damage > 0) {
            setMonster({
                ...monster,
                hp: monster.hp - damage
            });

            if (monster.hp <= damage) {
                defeatMonster();
            }else{
                monsterAttack();
            }
        }
    }

    function escape() {
        setGameState('escape');
    }


    useEffect(() => {
        setMonster(null);
        setPlayer(PLAYERS);
    } , [setMonster, setPlayer]);

    useEffect(() => {
        if (monster === null) {
            const randomIndex = Math.floor(Math.random() * MONSTERS.length);
            setMonster(MONSTERS[randomIndex]);
        }
    }, [monster, setMonster ]);




    return (
        <div>
            <h1>Game</h1>
            <p>{player.name}: {player.hp}HP</p>
            {
                monster === null ? (
                    <p>Escapeからやり直してください</p>
                ) : (
                    <>
                        <p>{monster.name}: {monster.hp}HP</p>
                        <Image src={monster.img} alt={monster.name} width={200} height={150} style={{ width: '30%', height: 'auto', objectFit: 'contain' }} />
                    </>
                )
            }
            <p>連続討伐数: {consecutiveKills}</p>
            <div>
                <button onClick={playerAttack}>Attack</button>
                <button onClick={escape}>Escape</button>
            </div>

        </div>
    );
}
import { createContext, useState, ReactNode, useEffect } from 'react';
import { isContext } from 'vm';
import Cookies from 'js-cookie';

import challenges from '../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}


interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextlevel: number;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderprops {
    children: ReactNode;

    level: number;
    currentExperience: number;
    challengesCompleted: number;

}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderprops) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextlevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }
    function startNewChallenge() {
        const randonChallengeIndex = Math.floor(Math.random() * challenges.length);

        const challenge = challenges[randonChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('New Challenge', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextlevel) {
            finalExperience = finalExperience - experienceToNextlevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <challengesContext.Provider
            value={{ level, currentExperience, challengesCompleted, levelUp, startNewChallenge, activeChallenge, resetChallenge, experienceToNextlevel, completeChallenge, closeLevelUpModal }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </challengesContext.Provider>
    )
}
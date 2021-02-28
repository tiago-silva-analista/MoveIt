import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextlevel } = useContext(challengesContext);

    let percentToNextLevel = Math.round(Math.round(Number(currentExperience) * 100) / Number(experienceToNextlevel));

    if (!(percentToNextLevel > 0)) {
        percentToNextLevel = 0
    }

    return (
        <header className={styles.experienceBar}>
            <span > 0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentExperience} xp</span>
            </div>
            <span> {experienceToNextlevel} xp</span>
        </header>
    )
}
import { useContext } from 'react'
import { challengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
    const { level, closeLevelUpModal } = useContext(challengesContext);

    return (
        <div className={styles.overlay}>
            <div className={styles.levelUpModalContainer}>
                <header>{level}</header>
                <strong>Parabens!</strong>
                <p>Você alcançou um novo level</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>
            </div>
        </div>
    )
}
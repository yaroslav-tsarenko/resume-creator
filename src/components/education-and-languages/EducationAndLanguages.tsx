import React, {FC} from "react";
import styles from "./EducationAndLanguages.module.scss";

interface Props {
    speciality?: string;
    university?: string;
    languages?: { name: string; level: string }[];
}

const EducationAndLanguages: FC<Props> = ({speciality, university, languages}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.topLine}/>
            <div className={styles.content}>
                <div className={styles.education}>
                    <h2 className={styles.title}>Education</h2>
                    {speciality && <p className={styles.speciality}><strong>{speciality}</strong></p>}
                    {university && <p className={styles.university}>{university}</p>}
                </div>
                <div className={styles.languagesWrapper}>
                    <div className={styles.languages}>
                        <h2 className={styles.title}>Languages</h2>
                        <ul>
                            {languages?.map((lang, i) => (
                                <li key={i}>
                                    <strong>{lang.name}</strong>
                                    <span className={styles.level}>{lang.level}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationAndLanguages;

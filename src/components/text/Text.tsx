import React from "react";
import styles from "./Text.module.scss";

interface Bullet {
    id: string | number;
    text: string;
}

interface TextProps {
    title?: string;
    description?: string;
    bullets?: Bullet[];
    role?: string;
    company?: string;
    project?: string;
    workType?: string;
    date?: string;
    accomplishments?: Bullet[];
    languages?: string[];
    technologies?: string[];
}

const Text: React.FC<TextProps> = ({
                                       title,
                                       description,
                                       bullets,
                                       role,
                                       company,
                                       project,
                                       workType,
                                       date,
                                       accomplishments,
                                       languages,
                                       technologies
                                   }) => (
    <div className={styles.summary}>
        <div className={styles.divider}>
            {title &&  <hr />}
            <h2>{title}</h2>
        </div>
        <div className={styles.infoRow}>
            <div className={styles.infoCol}>
                {role && <strong>{role}</strong>}
                {company && <strong>{company}</strong>}
            </div>
            <div className={styles.infoCol}>
                {date && <p>{date}</p>}
                {workType && <p>{workType}</p>}
            </div>
        </div>
        {project && <strong>{project}</strong>}
        {description && <p>{description}</p>}
        {accomplishments && accomplishments.length > 0 && (
            <p>
                <strong className={styles.italic}>Accomplishments:</strong> {accomplishments.map(acc => acc.text).join(", ")}
            </p>
        )}
        {(languages && languages.length > 0 || technologies && technologies.length > 0) && (
            <p>
                <strong className={styles.italic}>Languages & Technologies:</strong>
                {languages && languages.length > 0 ? ` ${languages.join(", ")}` : ""}
                {technologies && technologies.length > 0 ? `, ${technologies.join(", ")}` : ""}
            </p>
        )}
        {bullets && bullets.length > 0 && (
            <ul className={styles.bullets}>
                {bullets.map(bullet => (
                    <li key={bullet.id}>{bullet.text}</li>
                ))}
            </ul>
        )}
    </div>
);

export default Text;
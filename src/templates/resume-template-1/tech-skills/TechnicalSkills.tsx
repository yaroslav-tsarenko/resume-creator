import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

type Props = {
    skills: string[];
};

const styles = StyleSheet.create({
    section: { marginBottom: 20, fontSize: 11, marginLeft: 10, color: "#242424", marginRight: 10 },
    title: {
        fontSize: 12,
        letterSpacing: 4,
        width: "100%",
        paddingTop: 5,
        marginBottom: 5,
        borderTop: "1px solid #308928",
        fontWeight: 'bold',
        color: '#308928',
        textTransform: "uppercase"
    },
    bullet: { fontSize: 11, marginBottom: 5, textAlign: "justify", color: "#242424" },
});

export const TechnicalSkillsSection: React.FC<Props> = ({ skills }) => (
    <View>
        <Text style={styles.title}>Technical Skills</Text>
        {skills.map((skill, idx) => (
            <Text key={idx} style={styles.bullet}>
                {'\u2022'} {skill}
            </Text>
        ))}
    </View>
);
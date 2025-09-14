import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

type Language = {
    name: string;
    level: string;
};

type Education = {
    university: string;
    speciality: string;
};

type Props = {
    education: Education;
    languages: Language[];
};

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        borderTop: "1px solid #308928",
        width: '100%',
    },
    wrapper: {
        flexDirection: 'row',
        paddingTop: 10,
        width: '100%',
    },
    educationCol: {
        width: '60%',
    },
    languagesCol: {
        width: '40%',
        paddingLeft: 15,
        borderLeft: "1px solid #308928",
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#308928',
        textTransform: "uppercase",
        letterSpacing: 2,
        paddingTop: 5,
        marginBottom: 5,
    },
    text: {
        fontSize: 11,
    },
    lang: {
        fontSize: 10,
        marginBottom: 2,
    }
});

export const EducationSection: React.FC<Props> = ({ education, languages }) => (
    <View style={styles.section}>
        <View style={styles.wrapper}>
            <View style={styles.educationCol}>
                <Text style={styles.title}>Education</Text>
                <Text style={styles.text}>{education.speciality}</Text>
                <Text style={styles.text}>{education.university}</Text>
            </View>
            <View style={styles.languagesCol}>
                <Text style={styles.title}>Languages</Text>
                {languages.map((lang, idx) => (
                    <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                        <Text style={styles.lang}>{lang.name}</Text>
                        <Text style={styles.lang}>{lang.level}</Text>
                    </View>
                ))}
            </View>
        </View>
    </View>
);
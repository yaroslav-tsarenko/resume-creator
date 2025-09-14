import React from 'react';
import {View, Text, StyleSheet, Font} from '@react-pdf/renderer';

Font.register({
    family: 'Google Sans',
    fonts: [
        {src: '/fonts/Google-Sans/GoogleSans-Regular.ttf', fontWeight: 'normal'},
        {src: '/fonts/Google-Sans/GoogleSans-Medium.ttf', fontWeight: 'bold'},
        {src: '/fonts/Google-Sans/GoogleSans-MediumItalic.ttf', fontStyle: 'italic'},
    ],
});

const workStyles = StyleSheet.create({
    bold: {fontFamily: 'Google Sans', fontWeight: 'bold'},
    italic: {fontFamily: 'Google Sans', fontStyle: 'italic'},
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
    works: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    item: {
        fontSize: 11,
        color: '#242424',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: 11,
        paddingBottom: 5,
        color: '#242424',
    },
    leftColumn: {
        flexDirection: 'column',
        flex: 1,
        gap: 3,
        textTransform: "capitalize",
        color: '#242424',
        fontWeight: 600,
        fontSize: 11,
    },
    rightColumn: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        textTransform: "capitalize",
        fontSize: 11,
        gap: 3,
        color: '#242424',
    },
    role: {
        fontWeight: 'bold',
        color: '#242424',
        fontSize: 11,
    },
    tech: {
        fontSize: 11,
        gap: 10,
        color: '#242424',
        display: "flex",
        textAlign: "justify",
    },
    accomplishment: {
        fontSize: 11,
        gap: 10,
        display: "flex",
        color: '#242424',
        textAlign: "justify",
    }
});

export interface WorkExperience {
    role: string;
    company: string;
    date: string;
    project: string;
    type: string;
    accomplishment: string[];
    languagesAndTechnologies: string[];
}

export const WorkExperienceSection = ({
                                          experiences,
                                      }: {
    experiences: WorkExperience[];
}) => (
    <View>
        <Text style={workStyles.title}>Professional Experience</Text>
        <View style={workStyles.works}>
            {experiences.map((exp, idx) => (
                <View key={idx} style={workStyles.item}>
                    <View style={workStyles.container}>
                        <View style={workStyles.leftColumn}>
                            <Text style={workStyles.bold}>{exp.role}</Text>
                            <Text style={workStyles.bold}>{exp.company}</Text>
                            <Text style={workStyles.bold}>{exp.project}</Text>
                        </View>
                        <View style={workStyles.rightColumn}>
                            <Text>{exp.date}</Text>
                            <Text style={workStyles.italic}>{exp.type}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={workStyles.tech}>
                            <Text style={workStyles.italic}>Languages & Technologies:  </Text>
                            {exp.languagesAndTechnologies.join(', ')}
                        </Text>
                        <Text style={workStyles.accomplishment}>
                            <Text style={workStyles.italic}>Accomplishment:  </Text>
                            {exp.accomplishment.join('. ')}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    </View>
);
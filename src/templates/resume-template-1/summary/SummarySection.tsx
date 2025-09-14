import React from 'react';
import {View, Text, StyleSheet} from '@react-pdf/renderer';

type Props = {
    summary: string;
    keywords: string[];
};

const styles = StyleSheet.create({
    summary: {fontSize: 11, color: '#242424', textAlign: 'justify'},
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
});

export const SummarySection: React.FC<Props> = ({summary, keywords}) => (
    <View>
        <Text style={styles.title}>Profile summary</Text>
        <Text style={styles.summary}>{summary}</Text>
    </View>
);
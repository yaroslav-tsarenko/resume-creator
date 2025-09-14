import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: { marginBottom: 10 },
    keyword: { fontSize: 3, marginRight: 6, color: 'rgba(36,36,36,0)', textTransform: 'capitalize' },
    keywordsRow: { flexDirection: 'row', flexWrap: 'wrap', position: "absolute" }
});

export const ATSKeywords = ({ keywords }: { keywords: string[] }) => (
    <View style={styles.container}>
        <View style={styles.keywordsRow}>
            {keywords.map((kw, idx) => (
                <Text key={idx} style={styles.keyword}>{kw}</Text>
            ))}
        </View>
    </View>
);
// templates/resume-template-1/ResumePDF.tsx
import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import { Header } from './header/Header';
import { SummarySection } from "@/templates/resume-template-1/summary/SummarySection";
import { TechnicalSkillsSection } from "@/templates/resume-template-1/tech-skills/TechnicalSkills";
import { WorkExperienceSection } from "@/templates/resume-template-1/work-experience/WorkExperience";
import { EducationSection } from "@/templates/resume-template-1/education-section/EducationSection";
import { ATSKeywords } from "@/templates/resume-template-1/ats-keywords/ATSKeywords";

Font.register({
    family: 'MyFont',
    src: '/fonts/Google-Sans/GoogleSans-Regular.ttf',
    fontWeight: 'normal',
});

const styles = StyleSheet.create({
    page: {
        fontSize: 12,
        gap: 15,
        padding: 30,
        fontFamily: 'MyFont'
    },
    section: {
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
});

export interface ResumeData {
    header: {
        fullName: string;
        role: string;
        country: string;
        linkedinLink: string;
        portfolioLink: string;
        email: string;
    };
    summary: string;
    keywords: string[];
    technicalSkills: string[];
    experiences: {
        company: string;
        role: string;
        project: string;
        date: string;
        type: string;
        accomplishment: string[];
        languagesAndTechnologies: string[];
    }[];
    education: { university: string; speciality: string };
    languages: { name: string; level: string }[];
}

export const ResumePDF = ({
                              avatar,
                              script,
                              data,
                          }: {
    avatar: string | null;
    script?: string;
    data: ResumeData;
}) => (
    <Document>
        <Page style={styles.page}>
            <Header {...data.header} avatar={avatar} />
            <SummarySection summary={data.summary} keywords={data.keywords}  />
            <TechnicalSkillsSection skills={data.technicalSkills}  />
            <WorkExperienceSection experiences={data.experiences}/>
            <EducationSection education={data.education} languages={data.languages}  />
            <ATSKeywords keywords={data.keywords}  />
        </Page>
    </Document>
);

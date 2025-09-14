import React from 'react';
import {Text, Link, View, StyleSheet, Svg, Path, Image} from '@react-pdf/renderer';

type HeaderProps = {
    fullName: string;
    role: string;
    country: string;
    linkedinLink: string;
    portfolioLink: string;
    email: string;
    avatar?: string | null;
};

const styles = StyleSheet.create({
    section: {marginBottom: 0},
    headerRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 15},
    nameRoleColumn: {flexDirection: 'column', flexGrow: 1},
    all: {
        display: "flex",
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 2,
        letterSpacing: 4,
        display: "flex",
        textTransform: "uppercase",
        color: "#242424"
    },
    role: {
        fontSize: 15,
        marginBottom: 2,
        letterSpacing: 4,
        display: "flex",
        textTransform: "uppercase",
        color: "#3d3d3d"
    },
    line: {color: "#308928"},
    country: {fontSize: 12, marginBottom: 2},
    contactsRow: {flexDirection: 'row', gap: 12},
    contact: {fontSize: 12, marginBottom: 0, flexDirection: 'row', alignItems: 'center'},
    link: {color: "#242424", textDecoration: "underline"},
    icon: {width: 14, height: 14, marginRight: 4},
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 150,
    },
});
export const Header: React.FC<HeaderProps> = ({
                                                  fullName,
                                                  role,
                                                  country,
                                                  linkedinLink,
                                                  portfolioLink,
                                                  email,
                                                  avatar,
                                              }) => (

    <View style={styles.section}>
        <View style={styles.headerRow}>
            {avatar && (
                <Image src={avatar} style={styles.avatar} />
            )}
            <View style={styles.all}>
                <View style={styles.nameRoleColumn}>

                    <Text style={styles.name}>{fullName}</Text>
                    <Text style={styles.role}>{role}</Text>
                </View>
                <View style={styles.contactsRow}>
                    <Text style={styles.country}>{country}</Text>
                    <Text style={styles.line}>|</Text>
                    <Text style={styles.contact}>
                        <Svg style={styles.icon} viewBox="0 0 28 29">
                            <Path
                                d="M13.3171 15.7798C13.122 15.5938 13.0244 15.3253 13.0244 15.0567C13.0244 14.8295 13.1024 14.6229 13.2195 14.437H14.7805C15.0732 14.8501 15.0341 15.4079 14.6829 15.7798C14.3122 16.1929 13.6878 16.1929 13.3171 15.7798ZM15.2488 16.3582C14.8976 16.73 14.4488 16.916 14 16.916C13.5512 16.916 13.1024 16.73 12.7512 16.3788C12.4195 16.0277 12.2439 15.5525 12.2439 15.0567C12.2439 14.8501 12.2829 14.6436 12.3415 14.437H6V21.0476C6 21.7293 6.52683 22.2871 7.17073 22.2871H20.8293C21.4732 22.2871 22 21.7293 22 21.0476V14.437H15.6585C15.8732 15.098 15.7366 15.8417 15.2488 16.3582ZM20.8293 9.47899H7.17073C6.52683 9.47899 6 10.0368 6 10.7185V13.6106H22V10.7185C22 10.0368 21.4732 9.47899 20.8293 9.47899ZM16.7317 7H11.2683V8.65266H16.7317V7Z"
                                fill="white"
                            />
                        </Svg>
                        <Link style={styles.link} src={portfolioLink}>Portfolio</Link>
                    </Text>
                    <Text style={styles.line}>|</Text>
                    <Text style={styles.contact}>
                        <Link style={styles.link} src={`mailto:${email}`}>{email}</Link>
                    </Text>
                    <Text style={styles.line}>|</Text>
                    <View style={styles.contact}>
                        <Link style={styles.link}  src={linkedinLink}>Linkedin</Link>
                    </View>
                </View>
            </View>
        </View>
    </View>
);
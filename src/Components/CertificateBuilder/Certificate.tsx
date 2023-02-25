// @flow
import * as React from 'react';
import { StyleSheet, Document, Page, View, Image } from '@react-pdf/renderer';
import cert from "./certificate-img.png"
const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 30,
    },
});
export const Certificate = () => {
    return (
        <Document>
            <Page size={'A4'} orientation={'landscape'} break={true} style={styles.body}>
                <View>
                    <Image src={cert} />
                </View>
            </Page>
        </Document>
    );
};

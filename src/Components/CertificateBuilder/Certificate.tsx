// @flow
import * as React from 'react';
import { StyleSheet, Document, Page, View, Image, Text } from '@react-pdf/renderer';
import cert from "./certificate.jpg"
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
            {[1, 2, 3].map((v, index) => (<Page key={index} size={'A4'} orientation={'landscape'} break={true} style={styles.body}>
                <View>
                    <Image src={cert} />
                    <View style={{ position: 'absolute', left: 0, top: 0}}>
                        <View style={{ marginLeft: 100, marginTop: 245}}>
                            <Text style={{ fontSize: 16}}>Kaveendra Perera</Text>
                        </View>
                        <View style={{ marginLeft: 200, marginTop: 150}}>
                            <Text style={{ fontSize: 16}}>{v.toString()} place</Text>
                        </View>
                    </View>
                </View>
            </Page>))}
        </Document>
    );
};

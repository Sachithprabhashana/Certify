// @flow
import * as React from 'react';
import { FC, useRef } from 'react';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import { UserOutlined } from '@ant-design/icons';
import {Button, Empty} from 'antd';
import { useReactToPrint } from 'react-to-print';
import background from '../../Components/CertificateBuilder/certificate-img.png';
import SignLeft from '../../images/signature1.png'
import SignRight from '../../images/signature2.png'
import {useCache} from "../../context/CacheContext";
export const SingleEvent: FC = () => {
  // const childRef = useRef<CertificateModalInstance>(null);
    const { currentEvent } = useCache();
  const printPreviewRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => printPreviewRef.current,
    pageStyle: ' @page { size: A4 landscape; margin: 0;}',
  });
  return (
    <MainLayout>
        {currentEvent ? <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
            <h1>{currentEvent?.event}</h1>
            <Button
                onClick={() => {
                    // navigate('/single-event');
                    handlePrint();
                }}
                type="primary"
                icon={<UserOutlined/>}>
                Print Certificates
            </Button>
            {/*<ReactToPrint*/}
            {/*    pageStyle=" @page { size: A4 landscape; margin: 0;}"*/}
            {/*    trigger={() => <button>Print this out!</button>}*/}
            {/*    content={() => printPreviewRef.current}*/}
            {/*/>*/}
            <div ref={printPreviewRef}>
                {currentEvent?.winners.map((v, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundImage: `url(${background})`,
                            height: '8.25in',
                            width: '11.69in',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}>
                        <div
                            style={{
                                paddingLeft: 140,
                                paddingTop: 350,
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                color:'blue',
                            }}>
                          {v.name}
                        </div>
                        <div
                            style={{paddingLeft: 260, paddingTop: 18, fontWeight: 'bold',color:'blue', fontStyle: 'italic'}}>
                          {v.house}
                        </div>
                        <div
                            style={{paddingLeft: 260, paddingTop: 18, fontWeight: 'bold',color:'blue', fontStyle: 'italic'}}>
                          {v.place}
                        </div>
                        <div
                            style={{paddingLeft: 260, paddingTop: 17, fontWeight: 'bold',color:'blue', fontStyle: 'italic'}}>
                          {currentEvent?.event}
                        </div>
                        <div
                            style={{paddingLeft: 260, paddingTop: 17, fontWeight: 'bold',color:'blue', fontStyle: 'italic'}}>
                          {currentEvent?.ageRange}
                        </div>
                        <div
                            style={{paddingLeft: 260, paddingTop: 56, fontWeight: 'bold',color:'blue', fontStyle: 'italic'}}>
                            {v.achievement ?? '-'}
                        </div>

                      <div style={{flexDirection:'row'}}>
                      <div
                          style={{ position:'absolute',paddingLeft: 120, paddingTop: 10, }}>
                        <img width={150} height={65} src={SignLeft}/>
                      </div>
                      <div
                          style={{ position:'absolute',paddingLeft: 560,  paddingTop: 10}}>
                        <img width={150} height={65} src={SignRight}/>
                      </div>
                      </div>
                    </div>
                ))}
            </div>
        </div> : <Empty style={{ marginTop: 30}} description={'No event for print'}/>}
    </MainLayout>
  );
};

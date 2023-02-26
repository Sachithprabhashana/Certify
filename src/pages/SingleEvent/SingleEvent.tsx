// @flow
import * as React from 'react';
import { FC, useRef } from 'react';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useReactToPrint } from 'react-to-print';
import background from '../../Components/CertificateBuilder/certificate-img.png';
export const SingleEvent: FC = () => {
  // const childRef = useRef<CertificateModalInstance>(null);
  const printPreviewRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => printPreviewRef.current,
    pageStyle: ' @page { size: A4 landscape; margin: 0;}',
  });
  return (
    <MainLayout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Button
          onClick={() => {
            // navigate('/single-event');
            handlePrint();
          }}
          type="primary"
          icon={<UserOutlined />}>
          Print
        </Button>
        {/*<ReactToPrint*/}
        {/*    pageStyle=" @page { size: A4 landscape; margin: 0;}"*/}
        {/*    trigger={() => <button>Print this out!</button>}*/}
        {/*    content={() => printPreviewRef.current}*/}
        {/*/>*/}
          <div ref={printPreviewRef}>
        {['First', 'Second', 'Third'].map((v, index) => (
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
              }}>
              Kaveendra Perera
            </div>
            <div
              style={{ paddingLeft: 260, paddingTop: 20, fontWeight: 'bold', fontStyle: 'italic' }}>
              Mahaweli
            </div>
            <div
              style={{ paddingLeft: 260, paddingTop: 20, fontWeight: 'bold', fontStyle: 'italic' }}>
              first place
            </div>
            <div
              style={{ paddingLeft: 260, paddingTop: 20, fontWeight: 'bold', fontStyle: 'italic' }}>
              100 * 4 * 4
            </div>
            <div
              style={{ paddingLeft: 260, paddingTop: 20, fontWeight: 'bold', fontStyle: 'italic' }}>
              nineteen
            </div>
            <div
              style={{ paddingLeft: 260, paddingTop: 60, fontWeight: 'bold', fontStyle: 'italic' }}>
                {v} Place
            </div>
          </div>
        ))}
      </div>
      </div>
    </MainLayout>
  );
};

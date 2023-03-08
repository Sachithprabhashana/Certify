// @flow
import * as React from 'react';
import { FC, useRef } from 'react';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import { UserOutlined } from '@ant-design/icons';
import './SingleEvent.css';
import { Button, Empty } from 'antd';
import { useReactToPrint } from 'react-to-print';
import background from '../../Components/CertificateBuilder/certificate-img.png';

import { useCache } from '../../context/CacheContext';
export const SingleEvent: FC = () => {
  const { currentEvent } = useCache();
  const printPreviewRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => printPreviewRef.current,
    pageStyle: ' @page { size: A4 landscape; margin: 0;}',
  });
  return (
    <MainLayout>
      {currentEvent ? (
        <div className="SingleEvent_MainContainer">
          <h1>{currentEvent?.event}</h1>
          <Button
            onClick={() => {
              // navigate('/single-event');
              handlePrint();
            }}
            type="primary"
            icon={<UserOutlined />}>
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
                  className="Student_name"
                  style={{
                    fontFamily: 'Shantell Sans',
                    paddingLeft: 140,
                    paddingTop: 346,
                    fontStyle: 'italic',
                    fontSize:'20px',
                  }}>
                  {v.name}
                </div>
                <div
                  style={{
                    fontFamily: 'Shantell Sans',
                    paddingLeft: 260,
                    paddingTop: 12,
                    fontStyle: 'italic',
                    fontSize:'20px',

                  }}>
                  {v.house}
                </div>
                <div
                  style={{
                    fontFamily: 'Shantell Sans',
                    paddingLeft: 260,
                    paddingTop: 13,
                    fontStyle: 'italic',
                    fontSize:'20px',

                  }}>
                  {v.place}
                </div>
                <div
                  style={{

                    fontFamily: 'Shantell Sans',
                    paddingLeft: 260,
                    paddingTop: 11,
                    fontStyle: 'italic',
                    fontSize:'20px',

                  }}>
                  {currentEvent?.event}
                </div>
                <div
                  style={{
                    fontFamily: 'Shantell Sans',
                    paddingLeft: 260,
                    paddingTop: 13,
                    fontStyle: 'italic',
                    fontSize:'20px',

                  }}>
                  {currentEvent?.ageRange}
                </div>
                <div
                  style={{
                    fontFamily: 'Shantell Sans',
                    paddingLeft: 260,
                    paddingTop: 50,
                    fontStyle: 'italic',
                    fontSize:'20px',

                  }}>
                  {v.achievement ?? '-'}
                </div>

                {/*<div style={{ flexDirection: 'row' }}>*/}
                {/*  <div style={{ position: 'absolute', paddingLeft: 120, paddingTop: 10 }}>*/}
                {/*    <img alt="left" width={150} height={65} src={SignLeft} />*/}
                {/*  </div>*/}
                {/*  <div style={{ position: 'absolute', paddingLeft: 560, paddingTop: 10 }}>*/}
                {/*    <img alt="right" width={150} height={65} src={SignRight} />*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty style={{ marginTop: 30 }} description={'No event for print'} />
      )}
    </MainLayout>
  );
};

// @flow
import * as React from 'react';
import { FC, useRef } from 'react';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import { UserOutlined } from '@ant-design/icons';
import '../SingleEvent/SingleEvent.css';
import { Button, Empty } from 'antd';
import { useReactToPrint } from 'react-to-print';
import background2 from '../../Components/CertificateBuilder/CertificateP.jpg';

import { useCache } from '../../context/CacheContext';
export const ParticipationCertificate: FC = () => {
  const { participations } = useCache();
  const printPreviewRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => printPreviewRef.current,
    pageStyle: ' @page { size: A4 landscape; margin: 0;}',
  });
  return (
    <MainLayout>
      {participations ? (
        <div className="SingleEvent_MainContainer">
          <h1>{participations?.event}</h1>
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
            {participations?.winners.map((v, index) => (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${background2})`,
                  height: '8.27in',
                  width: '11.69in',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}>
                <div
                  className="Student_name"
                  style={{
                    fontFamily: 'Shantell Sans',
                    paddingLeft: 140,
                    paddingTop: 355,
                    fontStyle: 'italic',
                    fontSize: '20px',
                  }}>
                  {v.name}
                </div>
                <div
                  style={{
                    fontFamily: 'Shantell Sans',
                    paddingLeft: 260,
                    paddingTop: 14,
                    // paddingBottom: 2,
                    fontStyle: 'italic',
                    fontSize: '20px',
                  }}>
                  {v.house}
                </div>
                <div
                  style={{
                    fontFamily: 'Shantell Sans',
                    paddingLeft: 260,
                    // paddingTop: 20,
                    // paddingBottom: -1,

                    fontStyle: 'italic',
                    fontSize: '20px',
                  }}>
                  {v.place}
                </div>
                <div
                  style={{
                    fontFamily: 'Shantell Sans',
                    paddingLeft: 445,
                    paddingTop: 5,
                    fontStyle: 'italic',
                    fontSize: '20px',
                  }}>
                  {participations?.event}
                </div>
               
                <div
                  style={{
                    fontFamily: 'Shantell Sans',
                    paddingLeft: 140,
                    paddingTop: 19,
                    fontStyle: 'italic',
                    fontSize: '20px',
                  }}>
                  {v.achievement ?? '-'}
                </div>

            
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

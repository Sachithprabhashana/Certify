// @flow
import * as React from 'react';
import {FC, useRef} from "react";
import {MainLayout} from "../../layout/mainLayout/MainLayout";
import {UserOutlined} from "@ant-design/icons";
import {Button} from "antd";
import CertificateModal from "../../Components/CertificateBuilder/CertificateModal";
export const SingleEvent: FC = () => {
    const childRef = useRef<any>();
    return (
        <MainLayout>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                    onClick={() => {
                        // navigate('/single-event');
                        childRef.current.show();
                    }}
                    type="primary"
                    icon={<UserOutlined />}>
                    Single Event
                </Button>
                <CertificateModal ref={childRef}/>
            </div>
        </MainLayout>
    );
};
